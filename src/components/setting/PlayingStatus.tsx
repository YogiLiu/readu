import { Component, Index, JSX } from 'solid-js'
import { styled } from '~styled-system/jsx'

const rectAttr: JSX.RectSVGAttributes<SVGRectElement> = {
  rx: 0.5,
  ry: 0.5,
  width: 3,
  height: 13,
}
const animAttr: JSX.AnimateSVGAttributes<SVGAnimateElement> = {
  attributeName: 'y',
  dur: '1s',
  repeatCount: 'indefinite',
}
const animValues: [number, string][] = [
  [0, '0; 13; 0'],
  [5, '6.5; 13; 6.5; 0; 6.5'],
  [10, '13; 0; 13'],
]

const PlayingStatus: Component = () => {
  return (
    <styled.svg
      width={'1.2em'}
      height={'1.2em'}
      viewBox={'0 0 13 13'}
      xmlns={'http://www.w3.org/2000/svg'}
      fill={'currentcolor'}
    >
      <Index each={animValues}>
        {(value) => (
          <rect {...rectAttr} x={value()[0]}>
            <animate {...animAttr} values={value()[1]} />
          </rect>
        )}
      </Index>
    </styled.svg>
  )
}

export default PlayingStatus
