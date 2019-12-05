/** @format */

import * as React from 'react'
import { mount, ReactWrapper } from 'enzyme'

import MenuProvider, { MenuConsumer, IMenuContext } from '../provider'

describe('MenuProvider', () => {
  let wrapper: ReactWrapper
  let InnerComponent: React.SFC
  let ConsumerComponent

  beforeEach(() => {
    InnerComponent = () => (
      <div>
        <h1>Sweet child</h1>
        <h2>of mine</h2>
      </div>
    )

    ConsumerComponent = (_props: IMenuContext) => <span />

    wrapper = mount(
      <MenuProvider>
        <InnerComponent />
        <MenuConsumer>{menu => <ConsumerComponent {...menu} />}</MenuConsumer>
      </MenuProvider>,
    )
  })

  it('creates a context provider', () => {
    expect(wrapper.find(MenuProvider)).toHaveLength(1)
  })

  it('renders arbitrary children', () => {
    expect(wrapper.find(InnerComponent)).toHaveLength(1)
    expect(wrapper.find(ConsumerComponent)).toHaveLength(1)
    expect(wrapper.find('div')).toHaveLength(1)
    expect(wrapper.find('h1')).toHaveLength(1)
    expect(wrapper.find('h2')).toHaveLength(1)
    expect(wrapper.find('span')).toHaveLength(1)
  })
})
