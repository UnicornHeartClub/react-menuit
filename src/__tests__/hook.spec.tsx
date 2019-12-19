/** @format */

import * as React from 'react'
import { HookResult, renderHook } from '@testing-library/react-hooks'
import { mount, ReactWrapper } from 'enzyme'

import Menu from '../menu'
import useMenu, { IMenuHook } from '../hook'

describe('useMenu', () => {
  let result: HookResult<IMenuHook>

  beforeEach(() => {
    const hook = renderHook(useMenu)
    result = hook.result

    window.addEventListener = jest.fn()
    window.removeEventListener = jest.fn()
  })

  it('exports open state and defaults to "false"', () => {
    expect(result.current.open).not.toBe(undefined)
    expect(result.current.open).toBe(false)
  })

  it('exports items state and defaults to "[]"', () => {
    expect(result.current.items).not.toBe(undefined)
    expect(result.current.items).toStrictEqual([])
  })

  describe('Menu', () => {
    // @FIXME this should be properly typed
    let wrapper: ReactWrapper<any>

    beforeEach(() => {
      const App = () => {
        const menu = useMenu()

        return (
          <div>
            <menu.Menu {...menu.menuProps} className="foo" id="test" />
            <button onClick={menu.handleClick}>Click Me</button>
          </div>
        )
      }
      wrapper = mount(<App />)
    })

    it('exports a Menu component', () => {
      expect(result.current.Menu).not.toBe(undefined)
    })

    it('passes open prop', () => {
      expect(wrapper.find(Menu).prop('open')).not.toBe(undefined)
      expect(wrapper.find(Menu).prop('open')).toBe(false)
    })

    it('passes handleClose prop method', () => {
      expect(wrapper.find(Menu).prop('handleClose')).not.toBe(undefined)
    })

    it('passes items prop', () => {
      expect(wrapper.find(Menu).prop('items')).not.toBe(undefined)
      expect(wrapper.find(Menu).prop('items')).toStrictEqual([])
    })

    it('passes position prop', () => {
      expect(wrapper.find(Menu).prop('position')).not.toBe(undefined)
      expect(wrapper.find(Menu).prop('position')).toStrictEqual({ x: 0, y: 0 })
    })

    it('updates position', () => {
      expect(wrapper.find(Menu)).toHaveLength(1)

      wrapper.find('button').simulate('click', { pageX: 100, pageY: 200 })
      
      expect(wrapper.find(Menu).prop('position')).toEqual({
        x: 100, y: 200,
      })
    })

    it('consumes passed props when mounted', () => {
      expect(wrapper.find(Menu).prop('className')).not.toBe(undefined)
      expect(wrapper.find(Menu).prop('id')).not.toBe(undefined)
      expect(wrapper.find(Menu).prop('className')).toBe('foo')
      expect(wrapper.find(Menu).prop('id')).toBe('test')
    })

    it('does not unmount on hook dependency change', () => {
      const mountContextCalls = (window.addEventListener as jest.Mock).mock.calls.filter(call => call[0] === 'contextmenu')
      expect(mountContextCalls).toHaveLength(1)

      wrapper.find('button').simulate('click')

      // ensure removeEventListener not called, happens if <Menu /> unmounts
      const unmountContextCalls = (window.removeEventListener as jest.Mock).mock.calls.filter(call => call[0] === 'contextmenu')
      expect(unmountContextCalls).toHaveLength(0)
    })
  })

  describe('handleClose', () => {
    it('exports handleClose method', () => {
      expect(result.current.handleClose).not.toBe(undefined)
    })

    it('calls setOpen method and sets to false', () => {})

    it('does not call setOpen when defaultPrevented', () => {})
  })

  describe('handleClick', () => {
    it('exports handleClick method', () => {
      expect(result.current.handleClick).not.toBe(undefined)
    })
    it('calls setItems method with initial items', () => {})

    it('calls setPosition method with event position', () => {})

    it('toggles open using setOpen method', () => {})
  })

  describe('openMenu', () => {
    it('exports openMenu method', () => {
      expect(result.current.openMenu).not.toBe(undefined)
    })

    it('calls setItems method with the passed items', () => {})

    it('calls setPosition method the passed position', () => {})

    it('toggles open using setOpen method', () => {})
  })

  describe('setItems', () => {
    it('exports setItems method', () => {
      expect(result.current.setItems).not.toBe(undefined)
    })

    it('updates the items state', () => {})
  })

  describe('setOpen', () => {
    it('exports setOpen method', () => {
      expect(result.current.setOpen).not.toBe(undefined)
    })

    it('updates the open state', () => {})
  })

  describe('setPosition', () => {
    it('exports setPosition method', () => {
      expect(result.current.setPosition).not.toBe(undefined)
    })
    it('updates the position state', () => {})
  })
})
