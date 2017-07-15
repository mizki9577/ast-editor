// @flow
import type babylon from 'babylon'
import React from 'react'
import { renderNode } from './JavaScriptASTRenderer.js'

export const AssignmentPropertyRenderer = ({ node }: { node: babylon.AssignmentProperty }) => (
  renderNode(node)
)

export const ObjectPatternRenderer = ({ node }: { node: babylon.ObjectPattern }) => (
  <span>
    <span>{ '{' }</span>
    { node.properties.map((property, i) => renderNode(property, i)) }
    <span>{ '}' }</span>
  </span>
)

export const ArrayPatternRenderer = ({ node }: { node: babylon.ArrayPattern }) => (
  <span>
    <span>[</span>
    { node.elements.map((element, i) => renderNode(element, i)) }
    <span>]</span>
  </span>
)

export const RestElementRenderer = ({ node }: { node: babylon.RestElement }) => (
  <span>
    <span>...</span>
    { renderNode(node.pattern) }
  </span>
)

export const AssignmentPatternRenderer = ({ node }: { node: babylon.AssignmentPattern }) => (
  <span>
    { renderNode(node.left) }
    <span>=</span>
    { renderNode(node.right) }
  </span>
)

// vim: set ts=2 sw=2 et:
