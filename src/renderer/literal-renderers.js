// @flow
import type babylon from 'babylon'
import React from 'react'
import { NodeWrapper, PunctuationRenderer } from './JavaScriptASTRenderer.js'
import * as reservedKeywords from './reserved-keywords.js'

export const RegExpLiteralRenderer = ({ node }: { node: babylon.RegExpLiteral }) => (
  <NodeWrapper>
    <span className="ms-fontColor-themeTertiary">
      <PunctuationRenderer punctuation="/"/>
      <span>{ node.pattern }</span>
      <PunctuationRenderer punctuation="/"/>
      <span>{ node.flags }</span>
    </span>
  </NodeWrapper>
)

export const NullLiteralRenderer = ({ node }: { node: babylon.NullLiteral }) => (
  <NodeWrapper>
    <span className="ms-fontColor-themeTertiary">
      <reservedKeywords.Null />
    </span>
  </NodeWrapper>
)

export const StringLiteralRenderer = ({ node }: { node: babylon.StringLiteral }) => (
  <NodeWrapper>
    <span className="ms-fontColor-themeTertiary">
      <PunctuationRenderer punctuation="'" />
      <span>{ node.value }</span>
      <PunctuationRenderer punctuation="'" />
    </span>
  </NodeWrapper>
)

export const BooleanLiteralRenderer = ({ node }: { node: babylon.BooleanLiteral }) => (
  <NodeWrapper>
    <span className="ms-fontColor-themeTertiary">
      { node.value ? <reservedKeywords.True /> : <reservedKeywords.False /> }
    </span>
  </NodeWrapper>
)

export const NumericLiteralRenderer = ({ node }: { node: babylon.NumericLiteral }) => (
  <NodeWrapper>
    <span className="ms-fontColor-themeTertiary">
      { String(node.value) }
    </span>
  </NodeWrapper>
)

// vim: set ts=2 sw=2 et:
