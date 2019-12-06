/**
 * Menu Primitive
 *
 * @format
 */

import * as React from 'react'
import * as CSS from 'csstype'

import { IPoint } from './'

export interface IMenu {
  active: boolean
  items: React.ReactNode[]
  style?: CSS.Properties
  position: IPoint
}

const menuStyle: CSS.Properties = {
  position: 'fixed',
  zIndex: 999,
}

export default (props: IMenu) => {
  const {
    active = false,
    items,
    style = {},
    position: { x, y },
  } = props

  /**
   * Menu Reference
   */
  const ref = React.useRef<HTMLUListElement>(null)

  const children = items.map((item, i) => <li key={i}>{item}</li>)

  React.useEffect(
    () => {
      if (ref.current) {
        ref.current.style.top = `${y}px`
        ref.current.style.left = `${x}px`
      }
    },
    [x, y],
  )

  return active ? (
    <>
      <ul ref={ref} style={{ ...style, ...menuStyle }}>
        {children}
      </ul>
    </>
  ) : null
}
