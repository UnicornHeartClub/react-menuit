/** @format */

import { useMenu, MenuProvider, Menu } from '../'

import BaseMenuProvider from '../provider'
import BaseMenu from '../menu'
import baseUseMenu from '../hook'

describe('react-menuit', () => {
  it('exports "useMenu" hook', () => {
    expect(useMenu).toBe(baseUseMenu)
  })

  it('exports "MenuProvider"', () => {
    expect(MenuProvider).toBe(BaseMenuProvider)
  })

  it('exports "Menu"', () => {
    expect(Menu).toBe(BaseMenu)
  })
})
