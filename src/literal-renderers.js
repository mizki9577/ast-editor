// @flow
import type babylon from 'babylon'
import * as React from 'react'

export const RegExpLiteralRenderer = ({ node }: { node: babylon.RegExpLiteral }) => (
  <span>
    <span>/</span>
    <span>{ node.pattern }</span>
    <span>/</span>
    <span>{ node.flags }</span>
  </span>
)

export const NullLiteralRenderer = ({ node }: { node: babylon.NullLiteral }) => (
  <span>null</span>
)

export const StringLiteralRenderer = ({ node }: { node: babylon.StringLiteral }) => (
  <span>
    <span>'</span>
    <span>{ node.value }</span>
    <span>'</span>
  </span>
)

export const BooleanLiteralRenderer = ({ node }: { node: babylon.BooleanLiteral }) => (
  <span>{ String(node.value) }</span>
)

export const NumericLiteralRenderer = ({ node }: { node: babylon.NumericLiteral }) => (
  <span>{ String(node.value) }</span>
)

// vim: set ts=2 sw=2 et:
