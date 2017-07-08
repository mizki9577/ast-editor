// @flow
import type babylon from 'babylon'
import React from 'react'
import { UnknownNodeRenderer } from './JavaScriptASTRenderer.js'

export const renderLiteral = (node: babylon.Literal) => {
  switch (node.type) {
    case 'RegExpLiteral':
      return <RegExpLiteralRenderer node={ node } />

    case 'NullLiteral':
      return <NullLiteralRenderer node={ node } />

    case 'StringLiteral':
      return <StringLiteralRenderer node={ node } />

    case 'BooleanLiteral':
      return <BooleanLiteralRenderer node={ node } />

    case 'NumericLiteral':
      return <NumericLiteralRenderer node={ node } />

    default:
      return <UnknownNodeRenderer node={ node } />
  }
}

const RegExpLiteralRenderer = ({ node }: { node: babylon.RegExpLiteral }) => (
  <span>
    <span>/</span>
    <span>{ node.pattern }</span>
    <span>/</span>
    <span>{ node.flags }</span>
  </span>
)

const NullLiteralRenderer = ({ node }: { node: babylon.NullLiteral }) => (
  <span>null</span>
)

const StringLiteralRenderer = ({ node }: { node: babylon.StringLiteral }) => (
  <span>
    <span>'</span>
    <span>{ node.value }</span>
    <span>'</span>
  </span>
)

const BooleanLiteralRenderer = ({ node }: { node: babylon.BooleanLiteral }) => (
  <span>{ String(node.value) }</span>
)

const NumericLiteralRenderer = ({ node }: { node: babylon.NumericLiteral }) => (
  <span>{ String(node.value) }</span>
)

// vim: set ts=2 sw=2 et:
