const url = require('url')
const path = require('path')
const fs = require('fs')
const promisify = require('util-promisify')
const { app, BrowserWindow, ipcMain } = require('electron')
const babylon = require('babylon')

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

  promisify(fs.readFile)(process.argv[2], { encoding: 'UTF-8', flag: 'r' })
    .then(src => {
      const ast = babylon.parse(src)
      ipcMain.on('ready', ev => {
        ev.sender.send('ast-parsed', ast)
      })
    })
    .catch(e => console.log(e))
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
