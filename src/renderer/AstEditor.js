// @flow
import React from 'react'
import * as babylon from 'babylon'
import renderBabylonAST from './JavaScriptASTRenderer.js'

type State = {|
  src: string,
  ast: babylon.Node,
  cursoredNode: babylon.Node,
|}

class AstEditor extends React.Component {
  state: State

  constructor() {
    super()

    const src = ''
    const ast = babylon.parse('')
    ast.cursored = true
    const cursoredNode = ast

    this.state = {
      src, ast,
      cursoredNode: ast,
    }
  }

  handleSourceChange(ev: SyntheticInputEvent) {
    const src = ev.target.value
    const ast = babylon.parse(src, {
      sourceType: 'module',
      plugins: ['jsx', 'flow'],
    })

    this.setState({ src, ast, cursoredNode: ast })
  }

  handleKeyDown(ev: SyntheticKeyboardEvent) {
    switch (ev.key) {
      case 'h':
        break

      case 'j':
        break

      case 'k':
        break

      case 'l':
        break
    }
  }

  render() {
    return (
      <div>
        <div id="dest" tabIndex="0" onKeyDown={ ev => this.handleKeyDown(ev) }>
          { renderBabylonAST(this.state.ast) }
        </div>
        <textarea id="src" onChange={ ev => this.handleSourceChange(ev) } />
      </div>
    )
  }
}

export default AstEditor
// vim: set ts=2 sw=2 et:
