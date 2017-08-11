// @flow
import React from 'react'
import { Fabric } from 'office-ui-fabric-react'
import * as circularJson from 'circular-json'
import ramda from 'ramda'
import * as util from './util.js'
import renderBabylonAST from './JavaScriptASTRenderer.js'

const { ipcRenderer } = require('electron')

import type { Node } from 'babylon'

class AstEditor extends React.Component {
  state: {|
    ast?: Node,
    focusedNodePath: (string | number)[],
  |}

  constructor() {
    super()

    this.state = {
      ast: null,
      focusedNodePath: [],
    }
  }

  componentDidMount() {
    ipcRenderer.on('ast-parsed', (ev, astJson) => {
      const ast = circularJson.parse(astJson)
      this.setState({ ast })
    })
    ipcRenderer.send('ready')
  }

  handleKeyDown(ev: KeyboardEvent) {
    const { ast, focusedNodePath } = this.state

    switch (ev.key) {
      case 'h': {
        const nextFocusedNodePath = focusedNodePath.slice(0, -1)
        this.setState({
          ast: ramda.compose(
            ramda.set(ramda.lensPath([...focusedNodePath,     'focused']), false),
            ramda.set(ramda.lensPath([...nextFocusedNodePath, 'focused']),  true),
          )(ast),
          focusedNodePath: nextFocusedNodePath,
        })
        break
      }

      case 'l': {
        const nextFocusedNodePath = util.getFirstChildPath(ast, focusedNodePath)
        this.setState({
          ast: ramda.compose(
            ramda.set(ramda.lensPath([...focusedNodePath,     'focused']), false),
            ramda.set(ramda.lensPath([...nextFocusedNodePath, 'focused']),  true),
          )(ast),
          focusedNodePath: nextFocusedNodePath,
        })
        break
      }

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
