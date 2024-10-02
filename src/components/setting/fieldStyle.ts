import { css } from '~styled-system/css'

export default css({
  borderStyle: 'solid',
  borderWidth: 'thin',
  rounded: 'sm',
  p: '1',
  _focusWithin: {
    outlineColor: 'blue.600',
    outlineStyle: 'solid',
    outlineWidth: 'medium',
    outlineOffset: '0.5',
  },
})
