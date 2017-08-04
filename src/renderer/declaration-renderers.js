// @flow
import type babylon from 'babylon'
import React from 'react'
import { NodeRenderer, FunctionRenderer, ReservedKeywordRenderer, OperatorRenderer } from './JavaScriptASTRenderer.js'
import { ClassRenderer } from './class-renderers.js'

export const FunctionDeclarationRenderer = ({ node }: { node: babylon.FunctionDeclaration }) => (
  <FunctionRenderer node={ node } />
)

export const VariableDeclarationRenderer = ({ node }: { node: babylon.VariableDeclaration }) => (
  <div className="variable-declaration">
    <ReservedKeywordRenderer>{ node.kind /* var, let , const */ }</ReservedKeywordRenderer>
    { node.declarations.map((declaration, i) => <VariableDeclaratorRenderer key={ i } node={ declaration } />) }
  </div>
)

export const VariableDeclaratorRenderer = ({ node }: { node: babylon.VariableDeclarator }) => (
  <span>
    <NodeRenderer node={ node.id } />
    { node.init !== null ? <OperatorRenderer>=</OperatorRenderer> : null }
    <NodeRenderer node={ node.init } />
  </span>
)

export const ClassDeclarationRenderer = ({ node }: { node: babylon.ClassDeclaration }) => (
  <div>
    <ClassRenderer node={ node } />
  </div>
)

// vim: set ts=2 sw=2 et:
