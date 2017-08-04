// @flow
import type babylon from 'babylon'
import React from 'react'
import { NodeRenderer, FunctionRenderer, ReservedKeywordRenderer, OpenBracketRenderer, ClosingBracketRenderer, OperatorRenderer, OperatorWithoutSpaceRenderer, CommaRenderer } from './JavaScriptASTRenderer.js'
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
    { node.params.map((param, i) => <NodeRenderer key={ i } node={ param } />) }
    <ClosingBracketRenderer>)</ClosingBracketRenderer>
    <OperatorRenderer>=></OperatorRenderer>
    <NodeRenderer node={ node.body } />
  </span>
)

export const YieldExpressionRenderer = ({ node }: { node: babylon.YieldExpression }) => (
  <span>
    <ReservedKeywordRenderer>yield</ReservedKeywordRenderer>
    { node.delegate ? <OperatorRenderer>*</OperatorRenderer> : null }
    <NodeRenderer node={ node.argument } />
  </span>
)

export const AwaitExpressionRenderer = ({ node }: { node: babylon.AwaitExpression }) => (
  <span>
    <ReservedKeywordRenderer>await</ReservedKeywordRenderer>
    <NodeRenderer node={ node.argument } />
  </span>
)

export const ArrayExpressionRenderer = ({ node }: { node: babylon.ArrayExpression }) => (
  <span>
    <OpenBracketRenderer>[</OpenBracketRenderer>
    { node.elements.map((element, i) => (
      <span key={ i }>
        <NodeRenderer node={ element } />
        <CommaRenderer />
      </span>
    )) }
    <ClosingBracketRenderer>]</ClosingBracketRenderer>
  </span>
)

export const ObjectExpressionRenderer = ({ node }: { node: babylon.ObjectExpression }) => (
  <span>
    <OpenBracketRenderer>{ '{' }</OpenBracketRenderer>
    <div className="object-body">
      { node.properties.map((property, i) => (
        <div key={ i }>
          <NodeRenderer node={ property } />
        </div>
      )) }
    </div>
    <ClosingBracketRenderer>{ '}' }</ClosingBracketRenderer>
  </span>
)

export const ObjectPropertyRenderer = ({ node }: { node: babylon.ObjectProperty }) => (
  <div>
    { node.decorators ? node.decorators.map((decorator, i) => <NodeRenderer key={ i } node={ decorator } />) : null }
    { node.computed ? <OpenBracketRenderer>[</OpenBracketRenderer> : null }
    <NodeRenderer node={ node.key } />
    { node.computed ? <ClosingBracketRenderer>]</ClosingBracketRenderer> : null }
    { node.shorthand ? null : <OperatorRenderer>:</OperatorRenderer> }
    { node.shorthand ? null : <NodeRenderer node={ node.value } /> }
    <CommaRenderer />
  </div>
)

export const ObjectMethodRenderer = ({ node }: { node: babylon.ObjectMethod }) => (
  <span>
    { node.async ? <ReservedKeywordRenderer>async</ReservedKeywordRenderer> : null }
    { node.generator ? <OperatorRenderer>*</OperatorRenderer> : null }
    { node.kind !== 'method' ? <ReservedKeywordRenderer>node.kind</ReservedKeywordRenderer> : null }
    { node.computed ? <OpenBracketRenderer>[</OpenBracketRenderer> : null }
    <NodeRenderer node={ node.key } />
    { node.computed ? <ClosingBracketRenderer>]</ClosingBracketRenderer> : null }

    <OpenBracketRenderer>(</OpenBracketRenderer>
    { node.params.map((param, i) => <NodeRenderer key={ i } node={ param } />) }
    <ClosingBracketRenderer>)</ClosingBracketRenderer>
    <NodeRenderer node={ node.body } />
  </span>
)

export const FunctionExpressionRenderer = ({ node }: { node: babylon.FunctionExpression }) => (
  <FunctionRenderer node={ node } />
)

export const UnaryExpressionRenderer = ({ node }: { node: babylon.UnaryExpression }) => (
  <span>
    { node.prefix ? <OperatorRenderer>{ node.operator }</OperatorRenderer> : null }
    <NodeRenderer node={ node.argument } />
    { !node.prefix ? <OperatorRenderer>{ node.operator }</OperatorRenderer> : null }
  </span>
)

export const UpdateExpressionRenderer = ({ node }: { node: babylon.UpdateExpression }) => (
  <span>
    { node.prefix ? <OperatorRenderer>{ node.operator }</OperatorRenderer> : null }
    <NodeRenderer node={ node.argument } />
    { !node.prefix ? <OperatorRenderer>{ node.operator }</OperatorRenderer> : null }
  </span>
)

export const BinaryExpressionRenderer = ({ node }: { node: babylon.BinaryExpression }) => (
  <span>
    <NodeRenderer node={ node.left } />
    <OperatorRenderer>{ node.operator }</OperatorRenderer>
    <NodeRenderer node={ node.right } />
  </span>
)

// NOTE: Because `Expression`s are `Pattern`, `node.left` can be rendered correctly if it is an `Expression`.
export const AssignmentExpressionRenderer = ({ node }: { node: babylon.AssignmentPattern }) => (
  <span>
    <NodeRenderer node={ node.left } />
    <OperatorRenderer>{ node.operator }</OperatorRenderer>
    <NodeRenderer node={ node.right } />
  </span>
)

export const LogicalExpressionRenderer = ({ node }: { node: babylon.LogicalExpression }) => (
  <span>
    <NodeRenderer node={ node.left } />
    <OperatorRenderer>{ node.operator }</OperatorRenderer>
    <NodeRenderer node={ node.right } />
  </span>
)

export const SpreadElementRenderer = ({ node }: { node: babylon.SpreadElement }) => (
  <span>
    <OperatorRenderer>...</OperatorRenderer>
    <NodeRenderer node={ node.argument } />
  </span>
)

export const MemberExpressionRenderer = ({ node }: { node: babylon.MemberExpression }) => (
  <span>
    <NodeRenderer node={ node.object } />
    { node.computed ? <OpenBracketRenderer>[</OpenBracketRenderer> : null }
    { node.computed ? null : <OperatorWithoutSpaceRenderer>.</OperatorWithoutSpaceRenderer> }
    <NodeRenderer node={ node.property } />
    { node.computed ? <ClosingBracketRenderer>]</ClosingBracketRenderer> : null }
  </span>
)

export const BindExpressionRenderer = ({ node }: { node: babylon.BindExpression }) => (
  <span>
    <NodeRenderer node={ node.object } />
    <OperatorRenderer>::</OperatorRenderer>
    <NodeRenderer node={ node.callee } />
  </span>
)

export const ConditionalExpressionRenderer = ({ node }: { node: babylon.ConditionalExpression }) => (
  <span>
    <NodeRenderer node={ node.test } />
    <OperatorRenderer>?</OperatorRenderer>
    <NodeRenderer node={ node.consequent } />
    <OperatorRenderer>:</OperatorRenderer>
    <NodeRenderer node={ node.alternate } />
  </span>
)

// NOTE: Because `Super` and `Import` are `Expression`, `node.callee` can always be rendered correctly.
export const CallExpressionRenderer = ({ node }: { node: babylon.CallExpression }) => (
  <span>
    <NodeRenderer node={ node.callee } />
    <OpenBracketRenderer>(</OpenBracketRenderer>
    { node.arguments.map((argument, i) => (
      <span key={ i }>
        <NodeRenderer node={ argument } />
        <CommaRenderer />
      </span>
    )) }
    <ClosingBracketRenderer>)</ClosingBracketRenderer>
  </span>
)

export const NewExpressionRenderer = ({ node }: { node: babylon.NewExpression }) => (
  <span>
    <ReservedKeywordRenderer>new</ReservedKeywordRenderer>
    <NodeRenderer node={ node.callee } />
    <OpenBracketRenderer>(</OpenBracketRenderer>
    { node.arguments.map((argument, i) => <NodeRenderer key={ i } node={ argument } />) }
    <ClosingBracketRenderer>)</ClosingBracketRenderer>
  </span>
)

// WIP. put comma.
export const SequenceExpressionRenderer = ({ node }: { node: babylon.SequenceExpression }) => (
  <span>
    { node.expressions.map((expression, i) => <NodeRenderer key={ i } node={ expression } />) }
  </span>
)

export const DoExpressionRenderer = ({ node }: { node: babylon.DoExpression }) => (
  <span>
    <ReservedKeywordRenderer>do</ReservedKeywordRenderer>
    <NodeRenderer node={ node.body } />
  </span>
)

export const ClassExpressionRenderer = ({ node }: { node: babylon.ClassExpression }) => (
  <ClassRenderer node={ node } />
)

// vim: set ts=2 sw=2 et:
