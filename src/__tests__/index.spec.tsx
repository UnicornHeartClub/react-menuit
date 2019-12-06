/** @format */

import { useMenu, MenuProvider } from '../'

import BaseMenuProvider from '../provider'
import baseUseMenu from '../hook'

describe('react-menuit', () => {
  it('exports "useMenu" hook', () => {
    expect(useMenu).toBe(baseUseMenu)
  })

  it('exports "MenuProvider"', () => {
    expect(MenuProvider).toBe(BaseMenuProvider)
  })
})
