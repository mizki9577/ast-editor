// @flow
import type babylon from 'babylon'
import React from 'react'
import { NodeRenderer, NodeWrapper, BracketRenderer, PunctuationRenderer, CommaSeparatedList } from './index.js'
import * as reservedKeywords from './reserved-keywords.js'

export const ClassRenderer = ({ node }: { node: babylon.Class }) => (
  <NodeWrapper inline>
    { node.decorators ? node.decorators.map((decorator, i) => <NodeRenderer key={ i } node={ decorator } />) : null }
    <reservedKeywords.Class />
    <NodeRenderer node={ node.id } />
    { node.superClass !== null ? <reservedKeywords.Extends /> : null }
    <NodeRenderer node={ node.superClass } />
    <ClassBodyRenderer node={ node.body } />
  </NodeWrapper>
)

const ClassBodyRenderer = ({ node }: { node: babylon.ClassBody }) => (
  <NodeWrapper inline>
    <BracketRenderer bracket="{" />
    { node.body.map((child, i) => <NodeRenderer key={ i } node={ child } />) }
    <BracketRenderer bracket="}" />
  </NodeWrapper>
)

export const ClassMethodRenderer = ({ node }: { node: babylon.ClassMethod }) => (
  <NodeWrapper block className="class-body">
    { node.decorators ? node.decorators.map((decorator, i) => <NodeRenderer key={ i } node={ decorator } />) : null }
    { node.static ? <reservedKeywords.Static /> : null }
    { node.kind === 'get' ? <PunctuationRenderer punctuation="get"/> :
      node.kind === 'set' ? <PunctuationRenderer punctuation="set"/> : null }
    { node.computed ? <BracketRenderer bracket="[" /> : null }
    <NodeRenderer node={ node.key } />
    { node.computed ? <BracketRenderer bracket="]" /> : null }

    <BracketRenderer bracket="(" />
    <CommaSeparatedList elements={ node.params } inline />
    <BracketRenderer bracket=")" />
    <NodeRenderer node={ node.body } />
  </NodeWrapper>
)

export const ClassPropertyRenderer = ({ node }: { node: babylon.ClassProperty }) => (
  <NodeWrapper block className="class-body">
    { node.static ? <reservedKeywords.Static /> : null }
    { node.computed ? <BracketRenderer bracket="[" /> : null }
    <NodeRenderer node={ node.key } />
    { node.computed ? <BracketRenderer bracket="]" /> : null }
    <PunctuationRenderer punctuation=":"/>
    <NodeRenderer node={ node.value } />
  </NodeWrapper>
)

// vim: set ts=2 sw=2 et:
