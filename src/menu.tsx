/**
 * Menu Primitive
 *
 * @format
 */

import * as React from 'react'
import * as CSS from 'csstype'

import { IPoint } from './'

export interface IMenu {
  active?: boolean
  className?: string
  closeMenu?(): any
  id?: string
  items?: React.ReactNode[]
  position?: IPoint
  style?: CSS.Properties
}

const menuStyle: CSS.Properties = {
  position: 'fixed',
  zIndex: 9999,
}

const bgStyle: CSS.Properties = {
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 9998,
}

export default (props: IMenu) => {
  const {
    active = false,
    className,
    closeMenu,
    id,
    items = [],
    position = { x: 0, y: 0 },
    style = {},
  } = props
  const { x, y } = position

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
      <div onClick={closeMenu} onContextMenu={closeMenu} style={bgStyle} />
      <ul className={className} id={id} ref={ref} style={{ ...style, ...menuStyle }}>
        {children}
      </ul>
    </>
  ) : null
}
