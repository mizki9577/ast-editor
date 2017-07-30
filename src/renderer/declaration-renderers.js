// @flow
import type babylon from 'babylon'
import React from 'react'
import { renderNode, FunctionRenderer, ReservedKeywordRenderer, OperatorRenderer } from './JavaScriptASTRenderer.js'
import { ClassRenderer } from './class-renderers.js'

export const FunctionDeclarationRenderer = ({ node }: { node: babylon.FunctionDeclaration }) => (
  <FunctionRenderer node={ node } />
)

export const VariableDeclarationRenderer = ({ node }: { node: babylon.VariableDeclaration }) => (
  <span className="variable-declaration">
    <ReservedKeywordRenderer>{ node.kind /* var, let , const */ }</ReservedKeywordRenderer>
    { node.declarations.map((declaration, i) => <VariableDeclaratorRenderer key={ i } node={ declaration } />) }
  </span>
)

export const VariableDeclaratorRenderer = ({ node }: { node: babylon.VariableDeclarator }) => (
  <span>
    { renderNode(node.id) }
    { node.init !== null ? <OperatorRenderer>=</OperatorRenderer> : null }
    { renderNode(node.init) }
  </span>
)

export const ClassDeclarationReenderer = ({ node }: { node: babylon.ClassDeclaration }) => (
  <ClassRenderer node={ node } />
)

// vim: set ts=2 sw=2 et:
