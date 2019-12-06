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
  handleClick(event: React.MouseEvent<any, MouseEvent>): any
  openMenu(items: React.ReactNode[], position: IPoint): any
  closeMenu(): any
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

  const closeMenu = React.useCallback(() => setOpen(false), [])

  const HookMenu = React.useCallback(
    () => <Menu active={open} items={items} position={position} />,
    [open],
  )

  return { Menu: HookMenu, handleClick, openMenu, closeMenu }
}