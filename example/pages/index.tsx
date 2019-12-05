/** @format */

import * as React from 'react'
import Head from 'next/head'

import { MenuConsumer, MenuProvider, Menu, MenuItem, MenuTrigger } from '../../'

export default () => (
  <>
    <Head>
      <title>Menuit Examples</title>
    </Head>
    <MenuProvider>
      <Menu id="example-1">
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
        <MenuItem>Item 3</MenuItem>
        <MenuItem>Item 4</MenuItem>
      </Menu>

      <Menu id="example-2">
        <MenuItem>Save as</MenuItem>
        <MenuItem>Save as copy</MenuItem>
        <MenuItem>Delete</MenuItem>
      </Menu>

      <header>
        <h1>Menuit Examples</h1>
        <p>Use the buttons above the test the functionality of menuit</p>
      </header>

      <section>
        <MenuTrigger contextMenu="example-1">Right-click to open</MenuTrigger>
        <MenuTrigger contextMenu="example-2">Options</MenuTrigger>
      </section>

      <section>
        <MenuConsumer>
          {({ setOpen, setPosition }) => (
            <p>
              Optionally, you can also{' '}
              <a
                href="#"
                onClick={e => {
                  e.preventDefault()
                  setOpen('example-1')
                  setPosition({ x: e.pageX, y: e.pageY })
                }}
                onContextMenu={e => {
                  e.preventDefault()
                  setOpen('example-1')
                  setPosition({ x: e.pageX, y: e.pageY })
                }}
              >
                open menus programatically
              </a>
              .
            </p>
          )}
        </MenuConsumer>
      </section>
    </MenuProvider>
  </>
)
