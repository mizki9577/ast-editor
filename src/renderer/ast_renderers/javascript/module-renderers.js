// @flow
import type babylon from 'babylon'
import React from 'react'
import { NodeRenderer, NodeWrapper, BracketRenderer, PunctuationRenderer } from './index.js'
import { FunctionDeclarationRenderer, ClassDeclarationRenderer } from './declaration-renderers.js'
import * as reservedKeywords from './reserved-keywords.js'

export const ImportDeclarationRenderer = ({ node }: { node: babylon.ImportDeclaration }) => (
  <NodeWrapper block>
    <reservedKeywords.Import />
    { node.specifiers.map((specifier, i) => <NodeRenderer key={ i } node={ specifier } />) }
    <reservedKeywords.From />
    <NodeRenderer node={ node.source } />
  </NodeWrapper>
)

export const ImportSpecifierRenderer = ({ node }: { node: babylon.ImportSpecifier }) => (
  <NodeWrapper inline>
    <BracketRenderer bracket="{" />
    <NodeRenderer node={ node.imported } />
    <reservedKeywords.As />
    <NodeRenderer node={ node.local } />
    <BracketRenderer bracket="}" />
  </NodeWrapper>
)

export const ImportDefaultSpecifierRenderer = ({ node }: { node: babylon.ImportDefaultSpecifier }) => (
  <NodeWrapper inline>
    <NodeRenderer node={ node.local } />
  </NodeWrapper>
)

export const ImportNamespaceSpecifierRenderer = ({ node }: { node: babylon.ImportNamespaceSpecifier }) => (
  <NodeWrapper inline>
    <PunctuationRenderer punctuation="*" />
    <reservedKeywords.As />
    <NodeRenderer node={ node.local } />
  </NodeWrapper>
)

export const ExportNamedDeclarationRenderer = ({ node }: { node: babylon.ExportNamedDeclaration }) => (
  <NodeWrapper block className="export-named-declaration">
    <reservedKeywords.Export />
    <NodeRenderer node={ node.declaration } />
    { node.specifiers.map((specifier, i) => <NodeRenderer key={ i } node={ specifier } />) }
    { node.source !== null ? <reservedKeywords.From /> : null }
    <NodeRenderer node={ node.source } />
  </NodeWrapper>
)

export const ExportSpecifierRenderer = ({ node }: { node: babylon.ExportSpecifier }) => (
  <NodeWrapper inline>
    <NodeRenderer node={ node.local } />
    <reservedKeywords.As />
    <NodeRenderer node={ node.exported } />
  </NodeWrapper>
)

export const ExportDefaultDeclarationRenderer = ({ node }: { node: babylon.ExportDefaultDeclaration }) => (
  <NodeWrapper block>
    <reservedKeywords.Export />
    <reservedKeywords.Default />
    <NodeRenderer node={ node.declaration } />
  </NodeWrapper>
)

const OptFunctionDeclarationRenderer = ({ node }: { node: babylon.OptFunctionDeclaration }) => (
  <NodeWrapper inline>
    <FunctionDeclarationRenderer node={ node } />
  </NodeWrapper>
)

const OptClassDeclarationRenderer = ({ node }: { node: babylon.OptClassDeclaration }) => (
  <NodeWrapper inline>
    <ClassDeclarationRenderer node={ node } />
  </NodeWrapper>
)

export const ExportAllDeclarationRenderer = ({ node }: { node: babylon.ExportAllDeclaration }) => (
  <NodeWrapper block>
    <reservedKeywords.Export />
    <PunctuationRenderer punctuation="*" />
    <reservedKeywords.From />
    <NodeRenderer node={ node.source } />
  </NodeWrapper>
)

// vim: set ts=2 sw=2 et:
