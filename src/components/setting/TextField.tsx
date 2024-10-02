import {
  Component,
  createMemo,
  createSignal,
  createUniqueId,
  JSX,
  Show,
} from 'solid-js'
import { styled } from '~styled-system/jsx'
import fieldStyle from '~/components/setting/fieldStyle'
import PhEye from '~icons/ph/eye'
import PhEyeClosed from '~icons/ph/eye-closed'

type Props = {
  title: string
  defaultValue?: string
  isSecret?: boolean
  onChange?: (value: string) => void
  extra?: JSX.Element
}

const TextField: Component<Props> = (props) => {
  const [visible, setVisible] = createSignal(false)
  const type = createMemo(() =>
    props.isSecret && !visible() ? 'password' : 'text',
  )
  const handleChange: JSX.ChangeEventHandler<HTMLInputElement, Event> = (e) => {
    const value = e.currentTarget.value
    props.onChange?.(value)
  }
  const handleClick = () => {
    setVisible((v) => !v)
  }
  const id = createUniqueId()
  return (
    <styled.div display={'flex'} flexDirection={'column'} rowGap={'2'}>
      <styled.label for={id} fontWeight={'bold'}>
        {props.title}
      </styled.label>
      <styled.div class={fieldStyle} display={'flex'}>
        <styled.input
          id={id}
          onChange={handleChange}
          type={type()}
          value={props.defaultValue}
          outline={'none'}
          flex={'1'}
          data-bwignore={true}
        />
        <Show when={props.isSecret}>
          <styled.button
            onClick={handleClick}
            h={'6'}
            marginLeft={'1'}
            cursor={'pointer'}
          >
            <Show when={visible()} fallback={<PhEye />}>
              <PhEyeClosed />
            </Show>
          </styled.button>
        </Show>
      </styled.div>
      {props.extra}
    </styled.div>
  )
}

export default TextField
