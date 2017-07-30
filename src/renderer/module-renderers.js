// @flow
import type babylon from 'babylon'
import React from 'react'
import { ReservedKeywordRenderer, renderNode } from './JavaScriptASTRenderer.js'
import { FunctionDeclarationRenderer, ClassDeclarationReenderer } from './declaration-renderers.js'

export const ImportDeclarationRenderer = ({ node }: { node: babylon.ImportDeclaration }) => (
  <div>
    <ReservedKeywordRenderer>import</ReservedKeywordRenderer>
    { node.specifiers.map((specifier, i) => renderNode(specifier, i)) }
    <ReservedKeywordRenderer>from</ReservedKeywordRenderer>
    { renderNode(node.source) }
    <span>;</span>
  </div>
)

export const ImportSpecifierRenderer = ({ node }: { node: babylon.ImportSpecifier }) => (
  <span>
    <span>{ '{' }</span>
    { renderNode(node.imported) }
    <ReservedKeywordRenderer>as</ReservedKeywordRenderer>
    { renderNode(node.local) }
    <span>{ '}' }</span>
  </span>
)

export const ImportDefaultSpecifierRenderer = ({ node }: { node: babylon.ImportDefaultSpecifier }) => (
  renderNode(node.local)
)

export const ImportNamespaceSpecifierRenderer = ({ node }: { node: babylon.ImportNamespaceSpecifier }) => (
  <span>
    <span>*</span>
    <ReservedKeywordRenderer>as</ReservedKeywordRenderer>
    { renderNode(node.local) }
  </span>
)

export const ExportNamedDeclarationRenderer = ({ node }: { node: babylon.ExportNamedDeclaration }) => (
  <div className="export-named-declaration">
    <ReservedKeywordRenderer>export</ReservedKeywordRenderer>
    { renderNode(node.declaration) }
    { node.specifiers.map((specifier, i) => <ExportSpecifierRenderer key={ i } node={ specifier } />) }
    { node.source !== null ? <span>from</span> : null }
    { renderNode(node.source) }
    <span>;</span>
  </div>
)

export const ExportSpecifierRenderer = ({ node }: { node: babylon.ExportSpecifier }) => (
  <span>
    { renderNode(node.local) }
    <ReservedKeywordRenderer>as</ReservedKeywordRenderer>
    { renderNode(node.exported) }
  </span>
)

export const ExportDefaultDeclarationRenderer = ({ node }: { node: babylon.ExportDefaultDeclaration }) => (
  <div>
    <ReservedKeywordRenderer>export</ReservedKeywordRenderer>
    <ReservedKeywordRenderer>default</ReservedKeywordRenderer>
    { renderNode(node.declaration) }
    <span>;</span>
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
    <span>*</span>
    <ReservedKeywordRenderer>from</ReservedKeywordRenderer>
    { renderNode(node.source) }
    <span>;</span>
  </div>
)

// vim: set ts=2 sw=2 et:
