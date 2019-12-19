/** @format */

import * as React from 'react'
import { shallow, mount } from 'enzyme'

import Menu from '../menu'

describe('Menu', () => {
  let handleClose: (event: React.MouseEvent<any, MouseEvent>) => any

  beforeEach(() => {
    handleClose = jest.fn()
  })

  it('renders a <ul /> element', () => {
    const menu = shallow(<Menu handleClose={handleClose} />)
    expect(menu.find('ul')).toHaveLength(1)
  })

  it('does not render by default', () => {
    const menu = shallow(<Menu handleClose={handleClose} />)
    expect(menu.find('ul').get(0).props.style.display).toEqual('none')
  })

  it('renders when open', () => {
    const menu = mount(<Menu open handleClose={handleClose} />)
    expect(menu.find('ul').get(0).props.style.display).toEqual('block')
  })

  it('passes className prop to element', () => {
    const menu = mount(<Menu className="foo bar" handleClose={handleClose} />)
    expect(menu.find('ul').get(0).props.className).toEqual('foo bar')
  })

  it('passes id prop to element', () => {
    const menu = mount(<Menu id="example_test" handleClose={handleClose} />)
    expect(menu.find('ul').get(0).props.id).toEqual('example_test')
  })

  it('builds <li /> list elements', () => {
    const items = [<a>1</a>, <a>2</a>, <a>3</a>]
    const menu = mount(<Menu open handleClose={handleClose} items={items} />)
    const li = menu.find('ul li')

    expect(li).toHaveLength(3)
    expect(li.get(0).props.onClick).toBe(handleClose)
    expect(li.get(1).props.onClick).toBe(handleClose)
    expect(li.get(2).props.onClick).toBe(handleClose)
  })

  it('<li /> elements close menu when clicked', () => {
    const items = [<a>1</a>, <a>2</a>, <a>3</a>]

    const menu = mount(<Menu open handleClose={handleClose} items={items} />)

    menu
      .find('ul li')
      .at(0)
      .simulate('click', { pageX: 100, pageY: 200 })

    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it.skip('<li /> elements do not close menu when multiple children exist', () => {
    const items = [
      <a>1</a>,
      <a>2</a>,
      <span>
        Sublist
        <ul>
          <li>
            <a>Sub 1</a>
          </li>
        </ul>
      </span>,
    ]

    const menu = mount(<Menu open handleClose={handleClose} items={items} />)

    menu
      .find('ul li')
      .at(2)
      .simulate('click', { pageX: 100, pageY: 200 })

    expect(handleClose).toHaveBeenCalledTimes(0)
  })
})
