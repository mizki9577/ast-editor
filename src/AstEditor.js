// @flow
import React from 'react'
import * as babylon from 'babylon'
import AstRenderer from './JavaScriptASTRenderer.js'

type State = {|
  src: string,
  ast: ?babylon.Node,
|}

class AstEditor extends React.Component {
  state: State

  constructor(props: typeof undefined) {
    super(props)
    this.state = {
      src: '',
      ast: null,
    }
  }

  handleSourceChange(ev: SyntheticInputEvent) {
    const src = ev.target.value
    const ast = babylon.parse(src, {
      sourceType: 'module',
    })
    this.setState({ src, ast })
  }

  render() {
    return (
      <div>
        <textarea id="src" onChange={ ev => this.handleSourceChange(ev) } />
        <div id="dest">
          { this.state.ast ? <AstRenderer node={ this.state.ast } /> : null }
        </div>
      </div>
    )
  }
}

export default AstEditor
// vim: set ts=2 sw=2 et:
