// @flow
import type babylon from 'babylon'
import React from 'react'
import { NodeRenderer, NodeWrapper, OperatorRenderer, BracketRenderer } from './JavaScriptASTRenderer.js'
import { FunctionDeclarationRenderer, ClassDeclarationRenderer } from './declaration-renderers.js'
import * as reservedKeywords from './reserved-keywords.js'

export const ImportDeclarationRenderer = ({ node }: { node: babylon.ImportDeclaration }) => (
  <NodeWrapper>
    <div>
      <reservedKeywords.Import />
      { node.specifiers.map((specifier, i) => <NodeRenderer key={ i } node={ specifier } />) }
      <reservedKeywords.From />
      <NodeRenderer node={ node.source } />
    </div>
  </NodeWrapper>
)

export const ImportSpecifierRenderer = ({ node }: { node: babylon.ImportSpecifier }) => (
  <NodeWrapper>
    <span>
      <BracketRenderer bracket="{" />
      <NodeRenderer node={ node.imported } />
      <reservedKeywords.As />
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
      <reservedKeywords.As />
      <NodeRenderer node={ node.local } />
    </span>
  </NodeWrapper>
)

export const ExportNamedDeclarationRenderer = ({ node }: { node: babylon.ExportNamedDeclaration }) => (
  <NodeWrapper>
    <div className="export-named-declaration">
      <reservedKeywords.Export />
      <NodeRenderer node={ node.declaration } />
      { node.specifiers.map((specifier, i) => <NodeRenderer key={ i } node={ specifier } />) }
      { node.source !== null ? <reservedKeywords.From /> : null }
      <NodeRenderer node={ node.source } />
    </div>
  </NodeWrapper>
)

export const ExportSpecifierRenderer = ({ node }: { node: babylon.ExportSpecifier }) => (
  <NodeWrapper>
    <span>
      <NodeRenderer node={ node.local } />
      <reservedKeywords.As />
      <NodeRenderer node={ node.exported } />
    </span>
  </NodeWrapper>
)

export const ExportDefaultDeclarationRenderer = ({ node }: { node: babylon.ExportDefaultDeclaration }) => (
  <NodeWrapper>
    <div>
      <reservedKeywords.Export />
      <reservedKeywords.Default />
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
      <reservedKeywords.Export />
      <OperatorRenderer>*</OperatorRenderer>
      <reservedKeywords.From />
      <NodeRenderer node={ node.source } />
    </div>
  </NodeWrapper>
)

// vim: set ts=2 sw=2 et:
