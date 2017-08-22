// @flow
import type babylon from 'babylon'
import React from 'react'
import { NodeWrapper, PunctuationRenderer } from './index.js'
import * as reservedKeywords from './reserved-keywords.js'

export const RegExpLiteralRenderer = ({ node }: { node: babylon.RegExpLiteral }) => (
  <NodeWrapper inline className="ms-fontColor-themeTertiary">
    <PunctuationRenderer punctuation="/"/>
    <span>{ node.pattern }</span>
    <PunctuationRenderer punctuation="/"/>
    <span>{ node.flags }</span>
  </NodeWrapper>
)

export const NullLiteralRenderer = ({ node }: { node: babylon.NullLiteral }) => (
  <NodeWrapper inline className="ms-fontColor-themeTertiary">
    <reservedKeywords.Null />
  </NodeWrapper>
)

export const StringLiteralRenderer = ({ node }: { node: babylon.StringLiteral }) => (
  <NodeWrapper inline className="ms-fontColor-themeTertiary">
    <PunctuationRenderer punctuation="'" />
    <span>{ node.value }</span>
    <PunctuationRenderer punctuation="'" />
  </NodeWrapper>
)

export const BooleanLiteralRenderer = ({ node }: { node: babylon.BooleanLiteral }) => (
  <NodeWrapper inline className="ms-fontColor-themeTertiary">
    { node.value ? <reservedKeywords.True /> : <reservedKeywords.False /> }
  </NodeWrapper>
)

export const NumericLiteralRenderer = ({ node }: { node: babylon.NumericLiteral }) => (
  <NodeWrapper inline className="ms-fontColor-themeTertiary">
    { String(node.value) }
  </NodeWrapper>
)

// vim: set ts=2 sw=2 et:
