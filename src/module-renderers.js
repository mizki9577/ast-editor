// @flow
import type babylon from 'babylon'
import React from 'react'
import { UnknownNodeRenderer, IdentifierRenderer } from './JavaScriptASTRenderer.js'
import { renderDeclaration, FunctionDeclarationRenderer, ClassDeclarationReenderer } from './declaration-renderers.js'
import { renderExpression } from './expression-renderers.js'
import { renderLiteral } from './literal-renderers.js'

export const renderModuleDeclaration = (node: babylon.ModuleDeclaration) => {
  switch (node.type) {
    case 'ImportDeclaration':
      return <ImportDeclarationRenderer node={ node } />

    case 'ExportNamedDeclaration':
      return <ExportNamedDeclarationRenderer node={ node } />

    case 'ExportDefaultDeclaration':
      return <ExportDefaultDeclarationRenderer node={ node } />

    case 'ExportAllDeclaration':
      return <ExportAllDeclarationRenderer node={ node } />

    default:
      return <UnknownNodeRenderer node={ node } />
  }
}

const ImportDeclarationRenderer = ({ node }: { node: babylon.ImportDeclaration }) => (
  <div>
    <span>import</span>
    { node.specifiers.map(specifier => (
      specifier.type === 'ImportSpecifier'              ? <ImportSpecifierRenderer node={ specifier } />:
      specifier.type === 'ImportDefaultSpecifier'       ? <ImportDefaultSpecifierRenderer node={ specifier } />:
      /* specifier.type === 'ImportNamespaceSpecifier' */ <ImportNamespaceSpecifierRenderer node={ specifier } />
    )) }
    <span>from</span>
    { renderLiteral(node.source) }
    <span>;</span>
  </div>
)

const ImportSpecifierRenderer = ({ node }: { node: babylon.ImportSpecifier }) => (
  <span>
    <span>{ '{' }</span>
    <IdentifierRenderer node={ node.imported } />
    <span>as</span>
    <IdentifierRenderer node={ node.local } />
    <span>{ '}' }</span>
  </span>
)

const ImportDefaultSpecifierRenderer = ({ node }: { node: babylon.ImportDefaultSpecifier }) => (
  <IdentifierRenderer node={ node.local } />
)

const ImportNamespaceSpecifierRenderer = ({ node }: { node: babylon.ImportNamespaceSpecifier }) => (
  <span>
    <span>*</span>
    <span>as</span>
    <IdentifierRenderer node={ node.local } />
  </span>
)

const ExportNamedDeclarationRenderer = ({ node }: { node: babylon.ExportNamedDeclaration }) => (
  <div>
    <span>export</span>
    { node.declaration !== null ? renderDeclaration(node.declaration) : null }
    { node.specifiers.map(specifier => <ExportSpecifierRenderer node={ specifier } />) }
    { node.source !== null ? <span>from</span> : null }
    { node.source !== null ? renderLiteral(node.source) : null }
    <span>;</span>
  </div>
)

const ExportSpecifierRenderer = ({ node }: { node: babylon.ExportSpecifier }) => (
  <span>
    <IdentifierRenderer node={ node.local } />
    <span>as</span>
    <IdentifierRenderer node={ node.exported } />
  </span>
)

const ExportDefaultDeclarationRenderer = ({ node }: { node: babylon.ExportDefaultDeclaration }) => (
  <div>
    <span>export</span>
    <span>default</span>
    { node.declaration.type === 'OptFunctionDeclaration' ? <OptFunctionDeclarationRenderer node={ node.declaration } />:
      node.declaration.type === 'OptClassDeclaration'    ? <OptClassDeclarationRenderer node={ node.declaration } />:
      /* node.declaration.type === 'Expression' */         renderExpression(node.declaration)
    }
    <span>;</span>
  </div>
)

const OptFunctionDeclarationRenderer = ({ node }: { node: babylon.OptFunctionDeclaration }) => (
  <FunctionDeclarationRenderer node={ node } />
)

const OptClassDeclarationRenderer = ({ node }: { node: babylon.OptClassDeclaration }) => (
  <ClassDeclarationReenderer node={ node } />
)

const ExportAllDeclarationRenderer = ({ node }: { node: babylon.ExportAllDeclaration }) => (
  <div>
    <span>export</span>
    <span>*</span>
    <span>from</span>
    { renderLiteral(node.source) }
    <span>;</span>
  </div>
)

// vim: set ts=2 sw=2 et:
