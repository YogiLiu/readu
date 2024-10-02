import {
  ParentComponent,
  createMemo,
  createSignal,
  JSX,
  onMount,
  onCleanup,
} from 'solid-js'
import PhGear from '~icons/ph/gear'
import PhList from '~icons/ph/list'
import { A } from '@solidjs/router'
import { styled } from '~styled-system/jsx'
import { Dynamic, Portal } from 'solid-js/web'
import { css } from '~styled-system/css'
import PhX from '~icons/ph/x'

const none = css({
  display: 'none',
})
const flex = css({
  display: 'flex',
})

const HomeMenu: ParentComponent = (props) => {
  const [visible, setVisible] = createSignal(false)
  const display = createMemo(() => (visible() ? flex : none))
  const [pos, setPos] = createSignal<JSX.CSSProperties>({})
  let btnEl: HTMLButtonElement
  const handlePos = () => {
    const rect = btnEl.getBoundingClientRect()
    setPos({
      right: `${document.body.clientWidth - rect.right}px`,
      top: `${rect.bottom}px`,
    })
  }
  onMount(() => {
    handlePos()
    window.addEventListener('resize', handlePos)
    onCleanup(() => window.removeEventListener('resize', handlePos))
  })
  const close = () => {
    setVisible(false)
    document.removeEventListener('click', close)
  }
  const icon = createMemo(() => (visible() ? PhX : PhList))
  const handleClick = () => {
    setVisible(true)
    document.addEventListener('click', close)
  }
  return (
    <>
      <styled.button ref={btnEl!} onClick={handleClick} cursor={'pointer'}>
        <Dynamic component={icon()} />
      </styled.button>
      <Portal>
        <styled.div
          position={'absolute'}
          style={pos()}
          flexDirection={'column'}
          rowGap={'2'}
          padding={'4'}
          fontSize={'md'}
          rounded={'sm'}
          borderStyle={'solid'}
          borderWidth={'thin'}
          shadow={'sm'}
          class={display()}
        >
          {props.children}
          <A
            href={'/settings'}
            class={css({
              display: 'flex',
              alignItems: 'center',
              columnGap: '2',
            })}
          >
            <PhGear />
            <styled.span>设置</styled.span>
          </A>
        </styled.div>
      </Portal>
    </>
  )
}

export default HomeMenu
