// @flow
import type babylon from 'babylon'
import * as React from 'react'
import { renderNode, FunctionRenderer } from './JavaScriptASTRenderer.js'
import { ClassRenderer } from './class-renderers.js'

export const FunctionDeclarationRenderer = ({ node }: { node: babylon.FunctionDeclaration }) => (
  <FunctionRenderer node={ node } />
)

export const VariableDeclarationRenderer = ({ node }: { node: babylon.VariableDeclaration }) => (
  <span>
    <span>{ node.kind }</span>
    { node.declarations.map((declaration, i) => <VariableDeclaratorRenderer key={ i } node={ declaration } />) }
  </span>
)

export const VariableDeclaratorRenderer = ({ node }: { node: babylon.VariableDeclarator }) => (
  <span>
    { renderNode(node.id) }
    { node.init !== null ? <span>=</span> : null }
    { renderNode(node.init) }
  </span>
)

export const ClassDeclarationReenderer = ({ node }: { node: babylon.ClassDeclaration }) => (
  <ClassRenderer node={ node } />
)

// vim: set ts=2 sw=2 et:
