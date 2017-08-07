// @flow
import type babylon from 'babylon'
import React from 'react'
import { NodeRenderer, NodeWrapper, BracketRenderer, PunctuationRenderer, CommaSeparatedList } from './JavaScriptASTRenderer.js'
import * as reservedKeywords from './reserved-keywords.js'

export const ClassRenderer = ({ node }: { node: babylon.Class }) => (
  <NodeWrapper>
    <span>
      { node.decorators ? node.decorators.map((decorator, i) => <NodeRenderer key={ i } node={ decorator } />) : null }
      <reservedKeywords.Class />
      <NodeRenderer node={ node.id } />
      { node.superClass !== null ? <reservedKeywords.Extends /> : null }
      <NodeRenderer node={ node.superClass } />
      <ClassBodyRenderer node={ node.body } />
    </span>
  </NodeWrapper>
)

const ClassBodyRenderer = ({ node }: { node: babylon.ClassBody }) => (
  <NodeWrapper>
    <span>
      <BracketRenderer bracket="{" />
      { node.body.map((child, i) => <NodeRenderer key={ i } node={ child } />) }
      <BracketRenderer bracket="}" />
    </span>
  </NodeWrapper>
)

export const ClassMethodRenderer = ({ node }: { node: babylon.ClassMethod }) => (
  <NodeWrapper>
    <div className="class-body">
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
    </div>
  </NodeWrapper>
)

export const ClassPropertyRenderer = ({ node }: { node: babylon.ClassProperty }) => (
  <NodeWrapper>
    <div className="class-body">
      { node.static ? <reservedKeywords.Static /> : null }
      { node.computed ? <BracketRenderer bracket="[" /> : null }
      <NodeRenderer node={ node.key } />
      { node.computed ? <BracketRenderer bracket="]" /> : null }
      <PunctuationRenderer punctuation=":"/>
      <NodeRenderer node={ node.value } />
    </div>
  </NodeWrapper>
)

// vim: set ts=2 sw=2 et:
