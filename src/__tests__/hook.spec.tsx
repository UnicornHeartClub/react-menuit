/** @format */

// import * as React from 'react'
import { HookResult, renderHook } from '@testing-library/react-hooks'

import useMenu, { IMenuHook } from '../hook'

describe('useMenu', () => {
  let result: HookResult<IMenuHook>

  beforeEach(() => {
    const hook = renderHook(useMenu)
    result = hook.result
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
    let componentResult: HookResult<any>

    beforeEach(() => {
      const componentHook = renderHook(result.current.Menu, {
        initialProps: { className: 'foo', id: 'test' },
      })
      componentResult = componentHook.result
    })

    it('exports a Menu component', () => {
      expect(result.current.Menu).not.toBe(undefined)
    })

    it('passes active prop', () => {
      const {
        current: {
          props: { active },
        },
      } = componentResult

      expect(active).not.toBe(undefined)
      expect(active).toBe(false)
    })

    it('passes closeMenu prop method', () => {
      const {
        current: {
          props: { closeMenu },
        },
      } = componentResult

      expect(closeMenu).not.toBe(undefined)
    })

    it('passes items prop', () => {
      const {
        current: {
          props: { items },
        },
      } = componentResult

      expect(items).not.toBe(undefined)
      expect(items).toStrictEqual([])
    })

    it('passes position prop', () => {
      const {
        current: {
          props: { position },
        },
      } = componentResult

      expect(position).not.toBe(undefined)
      expect(position).toStrictEqual({ x: 0, y: 0 })
    })

    it('consumes passed props when mounted', () => {
      const {
        current: {
          props: { className, id },
        },
      } = componentResult

      expect(className).not.toBe(undefined)
      expect(id).not.toBe(undefined)
      expect(className).toBe('foo')
      expect(id).toBe('test')
    })
  })

  describe('closeMenu', () => {
    it('exports closeMenu method', () => {
      expect(result.current.closeMenu).not.toBe(undefined)
    })

    it('calls setOpen method and sets to false', () => {})
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
