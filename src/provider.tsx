/**
 * Initializes a context provider and exposes a consumer for our <Menu /> components to use
 *
 * @format
 */

import * as React from 'react'

/**
 * Menu Context
 */
export interface IMenuContext {
  open?: string
  setOpen: any
  setPosition: any
  x: number
  y: number
}

export const MenuContext = React.createContext<IMenuContext>({
  open: undefined,
  setOpen: () => {},
  setPosition: () => {},
  x: 0,
  y: 0,
})

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
  const [{ x, y }, setPosition] = React.useState<{ x: number; y: number }>({ x: 0, y: 0 })

  return (
    <MenuContext.Provider value={{ open, setOpen, setPosition, x, y }}>
      {props.children}
    </MenuContext.Provider>
  )
}
