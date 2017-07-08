// @flow
import type babylon from 'babylon'
import React from 'react'
import { UnknownNodeRenderer, FunctionRenderer } from './JavaScriptASTRenderer.js'
import { renderExpression } from './expression-renderers.js'
import { renderPattern } from './pattern-renderers.js'

export const renderDeclaration = (node: babylon.Declaration) => {
  switch (node.type) {
    case 'FunctionDeclaration':
      return <FunctionDeclarationRenderer node={ node } />

    case 'VariableDeclaration':
      return <VariableDeclarationRenderer node={ node } />

    default:
      return <UnknownNodeRenderer node={ node } />
  }
}

export const FunctionDeclarationRenderer = ({ node }: { node: babylon.FunctionDeclaration }) => (
  <div>
    <FunctionRenderer node={ node } />
  </div>
)

export const VariableDeclarationRenderer = ({ node }: { node: babylon.VariableDeclaration }) => (
  <div>
    <span>{ node.kind }</span>
    { node.declarations.map(declaration => <VariableDeclaratorRenderer node={ declaration } />) }
  </div>
)

const VariableDeclaratorRenderer = ({ node }: { node: babylon.VariableDeclarator }) => (
  <span>
    { renderPattern(node.id) }
    { node.init !== null ? <span>=</span> : null }
    { node.init !== null ? renderExpression(node.init) : null }
  </span>
)

// vim: set ts=2 sw=2 et:
