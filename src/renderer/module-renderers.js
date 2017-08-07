// @flow
import type babylon from 'babylon'
import React from 'react'
import { NodeRenderer, NodeWrapper, ReservedKeywordRenderer, OperatorRenderer, BracketRenderer } from './JavaScriptASTRenderer.js'
import { FunctionDeclarationRenderer, ClassDeclarationRenderer } from './declaration-renderers.js'

export const ImportDeclarationRenderer = ({ node }: { node: babylon.ImportDeclaration }) => (
  <NodeWrapper>
    <div>
      <ReservedKeywordRenderer>import</ReservedKeywordRenderer>
      { node.specifiers.map((specifier, i) => <NodeRenderer key={ i } node={ specifier } />) }
      <ReservedKeywordRenderer>from</ReservedKeywordRenderer>
      <NodeRenderer node={ node.source } />
    </div>
  </NodeWrapper>
)

export const ImportSpecifierRenderer = ({ node }: { node: babylon.ImportSpecifier }) => (
  <NodeWrapper>
    <span>
      <BracketRenderer bracket="{" />
      <NodeRenderer node={ node.imported } />
      <ReservedKeywordRenderer>as</ReservedKeywordRenderer>
      <NodeRenderer node={ node.local } />
      <BracketRenderer bracket="}" />
    </span>
  </NodeWrapper>
)

export const ImportDefaultSpecifierRenderer = ({ node }: { node: babylon.ImportDefaultSpecifier }) => (
  <NodeWrapper>
    <NodeRenderer node={ node.local } />
  </NodeWrapper>
)

export const ImportNamespaceSpecifierRenderer = ({ node }: { node: babylon.ImportNamespaceSpecifier }) => (
  <NodeWrapper>
    <span>
      <OperatorRenderer>*</OperatorRenderer>
      <ReservedKeywordRenderer>as</ReservedKeywordRenderer>
      <NodeRenderer node={ node.local } />
    </span>
  </NodeWrapper>
)

export const ExportNamedDeclarationRenderer = ({ node }: { node: babylon.ExportNamedDeclaration }) => (
  <NodeWrapper>
    <div className="export-named-declaration">
      <ReservedKeywordRenderer>export</ReservedKeywordRenderer>
      <NodeRenderer node={ node.declaration } />
      { node.specifiers.map((specifier, i) => <NodeRenderer key={ i } node={ specifier } />) }
      { node.source !== null ? <ReservedKeywordRenderer>from</ReservedKeywordRenderer> : null }
      <NodeRenderer node={ node.source } />
    </div>
  </NodeWrapper>
)

export const ExportSpecifierRenderer = ({ node }: { node: babylon.ExportSpecifier }) => (
  <NodeWrapper>
    <span>
      <NodeRenderer node={ node.local } />
      <ReservedKeywordRenderer>as</ReservedKeywordRenderer>
      <NodeRenderer node={ node.exported } />
    </span>
  </NodeWrapper>
)

export const ExportDefaultDeclarationRenderer = ({ node }: { node: babylon.ExportDefaultDeclaration }) => (
  <NodeWrapper>
    <div>
      <ReservedKeywordRenderer>export</ReservedKeywordRenderer>
      <ReservedKeywordRenderer>default</ReservedKeywordRenderer>
      <NodeRenderer node={ node.declaration } />
    </div>
  </NodeWrapper>
)

const OptFunctionDeclarationRenderer = ({ node }: { node: babylon.OptFunctionDeclaration }) => (
  <NodeWrapper>
    <span>
      <FunctionDeclarationRenderer node={ node } />
    </span>
  </NodeWrapper>
)

const OptClassDeclarationRenderer = ({ node }: { node: babylon.OptClassDeclaration }) => (
  <NodeWrapper>
    <span>
      <ClassDeclarationRenderer node={ node } />
    </span>
  </NodeWrapper>
)

export const ExportAllDeclarationRenderer = ({ node }: { node: babylon.ExportAllDeclaration }) => (
  <NodeWrapper>
    <div>
      <ReservedKeywordRenderer>export</ReservedKeywordRenderer>
      <OperatorRenderer>*</OperatorRenderer>
      <ReservedKeywordRenderer>from</ReservedKeywordRenderer>
      <NodeRenderer node={ node.source } />
    </div>
  </NodeWrapper>
)

// vim: set ts=2 sw=2 et:
