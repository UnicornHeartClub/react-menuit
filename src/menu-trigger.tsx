/**
 * Triggers Menus
 *
 * @format
 */

import * as React from 'react'

import { MenuContext } from './provider'

export interface IMenuitMenuTrigger {
  children?: React.ReactNode
  contextMenu?: string
  holdDuration?: number
  holdMenu?: string
}

export default (props: IMenuitMenuTrigger) => {
  return (
    <MenuContext.Consumer>
      {({ setOpen, setPosition }) => (
        <Trigger {...props} setOpen={setOpen} setPosition={setPosition} />
      )}
    </MenuContext.Consumer>
  )
}

const Trigger = (
  props: IMenuitMenuTrigger & {
    setPosition: (position: { x: number; y: number }) => any
    setOpen: (open?: string) => any
  },
) => {
  const openMenu = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (props.contextMenu) {
        event.preventDefault()

        console.log('event', event.pageX, event.pageY, props.contextMenu)
        props.setOpen(props.contextMenu)
        props.setPosition({ x: event.pageX, y: event.pageY })
      }
    },
    [props.contextMenu],
  )

  return <button onContextMenu={openMenu}>{props.children}</button>
}
