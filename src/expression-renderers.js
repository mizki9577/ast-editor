// @flow
import type babylon from 'babylon'
import React from 'react'
import { UnknownNodeRenderer, IdentifierRenderer, FunctionRenderer, DecoratorRenderer } from './JavaScriptASTRenderer.js'
import { renderLiteral } from './literal-renderers.js'
import { renderPattern } from './pattern-renderers.js'
import { BlockStatementRenderer } from './statement-renderers.js'
import { ClassRenderer } from './class-renderers.js'

export const renderExpression = (node: babylon.Expression, key: ?number) => {
  switch (node.type) {
    case 'Super':
      return <SuperRenderer key={ key } node={ node } />

    case 'Import':
      return <ImportRenderer key={ key } node={ node } />

    case 'ThisExpression':
      return <ThisExpressionRenderer key={ key } node={ node } />

    case 'ArrowFunctionExpression':
      return <ArrowFunctionExpressionRenderer key={ key } node={ node } />

    case 'YieldExpression':
      return <YieldExpressionRenderer key={ key } node={ node } />

    case 'AwaitExpression':
      return <AwaitExpressionRenderer key={ key } node={ node } />

    case 'ArrayExpression':
      return <ArrayExpressionRenderer key={ key } node={ node } />

    case 'ObjectExpression':
      return <ObjectExpressionRenderer key={ key } node={ node } />

    case 'FunctionExpression':
      return <FunctionExpressionRenderer key={ key } node={ node } />

    case 'UnaryExpression':
      return <UnaryExpressionRenderer key={ key } node={ node } />

    case 'UpdateExpression':
      return <UpdateExpressionRenderer key={ key } node={ node } />

    case 'BinaryExpression':
      return <BinaryExpressionRenderer key={ key } node={ node } />

    case 'AssignmentExpression':
      return <AssignmentExpressionRenderer key={ key } node={ node } />

    case 'LogicalExpression':
      return <LogicalExpressionRenderer key={ key } node={ node } />

    case 'MemberExpression':
      return <MemberExpressionRenderer key={ key } node={ node } />

    case 'BindExpression':
      return <BindExpressionRenderer key={ key } node={ node } />

    case 'ConditionalExpression':
      return <ConditionalExpressionRenderer key={ key } node={ node } />

    case 'CallExpression':
      return <CallExpressionRenderer key={ key } node={ node } />

    case 'NewExpression':
      return <NewExpressionRenderer key={ key } node={ node } />

    case 'SequenceExpression':
      return <SequenceExpressionRenderer key={ key } node={ node } />

    case 'DoExpression':
      return <DoExpressionRenderer key={ key } node={ node } />

    case 'Identifier':
      return <IdentifierRenderer key={ key } node={ node } />

    case 'ClassExpression':
      return <ClassExpressionRenderer key={ key } node={ node } />

    case 'MetaProperty':
      return <MetaPropertyRenderer key={ key } node={ node } />

    default:
      return renderLiteral(node, key)
  }
}

const SuperRenderer = ({ node }: { node: babylon.Super }) => (
  <span>super</span>
)

const ImportRenderer = ({ node }: { node: babylon.Import }) => (
  <span>import</span>
)

const ThisExpressionRenderer = ({ node }: { node: babylon.ThisExpression }) => (
  <span>this</span>
)

const ArrowFunctionExpressionRenderer = ({ node }: { node: babylon.ArrowFunctionExpression }) => (
  <span>
    <span>(</span>
    { node.params.map((param, i) => { renderPattern(param, i) }) }
    <span>)</span>
    <span>=></span>
    { node.expression ? renderExpression(node.body) : <BlockStatementRenderer node={ node.body } /> }
  </span>
)

const YieldExpressionRenderer = ({ node }: { node: babylon.YieldExpression }) => (
  <span>
    <span>yield</span>
    { node.delegate ? <span>*</span> : null }
    { node.argument !== null ? renderExpression(node.argument) : null }
  </span>
)

const AwaitExpressionRenderer = ({ node }: { node: babylon.AwaitExpression }) => (
  <span>
    <span>await</span>
    { node.argument !== null ? renderExpression(node.argument) : null }
  </span>
)

const ArrayExpressionRenderer = ({ node }: { node: babylon.ArrayExpression }) => (
  <span>
    <span>[</span>
    { node.elements.map((element, i) => element !== null ? renderExpression(element, i) : null) }
    <span>]</span>
  </span>
)

const ObjectExpressionRenderer = ({ node }: { node: babylon.ObjectExpression }) => (
  <span>
    <span>{ '{' }</span>
    { node.properties.map((property, i) => (
      property.type === 'ObjectProperty'    ? <ObjectPropertyRenderer key={ i } node={ property } /> :
      property.type === 'ObjectMethod'      ? <ObjectMethodRenderer   key={ i } node={ property } /> :
      /* property.type === 'SpreadElement' */ <SpreadElementRenderer  key={ i } node={ property } />
    )) }
    <span>{ '}' }</span>
  </span>
)

export const ObjectPropertyRenderer = ({ node }: { node: babylon.ObjectProperty }) => (
  <span>
    { node.decorators ? node.decorators.map((decorator, i) => <DecoratorRenderer key={ i } node={ decorator } />) : null }
    { node.computed ? <span>[</span> : null }
    { renderExpression(node.key) }
    { node.computed ? <span>]</span> : null }
    { node.shorthand ? null : <span>:</span> }
    { node.shorthand ? null : renderExpression(node.value) }
  </span>
)

const ObjectMethodRenderer = ({ node }: { node: babylon.ObjectMethod }) => (
  <span>
    { node.async ? <span>async</span> : null }
    { node.generator ? <span>*</span> : null }
    { node.kind !== 'method' ? <span>node.kind</span> : null }
    { node.computed ? <span>[</span> : null }
    { renderExpression(node.key) }
    { node.computed ? <span>]</span> : null }

    <span>(</span>
    { node.params.map((param, i) => { renderPattern(param, i) }) }
    <span>)</span>
    <BlockStatementRenderer node={ node.body } />
  </span>
)

const FunctionExpressionRenderer = ({ node }: { node: babylon.FunctionExpression }) => (
  <span>
    <FunctionRenderer node={ node } />
  </span>
)

const UnaryExpressionRenderer = ({ node }: { node: babylon.UnaryExpression }) => (
  <span>
    { node.prefix ? <span>{ node.operator }</span> : null }
    { renderExpression(node.argument) }
    { !node.prefix ? <span>{ node.operator }</span> : null }
  </span>
)

const UpdateExpressionRenderer = ({ node }: { node: babylon.UpdateExpression }) => (
  <span>
    { node.prefix ? <span>node.operator</span> : null }
    { renderExpression(node.argument) }
    { !node.prefix ? <span>node.operator</span> : null }
  </span>
)

const BinaryExpressionRenderer = ({ node }: { node: babylon.BinaryExpression }) => (
  <span>
    { renderExpression(node.left) }
    <span>{ node.operator }</span>
    { renderExpression(node.right) }
  </span>
)

// NOTE: Because `Expression`s are `Pattern`, `node.left` can be rendered correctly if it is an `Expression`.
const AssignmentExpressionRenderer = ({ node }: { node: babylon.AssignmentPattern }) => (
  <span>
    { renderPattern(node.left) }
    <span>{ node.operator }</span>
    { renderExpression(node.right) }
  </span>
)

const LogicalExpressionRenderer = ({ node }: { node: babylon.LogicalExpression }) => (
  <span>
    { renderExpression(node.left) }
    <span>{ node.operator }</span>
    { renderExpression(node.right) }
  </span>
)

const SpreadElementRenderer = ({ node }: { node: babylon.SpreadElement }) => (
  <span>
    <span>...</span>
    { renderExpression(node.argument) }
  </span>
)

export const MemberExpressionRenderer = ({ node }: { node: babylon.MemberExpression }) => (
  <span>
    { renderExpression(node.object) }
    { node.computed ? <span>[</span> : null }
    { node.computed ? null : <span>.</span> }
    { renderExpression(node.property) }
    { node.computed ? <span>]</span> : null }
  </span>
)

const BindExpressionRenderer = ({ node }: { node: babylon.BindExpression }) => (
  <span>
    { node.object !== null ? renderExpression(node.object) : null }
    <span>::</span>
    { renderExpression(node.callee) }
  </span>
)

const ConditionalExpressionRenderer = ({ node }: { node: babylon.ConditionalExpression }) => (
  <span>
    { renderExpression(node.test) }
    <span>?</span>
    { renderExpression(node.consequent) }
    <span>:</span>
    { renderExpression(node.alternate) }
  </span>
)

// NOTE: Because `Super` and `Import` are `Expression`, `node.callee` can always be rendered correctly.
const CallExpressionRenderer = ({ node }: { node: babylon.CallExpression }) => (
  <span>
    { renderExpression(node.callee) }
    <span>(</span>
    { node.arguments.map((argument, i) => argument.type === 'SpreadElement' ? <SpreadElementRenderer key={ i } node={ argument } /> : renderExpression(argument, i)) }
    <span>)</span>
  </span>
)

const NewExpressionRenderer = ({ node }: { node: babylon.NewExpression }) => (
  <span>
    <span>new</span>
    { renderExpression(node.callee) }
    <span>(</span>
    { node.arguments.map((argument, i) => argument.type === 'SpreadElement' ? <SpreadElementRenderer key={ i } node={ argument } /> : renderExpression(argument, i)) }
    <span>)</span>
  </span>
)

// WIP. put comma.
const SequenceExpressionRenderer = ({ node }: { node: babylon.SequenceExpression }) => (
  <span>
    { node.expressions.map((expression, i) => renderExpression(expression, i)) }
  </span>
)

const DoExpressionRenderer = ({ node }: { node: babylon.DoExpression }) => (
  <span>
    <span>do</span>
    <BlockStatementRenderer node={ node.body } />
  </span>
)

const ClassExpressionRenderer = ({ node }: { node: babylon.ClassExpression }) => (
  <ClassRenderer node={ node } />
)

const MetaPropertyRenderer = () => <UnknownNodeRenderer node={ null } />

// vim: set ts=2 sw=2 et:
