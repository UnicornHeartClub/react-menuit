/**
 * Menuit Library
 *
 * Exposes components and interfaces
 *
 * @format
 */

/**
 * Point
 */
export interface IPoint {
  x: number
  y: number
}

export { default as useMenu, IMenuHook } from './hook'
export { default as MenuProvider } from './provider'
