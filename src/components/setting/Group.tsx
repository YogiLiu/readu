import { ParentComponent } from 'solid-js'
import { styled } from '~styled-system/jsx'

type Props = {
  title: string
}

const Group: ParentComponent<Props> = (props) => {
  return (
    <styled.div>
      <styled.div marginBottom={'3'} fontSize={'sm'} fontWeight={'light'}>
        {props.title}
      </styled.div>
      <styled.div display={'flex'} flexDirection={'column'} rowGap={'3'}>
        {props.children}
      </styled.div>
    </styled.div>
  )
}

export default Group
