// @flow
import type babylon from 'babylon'
import React from 'react'
import { NodeRenderer, NodeWrapper, BracketRenderer, PunctuationRenderer, CommaSeparatedList } from './index.js'

export const AssignmentPropertyRenderer = ({ node }: { node: babylon.AssignmentProperty }) => (
  <NodeWrapper inline>
    { node.decorators ? node.decorators.map((decorator, i) => <NodeRenderer key={ i } node={ decorator } />) : null }
    { node.computed ? <BracketRenderer bracket="[" /> : null }
    <NodeRenderer node={ node.key } />
    { node.computed ? <BracketRenderer bracket="]" /> : null }
    { node.shorthand ? null : <PunctuationRenderer punctuation=":" /> }
    { node.shorthand ? null : <NodeRenderer node={ node.value } /> }
  </NodeWrapper>
)

export const ObjectPatternRenderer = ({ node }: { node: babylon.ObjectPattern }) => (
  <NodeWrapper inline>
    <BracketRenderer bracket="{" />
    <CommaSeparatedList elements={ node.properties } inline />
    <BracketRenderer bracket="}" />
  </NodeWrapper>
)

export const ArrayPatternRenderer = ({ node }: { node: babylon.ArrayPattern }) => (
  <NodeWrapper inline>
    <BracketRenderer bracket="[" />
    { node.elements.map((element, i) => <NodeRenderer key={ i } node={ element } />) }
    <BracketRenderer bracket="]" />
  </NodeWrapper>
)

export const RestElementRenderer = ({ node }: { node: babylon.RestElement }) => (
  <NodeWrapper inline>
    <PunctuationRenderer punctuation="..." />
    <NodeRenderer node={ node.argument } />
  </NodeWrapper>
)

export const AssignmentPatternRenderer = ({ node }: { node: babylon.AssignmentPattern }) => (
  <NodeWrapper inline>
    <NodeRenderer node={ node.left } />
    <PunctuationRenderer punctuation="=" />
    <NodeRenderer node={ node.right } />
  </NodeWrapper>
)

// vim: set ts=2 sw=2 et:
