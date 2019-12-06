/** @format */

import * as React from 'react'
import Head from 'next/head'
import * as CSS from 'csstype'

import { useMenu } from '../../'

/**
 * Test Component
 */
export default () => {
  const action1 = React.useCallback(() => console.log('Action 1'), [])
  const action2 = React.useCallback(() => console.log('Action 2'), [])
  const action3 = React.useCallback(() => console.log('Action 3'), [])

  const { Menu, handleClick, openMenu } = useMenu([
    <a href="#" onClick={action1}>
      Action 1
    </a>,
    <a href="#" onClick={action2}>
      Action 2
    </a>,
    <a href="#" onClick={action3}>
      Action 3
    </a>,
  ])

  return (
    <>
      <Head>
        <title>Menuit Examples</title>
      </Head>

      <Menu />

      <header>
        <h1>Menuit Examples</h1>
        <p>Use the buttons above the test the functionality of menuit</p>
      </header>

      <section>
        <button onContextMenu={handleClick}>Right-click to open</button>

        <button
          onContextMenu={e => {
            e.preventDefault()

            openMenu(
              [
                <a href="#" onClick={action1}>
                  Custom 1
                </a>,
                <a href="#" onClick={action2}>
                  Custom 2
                </a>,
                <a href="#" onClick={action3}>
                  Custom 3
                </a>,
              ],
              { x: e.pageX, y: e.pageY },
            )
          }}
        >
          Right-click to open custom menu
        </button>
      </section>
    </>
  )
}
