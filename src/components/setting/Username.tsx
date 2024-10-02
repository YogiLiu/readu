import { Component, createMemo, createResource, Show, Suspense } from 'solid-js'
import qidian from '~/services/qidian'
import { styled } from '~styled-system/jsx'
import { css } from '~styled-system/css'
import { QiDianError } from '~/services/qidian/error'
import PhSpinnerGapBold from '~icons/ph/spinner-gap-bold'
import PhSealCheckFill from '~icons/ph/seal-check-fill'
import PhSealWarningFill from '~icons/ph/seal-warning-fill'
import { Dynamic } from 'solid-js/web'

type Props = {
  cookie: string
}

const Username: Component<Props> = (props) => {
  const [data] = createResource(
    () => props.cookie,
    (cookie) =>
      qidian
        .getUserInfo(cookie)
        .then(({ username }) => ({ error: null, username }))
        .catch((e) => {
          let error = '未知错误'
          if (e instanceof Error && e.name === QiDianError.name) {
            error = e.message
          }
          return { error, username: null }
        }),
  )
  return (
    <styled.div
      fontSize={'sm'}
      fontWeight={'light'}
      display={'flex'}
      alignItems={'center'}
      height={'6'}
    >
      <Suspense
        fallback={<PhSpinnerGapBold class={css({ animation: 'spin' })} />}
      >
        <Show when={data()?.error}>
          <Message error={true} message={data()!.error!} />
        </Show>
        <Show when={data()?.username}>
          <Message error={false} message={data()!.username!} />
        </Show>
      </Suspense>
    </styled.div>
  )
}

export default Username

const successColor = css({ color: 'green.700' })
const errorColor = css({ color: 'red.700' })
const italic = css({ fontStyle: 'italic' })

const Message: Component<{ error: boolean; message: string }> = (props) => {
  const icon = createMemo(() =>
    props.error ? PhSealWarningFill : PhSealCheckFill,
  )
  const color = createMemo(() => (props.error ? errorColor : successColor))
  const fontStyle = createMemo(() => (props.error ? italic : ''))
  return (
    <>
      <Dynamic component={icon()} class={color()} />
      <styled.span marginLeft={'1'} class={fontStyle()}>
        {props.message}
      </styled.span>
    </>
  )
}
