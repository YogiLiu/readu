import { QiDianError } from '~/services/qidian/error'

const createCommonHeaders = (): Record<string, string> => ({
  'User-Agent':
    'Mozilla/5.0 (X11; Linux x86_64; rv:130.0) Gecko/20100101 Firefox/130.0',
  Accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/png,image/svg+xml,*/*;q=0.8',
  'Accept-Language':
    'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2',
  'Accept-Encoding': 'gzip, deflate, br, zstd',
  DNT: '1',
  Connection: 'keep-alive',
  'Sec-GPC': '1',
  'Sec-Fetch-Dest': 'document',
  'Sec-Fetch-Mode': 'navigate',
  'Sec-Fetch-Site': 'same-site',
  'Sec-Fetch-User': '?1',
  Pragma: 'no-cache',
  'Cache-Control': 'no-cache',
})

export const createHeaders = (
  headers?: HeadersInit,
): Record<string, string> => {
  const commonHeaders = createCommonHeaders()
  Object.assign(commonHeaders, headers)
  return commonHeaders
}

export const checkResponse = (res: Response): void => {
  if (!res.ok) {
    const lct = res.headers.get('Location') || ''
    const isLoginPage = lct.startsWith('https://passport.qidian.com')
    if (res.status === 302 && isLoginPage) {
      throw new QiDianError('invalid cookie')
    }
    throw new QiDianError(`status code: ${res.status}`)
  }
}
