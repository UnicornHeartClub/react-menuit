/** @format */

import * as React from 'react'
import { mount, ReactWrapper } from 'enzyme'

import Menu from '../menu'
import MenuItem from '../menu-item'
import MenuTrigger from '../menu-trigger'

describe('MenuTrigger', () => {
  let wrapper: ReactWrapper

  beforeEach(() => {
    wrapper = mount(
      <>
        <Menu className="foo bar" id="foo-1">
          <MenuItem>Example Item</MenuItem>
        </Menu>

        <MenuTrigger contextMenu="foo-1">Open Menu</MenuTrigger>
      </>,
    )

    jest.useFakeTimers()
  })

  it('renders children in a button element', () => {
    const button = wrapper.find('button')
    expect(button).toHaveLength(1)
    expect(button.text()).toEqual('Open Menu')
  })

  it('toggles a menu open when passed contextMenu', () => {
    wrapper.find('button').simulate('click')

    // check that menu is open
  })
})
