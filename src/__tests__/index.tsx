/** @format */

import { Menu, MenuItem } from '../'

describe('Menuit', () => {
  it('re-exports <Menu /> component', () => {
    expect(Menu).not.toBeUndefined()
  })

  it('re-exports <MenuItem /> component', () => {
    expect(MenuItem).not.toBeUndefined()
  })
})
