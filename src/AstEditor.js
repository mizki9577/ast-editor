// @flow
import React from 'react'

type State = {|
  src: string,
|}

class AstEditor extends React.Component {
  state: State

  constructor(props: typeof undefined) {
    super(props)
    this.state = {
      src: '',
    }
  }

  handleSourceChange(ev: SyntheticInputEvent) {
    this.setState({ src: ev.target.value })
  }

  render() {
    return (
      <div>
        <textarea id="src" onChange={ ev => this.handleSourceChange(ev) } />
        <div id="dest">
          hoge
        </div>
      </div>
    )
  }
}

export default AstEditor
// vim: set ts=2 sw=2 et:
