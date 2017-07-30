// @flow
import type babylon from 'babylon'
import React from 'react'
import { renderNode, renderNodeList, FunctionRenderer, ReservedKeywordRenderer, OpenBracketRenderer, ClosingBracketRenderer, OperatorRenderer, OperatorWithoutSpaceRenderer } from './JavaScriptASTRenderer.js'
import { ClassRenderer } from './class-renderers.js'

export const SuperRenderer = ({ node }: { node: babylon.Super }) => (
  <ReservedKeywordRenderer>super</ReservedKeywordRenderer>
)

export const ImportRenderer = ({ node }: { node: babylon.Import }) => (
  <ReservedKeywordRenderer>import</ReservedKeywordRenderer>
)

export const ThisExpressionRenderer = ({ node }: { node: babylon.ThisExpression }) => (
  <ReservedKeywordRenderer>this</ReservedKeywordRenderer>
)

export const ArrowFunctionExpressionRenderer = ({ node }: { node: babylon.ArrowFunctionExpression }) => (
  <span>
    <OpenBracketRenderer>(</OpenBracketRenderer>
    { node.params.map((param, i) => renderNode(param, i)) }
    <ClosingBracketRenderer>)</ClosingBracketRenderer>
    <OperatorRenderer>=></OperatorRenderer>
    { renderNode(node.body) }
  </span>
)

export const YieldExpressionRenderer = ({ node }: { node: babylon.YieldExpression }) => (
  <span>
    <ReservedKeywordRenderer>yield</ReservedKeywordRenderer>
    { node.delegate ? <OperatorRenderer>*</OperatorRenderer> : null }
    { renderNode(node.argument) }
  </span>
)

export const AwaitExpressionRenderer = ({ node }: { node: babylon.AwaitExpression }) => (
  <span>
    <ReservedKeywordRenderer>await</ReservedKeywordRenderer>
    { renderNode(node.argument) }
  </span>
)

export const ArrayExpressionRenderer = ({ node }: { node: babylon.ArrayExpression }) => (
  <span>
    <OpenBracketRenderer>[</OpenBracketRenderer>
    { node.elements.map((element, i) => renderNode(element, i)) }
    <ClosingBracketRenderer>]</ClosingBracketRenderer>
  </span>
)

export const ObjectExpressionRenderer = ({ node }: { node: babylon.ObjectExpression }) => (
  <span>
    <OpenBracketRenderer>{ '{' }</OpenBracketRenderer>
    { renderNodeList(node.properties, <OperatorRenderer>,</OperatorRenderer>) }
    <ClosingBracketRenderer>{ '}' }</ClosingBracketRenderer>
  </span>
)

export const ObjectPropertyRenderer = ({ node }: { node: babylon.ObjectProperty }) => (
  <span>
    { node.decorators ? node.decorators.map((decorator, i) => renderNode(decorator, i)) : null }
    { node.computed ? <OpenBracketRenderer>[</OpenBracketRenderer> : null }
    { renderNode(node.key) }
    { node.computed ? <ClosingBracketRenderer>]</ClosingBracketRenderer> : null }
    { node.shorthand ? null : <OperatorRenderer>:</OperatorRenderer> }
    { node.shorthand ? null : renderNode(node.value) }
  </span>
)

export const ObjectMethodRenderer = ({ node }: { node: babylon.ObjectMethod }) => (
  <span>
    { node.async ? <ReservedKeywordRenderer>async</ReservedKeywordRenderer> : null }
    { node.generator ? <OperatorRenderer>*</OperatorRenderer> : null }
    { node.kind !== 'method' ? <ReservedKeywordRenderer>node.kind</ReservedKeywordRenderer> : null }
    { node.computed ? <OpenBracketRenderer>[</OpenBracketRenderer> : null }
    { renderNode(node.key) }
    { node.computed ? <ClosingBracketRenderer>]</ClosingBracketRenderer> : null }

    <OpenBracketRenderer>(</OpenBracketRenderer>
    { node.params.map((param, i) => { renderNode(param, i) }) }
    <ClosingBracketRenderer>)</ClosingBracketRenderer>
    { renderNode(node.body) }
  </span>
)

export const FunctionExpressionRenderer = ({ node }: { node: babylon.FunctionExpression }) => (
  <span>
    <FunctionRenderer node={ node } />
  </span>
)

export const UnaryExpressionRenderer = ({ node }: { node: babylon.UnaryExpression }) => (
  <span>
    { node.prefix ? <OperatorRenderer>{ node.operator }</OperatorRenderer> : null }
    { renderNode(node.argument) }
    { !node.prefix ? <OperatorRenderer>{ node.operator }</OperatorRenderer> : null }
  </span>
)

export const UpdateExpressionRenderer = ({ node }: { node: babylon.UpdateExpression }) => (
  <span>
    { node.prefix ? <OperatorRenderer>node.operator</OperatorRenderer> : null }
    { renderNode(node.argument) }
    { !node.prefix ? <OperatorRenderer>node.operator</OperatorRenderer> : null }
  </span>
)

export const BinaryExpressionRenderer = ({ node }: { node: babylon.BinaryExpression }) => (
  <span>
    { renderNode(node.left) }
    <OperatorRenderer>{ node.operator }</OperatorRenderer>
    { renderNode(node.right) }
  </span>
)

// NOTE: Because `Expression`s are `Pattern`, `node.left` can be rendered correctly if it is an `Expression`.
export const AssignmentExpressionRenderer = ({ node }: { node: babylon.AssignmentPattern }) => (
  <span>
    { renderNode(node.left) }
    <OperatorRenderer>{ node.operator }</OperatorRenderer>
    { renderNode(node.right) }
  </span>
)

export const LogicalExpressionRenderer = ({ node }: { node: babylon.LogicalExpression }) => (
  <span>
    { renderNode(node.left) }
    <OperatorRenderer>{ node.operator }</OperatorRenderer>
    { renderNode(node.right) }
  </span>
)

export const SpreadElementRenderer = ({ node }: { node: babylon.SpreadElement }) => (
  <span>
    <OperatorRenderer>...</OperatorRenderer>
    { renderNode(node.argument) }
  </span>
)

export const MemberExpressionRenderer = ({ node }: { node: babylon.MemberExpression }) => (
  <span>
    { renderNode(node.object) }
    { node.computed ? <OpenBracketRenderer>[</OpenBracketRenderer> : null }
    { node.computed ? null : <OperatorWithoutSpaceRenderer>.</OperatorWithoutSpaceRenderer> }
    { renderNode(node.property) }
    { node.computed ? <ClosingBracketRenderer>]</ClosingBracketRenderer> : null }
  </span>
)

export const BindExpressionRenderer = ({ node }: { node: babylon.BindExpression }) => (
  <span>
    { renderNode(node.object) }
    <OperatorRenderer>::</OperatorRenderer>
    { renderNode(node.callee) }
  </span>
)

export const ConditionalExpressionRenderer = ({ node }: { node: babylon.ConditionalExpression }) => (
  <span>
    { renderNode(node.test) }
    <OperatorRenderer>?</OperatorRenderer>
    { renderNode(node.consequent) }
    <OperatorRenderer>:</OperatorRenderer>
    { renderNode(node.alternate) }
  </span>
)

// NOTE: Because `Super` and `Import` are `Expression`, `node.callee` can always be rendered correctly.
export const CallExpressionRenderer = ({ node }: { node: babylon.CallExpression }) => (
  <span>
    { renderNode(node.callee) }
    <OpenBracketRenderer>(</OpenBracketRenderer>
    { renderNodeList(node.arguments, <OperatorRenderer>,</OperatorRenderer>) }
    <ClosingBracketRenderer>)</ClosingBracketRenderer>
  </span>
)

export const NewExpressionRenderer = ({ node }: { node: babylon.NewExpression }) => (
  <span>
    <ReservedKeywordRenderer>new</ReservedKeywordRenderer>
    { renderNode(node.callee) }
    <OpenBracketRenderer>(</OpenBracketRenderer>
    { node.arguments.map((argument, i) => renderNode(argument, i)) }
    <ClosingBracketRenderer>)</ClosingBracketRenderer>
  </span>
)

// WIP. put comma.
export const SequenceExpressionRenderer = ({ node }: { node: babylon.SequenceExpression }) => (
  <span>
    { node.expressions.map((expression, i) => renderNode(expression, i)) }
  </span>
)

export const DoExpressionRenderer = ({ node }: { node: babylon.DoExpression }) => (
  <span>
    <ReservedKeywordRenderer>do</ReservedKeywordRenderer>
    { renderNode(node.body) }
  </span>
)

export const ClassExpressionRenderer = ({ node }: { node: babylon.ClassExpression }) => (
  <ClassRenderer node={ node } />
)

// vim: set ts=2 sw=2 et:
