// @flow
import type babylon from 'babylon'
import React from 'react'
import { NodeRenderer, NodeWrapper, FunctionRenderer, BracketRenderer, PunctuationRenderer, CommaSeparatedList } from './JavaScriptASTRenderer.js'
import { ClassRenderer } from './class-renderers.js'
import * as reservedKeywords from './reserved-keywords.js'

type UnaryOperator = '-' | '+' | '!' | '~' | 'typeof' | 'void' | 'delete'
type UpdateOperator =  '++' | '--'
type BinaryOperator
  = '==' | '!=' | '===' | '!=='
  | '<' | '<=' | '>' | '>='
  | '<<' | '>>' | '>>>'
  | '+' | '-' | '*' | '/' | '%'
  | '|' | '^' | '&' | 'in'
  | 'instanceof'
type AssignmentOperator
  = '=' | '+=' | '-=' | '*=' | '/=' | '%='
  | '<<=' | '>>=' | '>>>='
  | '|=' | '^=' | '&='
type LogicalOperator = '||' | '&&'

const OperatorRenderer = ({ operator }: { operator: UnaryOperator | UpdateOperator | BinaryOperator | AssignmentOperator | LogicalOperator }) => (
  <span className="operator ms-fontColor-themeSecondary">
    { operator }
  </span>
)

export const SuperRenderer = ({ node }: { node: babylon.Super }) => (
  <NodeWrapper>
    <reservedKeywords.Super />
  </NodeWrapper>
)

export const ImportRenderer = ({ node }: { node: babylon.Import }) => (
  <NodeWrapper>
    <reservedKeywords.Import />
  </NodeWrapper>
)

export const ThisExpressionRenderer = ({ node }: { node: babylon.ThisExpression }) => (
  <NodeWrapper>
    <reservedKeywords.This />
  </NodeWrapper>
)

export const ArrowFunctionExpressionRenderer = ({ node }: { node: babylon.ArrowFunctionExpression }) => (
  <NodeWrapper>
    <span>
      { node.async ? <reservedKeywords.Async /> : null }
      <BracketRenderer bracket="(" />
      <CommaSeparatedList elements={ node.params } inline />
      <BracketRenderer bracket=")" />
      <PunctuationRenderer punctuation="=>" />
      <NodeRenderer node={ node.body } />
    </span>
  </NodeWrapper>
)

export const YieldExpressionRenderer = ({ node }: { node: babylon.YieldExpression }) => (
  <NodeWrapper>
    <span>
      <reservedKeywords.Yield />
      { node.delegate ? <PunctuationRenderer punctuation="*" /> : null }
      <NodeRenderer node={ node.argument } />
    </span>
  </NodeWrapper>
)

export const AwaitExpressionRenderer = ({ node }: { node: babylon.AwaitExpression }) => (
  <NodeWrapper>
    <span>
      <reservedKeywords.Await />
      <NodeRenderer node={ node.argument } />
    </span>
  </NodeWrapper>
)

export const ArrayExpressionRenderer = ({ node }: { node: babylon.ArrayExpression }) => (
  <NodeWrapper>
    <span>
      <BracketRenderer bracket="[" />
      <CommaSeparatedList elements={ node.elements } inline />
      <BracketRenderer bracket="]" />
    </span>
  </NodeWrapper>
)

export const ObjectExpressionRenderer = ({ node }: { node: babylon.ObjectExpression }) => (
  <NodeWrapper>
    <span>
      <BracketRenderer bracket="{" />
      <CommaSeparatedList className="object-body" elements={ node.properties } />
      <BracketRenderer bracket="}" />
    </span>
  </NodeWrapper>
)

export const ObjectPropertyRenderer = ({ node }: { node: babylon.ObjectProperty }) => (
  <NodeWrapper>
    <div className={ node.shorthand ? 'obj-prop-shorthand' : null }>
      { node.decorators ? node.decorators.map((decorator, i) => <NodeRenderer key={ i } node={ decorator } />) : null }
      { node.computed ? <BracketRenderer bracket="[" /> : null }
      <NodeRenderer node={ node.key } />
      { node.computed ? <BracketRenderer bracket="]" /> : null }
      { node.shorthand ? null : <PunctuationRenderer punctuation=":" /> }
      { node.shorthand ? null : <NodeRenderer node={ node.value } /> }
    </div>
  </NodeWrapper>
)

export const ObjectMethodRenderer = ({ node }: { node: babylon.ObjectMethod }) => (
  <NodeWrapper>
    <span>
      { node.async ? <reservedKeywords.Async /> : null }
      { node.generator ? <PunctuationRenderer punctuation="*" /> : null }
      { node.kind !== 'method' ? <PunctuationRenderer punctuation="method" /> : null }
      { node.computed ? <BracketRenderer bracket="[" /> : null }
      <NodeRenderer node={ node.key } />
      { node.computed ? <BracketRenderer bracket="]" /> : null }

      <BracketRenderer bracket="(" />
      <CommaSeparatedList elements={ node.params } inline />
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
      { node.prefix ? <OperatorRenderer operator={ node.operator } /> : null }
      <NodeRenderer node={ node.argument } />
      { !node.prefix ? <OperatorRenderer operator={ node.operator } /> : null }
    </span>
  </NodeWrapper>
)

export const UpdateExpressionRenderer = ({ node }: { node: babylon.UpdateExpression }) => (
  <NodeWrapper>
    <span>
      { node.prefix ? <OperatorRenderer operator={ node.operator } /> : null }
      <NodeRenderer node={ node.argument } />
      { !node.prefix ? <OperatorRenderer operator={ node.operator } /> : null }
    </span>
  </NodeWrapper>
)

export const BinaryExpressionRenderer = ({ node }: { node: babylon.BinaryExpression }) => (
  <NodeWrapper>
    <span>
      <NodeRenderer node={ node.left } />
      <OperatorRenderer operator={ node.operator } />
      <NodeRenderer node={ node.right } />
    </span>
  </NodeWrapper>
)

// NOTE: Because `Expression`s are `Pattern`, `node.left` can be rendered correctly if it is an `Expression`.
export const AssignmentExpressionRenderer = ({ node }: { node: babylon.AssignmentPattern }) => (
  <NodeWrapper>
    <span>
      <NodeRenderer node={ node.left } />
      <OperatorRenderer operator={ node.operator } />
      <NodeRenderer node={ node.right } />
    </span>
  </NodeWrapper>
)

export const LogicalExpressionRenderer = ({ node }: { node: babylon.LogicalExpression }) => (
  <NodeWrapper>
    <span>
      <NodeRenderer node={ node.left } />
      <OperatorRenderer operator={ node.operator } />
      <NodeRenderer node={ node.right } />
    </span>
  </NodeWrapper>
)

export const SpreadElementRenderer = ({ node }: { node: babylon.SpreadElement }) => (
  <NodeWrapper>
    <span>
      <PunctuationRenderer punctuation="..." />
      <NodeRenderer node={ node.argument } />
    </span>
  </NodeWrapper>
)

export const MemberExpressionRenderer = ({ node }: { node: babylon.MemberExpression }) => (
  <NodeWrapper>
    <span>
      <NodeRenderer node={ node.object } />
      { node.computed ? <BracketRenderer bracket="[" /> : null }
      { node.computed ? null : <PunctuationRenderer punctuation="." /> }
      <NodeRenderer node={ node.property } />
      { node.computed ? <BracketRenderer bracket="]" /> : null }
    </span>
  </NodeWrapper>
)

export const BindExpressionRenderer = ({ node }: { node: babylon.BindExpression }) => (
  <NodeWrapper>
    <span>
      <NodeRenderer node={ node.object } />
      <PunctuationRenderer punctuation="::" />
      <NodeRenderer node={ node.callee } />
    </span>
  </NodeWrapper>
)

export const ConditionalExpressionRenderer = ({ node }: { node: babylon.ConditionalExpression }) => (
  <NodeWrapper>
    <span>
      <NodeRenderer node={ node.test } />
      <PunctuationRenderer punctuation="?" />
      <NodeRenderer node={ node.consequent } />
      <PunctuationRenderer punctuation=":" />
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
      <CommaSeparatedList elements={ node.arguments } inline />
      <BracketRenderer bracket=")" />
    </span>
  </NodeWrapper>
)

export const NewExpressionRenderer = ({ node }: { node: babylon.NewExpression }) => (
  <NodeWrapper>
    <span>
      <reservedKeywords.New />
      <NodeRenderer node={ node.callee } />
      <BracketRenderer bracket="(" />
      { node.arguments.map((argument, i) => <NodeRenderer key={ i } node={ argument } />) }
      <BracketRenderer bracket=")" />
    </span>
  </NodeWrapper>
)

export const SequenceExpressionRenderer = ({ node }: { node: babylon.SequenceExpression }) => (
  <NodeWrapper>
    <CommaSeparatedList elements={ node.expressions } inline />
  </NodeWrapper>
)

export const DoExpressionRenderer = ({ node }: { node: babylon.DoExpression }) => (
  <NodeWrapper>
    <span>
      <reservedKeywords.Do />
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
