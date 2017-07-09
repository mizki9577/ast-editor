// @flow
import type babylon from 'babylon'
import React from 'react'
import { UnknownNodeRenderer, IdentifierRenderer } from './JavaScriptASTRenderer.js'
import { renderExpression, MemberExpressionRenderer } from './expression-renderers.js'
import { ObjectPropertyRenderer } from './expression-renderers.js'
import { VariableDeclarationRenderer, FunctionDeclarationRenderer } from './declaration-renderers.js'

export const renderPattern = (node: babylon.Pattern, key: ?number) => {
  switch (node.type) {
    case 'ObjectPattern':
      return <FunctionDeclarationRenderer key={ key } node={ node } />

    case 'ArrayPattern':
      return <VariableDeclarationRenderer key={ key } node={ node } />

    case 'RestElement':
      return <RestElementRenderer key={ key } node={ node } />

    case 'AssignmentPattern':
      return <AssignmentPatternRenderer key={ key } node={ node } />

    case 'Identifier':
      return <IdentifierRenderer key={ key } node={ node } />

    case 'MemberExpression':
      return <MemberExpressionRenderer key={ key } node={ node } />

    default:
      return <UnknownNodeRenderer key={ key } node={ node } />
  }
}

const AssignmentPropertyRenderer = ({ node }: { node: babylon.AssignmentProperty }) => (
  <ObjectPropertyRenderer node={ node } />
)

const ObjectPatternRenderer = ({ node }: { node: babylon.ObjectPattern }) => (
  <span>
    <span>{ '{' }</span>
    { node.properties.map((property, i) => property.type === 'AssignmentProperty' ? <AssignmentPropertyRenderer key={ i } node={ property } /> : <RestElementRenderer key={ i } node={ property } />) }
    <span>{ '}' }</span>
  </span>
)

const ArrayPatternRenderer = ({ node }: { node: babylon.ArrayPattern }) => (
  <span>
    <span>[</span>
    { node.elements.map((element, i) => element !== null ? renderPattern(element, i) : null) }
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
