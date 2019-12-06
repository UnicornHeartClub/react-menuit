/**
 * For non-hook needs
 *
 * @format
 */

import * as React from 'react'

import useMenu, { IMenuHook } from './hook'

interface IMenuProvider {
  children(menu: IMenuHook): React.ReactNode
}

export default (props: IMenuProvider) => {
  const menu = useMenu([])
  return props.children(menu)
}
