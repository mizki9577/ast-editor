const url = require('url')
const path = require('path')
const fs = require('fs')

const promisify = require('util-promisify')

const { app, BrowserWindow, ipcMain } = require('electron')
const devtron = require('devtron')
const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer')

const parse = require('./parsers/javascript.js')

let window = null

const createWindow = () => {
  window = new BrowserWindow()

  window.loadURL(url.format({
    pathname: path.join(__dirname, '../../index.html'),
    protocol: 'file:',
  }))

  window.on('closed', () => {
    window = null
  })

  promisify(fs.readFile)(process.argv[process.argv.length - 1], { encoding: 'UTF-8', flag: 'r' })
    .then(src => {
      const ast = parse(src)
      ipcMain.on('ready', ev => {
        ev.sender.send('ast-parsed', ast)
      })
    })
    .catch(e => console.log(e))
}

app.on('ready', () => {
  createWindow()

  if (process.env.NODE_ENV !== 'production') {
    console.log(process.env.NODE_ENV)
    devtron.install()
    installExtension(REACT_DEVELOPER_TOOLS)
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  createWindow()
})

// vim: set ts=2 sw=2 et:
