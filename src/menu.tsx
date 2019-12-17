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
  id?: string
  items: React.ReactNode[]
  position: IPoint
  handleClose(event: React.MouseEvent<any, MouseEvent>): any
  style?: CSS.Properties
}

const menuStyle: CSS.Properties = {
  display: 'none',
  position: 'fixed',
  zIndex: 9999,
}

export default (props: IMenu) => {
  const {
    active = false,
    className,
    id,
    items = [],
    position = { x: 0, y: 0 },
    handleClose,
    style = {},
  } = props
  const { x, y } = position

  const menu = React.useRef<HTMLUListElement>(null)

  // Setup a listener to determine if we should exit or bubble a right-click
  React.useEffect(() => {
    const contextMenu = (handleClose as unknown) as (event: MouseEvent) => any
    window.addEventListener('contextmenu', contextMenu)
    return () => {
      window.removeEventListener('contextmenu', contextMenu)
    }
  }, [])

  // Add <li /> to the children and close the menu when we click something
  const children = items.map((item, i) => (
    <li key={i} onClick={handleClose}>
      {item}
    </li>
  ))

  // Update the position of the menu
  React.useEffect(
    () => {
      if (menu.current) {
        menu.current.style.top = `${y}px`
        menu.current.style.left = `${x}px`
        menu.current.style.display = active ? 'block' : 'none'
      }
    },
    [x, y],
  )

  return (
    <ul className={className} id={id} ref={menu} style={{ ...style, ...menuStyle }}>
      {children}
    </ul>
  )
}
