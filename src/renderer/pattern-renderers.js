// @flow
import type babylon from 'babylon'
import React from 'react'
import { NodeRenderer, NodeWrapper, BracketRenderer, PunctuationRenderer, CommaSeparatedList } from './JavaScriptASTRenderer.js'

export const AssignmentPropertyRenderer = ({ node }: { node: babylon.AssignmentProperty }) => (
  <NodeWrapper>
    <span>
      { node.decorators ? node.decorators.map((decorator, i) => <NodeRenderer key={ i } node={ decorator } />) : null }
      { node.computed ? <BracketRenderer bracket="[" /> : null }
      <NodeRenderer node={ node.key } />
      { node.computed ? <BracketRenderer bracket="]" /> : null }
      { node.shorthand ? null : <PunctuationRenderer punctuation=":" /> }
      { node.shorthand ? null : <NodeRenderer node={ node.value } /> }
    </span>
  </NodeWrapper>
)

export const ObjectPatternRenderer = ({ node }: { node: babylon.ObjectPattern }) => (
  <NodeWrapper>
    <span>
      <BracketRenderer bracket="{" />
      <CommaSeparatedList elements={ node.properties } inline />
      <BracketRenderer bracket="}" />
    </span>
  </NodeWrapper>
)

export const ArrayPatternRenderer = ({ node }: { node: babylon.ArrayPattern }) => (
  <NodeWrapper>
    <span>
      <BracketRenderer bracket="[" />
      { node.elements.map((element, i) => <NodeRenderer key={ i } node={ element } />) }
      <BracketRenderer bracket="]" />
    </span>
  </NodeWrapper>
)

export const RestElementRenderer = ({ node }: { node: babylon.RestElement }) => (
  <NodeWrapper>
    <span>
      <PunctuationRenderer punctuation="..." />
      <NodeRenderer node={ node.argument } />
    </span>
  </NodeWrapper>
)

export const AssignmentPatternRenderer = ({ node }: { node: babylon.AssignmentPattern }) => (
  <NodeWrapper>
    <span>
      <NodeRenderer node={ node.left } />
      <PunctuationRenderer punctuation="=" />
      <NodeRenderer node={ node.right } />
    </span>
  </NodeWrapper>
)

// vim: set ts=2 sw=2 et:
