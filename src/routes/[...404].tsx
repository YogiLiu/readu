import { HttpStatusCode } from '@solidjs/start'
import { Component, createSignal, onCleanup, onMount, Show } from 'solid-js'
import { styled } from '~styled-system/jsx'
import { useNavigate } from '@solidjs/router'

const DEFAULT_COUNTDOWN = 5

const NotFound: Component = () => {
  const [countdown, setCountdown] = createSignal(DEFAULT_COUNTDOWN)
  const navigate = useNavigate()
  onMount(() => {
    const to = setTimeout(() => {
      navigate('/')
    }, DEFAULT_COUNTDOWN * 1000)
    const itv = setInterval(() => {
      if (!countdown()) {
        clearInterval(itv)
        return
      }
      setCountdown((v) => v - 1)
    }, 1000)
    onCleanup(() => {
      clearInterval(itv)
      clearTimeout(to)
    })
  })
  return (
    <styled.main
      h={'screen'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      flexDirection={'column'}
      rowGap={'1'}
      padding={'2'}
    >
      <HttpStatusCode code={404} />
      <styled.h1 fontSize={'lg'} fontWeight={'bold'}>
        页面找不到啦！
      </styled.h1>
      <styled.div fontSize={'sm'} color={'zinc.600'}>
        <Show when={countdown()} fallback={'正在返回首页。'}>
          {countdown()} 秒后返回首页。
        </Show>
      </styled.div>
    </styled.main>
  )
}

export default NotFound
