// @flow
import type babylon from 'babylon'

import React from 'react'
import * as literals from './literal-renderers.js'
import * as statements from './statement-renderers.js'
import * as expressions from './expression-renderers.js'
import * as declarations from './declaration-renderers.js'
import * as patterns from './pattern-renderers.js'
import * as modules from './module-renderers.js'

type File = babylon.Node & {
  type: 'File',
}

export const UnknownNodeRenderer = ({ node }: { node: babylon.Node }) => (
  <span>[{ node ? node.type : 'null' }]</span>
)

const FileRenderer = ({ node }: { node: File }) => (
  <ProgramRenderer node={ node.program } />
)

export const IdentifierRenderer = ({ node }: { node: babylon.Identifier }) => (
  <span>{ node.name }</span>
)

const PrivateNameRenderer = UnknownNodeRenderer

const ProgramRenderer = ({ node }: { node: babylon.Program }) => (
  <div>
    { node.directives.map(directive => <DirectiveRenderer node={ directive } />) }
    { node.body.map(child => (
      ['ImportDeclaration', 'ExportNamedDeclaration', 'ExportDefaultDeclaration', 'ExportAllDeclaration'].includes(child.type)
        ? modules.renderModuleDeclaration(child)
        : statements.renderStatement(child)
    )) }
  </div>
)

export const FunctionRenderer = ({ node }: { node: babylon.Function }) => (
  <span>
    <span>{ node.async ? 'async' : '' }</span>
    <span>function</span>
    <span>{ node.generator ? '*' : '' }</span>
    <span>{ node.id !== null ? <IdentifierRenderer node={ node.id } /> : null }</span>
    <span>(</span>
    <span>{ node.params.map(param => patterns.renderPattern(param)) }</span>
    <span>)</span>
    <statements.BlockStatementRenderer node={ node.body } />
  </span>
)

export const DecoratorRenderer = ({ node }: { node: babylon.Decorator }) => (
  <div>
    <span>@</span>
    { expressions.renderExpression(node.expression) }
  </div>
)

/*
const DirectiveRenderer = ({ node }: { node: babylon.Directive }) => (
  <div>
    <DirectiveLiteralRenderer node={ node.value } />
  </div>
)

const DirectiveLiteralRenderer = ({ node }: { node: babylon.DirectiveLiteral }) => (
  <span>{ node.value }</span>
)
*/
export const DirectiveRenderer = UnknownNodeRenderer
const DirectiveLiteralRenderer = UnknownNodeRenderer

export default FileRenderer
// vim: set ts=2 sw=2 et:
