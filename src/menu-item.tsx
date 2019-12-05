/**
 * Menu Item
 *
 * @format
 */

import * as React from 'react'

export interface IMenuitMenuItem {
  children?: React.ReactNode
}

const MenuItem = (props: IMenuitMenuItem) => {
  return <li>{props.children}</li>
}
export default MenuItem
