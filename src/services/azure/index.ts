import { AzureError } from '~/services/azure/error'
import he from 'he'

type Voice = {
  id: string
  label: string
  locale: string
}

const getOrigin = (region: string): string => {
  if (!region) {
    throw new AzureError('empty region')
  }
  return `https://${region}.tts.speech.microsoft.com`
}

const getVoicesEndpoint = (region: string): string => {
  return `${getOrigin(region)}/cognitiveservices/voices/list`
}

const getHeaders = (key: string): Record<string, string> => {
  if (!key) {
    throw new AzureError('empty key')
  }
  return { 'Ocp-Apim-Subscription-Key': key }
}

type VoicesEndpointRes = {
  LocalName: string
  Gender: string
  Locale: string
  ShortName: string
}[]

const getVoices = async (region: string, key: string): Promise<Voice[]> => {
  const endpoint = getVoicesEndpoint(region)
  const res = await fetch(endpoint, {
    headers: getHeaders(key),
    signal: AbortSignal.timeout(5000),
  }).catch((e) =>
    Promise.reject(new AzureError('can not fetch voices', { cause: e })),
  )
  if (!res.ok) {
    let reason = ''
    switch (res.status) {
      case 400:
        reason = 'bad request'
        break
      case 401:
        reason = 'unauthorized'
        break
      case 429:
        reason = 'too many requests'
        break
      case 502:
        reason = 'bad gateway'
        break
      default:
        reason = 'unknown'
    }
    throw new AzureError(`${res.status}: ${reason}`)
  }
  const data = (await res.json()) as VoicesEndpointRes
  return data
    .map((item) => ({
      id: item.ShortName,
      label: `${item.LocalName} / ${item.Gender} / ${item.Locale}`,
      locale: item.Locale,
    }))
    .sort((...items) => {
      const ws = [0, 0]
      for (let i = 0; i < 2; i++) {
        const item = items[i]
        if (item.id.includes('Multilingual')) {
          ws[i] += 1 << 0
        }
        if (item.locale.includes('zh')) {
          ws[i] += 1 << 1
        }
        if (item.locale.includes('CN')) {
          ws[i] += 1 << 2
        }
      }
      return ws[1] - ws[0]
    })
}

const getAudioEndpoint = (region: string): string => {
  return `${getOrigin(region)}/cognitiveservices/v1`
}

const createSSML = (voice: Voice, text: string, rate: number): string => {
  text = he.encode(text)
  return (
    `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">` +
    `<voice name="${voice.id}">` +
    `<prosody rate="${rate}">` +
    text +
    '</prosody>' +
    '</voice>' +
    '</speak>'
  )
}

const getAudio = async (
  text: string,
  voice: Voice,
  region: string,
  key: string,
  rate?: number,
): Promise<ArrayBuffer> => {
  text = text.trim()
  if (!text) {
    return new ArrayBuffer(0)
  }
  const headers = getHeaders(key)
  headers['Content-Type'] = 'application/ssml+xml'
  headers['X-Microsoft-OutputFormat'] = 'audio-48khz-192kbitrate-mono-mp3'
  const ssml = createSSML(voice, text, rate || 1)
  const endpoint = getAudioEndpoint(region)
  const res = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: ssml,
    signal: AbortSignal.timeout(10000),
  }).catch((e) =>
    Promise.reject(new AzureError('can not fetch audio', { cause: e })),
  )
  if (!res.ok) {
    let reason = ''
    switch (res.status) {
      case 400:
        reason = 'bad request'
        break
      case 401:
        reason = 'unauthorized'
        break
      case 415:
        reason = 'unsupported media type'
        break
      case 429:
        reason = 'too many requests'
        break
      case 502:
        reason = 'bad gateway'
        break
      default:
        reason = 'unknown'
    }
    throw new AzureError(`${res.status}: ${reason}`)
  }
  return await res.arrayBuffer()
}

export default {
  getVoices,
  getAudio,
}
