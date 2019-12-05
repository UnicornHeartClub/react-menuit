# Menuit 🎶

![npm](https://img.shields.io/npm/v/react-menuit.svg)
![david-dm](https://david-dm.org/UnicornHeartClub/react-menuit.svg)
[![Build Status](https://travis-ci.com/UnicornHeartClub/react-menuit.svg?branch=master)](https://travis-ci.com/UnicornHeartClub/react-menuit)

A lightweight library to manage context menus for your [React](https://reactjs.org)
application. Just how lightweight is it?

![minified size](https://badgen.net/bundlephobia/min/react-menuit)
![minzipped size](https://badgen.net/bundlephobia/minzip/react-menuit)

## Installation

```bash
$ yarn add react-menuit
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
import { MenuProvider, Menu, MenuItem, MenuTrigger } from 'react-menuit'

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

## License

MIT
