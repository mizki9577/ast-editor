// @flow
import type babylon from 'babylon'
import React from 'react'
import { renderNode, FunctionRenderer } from './JavaScriptASTRenderer.js'
import { ClassRenderer } from './class-renderers.js'

export const SuperRenderer = ({ node }: { node: babylon.Super }) => (
  <span>super</span>
)

export const ImportRenderer = ({ node }: { node: babylon.Import }) => (
  <span>import</span>
)

export const ThisExpressionRenderer = ({ node }: { node: babylon.ThisExpression }) => (
  <span>this</span>
)

export const ArrowFunctionExpressionRenderer = ({ node }: { node: babylon.ArrowFunctionExpression }) => (
  <span>
    <span>(</span>
    { node.params.map((param, i) => renderNode(param, i)) }
    <span>)</span>
    <span>=></span>
    { renderNode(node.body) }
  </span>
)

export const YieldExpressionRenderer = ({ node }: { node: babylon.YieldExpression }) => (
  <span>
    <span>yield</span>
    { node.delegate ? <span>*</span> : null }
    { renderNode(node.argument) }
  </span>
)

export const AwaitExpressionRenderer = ({ node }: { node: babylon.AwaitExpression }) => (
  <span>
    <span>await</span>
    { renderNode(node.argument) }
  </span>
)

export const ArrayExpressionRenderer = ({ node }: { node: babylon.ArrayExpression }) => (
  <span>
    <span>[</span>
    { node.elements.map((element, i) => renderNode(element, i)) }
    <span>]</span>
  </span>
)

export const ObjectExpressionRenderer = ({ node }: { node: babylon.ObjectExpression }) => (
  <span>
    <span>{ '{' }</span>
    { node.properties.map((property, i) => renderNode(property, i)) }
    <span>{ '}' }</span>
  </span>
)

export const ObjectPropertyRenderer = ({ node }: { node: babylon.ObjectProperty }) => (
  <span>
    { node.decorators ? node.decorators.map((decorator, i) => renderNode(decorator, i)) : null }
    { node.computed ? <span>[</span> : null }
    { renderNode(node.key) }
    { node.computed ? <span>]</span> : null }
    { node.shorthand ? null : <span>:</span> }
    { node.shorthand ? null : renderNode(node.value) }
  </span>
)

export const ObjectMethodRenderer = ({ node }: { node: babylon.ObjectMethod }) => (
  <span>
    { node.async ? <span>async</span> : null }
    { node.generator ? <span>*</span> : null }
    { node.kind !== 'method' ? <span>node.kind</span> : null }
    { node.computed ? <span>[</span> : null }
    { renderNode(node.key) }
    { node.computed ? <span>]</span> : null }

    <span>(</span>
    { node.params.map((param, i) => { renderNode(param, i) }) }
    <span>)</span>
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
    { node.prefix ? <span>{ node.operator }</span> : null }
    { renderNode(node.argument) }
    { !node.prefix ? <span>{ node.operator }</span> : null }
  </span>
)

export const UpdateExpressionRenderer = ({ node }: { node: babylon.UpdateExpression }) => (
  <span>
    { node.prefix ? <span>node.operator</span> : null }
    { renderNode(node.argument) }
    { !node.prefix ? <span>node.operator</span> : null }
  </span>
)

export const BinaryExpressionRenderer = ({ node }: { node: babylon.BinaryExpression }) => (
  <span>
    { renderNode(node.left) }
    <span>{ node.operator }</span>
    { renderNode(node.right) }
  </span>
)

// NOTE: Because `Expression`s are `Pattern`, `node.left` can be rendered correctly if it is an `Expression`.
export const AssignmentExpressionRenderer = ({ node }: { node: babylon.AssignmentPattern }) => (
  <span>
    { renderNode(node.left) }
    <span>{ node.operator }</span>
    { renderNode(node.right) }
  </span>
)

export const LogicalExpressionRenderer = ({ node }: { node: babylon.LogicalExpression }) => (
  <span>
    { renderNode(node.left) }
    <span>{ node.operator }</span>
    { renderNode(node.right) }
  </span>
)

export const SpreadElementRenderer = ({ node }: { node: babylon.SpreadElement }) => (
  <span>
    <span>...</span>
    { renderNode(node.argument) }
  </span>
)

export const MemberExpressionRenderer = ({ node }: { node: babylon.MemberExpression }) => (
  <span>
    { renderNode(node.object) }
    { node.computed ? <span>[</span> : null }
    { node.computed ? null : <span>.</span> }
    { renderNode(node.property) }
    { node.computed ? <span>]</span> : null }
  </span>
)

export const BindExpressionRenderer = ({ node }: { node: babylon.BindExpression }) => (
  <span>
    { renderNode(node.object) }
    <span>::</span>
    { renderNode(node.callee) }
  </span>
)

export const ConditionalExpressionRenderer = ({ node }: { node: babylon.ConditionalExpression }) => (
  <span>
    { renderNode(node.test) }
    <span>?</span>
    { renderNode(node.consequent) }
    <span>:</span>
    { renderNode(node.alternate) }
  </span>
)

// NOTE: Because `Super` and `Import` are `Expression`, `node.callee` can always be rendered correctly.
export const CallExpressionRenderer = ({ node }: { node: babylon.CallExpression }) => (
  <span>
    { renderNode(node.callee) }
    <span>(</span>
    { node.arguments.map((argument, i) => renderNode(argument, i)) }
    <span>)</span>
  </span>
)

export const NewExpressionRenderer = ({ node }: { node: babylon.NewExpression }) => (
  <span>
    <span>new</span>
    { renderNode(node.callee) }
    <span>(</span>
    { node.arguments.map((argument, i) => renderNode(argument, i)) }
    <span>)</span>
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
    <span>do</span>
    { renderNode(node.body) }
  </span>
)

export const ClassExpressionRenderer = ({ node }: { node: babylon.ClassExpression }) => (
  <ClassRenderer node={ node } />
)

// vim: set ts=2 sw=2 et:
