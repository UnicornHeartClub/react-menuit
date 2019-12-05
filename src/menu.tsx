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
  children?: React.ReactNode | ((args: IMenuitMenuRenderProps) => React.ReactNode)
  id: string
  style?: CSS.Properties
}

export interface IMenuitMenuRenderProps {
  addItem(id: string, item: React.ReactNode): any
  removeItem(id: string): any
  setOpen(id?: string): any
  setPosition(position: { x: number; y: number }): any
  closeMenu(event?: React.MouseEvent<HTMLDivElement, MouseEvent>): any
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

export default (props: IMenuitMenu) => {
  return (
    <MenuConsumer>
      {menu =>
        typeof props.children === 'function' ? (
          <DynamicMenu {...props} {...menu} />
        ) : (
          <Menu {...props} {...menu} />
        )
      }
    </MenuConsumer>
  )
}

const Menu = (props: IMenuitMenu & IMenuContext) => {
  const {
    open,
    children,
    className,
    id,
    setOpen,
    position: { x, y },
    style,
  } = props

  const menuRef = React.useRef<HTMLUListElement>(null)

  const closeMenu = React.useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault()
    setOpen()
  }, [])

  React.useEffect(
    () => {
      const { innerHeight, innerWidth } = window

      if (menuRef.current) {
        const { width, height } = menuRef.current.getBoundingClientRect()

        const composedWidth = width + x
        const composedHeight = height + y

        if (composedWidth > innerWidth) {
          menuRef.current.style.left = `${innerWidth - width}px`
        }
        if (composedHeight > innerHeight) {
          menuRef.current.style.top = `${innerHeight - height}px`
        }
      }
    },
    [x, y],
  )

  return (
    <>
      {open === id && (
        <>
          <div onContextMenu={closeMenu} onClick={closeMenu} style={dismissStyle} />
          <ul
            ref={menuRef}
            className={className}
            id={`menuit__${id}`}
            style={{ ...menuStyle, ...style, top: y, left: x }}
          >
            {children}
          </ul>
        </>
      )}
    </>
  )
}

const DynamicMenu = (props: IMenuitMenu & IMenuContext) => {
  const {
    open,
    className,
    id,
    setOpen,
    setPosition,
    position: { x, y },
  } = props
  const children = props.children as (args: IMenuitMenuRenderProps) => React.ReactNode

  const closeMenu = React.useCallback((event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event) event.preventDefault()
    setOpen()
  }, [])

  const [items, setItems] = React.useState<{ [key: string]: React.ReactNode }>({})

  const addItem = React.useCallback((id: string, item: React.ReactNode) => {
    setItems({ ...items, [id]: item })
  }, Object.keys(items))

  const removeItem = React.useCallback((id: string) => {
    const nextItems = { ...items }
    delete nextItems[id]
    setItems(nextItems)
  }, Object.keys(items))

  const renderItems = React.useCallback(() => {
    const ids = Object.keys(items)

    return ids.map(id => React.cloneElement(items[id] as React.ReactElement<any>))
  }, Object.keys(items))

  return (
    <>
      {open === id && (
        <>
          <div onContextMenu={closeMenu} onClick={closeMenu} style={dismissStyle} />
          <ul className={className} id={`menuit__${id}`} style={{ ...menuStyle, top: y, left: x }}>
            {renderItems()}
          </ul>
        </>
      )}
      {children({ addItem, setOpen, setPosition, removeItem, closeMenu })}
    </>
  )
}
