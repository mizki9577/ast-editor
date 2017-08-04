// @flow
import type babylon from 'babylon'
import React from 'react'
import { NodeRenderer, OperatorRenderer, OpenBracketRenderer, ClosingBracketRenderer, CommaRenderer } from './JavaScriptASTRenderer.js'

export const AssignmentPropertyRenderer = ({ node }: { node: babylon.AssignmentProperty }) => (
  <span>
    { node.decorators ? node.decorators.map((decorator, i) => <NodeRenderer key={ i } node={ decorator } />) : null }
    { node.computed ? <OpenBracketRenderer>[</OpenBracketRenderer> : null }
    <NodeRenderer node={ node.key } />
    { node.computed ? <ClosingBracketRenderer>]</ClosingBracketRenderer> : null }
    { node.shorthand ? null : <OperatorRenderer>:</OperatorRenderer> }
    { node.shorthand ? null : <NodeRenderer node={ node.value } /> }
    <CommaRenderer />
  </span>
)

export const ObjectPatternRenderer = ({ node }: { node: babylon.ObjectPattern }) => (
  <span>
    <OpenBracketRenderer>{ '{' }</OpenBracketRenderer>
    <div className="object-body">
      { node.properties.map((property, i) => <NodeRenderer key={ i } node={ property } />) }
    </div>
    <ClosingBracketRenderer>{ '}' }</ClosingBracketRenderer>
  </span>
)

export const ArrayPatternRenderer = ({ node }: { node: babylon.ArrayPattern }) => (
  <span>
    <OpenBracketRenderer>[</OpenBracketRenderer>
    { node.elements.map((element, i) => <NodeRenderer key={ i } node={ element } />) }
    <ClosingBracketRenderer>]</ClosingBracketRenderer>
  </span>
)

export const RestElementRenderer = ({ node }: { node: babylon.RestElement }) => (
  <span>
    <span>...</span>
    <NodeRenderer node={ node.pattern } />
  </span>
)

export const AssignmentPatternRenderer = ({ node }: { node: babylon.AssignmentPattern }) => (
  <span>
    <NodeRenderer node={ node.left } />
    <OperatorRenderer>=</OperatorRenderer>
    <NodeRenderer node={ node.right } />
  </span>
)

// vim: set ts=2 sw=2 et:
