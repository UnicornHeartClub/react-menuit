/** @format */

import * as React from 'react'
import Head from 'next/head'

import '../styles.scss'

import { useMenu } from '../../'

/**
 * Test Component
 */
export default () => {
  const action1 = React.useCallback(() => console.log('Action 1'), [])
  const action2 = React.useCallback(() => console.log('Action 2'), [])
  const action3 = React.useCallback(() => console.log('Action 3'), [])

  const { Menu, handleClick, openMenu, handleClose, menuProps } = useMenu([
    <a href="#" onClick={action1}>
      Action 1
    </a>,
    <a href="#" onClick={action2}>
      Action 2
    </a>,
    <span>
      Action 3
      <ul className="menu">
        <li>
          <a href="#" onClick={action1}>
            Sub Action 1
          </a>
        </li>
        <li>
          <a href="#" onClick={action2}>
            Sub Action 2
          </a>
        </li>
        <li>
          <a href="#" onClick={action3}>
            Sub Action 3
          </a>
        </li>
      </ul>
    </span>,
    <a href="#" onClick={action3}>
      Action 4
    </a>,
  ])

  return (
    <div onClick={handleClose} id="app">
      <Head>
        <title>Menuit Examples</title>
      </Head>

      <Menu {...menuProps} className="menu" />

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
    </div>
  )
}
