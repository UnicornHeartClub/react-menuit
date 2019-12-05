/**
 * Initializes a context provider and exposes a consumer for our <Menu /> components to use
 *
 * @format
 */

import * as React from 'react'

export interface IPoint {
  x: number
  y: number
}

/**
 * Menu Context
 */
export interface IMenuContext {
  open?: string
  position: { x: number; y: number }
  setOpen: any
  setPosition: any
}

const defaultState: IMenuContext = {
  open: undefined,
  position: { x: 0, y: 0 },
  setOpen: () => {},
  setPosition: () => {},
}
const MenuContext = React.createContext<IMenuContext>(defaultState)

export const MenuConsumer = MenuContext.Consumer

/**
 * Menu Provider Props
 */
export interface IMenuProvider {
  children?: React.ReactNode
}

/**
 * Menu Provider
 */
export default (props: IMenuProvider) => {
  const [open, setOpen] = React.useState<string | undefined>(undefined)
  const [position, setPosition] = React.useState<IPoint>(defaultState.position)

  return (
    <MenuContext.Provider value={{ open, setOpen, setPosition, position }}>
      {props.children}
    </MenuContext.Provider>
  )
}
