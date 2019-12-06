/**
 * useMenu hook
 *
 * @format
 */

import * as React from 'react'

import Menu from './menu'
import { IPoint } from './'

/**
 * Menu Hook
 */

export interface IMenuHook {
  Menu(): React.ReactComponentElement<any>
  closeMenu(event?: React.MouseEvent<any, MouseEvent>): any
  handleClick(event: React.MouseEvent<any, MouseEvent>): any
  items: React.ReactNode[]
  open: boolean
  openMenu(items: React.ReactNode[], position: IPoint): any
  setItems(items: React.ReactNode[]): any
  setOpen(open: boolean): any
  setPosition(position: IPoint): any
}

export default (initialItems: React.ReactNode[] = []): IMenuHook => {
  /**
   * Menu Items
   */
  const [items, setItems] = React.useState<React.ReactNode[]>(initialItems)

  /**
   * Menu Open
   */
  const [open, setOpen] = React.useState<boolean>(false)

  /**
   * Menu Position
   */
  const [position, setPosition] = React.useState<IPoint>({ x: 0, y: 0 })

  /**
   * Open and position the menu automatically
   */
  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault()

      setItems(initialItems)
      setPosition({ x: event.pageX, y: event.pageY })
      setOpen(!open)
    },
    [open],
  )

  const openMenu = React.useCallback(
    (items: React.ReactNode[], position: IPoint) => {
      setItems(items)
      setPosition(position)
      setOpen(!open)
    },
    [open],
  )

  const closeMenu = React.useCallback((event?: React.MouseEvent<any, MouseEvent>) => {
    if (event) event.preventDefault()
    setOpen(false)
  }, [])

  const HookMenu = React.useCallback(
    () => <Menu active={open} closeMenu={closeMenu} items={items} position={position} />,
    [open],
  )

  return {
    Menu: HookMenu,
    closeMenu,
    handleClick,
    items,
    open,
    openMenu,
    setItems,
    setOpen,
    setPosition,
  }
}
