// @flow
import { ipcRenderer } from 'electron'
import * as circularJson from 'circular-json'

import dispatcher from './dispatcher.js'

export const ready = () => {
  ipcRenderer.on('ast-parsed', (ev, astJson) => {
    const ast = circularJson.parse(astJson)
    astReceivced(ast)
  })
  ipcRenderer.send('ready')
}

export const astReceivced = ast => {
  dispatcher.dispatch({
    type: 'ast-received',
    ast,
  })
}
// vim: set ts=2 sw=2 et:
