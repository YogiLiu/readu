import { QiDianError } from '~/services/qidian/error'
import he from 'he'
import { checkResponse, createHeaders } from '~/services/qidian/http'
import * as cheerio from 'cheerio'

type UserInfo = {
  avatarUrl: string
  username: string
}

const parseUserInfo = (html: string): UserInfo => {
  const dom = cheerio.load(html)
  const avatarUrl = dom('img.user-avatar-img').attr('src')
  if (!avatarUrl) {
    throw new QiDianError('can not match avatar url')
  }
  const username = dom('h3 > a[href="/setting"]').text()
  if (!username) {
    throw new QiDianError('can not match username')
  }
  return {
    avatarUrl: 'https:' + avatarUrl,
    username: he.decode(username),
  }
}

export const getUserInfo = async (cookie: string): Promise<UserInfo> => {
  'use server'
  if (!cookie) {
    throw new QiDianError('empty cookie')
  }
  const url = 'https://my.qidian.com/'
  const res = await fetch(url, {
    method: 'GET',
    signal: AbortSignal.timeout(5000),
    headers: createHeaders({
      Cookie: cookie,
    }),
    redirect: 'manual',
  }).catch((e) =>
    Promise.reject(new QiDianError('can not fetch user info', { cause: e })),
  )
  checkResponse(res)
  const html = await res.text()
  return parseUserInfo(html)
}
