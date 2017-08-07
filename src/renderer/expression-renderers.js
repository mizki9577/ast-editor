// @flow
import type babylon from 'babylon'
import React from 'react'
import { NodeRenderer, NodeWrapper, FunctionRenderer, ReservedKeywordRenderer, BracketRenderer, OperatorRenderer, OperatorWithoutSpaceRenderer, CommaRenderer } from './JavaScriptASTRenderer.js'
import { ClassRenderer } from './class-renderers.js'

export const SuperRenderer = ({ node }: { node: babylon.Super }) => (
  <NodeWrapper>
    <ReservedKeywordRenderer>super</ReservedKeywordRenderer>
  </NodeWrapper>
)

export const ImportRenderer = ({ node }: { node: babylon.Import }) => (
  <NodeWrapper>
    <ReservedKeywordRenderer>import</ReservedKeywordRenderer>
  </NodeWrapper>
)

export const ThisExpressionRenderer = ({ node }: { node: babylon.ThisExpression }) => (
  <NodeWrapper>
    <ReservedKeywordRenderer>this</ReservedKeywordRenderer>
  </NodeWrapper>
)

export const ArrowFunctionExpressionRenderer = ({ node }: { node: babylon.ArrowFunctionExpression }) => (
  <NodeWrapper>
    <span>
      <BracketRenderer bracket="(" />
      { node.params.map((param, i) => <NodeRenderer key={ i } node={ param } />) }
      <BracketRenderer bracket=")" />
      <OperatorRenderer>=></OperatorRenderer>
      <NodeRenderer node={ node.body } />
    </span>
  </NodeWrapper>
)

export const YieldExpressionRenderer = ({ node }: { node: babylon.YieldExpression }) => (
  <NodeWrapper>
    <span>
      <ReservedKeywordRenderer>yield</ReservedKeywordRenderer>
      { node.delegate ? <OperatorRenderer>*</OperatorRenderer> : null }
      <NodeRenderer node={ node.argument } />
    </span>
  </NodeWrapper>
)

export const AwaitExpressionRenderer = ({ node }: { node: babylon.AwaitExpression }) => (
  <NodeWrapper>
    <span>
      <ReservedKeywordRenderer>await</ReservedKeywordRenderer>
      <NodeRenderer node={ node.argument } />
    </span>
  </NodeWrapper>
)

export const ArrayExpressionRenderer = ({ node }: { node: babylon.ArrayExpression }) => (
  <NodeWrapper>
    <span>
      <BracketRenderer bracket="[" />
      { node.elements.map((element, i) => (
        <span key={ i }>
          <NodeRenderer node={ element } />
          <CommaRenderer />
        </span>
      )) }
      <BracketRenderer bracket="]" />
    </span>
  </NodeWrapper>
)

export const ObjectExpressionRenderer = ({ node }: { node: babylon.ObjectExpression }) => (
  <NodeWrapper>
    <span>
      <BracketRenderer bracket="{" />
      <div className="object-body">
        { node.properties.map((property, i) => (
          <div key={ i }>
            <NodeRenderer node={ property } />
          </div>
        )) }
      </div>
      <BracketRenderer bracket="}" />
    </span>
  </NodeWrapper>
)

export const ObjectPropertyRenderer = ({ node }: { node: babylon.ObjectProperty }) => (
  <NodeWrapper>
    <div>
      { node.decorators ? node.decorators.map((decorator, i) => <NodeRenderer key={ i } node={ decorator } />) : null }
      { node.computed ? <BracketRenderer bracket="[" /> : null }
      <NodeRenderer node={ node.key } />
      { node.computed ? <BracketRenderer bracket="]" /> : null }
      { node.shorthand ? null : <OperatorRenderer>:</OperatorRenderer> }
      { node.shorthand ? null : <NodeRenderer node={ node.value } /> }
      <CommaRenderer />
    </div>
  </NodeWrapper>
)

export const ObjectMethodRenderer = ({ node }: { node: babylon.ObjectMethod }) => (
  <NodeWrapper>
    <span>
      { node.async ? <ReservedKeywordRenderer>async</ReservedKeywordRenderer> : null }
      { node.generator ? <OperatorRenderer>*</OperatorRenderer> : null }
      { node.kind !== 'method' ? <ReservedKeywordRenderer>node.kind</ReservedKeywordRenderer> : null }
      { node.computed ? <BracketRenderer bracket="[" /> : null }
      <NodeRenderer node={ node.key } />
      { node.computed ? <BracketRenderer bracket="]" /> : null }

      <BracketRenderer bracket="(" />
      { node.params.map((param, i) => <NodeRenderer key={ i } node={ param } />) }
      <BracketRenderer bracket=")" />
      <NodeRenderer node={ node.body } />
    </span>
  </NodeWrapper>
)

export const FunctionExpressionRenderer = ({ node }: { node: babylon.FunctionExpression }) => (
  <NodeWrapper>
    <div>
      <FunctionRenderer node={ node } />
    </div>
  </NodeWrapper>
)

export const UnaryExpressionRenderer = ({ node }: { node: babylon.UnaryExpression }) => (
  <NodeWrapper>
    <span>
      { node.prefix ? <OperatorRenderer>{ node.operator }</OperatorRenderer> : null }
      <NodeRenderer node={ node.argument } />
      { !node.prefix ? <OperatorRenderer>{ node.operator }</OperatorRenderer> : null }
    </span>
  </NodeWrapper>
)

export const UpdateExpressionRenderer = ({ node }: { node: babylon.UpdateExpression }) => (
  <NodeWrapper>
    <span>
      { node.prefix ? <OperatorRenderer>{ node.operator }</OperatorRenderer> : null }
      <NodeRenderer node={ node.argument } />
      { !node.prefix ? <OperatorRenderer>{ node.operator }</OperatorRenderer> : null }
    </span>
  </NodeWrapper>
)

export const BinaryExpressionRenderer = ({ node }: { node: babylon.BinaryExpression }) => (
  <NodeWrapper>
    <span>
      <NodeRenderer node={ node.left } />
      <OperatorRenderer>{ node.operator }</OperatorRenderer>
      <NodeRenderer node={ node.right } />
    </span>
  </NodeWrapper>
)

// NOTE: Because `Expression`s are `Pattern`, `node.left` can be rendered correctly if it is an `Expression`.
export const AssignmentExpressionRenderer = ({ node }: { node: babylon.AssignmentPattern }) => (
  <NodeWrapper>
    <span>
      <NodeRenderer node={ node.left } />
      <OperatorRenderer>{ node.operator }</OperatorRenderer>
      <NodeRenderer node={ node.right } />
    </span>
  </NodeWrapper>
)

export const LogicalExpressionRenderer = ({ node }: { node: babylon.LogicalExpression }) => (
  <NodeWrapper>
    <span>
      <NodeRenderer node={ node.left } />
      <OperatorRenderer>{ node.operator }</OperatorRenderer>
      <NodeRenderer node={ node.right } />
    </span>
  </NodeWrapper>
)

export const SpreadElementRenderer = ({ node }: { node: babylon.SpreadElement }) => (
  <NodeWrapper>
    <span>
      <OperatorRenderer>...</OperatorRenderer>
      <NodeRenderer node={ node.argument } />
    </span>
  </NodeWrapper>
)

export const MemberExpressionRenderer = ({ node }: { node: babylon.MemberExpression }) => (
  <NodeWrapper>
    <span>
      <NodeRenderer node={ node.object } />
      { node.computed ? <BracketRenderer bracket="[" /> : null }
      { node.computed ? null : <OperatorWithoutSpaceRenderer>.</OperatorWithoutSpaceRenderer> }
      <NodeRenderer node={ node.property } />
      { node.computed ? <BracketRenderer bracket="]" /> : null }
    </span>
  </NodeWrapper>
)

export const BindExpressionRenderer = ({ node }: { node: babylon.BindExpression }) => (
  <NodeWrapper>
    <span>
      <NodeRenderer node={ node.object } />
      <OperatorRenderer>::</OperatorRenderer>
      <NodeRenderer node={ node.callee } />
    </span>
  </NodeWrapper>
)

export const ConditionalExpressionRenderer = ({ node }: { node: babylon.ConditionalExpression }) => (
  <NodeWrapper>
    <span>
      <NodeRenderer node={ node.test } />
      <OperatorRenderer>?</OperatorRenderer>
      <NodeRenderer node={ node.consequent } />
      <OperatorRenderer>:</OperatorRenderer>
      <NodeRenderer node={ node.alternate } />
    </span>
  </NodeWrapper>
)

// NOTE: Because `Super` and `Import` are `Expression`, `node.callee` can always be rendered correctly.
export const CallExpressionRenderer = ({ node }: { node: babylon.CallExpression }) => (
  <NodeWrapper>
    <span>
      <NodeRenderer node={ node.callee } />
      <BracketRenderer bracket="(" />
      { node.arguments.map((argument, i) => (
        <span key={ i }>
          <NodeRenderer node={ argument } />
          <CommaRenderer />
        </span>
      )) }
      <BracketRenderer bracket=")" />
    </span>
  </NodeWrapper>
)

export const NewExpressionRenderer = ({ node }: { node: babylon.NewExpression }) => (
  <NodeWrapper>
    <span>
      <ReservedKeywordRenderer>new</ReservedKeywordRenderer>
      <NodeRenderer node={ node.callee } />
      <BracketRenderer bracket="(" />
      { node.arguments.map((argument, i) => <NodeRenderer key={ i } node={ argument } />) }
      <BracketRenderer bracket=")" />
    </span>
  </NodeWrapper>
)

// WIP. put comma.
export const SequenceExpressionRenderer = ({ node }: { node: babylon.SequenceExpression }) => (
  <NodeWrapper>
    <span>
      { node.expressions.map((expression, i) => <NodeRenderer key={ i } node={ expression } />) }
    </span>
  </NodeWrapper>
)

export const DoExpressionRenderer = ({ node }: { node: babylon.DoExpression }) => (
  <NodeWrapper>
    <span>
      <ReservedKeywordRenderer>do</ReservedKeywordRenderer>
      <NodeRenderer node={ node.body } />
    </span>
  </NodeWrapper>
)

export const ClassExpressionRenderer = ({ node }: { node: babylon.ClassExpression }) => (
  <NodeWrapper>
    <span>
      <ClassRenderer node={ node } />
    </span>
  </NodeWrapper>
)

// vim: set ts=2 sw=2 et:
