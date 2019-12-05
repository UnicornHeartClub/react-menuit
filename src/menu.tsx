/**
 * Menuit Menu
 *
 * @format
 */

import * as React from 'react'

import { MenuContext } from './provider'

export interface IMenuitMenu {
  className?: string
  children: React.ReactNode
  id: string
}

export default (props: IMenuitMenu) => {
  return (
    <MenuContext.Consumer>
      {({ open, x, y }) => {
        return (
          open === props.id && (
            <ul
              className={props.className}
              id={`menuit__${props.id}`}
              style={{ position: 'fixed', top: y, left: x }}
            >
              {props.children}
            </ul>
          )
        )
      }}
    </MenuContext.Consumer>
  )
}
