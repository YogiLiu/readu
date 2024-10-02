import { createMemo, ParentComponent } from 'solid-js'
import { styled } from '~styled-system/jsx'
import { css } from '~styled-system/css'

type Props = {
  visible: boolean
}

const none = css({
  display: 'none',
})
const block = css({
  display: 'block',
})

const Detail: ParentComponent<Props> = (props) => {
  const display = createMemo(() => (props.visible ? block : none))
  return (
    <styled.div
      position={'absolute'}
      top={'0'}
      left={'0'}
      width={'full'}
      height={'screen'}
      backgroundColor={'Background'}
      class={display()}
    >
      <styled.div
        fontSize={'sm'}
        padding={'2'}
        display={'flex'}
        justifyContent={'right'}
      >
        {props.children}
      </styled.div>
    </styled.div>
  )
}

export default Detail
