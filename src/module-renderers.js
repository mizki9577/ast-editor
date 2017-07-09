// @flow
import type babylon from 'babylon'
import React from 'react'
import { renderNode } from './JavaScriptASTRenderer.js'
import { FunctionDeclarationRenderer, ClassDeclarationReenderer } from './declaration-renderers.js'

export const ImportDeclarationRenderer = ({ node }: { node: babylon.ImportDeclaration }) => (
  <div>
    <span>import</span>
    { node.specifiers.map((specifier, i) => renderNode(specifier, i)) }
    <span>from</span>
    { renderNode(node.source) }
    <span>;</span>
  </div>
)

export const ImportSpecifierRenderer = ({ node }: { node: babylon.ImportSpecifier }) => (
  <span>
    <span>{ '{' }</span>
    { renderNode(node.imported) }
    <span>as</span>
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
    <span>as</span>
    { renderNode(node.local) }
  </span>
)

export const ExportNamedDeclarationRenderer = ({ node }: { node: babylon.ExportNamedDeclaration }) => (
  <div>
    <span>export</span>
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
    <span>as</span>
    { renderNode(node.exported) }
  </span>
)

export const ExportDefaultDeclarationRenderer = ({ node }: { node: babylon.ExportDefaultDeclaration }) => (
  <div>
    <span>export</span>
    <span>default</span>
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
    <span>export</span>
    <span>*</span>
    <span>from</span>
    { renderNode(node.source) }
    <span>;</span>
  </div>
)

// vim: set ts=2 sw=2 et:
