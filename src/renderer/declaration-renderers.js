// @flow
import type babylon from 'babylon'
import React from 'react'
import { NodeRenderer, NodeWrapper, FunctionRenderer, ReservedKeywordRenderer, OperatorRenderer } from './JavaScriptASTRenderer.js'
import { ClassRenderer } from './class-renderers.js'

export const FunctionDeclarationRenderer = ({ node }: { node: babylon.FunctionDeclaration }) => (
  <NodeWrapper>
    <div>
      <FunctionRenderer node={ node } />
    </div>
  </NodeWrapper>
)

export const VariableDeclarationRenderer = ({ node }: { node: babylon.VariableDeclaration }) => (
  <NodeWrapper>
    <div className="variable-declaration">
      <ReservedKeywordRenderer>{ node.kind /* var, let , const */ }</ReservedKeywordRenderer>
      { node.declarations.map((declaration, i) => <VariableDeclaratorRenderer key={ i } node={ declaration } />) }
    </div>
  </NodeWrapper>
)

export const VariableDeclaratorRenderer = ({ node }: { node: babylon.VariableDeclarator }) => (
  <NodeWrapper>
    <span>
      <NodeRenderer node={ node.id } />
      { node.init !== null ? <OperatorRenderer>=</OperatorRenderer> : null }
      <NodeRenderer node={ node.init } />
    </span>
  </NodeWrapper>
)

export const ClassDeclarationRenderer = ({ node }: { node: babylon.ClassDeclaration }) => (
  <NodeWrapper>
    <div>
      <ClassRenderer node={ node } />
    </div>
  </NodeWrapper>
)

// vim: set ts=2 sw=2 et:
