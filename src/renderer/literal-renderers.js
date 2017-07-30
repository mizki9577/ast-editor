// @flow
import type babylon from 'babylon'
import React from 'react'

export const RegExpLiteralRenderer = ({ node }: { node: babylon.RegExpLiteral }) => (
  <span className="ms-fontColor-themeTertiary">
    <span>/</span>
    <span>{ node.pattern }</span>
    <span>/</span>
    <span>{ node.flags }</span>
  </span>
)

export const NullLiteralRenderer = ({ node }: { node: babylon.NullLiteral }) => (
  <span className="ms-fontColor-themeTertiary">
    null
  </span>
)

export const StringLiteralRenderer = ({ node }: { node: babylon.StringLiteral }) => (
  <span className="ms-fontColor-themeTertiary">
    <span>'</span>
    <span>{ node.value }</span>
    <span>'</span>
  </span>
)

export const BooleanLiteralRenderer = ({ node }: { node: babylon.BooleanLiteral }) => (
  <span className="ms-fontColor-themeTertiary">
    { String(node.value) }
  </span>
)

export const NumericLiteralRenderer = ({ node }: { node: babylon.NumericLiteral }) => (
  <span className="ms-fontColor-themeTertiary">
    { String(node.value) }
  </span>
)

// vim: set ts=2 sw=2 et:
