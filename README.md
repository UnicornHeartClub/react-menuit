# Menuit 🎶

![npm](https://img.shields.io/npm/v/menuit.svg)
![david-dm](https://david-dm.org/UnicornHeartClub/menuit.svg)
[![Build Status](https://travis-ci.com/UnicornHeartClub/menuit.svg?branch=master)](https://travis-ci.com/UnicornHeartClub/menuit)

A lightweight library to manage context menus for your [React](https://reactjs.org)
application. Just how lightweight is it?

![minified size](https://badgen.net/bundlephobia/min/menuit)
![minzipped size](https://badgen.net/bundlephobia/minzip/menuit)

## Installation

```bash
$ yarn add menuit
```

### Requirements

This library uses [React Hooks](https://reactjs.org/docs/hooks-intro.html) which requires React 16.8+.

### TypeScript

This library utilizes [TypeScript](https://www.typescriptlang.org/) and exposes a full set of
TypeScript definitions.

## Philosophy

 - **Batteries __not__ included** - _Menuit_ does not provide out-of-the-box styles and assumes you will provide your own set of styling

## Usage

```typescript
import { MenuProvider, Menu, MenuItem, MenuTrigger } from 'menuit'

// Wrap the root of your application to provide global menu support
export default () => (
  <MenuProvider>
    <header>
      <MenuTrigger contextMenu="example-1">Right-click to open</MenuTrigger>
      <MenuTrigger holdMenu="example-1" holdDuration={2000}>Hold 2s to open</MenuTrigger>
    </header>

    <section>
      <Menu id="example-1">
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
        <MenuItem>Item 3</MenuItem>
        <MenuItem divider />
        <MenuItem>
          <span>Even HTML</span>
        </MenuItem>
      </Menu>
    </section>
  </MenuProvider>
)
```

```typescript
import { toggleMenu, Menu, MenuItem, MenuTrigger } from 'menuit'

export default () => {
  return (
    <div>
      <Menu id="example-1">
        <MenuItem>
          <span>Item 1</span>
        </MenuItem>
        <MenuItem>
          <div>Any HTML you want</div>
        </MenuItem>
        <MenuItem divider>
        <MenuItem>
          <span>Separate items easily</span>
        </MenuItem>
      </Menu>

      <Menu id="example-2">
        <MenuItem>Move to Front</MenuItem>
        <MenuItem>Send to Back</MenuItem>
        <MenuItem>Move up one layer</MenuItem>
        <MenuItem>Move back one layer</MenuItem>
      </Menu>

      <hr />

      <p>Right-click buttons to open menu</p>
      <MenuTrigger contextMenu="example-1">Open Menu 1</MenuTrigger>
      <MenuTrigger contextMenu="example-2">Open Menu 2</MenuTrigger>

      <hr />

      <p>Long press to open menus</p>
      <MenuTrigger holdMenu="example-1" holdDuration={1000}>Hold 1s to open Menu 1</MenuTrigger>
      <MenuTrigger holdMenu="example-2" holdDuration={3000}>Hold 3s to open Menu 2</MenuTrigger>

      <hr />

      <p>or, just trigger through exposed function</p>
      <button onClick={() => toggleMenu('example-1')}>Open Menu 1</button>
      <button onClick={() => toggleMenu('example-2')}>Open Menu 2</button>
    </div>
  )
}
```

## License

MIT
