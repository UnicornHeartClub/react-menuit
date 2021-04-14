/**
 * Menu Primitive
 *
 * @format
 */

import * as React from 'react'

import { IPoint } from './'

export interface IMenu {
  open?: boolean
  className?: string
  id?: string
  items?: React.ReactNode[]
  position?: IPoint
  handleClose(event: React.MouseEvent<any, MouseEvent>): any
  style?: React.CSSProperties
}

const menuStyle: React.CSSProperties = {
  display: 'block',
  position: 'fixed',
  zIndex: 9999,
}

export default (props: IMenu) => {
  const {
    open = false,
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

  // Memoize the style object
  const ulStyle = React.useMemo<React.CSSProperties>(() => {
    // disregard offset if we are not yet 'block'
    let left = x,
      top = y

    if (open && !!menu.current) {
      const { offsetHeight, offsetWidth } = menu.current
      const bounds = menu.current.getBoundingClientRect()

      // Constrain horizontal
      if (offsetWidth + left >= window.innerWidth) {
        left = window.innerWidth - offsetWidth
      } else if (bounds.left < 0) {
        left = 0
      }

      // Constrain vertical
      if (bounds.height + top >= window.innerHeight) {
        top = window.innerHeight - offsetHeight
      } else if (bounds.top < 0) {
        top = 0
      }
    }

    return {
      ...style,
      ...menuStyle,
      visibility: open ? undefined : 'hidden',
      pointerEvents: open ? undefined : 'none',
      left: `${left}px`,
      top: `${top}px`,
    }
  }, [open, x, y, style])

  // Add <li /> to the children and close the menu when we click something
  const children = items.map((item, i) => (
    <li key={i} onClick={handleClose}>
      {item}
    </li>
  ))

  return (
    <ul className={className} id={id} ref={menu} style={ulStyle}>
      {children}
    </ul>
  )
}
