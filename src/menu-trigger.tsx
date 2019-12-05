/**
 * Triggers Menus
 *
 * @format
 */

import * as React from 'react'

import { MenuConsumer, IMenuContext } from './provider'

export interface IMenuitMenuTrigger {
  children?: React.ReactNode
  contextMenu?: string
  holdDuration?: number
  holdMenu?: string

  // Alignment
  bottom?: boolean
  right?: boolean
}

export default (props: IMenuitMenuTrigger) => {
  return (
    <MenuConsumer>
      {({ setOpen, setPosition }) => (
        <Trigger {...props} setOpen={setOpen} setPosition={setPosition} />
      )}
    </MenuConsumer>
  )
}

const Trigger = (props: IMenuitMenuTrigger & Partial<IMenuContext>) => {
  const openMenu = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (props.contextMenu) {
        event.preventDefault()

        props.setOpen(props.contextMenu)
        props.setPosition({ x: event.pageX, y: event.pageY })
      }
    },
    [props.contextMenu],
  )

  return <button onContextMenu={openMenu}>{props.children}</button>
}
