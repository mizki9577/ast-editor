// @flow
import React from 'react'
import * as babylon from 'babylon'
import renderBabylonAST from './JavaScriptASTRenderer.js'

type State = {|
  src: string,
  ast: babylon.Node,
|}

class AstEditor extends React.Component {
  state: State

  constructor() {
    super()
    this.state = {
      src: '',
      ast: babylon.parse(''),
    }
  }

  handleSourceChange(ev: SyntheticInputEvent) {
    const src = ev.target.value
    const ast = babylon.parse(src, {
      sourceType: 'module',
      plugins: ['jsx', 'flow'],
    })
    this.setState({ src, ast })
  }

  render() {
    return (
      <div>
        <div id="dest">{ renderBabylonAST(this.state.ast) }</div>
        <textarea id="src" value={ this.state.src } onChange={ ev => this.handleSourceChange(ev) } />
      </div>
    )
  }
}

export default AstEditor
// vim: set ts=2 sw=2 et:
