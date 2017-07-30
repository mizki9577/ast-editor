// @flow
import React from 'react'
import { Fabric } from 'office-ui-fabric-react'
import renderBabylonAST from './JavaScriptASTRenderer.js'

const { ipcRenderer } = require('electron')

import type babylonNode from 'babylon'

type State = {|
  ast: ?babylonNode,
|}

class AstEditor extends React.Component {
  state: State

  constructor() {
    super()

    this.state = {
      ast: null,
    }
  }

  componentDidMount() {
    ipcRenderer.on('ast-parsed', (ev, ast) => {
      this.setState({ ast })
    })
    ipcRenderer.send('ready')
  }

  render() {
    return (
      <Fabric>
        <div className="renderer-root ms-bgColor-neutralDark">
          { renderBabylonAST(this.state.ast) }
        </div>
      </Fabric>
    )
  }
}

export default AstEditor
// vim: set ts=2 sw=2 et:
