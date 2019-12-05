/**
 * Menuit Menu
 *
 * @format
 */

import * as React from 'react'
import * as CSS from 'csstype'

import { MenuConsumer, IMenuContext } from './provider'

export interface IMenuitMenu {
  className?: string
  children: React.ReactNode
  id: string
}

const dismissStyle: CSS.Properties = {
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
}

const menuStyle: CSS.Properties = {
  position: 'fixed',
  zIndex: 999,
}

export default (props: IMenuitMenu) => (
  <MenuConsumer>
    {({ setOpen, open, x, y }) =>
      open === props.id && <Menu {...props} setOpen={setOpen} x={x} y={y} />
    }
  </MenuConsumer>
)

const Menu = (props: IMenuitMenu & Partial<IMenuContext>) => {
  const { children, className, id, setOpen, x, y } = props

  const closeMenu = React.useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault()
    setOpen()
  }, [])

  return (
    <>
      <div onContextMenu={closeMenu} onClick={closeMenu} style={dismissStyle} />
      <ul className={className} id={`menuit__${id}`} style={{ ...menuStyle, top: y, left: x }}>
        {children}
      </ul>
    </>
  )
}
