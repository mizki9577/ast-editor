const url = require('url')
const path = require('path')
const fs = require('fs')
const promisify = require('util-promisify')
const { app, BrowserWindow, ipcMain } = require('electron')
const babylon = require('babylon')
const { default: traverse } = require('babel-traverse')
const circularJson = require('circular-json')

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

  promisify(fs.readFile)(process.argv[2], { encoding: 'UTF-8', flag: 'r' })
    .then(src => {
      const ast = parse(src)
      const astJson = circularJson.stringify(ast)
      ipcMain.on('ready', ev => {
        ev.sender.send('ast-parsed', astJson)
      })
    })
    .catch(e => console.log(e))
}

const parse = src => {
  const ast = babylon.parse(src, {
    sourceType: 'module',
    plugins: ['jsx', 'flow'],
  })

  traverse(ast, {
    enter(path) {
      path.node.parent = path.parent
    }
  })

  return ast
}

app.on('ready', () => {
  createWindow()
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
