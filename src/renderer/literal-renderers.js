// @flow
import type babylon from 'babylon'
import React from 'react'
import { NodeWrapper, QuoteRenderer } from './JavaScriptASTRenderer.js'

export const RegExpLiteralRenderer = ({ node }: { node: babylon.RegExpLiteral }) => (
  <NodeWrapper>
    <span className="ms-fontColor-themeTertiary">
      <span>/</span>
      <span>{ node.pattern }</span>
      <span>/</span>
      <span>{ node.flags }</span>
    </span>
  </NodeWrapper>
)

export const NullLiteralRenderer = ({ node }: { node: babylon.NullLiteral }) => (
  <NodeWrapper>
    <span className="ms-fontColor-themeTertiary">
      null
    </span>
  </NodeWrapper>
)

export const StringLiteralRenderer = ({ node }: { node: babylon.StringLiteral }) => (
  <NodeWrapper>
    <span className="ms-fontColor-themeTertiary">
      <QuoteRenderer>'</QuoteRenderer>
      <span>{ node.value }</span>
      <QuoteRenderer>'</QuoteRenderer>
    </span>
  </NodeWrapper>
)

export const BooleanLiteralRenderer = ({ node }: { node: babylon.BooleanLiteral }) => (
  <NodeWrapper>
    <span className="ms-fontColor-themeTertiary">
      { String(node.value) }
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
