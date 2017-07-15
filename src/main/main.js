const url = require('url')
const path = require('path')
const fs = require('fs')
const { app, BrowserWindow, Menu, dialog } = require('electron')

let window = null

const createWindow = () => {
  window = new BrowserWindow()

  window.loadURL(url.format({
    pathname: path.join(__dirname, '../../dist/index.html'),
    protocol: 'file:',
  }))

  window.on('closed', () => {
    window = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  createWindow()
})

// vim: set ts=2 sw=2 et:
