import { checkResponse, createHeaders } from '~/services/qidian/http'
import { QiDianError } from '~/services/qidian/error'
import * as cheerio from 'cheerio'

type Bookcase = {
  id: string
  title: string
  coverUrl: string
  author: string
}[]

const pattern = /\/\/www.qidian.com\/book\/(\d+)\//

const parseBookcase = (html: string): Bookcase => {
  const dom = cheerio.load(html)
  const rows = dom('table > tbody > tr')
  const bookcase: Bookcase = []
  rows.each((_i, el) => {
    const ba = dom('td > span.shelf-table-name > b > a:last-child', el)
    const title = ba.text()
    if (!title) {
      return
    }
    const url = ba.attr('href')
    if (!url) {
      return
    }
    const match = pattern.exec(url)
    if (!match) {
      return
    }
    const id = match[1]
    const coverUrl = `https://bookcover.yuewen.com/qdbimg/349573/${id}/150.webp`
    const aa = dom('td.col4 > a', el)
    const author = aa.text()
    bookcase.push({
      id,
      title,
      coverUrl,
      author,
    })
  })
  return bookcase
}

export const getBookcase = async (cookie: string): Promise<Bookcase> => {
  'use server'
  const url = 'https://my.qidian.com/bookcase'
  const res = await fetch(url, {
    method: 'GET',
    signal: AbortSignal.timeout(5000),
    headers: createHeaders({
      Cookie: cookie,
    }),
    redirect: 'manual',
  }).catch((e) =>
    Promise.reject(new QiDianError('can not fetch bookcase', { cause: e })),
  )
  checkResponse(res)
  const html = await res.text()
  return parseBookcase(html)
}
