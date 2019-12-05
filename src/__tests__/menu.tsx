/** @format */

import * as React from 'react'
import { mount } from 'enzyme'

import Menu from '../menu'
import MenuItem from '../menu-item'
import MenuTrigger from '../menu-trigger'
import MenuProvider from '../provider'

describe('Menu', () => {
  it('is not rendered by default', () => {
    const wrapper = mount(
      <Menu id="foo-1">
        <MenuItem>Example Item</MenuItem>
      </Menu>,
    )

    expect(wrapper.find('ul')).toHaveLength(0)
  })

  it('passes className to parent element', () => {
    const wrapper = mount(
      <MenuProvider>
        <Menu className="foo bar" id="foo-1">
          <MenuItem>Example Item</MenuItem>
        </Menu>

        <MenuTrigger contextMenu="foo-1">Open</MenuTrigger>
      </MenuProvider>,
    )

    wrapper.find('button').simulate('contextmenu')

    expect(wrapper.find('ul')).toHaveLength(1)
    expect(wrapper.find('ul').hasClass('foo bar')).toEqual(true)
  })

  it('passes id to parent element', () => {
    const wrapper = mount(
      <MenuProvider>
        <Menu id="foo-1">
          <MenuItem>Example Item</MenuItem>
        </Menu>

        <MenuTrigger contextMenu="foo-1">Open</MenuTrigger>
      </MenuProvider>,
    )

    wrapper.find('button').simulate('contextmenu')

    expect(wrapper.find('ul').is('#menuit__foo-1')).toEqual(true)
  })

  it('renders children items', () => {
    const wrapper = mount(
      <MenuProvider>
        <Menu id="foo-1">
          <MenuItem>Example Item</MenuItem>
          <MenuItem>Example Item 2</MenuItem>
          <MenuItem>Example Item 3</MenuItem>
        </Menu>

        <MenuTrigger contextMenu="foo-1">Open</MenuTrigger>
      </MenuProvider>,
    )

    wrapper.find('button').simulate('contextmenu')

    const children = wrapper.find('ul li')
    expect(children).toHaveLength(3)
    expect(children.at(0).text()).toEqual('Example Item')
    expect(children.at(1).text()).toEqual('Example Item 2')
    expect(children.at(2).text()).toEqual('Example Item 3')
  })
})
