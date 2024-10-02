import { Component, createSignal, Show } from 'solid-js'
import { styled } from '~styled-system/jsx'
import { clientOnly } from '@solidjs/start'
import HomeMenu from '~/components/HomeMenu'
import PhArrowsClockwise from '~icons/ph/arrows-clockwise'

const UserAvatar = clientOnly(() => import('~/components/UserAvatar'))
const Bookcase = clientOnly(() => import('~/components/Bookcase'))

const Home: Component = () => {
  const [trigger, setTrigger] = createSignal(1)
  const handleClick = () => {
    setTrigger((v) => v + 1)
  }
  return (
    <>
      <styled.div
        padding={'2'}
        paddingY={'6'}
        height={'16'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <styled.div>
          <Show when={trigger()} keyed={true}>
            {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
            {(_) => <UserAvatar />}
          </Show>
        </styled.div>
        <HomeMenu>
          <styled.button
            display={'flex'}
            columnGap={'2'}
            alignItems={'center'}
            onClick={handleClick}
            cursor={'pointer'}
          >
            <PhArrowsClockwise />
            <styled.span>刷新</styled.span>
          </styled.button>
        </HomeMenu>
      </styled.div>
      <Show when={trigger()} keyed={true}>
        {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
        {(_) => <Bookcase />}
      </Show>
    </>
  )
}

export default Home
