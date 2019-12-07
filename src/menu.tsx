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
  className?: string
  closeMenu(): any
  id?: string
  items: React.ReactNode[]
  position: IPoint
  style?: CSS.Properties
}

const menuStyle: CSS.Properties = {
  display: 'none',
  position: 'fixed',
  zIndex: 9999,
}

const bgStyle: CSS.Properties = {
  bottom: 0,
  display: 'none',
  left: 0,
  position: 'fixed',
  right: 0,
  top: 0,
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

  const menu = React.useRef<HTMLUListElement>(null)
  const bg = React.useRef<HTMLDivElement>(null)

  // Add <li /> to the children and close the menu when we click something
  const children = items.map((item, i) => (
    <li key={i} onClick={closeMenu}>
      {item}
    </li>
  ))

  // Update the position of the menu
  React.useEffect(
    () => {
      if (bg.current) {
        bg.current.style.display = active ? 'block' : 'none'
      }
      if (menu.current) {
        menu.current.style.top = `${y}px`
        menu.current.style.left = `${x}px`
        menu.current.style.display = active ? 'block' : 'none'
      }
    },
    [x, y],
  )

  const contextCloseMenu = React.useCallback((event: React.MouseEvent<any, MouseEvent>) => {
    event.preventDefault()
    closeMenu()
  }, [])

  return (
    <>
      <div onClick={contextCloseMenu} onContextMenu={contextCloseMenu} ref={bg} style={bgStyle} />
      <ul className={className} id={id} ref={menu} style={{ ...style, ...menuStyle }}>
        {children}
      </ul>
    </>
  )
}
