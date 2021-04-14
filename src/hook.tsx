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
  menuProps: IMenu
  open: boolean
  openMenu(items: React.ReactNode[], position: IPoint): any
  setItems(items: React.ReactNode[]): any
  setOpen(open: boolean): any
  setPosition(position: IPoint): any
}

interface IMenuState {
  open: boolean
  position: IPoint
}

function menuStateReducer(state: IMenuState, action: Partial<IMenuState>): IMenuState {
  return {
    position: action.position ?? state.position,
    open: action.open ?? state.open,
  }
}

export default (initialItems: React.ReactNode[] = []): IMenuHook => {
  /**
   * Menu Items
   */
  const [items, setItems] = React.useState<React.ReactNode[]>(initialItems)

  /**
   * Menu state
   */
  const [{ open, position }, updateMenuState] = React.useReducer(menuStateReducer, {
    open: false,
    position: { x: 0, y: 0 },
  })

  const setOpen = React.useCallback(
    (open: boolean) => {
      updateMenuState({ open })
    },
    [updateMenuState],
  )
  const setPosition = React.useCallback(
    (position: IPoint) => {
      updateMenuState({ position })
    },
    [updateMenuState],
  )

  /**
   * Force open the menu and update the position
   */
  const openMenu = React.useCallback((items: React.ReactNode[], position: IPoint) => {
    setItems(items)
    updateMenuState({
      open: true,
      position,
    })
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
  const handleClose = React.useCallback(
    (event: React.MouseEvent<any, MouseEvent>) => {
      if (!event.defaultPrevented && open) {
        event.preventDefault()
        setOpen(false)
      }
    },
    [open],
  )

  const menuProps = React.useMemo(
    () => ({
      position,
      items,
      open,
      handleClose,
    }),
    [position, items, open],
  )

  return {
    Menu,
    menuProps,
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
