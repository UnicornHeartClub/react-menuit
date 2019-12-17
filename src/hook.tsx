/**
 * useMenu hook
 *
 * @format
 */

import * as React from 'react'

import Menu, { IMenu } from './menu'
import { IPoint } from './'

/**
 * Menu Hook
 */

export interface IMenuHook {
  Menu(props: Partial<IMenu>): React.ReactComponentElement<any>
  handleClick(event: React.MouseEvent<any, MouseEvent>): any
  handleClose(event: React.MouseEvent<any, MouseEvent>): any
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
   * Force open the menu and update the position
   */
  const openMenu = React.useCallback((items: React.ReactNode[], position: IPoint) => {
    setItems(items)
    setPosition(position)
    setOpen(true)
  }, [])

  /**
   * Open and position the menu automatically
   */
  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault()
      openMenu(initialItems, { x: event.pageX, y: event.pageY })
    },
    [],
  )

  /**
   * Force close the menu
   */
  const handleClose = React.useCallback((event: React.MouseEvent<any, MouseEvent>) => {
    if (!event.defaultPrevented) {
      event.preventDefault()
      setOpen(false)
    }
  }, [])

  /**
   * <Menu /> component
   * Used to render the menu items
   */
  const HookMenu = React.useCallback(
    (props: Partial<IMenu>) => (
      <Menu {...props} active={open} items={items} position={position} handleClose={handleClose} />
    ),
    [open, position.x, position.y],
  )

  return {
    Menu: HookMenu,
    handleClick,
    handleClose,
    items,
    open,
    openMenu,
    setItems,
    setOpen,
    setPosition,
  }
}
