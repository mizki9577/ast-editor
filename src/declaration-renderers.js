// @flow
import type babylon from 'babylon'
import React from 'react'
import { UnknownNodeRenderer, FunctionRenderer } from './JavaScriptASTRenderer.js'
import { renderExpression } from './expression-renderers.js'
import { renderPattern } from './pattern-renderers.js'
import { ClassRenderer } from './class-renderers.js'

export const renderDeclaration = (node: babylon.Declaration, key: ?number) => {
  switch (node.type) {
    case 'FunctionDeclaration':
      return <FunctionDeclarationRenderer key={ key } node={ node } />

    case 'VariableDeclaration':
      return <VariableDeclarationRenderer key={ key } node={ node } />

    case 'ClassDeclaration':
      return <ClassDeclarationReenderer key={ key } node={ node } />

    default:
      return <UnknownNodeRenderer key={ key } node={ node } />
  }
}

export const FunctionDeclarationRenderer = ({ node }: { node: babylon.FunctionDeclaration }) => (
  <FunctionRenderer node={ node } />
)

export const VariableDeclarationRenderer = ({ node }: { node: babylon.VariableDeclaration }) => (
  <span>
    <span>{ node.kind }</span>
    { node.declarations.map((declaration, i) => <VariableDeclaratorRenderer key={ i } node={ declaration } />) }
  </span>
)

const VariableDeclaratorRenderer = ({ node }: { node: babylon.VariableDeclarator }) => (
  <span>
    { renderPattern(node.id) }
    { node.init !== null ? <span>=</span> : null }
    { node.init !== null ? renderExpression(node.init) : null }
  </span>
)

export const ClassDeclarationReenderer = ({ node }: { node: babylon.ClassDeclaration }) => (
  <ClassRenderer node={ node } />
)

// vim: set ts=2 sw=2 et:
