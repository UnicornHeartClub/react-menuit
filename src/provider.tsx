/**
 * For non-hook needs
 *
 * @format
 */

import useMenu, { IMenuHook } from './hook'

export interface IMenuProvider {
  children(menu: IMenuHook): JSX.Element
}

export default (props: IMenuProvider) => {
  const menu = useMenu([])
  return props.children(menu)
}
