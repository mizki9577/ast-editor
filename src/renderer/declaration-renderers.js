// @flow
import type babylon from 'babylon'
import React from 'react'
import { NodeRenderer, NodeWrapper, FunctionRenderer, PunctuationRenderer } from './JavaScriptASTRenderer.js'
import { ClassRenderer } from './class-renderers.js'
import * as reservedKeywords from './reserved-keywords.js'

export const FunctionDeclarationRenderer = ({ node }: { node: babylon.FunctionDeclaration }) => (
  <NodeWrapper block>
    <FunctionRenderer node={ node } />
  </NodeWrapper>
)

export const VariableDeclarationRenderer = ({ node }: { node: babylon.VariableDeclaration }) => (
  <NodeWrapper block className="variable-declaration">
    { node.kind === 'var'   ? <reservedKeywords.Var /> :
      node.kind === 'let'   ? <reservedKeywords.Let /> :
      node.kind === 'const' ? <reservedKeywords.Const /> : null }
    { node.declarations.map((declaration, i) => <VariableDeclaratorRenderer key={ i } node={ declaration } />) }
  </NodeWrapper>
)

export const VariableDeclaratorRenderer = ({ node }: { node: babylon.VariableDeclarator }) => (
  <NodeWrapper inline>
    <NodeRenderer node={ node.id } />
    { node.init !== null ? <PunctuationRenderer punctuation="=" /> : null }
    <NodeRenderer node={ node.init } />
  </NodeWrapper>
)

export const ClassDeclarationRenderer = ({ node }: { node: babylon.ClassDeclaration }) => (
  <NodeWrapper block>
    <ClassRenderer node={ node } />
  </NodeWrapper>
)

// vim: set ts=2 sw=2 et:
