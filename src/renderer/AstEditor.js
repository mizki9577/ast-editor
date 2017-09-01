// @flow
import React from 'react'
import { Container } from 'flux/utils'
import { Fabric } from 'office-ui-fabric-react'

import renderJavaScriptAST from './ast_renderers/javascript/index.js'
import store from './store.js'
import * as actions from './actions.js'

import convertFluxContainer from './convertFluxContainer.js'

type TState = {|
  ast: any,
  focusedNodeId: number,
|}

class AstEditor extends React.Component<null, TState> {
  static getStores() {
    return [store]
  }

  static calculateState() {
    return store.getState()
  }

  componentDidMount() {
    actions.ready()
  }

  handleKeyDown(ev: KeyboardEvent) {
    switch (ev.key) {
      case 'h':
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
          { renderJavaScriptAST(this.state.ast) }
        </div>
      </Fabric>
    )
  }
}

export default Container.create(convertFluxContainer(AstEditor))
// vim: set ts=2 sw=2 et:
