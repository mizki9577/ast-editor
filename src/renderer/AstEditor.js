// @flow
import React from 'react'
import { Fabric } from 'office-ui-fabric-react'
import * as circularJson from 'circular-json'
import renderBabylonAST from './JavaScriptASTRenderer.js'

const { ipcRenderer } = require('electron')

import type { Node as babylonNode } from 'babylon'

type State = {|
  ast: ?babylonNode,
  focusedNode: ?babylonNode,
|}

class AstEditor extends React.Component {
  state: State

  constructor() {
    super()

    this.state = {
      ast: null,
      focusedNode: null,
    }
  }

  componentDidMount() {
    ipcRenderer.on('ast-parsed', (ev, astJson) => {
      const ast = circularJson.parse(astJson)
      this.setState({ ast, focusedNode: ast })
    })
    ipcRenderer.send('ready')
  }

  handleKeyDown(ev) {
    switch (ev.key) {
      case 'h':
        if (this.state.focusedNode.parent != null) {
          this.setState({ focusedNode: this.state.focusedNode.parent })
        }
        break

      case 'l':
        // go deeply
        break

      case 'j':
        // go to the next
        break

      case 'k':
        // go to the prev
        break

      default:
        console.log(ev.key)
    }
  }

  render() {
    return (
      <Fabric>
        <div className="renderer-root ms-bgColor-neutralDark"
          tabIndex={ 0 }
          onKeyDown={ ev => this.handleKeyDown(ev) }>
          { renderBabylonAST(this.state.ast) }
        </div>
      </Fabric>
    )
  }
}

export default AstEditor
// vim: set ts=2 sw=2 et:
