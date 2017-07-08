// @flow
import type babylon from 'babylon'
import React from 'react'
import { UnknownNodeRenderer, IdentifierRenderer } from './JavaScriptASTRenderer.js'
import { ObjectPropertyRenderer } from './expression-renderers.js'
import { VariableDeclarationRenderer, FunctionDeclarationRenderer } from './declaration-renderers.js'
import { renderExpression } from './expression-renderers.js'

export const renderPattern = (node: babylon.Pattern) => {
  switch (node.type) {
    case 'ObjectPattern':
      return <FunctionDeclarationRenderer node={ node } />

    case 'ArrayPattern':
      return <VariableDeclarationRenderer node={ node } />

    case 'RestElement':
      return <RestElementRenderer node={ node } />

    case 'AssignmentPattern':
      return <AssignmentPatternRenderer node={ node } />

    case 'Identifier':
      return <IdentifierRenderer node={ node } />

    default:
      return <UnknownNodeRenderer node={ node } />
  }
}

const AssignmentPropertyRenderer = ({ node }: { node: babylon.AssignmentProperty }) => (
  <ObjectPropertyRenderer node={ node } />
)

const ObjectPatternRenderer = ({ node }: { node: babylon.ObjectPattern }) => (
  <span>
    <span>{ '{' }</span>
    { node.properties.map(property => property.type === 'AssignmentProperty' ? <AssignmentPropertyRenderer node={ property } /> : <RestElementRenderer node={ property } />) }
    <span>{ '}' }</span>
  </span>
)

const ArrayPatternRenderer = ({ node }: { node: babylon.ArrayPattern }) => (
  <span>
    <span>[</span>
    { node.elements.map(element => element !== null ? renderPattern(element) : null) }
    <span>]</span>
  </span>
)

const RestElementRenderer = ({ node }: { node: babylon.RestElement }) => (
  <span>
    <span>...</span>
    { renderPattern(node.pattern) }
  </span>
)

const AssignmentPatternRenderer = ({ node }: { node: babylon.AssignmentPattern }) => (
  <span>
    { renderPattern(node.left) }
    <span>=</span>
    { renderExpression(node.right) }
  </span>
)

// vim: set ts=2 sw=2 et:
