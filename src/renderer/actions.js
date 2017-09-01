// @flow
import { ipcRenderer } from 'electron'

import dispatcher from './dispatcher.js'

export const ready = () => {
  ipcRenderer.on('ast-parsed', (ev, ast) => {
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
