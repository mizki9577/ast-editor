// @flow
import { ReduceStore } from 'flux/utils'
import dispatcher from './dispatcher.js'

class ASTEditorStore extends ReduceStore {
  getInitialState() {
    return { }
  }

  reduce(state, action) {
    switch (action.type) {
      case 'ast-received':
        return {
          ...state,
          ast: action.ast,
        }

      default:
        return state
    }
  }
}

export default new ASTEditorStore(dispatcher)
// vim: set ts=2 sw=2 et:
