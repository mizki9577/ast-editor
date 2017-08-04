// @flow
import type babylon from 'babylon'
import React from 'react'
import { NodeRenderer, ReservedKeywordRenderer, OperatorRenderer, OpenBracketRenderer, ClosingBracketRenderer } from './JavaScriptASTRenderer.js'
import { FunctionDeclarationRenderer, ClassDeclarationReenderer } from './declaration-renderers.js'

export const ImportDeclarationRenderer = ({ node }: { node: babylon.ImportDeclaration }) => (
  <div>
    <ReservedKeywordRenderer>import</ReservedKeywordRenderer>
    { node.specifiers.map((specifier, i) => <NodeRenderer key={ i } node={ specifier } />) }
    <ReservedKeywordRenderer>from</ReservedKeywordRenderer>
    <NodeRenderer node={ node.source } />
  </div>
)

export const ImportSpecifierRenderer = ({ node }: { node: babylon.ImportSpecifier }) => (
  <span>
    <OpenBracketRenderer>{ '{' }</OpenBracketRenderer>
    <NodeRenderer node={ node.imported } />
    <ReservedKeywordRenderer>as</ReservedKeywordRenderer>
    <NodeRenderer node={ node.local } />
    <ClosingBracketRenderer>{ '}' }</ClosingBracketRenderer>
  </span>
)

export const ImportDefaultSpecifierRenderer = ({ node }: { node: babylon.ImportDefaultSpecifier }) => (
  <NodeRenderer node={ node.local } />
)

export const ImportNamespaceSpecifierRenderer = ({ node }: { node: babylon.ImportNamespaceSpecifier }) => (
  <span>
    <OperatorRenderer>*</OperatorRenderer>
    <ReservedKeywordRenderer>as</ReservedKeywordRenderer>
    <NodeRenderer node={ node.local } />
  </span>
)

export const ExportNamedDeclarationRenderer = ({ node }: { node: babylon.ExportNamedDeclaration }) => (
  <div className="export-named-declaration">
    <ReservedKeywordRenderer>export</ReservedKeywordRenderer>
    <NodeRenderer node={ node.declaration } />
    { node.specifiers.map((specifier, i) => <ExportSpecifierRenderer key={ i } node={ specifier } />) }
    { node.source !== null ? <ReservedKeywordRenderer>from</ReservedKeywordRenderer> : null }
    <NodeRenderer node={ node.source } />
  </div>
)

export const ExportSpecifierRenderer = ({ node }: { node: babylon.ExportSpecifier }) => (
  <span>
    <NodeRenderer node={ node.local } />
    <ReservedKeywordRenderer>as</ReservedKeywordRenderer>
    <NodeRenderer node={ node.exported } />
  </span>
)

export const ExportDefaultDeclarationRenderer = ({ node }: { node: babylon.ExportDefaultDeclaration }) => (
  <div>
    <ReservedKeywordRenderer>export</ReservedKeywordRenderer>
    <ReservedKeywordRenderer>default</ReservedKeywordRenderer>
    <NodeRenderer node={ node.declaration } />
  </div>
)

export const OptFunctionDeclarationRenderer = ({ node }: { node: babylon.OptFunctionDeclaration }) => (
  <FunctionDeclarationRenderer node={ node } />
)

export const OptClassDeclarationRenderer = ({ node }: { node: babylon.OptClassDeclaration }) => (
  <ClassDeclarationReenderer node={ node } />
)

export const ExportAllDeclarationRenderer = ({ node }: { node: babylon.ExportAllDeclaration }) => (
  <div>
    <ReservedKeywordRenderer>export</ReservedKeywordRenderer>
    <OperatorRenderer>*</OperatorRenderer>
    <ReservedKeywordRenderer>from</ReservedKeywordRenderer>
    <NodeRenderer node={ node.source } />
  </div>
)

// vim: set ts=2 sw=2 et:
