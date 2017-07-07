// @flow
import React from 'react'
import * as babylon from 'babylon'
import AstRenderer from './AstRenderer.js'

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
      plugins: ['jsx'],
    })
    this.setState({ src, ast })
  }

  render() {
    return (
      <div>
        <textarea id="src" onChange={ ev => this.handleSourceChange(ev) } />
        <div id="dest">
          <AstRenderer node={ this.state.ast } />
        </div>
      </div>
    )
  }
}

export default AstEditor
// vim: set ts=2 sw=2 et:
