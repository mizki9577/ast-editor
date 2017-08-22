// @flow
import type babylon from 'babylon'
import React from 'react'
import { NodeRenderer, NodeWrapper, FunctionRenderer, BracketRenderer, PunctuationRenderer, CommaSeparatedList } from './index.js'
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
  <NodeWrapper inline>
    <reservedKeywords.Super />
  </NodeWrapper>
)

export const ImportRenderer = ({ node }: { node: babylon.Import }) => (
  <NodeWrapper inline>
    <reservedKeywords.Import />
  </NodeWrapper>
)

export const ThisExpressionRenderer = ({ node }: { node: babylon.ThisExpression }) => (
  <NodeWrapper inline>
    <reservedKeywords.This />
  </NodeWrapper>
)

export const ArrowFunctionExpressionRenderer = ({ node }: { node: babylon.ArrowFunctionExpression }) => (
  <NodeWrapper inline>
    { node.async ? <reservedKeywords.Async /> : null }
    <BracketRenderer bracket="(" />
    <CommaSeparatedList elements={ node.params } inline />
    <BracketRenderer bracket=")" />
    <PunctuationRenderer punctuation="=>" />
    <NodeRenderer node={ node.body } />
  </NodeWrapper>
)

export const YieldExpressionRenderer = ({ node }: { node: babylon.YieldExpression }) => (
  <NodeWrapper inline>
    <reservedKeywords.Yield />
    { node.delegate ? <PunctuationRenderer punctuation="*" /> : null }
    <NodeRenderer node={ node.argument } />
  </NodeWrapper>
)

export const AwaitExpressionRenderer = ({ node }: { node: babylon.AwaitExpression }) => (
  <NodeWrapper inline>
    <reservedKeywords.Await />
    <NodeRenderer node={ node.argument } />
  </NodeWrapper>
)

export const ArrayExpressionRenderer = ({ node }: { node: babylon.ArrayExpression }) => (
  <NodeWrapper inline>
    <BracketRenderer bracket="[" />
    <CommaSeparatedList elements={ node.elements } inline />
    <BracketRenderer bracket="]" />
  </NodeWrapper>
)

export const ObjectExpressionRenderer = ({ node }: { node: babylon.ObjectExpression }) => (
  <NodeWrapper inline>
    <BracketRenderer bracket="{" />
    <CommaSeparatedList className="object-body" elements={ node.properties } />
    <BracketRenderer bracket="}" />
  </NodeWrapper>
)

export const ObjectPropertyRenderer = ({ node }: { node: babylon.ObjectProperty }) => (
  <NodeWrapper block className={ node.shorthand ? 'obj-prop-shorthand' : undefined }>
    { node.decorators ? node.decorators.map((decorator, i) => <NodeRenderer key={ i } node={ decorator } />) : null }
    { node.computed ? <BracketRenderer bracket="[" /> : null }
    <NodeRenderer node={ node.key } />
    { node.computed ? <BracketRenderer bracket="]" /> : null }
    { node.shorthand ? null : <PunctuationRenderer punctuation=":" /> }
    { node.shorthand ? null : <NodeRenderer node={ node.value } /> }
  </NodeWrapper>
)

export const ObjectMethodRenderer = ({ node }: { node: babylon.ObjectMethod }) => (
  <NodeWrapper block>
    { node.async ? <reservedKeywords.Async /> : null }
    { node.generator ? <PunctuationRenderer punctuation="*" /> : null }
    { node.kind === 'get' ? <PunctuationRenderer punctuation="get" /> :
      node.kind === 'set' ? <PunctuationRenderer punctuation="set" /> : null }
    { node.computed ? <BracketRenderer bracket="[" /> : null }
    <NodeRenderer node={ node.key } />
    { node.computed ? <BracketRenderer bracket="]" /> : null }

    <BracketRenderer bracket="(" />
    <CommaSeparatedList elements={ node.params } inline />
    <BracketRenderer bracket=")" />
    <NodeRenderer node={ node.body } />
  </NodeWrapper>
)

export const FunctionExpressionRenderer = ({ node }: { node: babylon.FunctionExpression }) => (
  <NodeWrapper block>
    <FunctionRenderer node={ node } />
  </NodeWrapper>
)

export const UnaryExpressionRenderer = ({ node }: { node: babylon.UnaryExpression }) => (
  <NodeWrapper inline>
    { node.prefix ? <OperatorRenderer operator={ node.operator } /> : null }
    <NodeRenderer node={ node.argument } />
    { !node.prefix ? <OperatorRenderer operator={ node.operator } /> : null }
  </NodeWrapper>
)

export const UpdateExpressionRenderer = ({ node }: { node: babylon.UpdateExpression }) => (
  <NodeWrapper inline>
    { node.prefix ? <OperatorRenderer operator={ node.operator } /> : null }
    <NodeRenderer node={ node.argument } />
    { !node.prefix ? <OperatorRenderer operator={ node.operator } /> : null }
  </NodeWrapper>
)

export const BinaryExpressionRenderer = ({ node }: { node: babylon.BinaryExpression }) => (
  <NodeWrapper inline>
    <NodeRenderer node={ node.left } />
    <OperatorRenderer operator={ node.operator } />
    <NodeRenderer node={ node.right } />
  </NodeWrapper>
)

// NOTE: Because `Expression`s are `Pattern`, `node.left` can be rendered correctly if it is an `Expression`.
export const AssignmentExpressionRenderer = ({ node }: { node: babylon.AssignmentPattern }) => (
  <NodeWrapper inline>
    <NodeRenderer node={ node.left } />
    <OperatorRenderer operator={ node.operator } />
    <NodeRenderer node={ node.right } />
  </NodeWrapper>
)

export const LogicalExpressionRenderer = ({ node }: { node: babylon.LogicalExpression }) => (
  <NodeWrapper inline>
    <NodeRenderer node={ node.left } />
    <OperatorRenderer operator={ node.operator } />
    <NodeRenderer node={ node.right } />
  </NodeWrapper>
)

export const SpreadElementRenderer = ({ node }: { node: babylon.SpreadElement }) => (
  <NodeWrapper inline>
    <PunctuationRenderer punctuation="..." />
    <NodeRenderer node={ node.argument } />
  </NodeWrapper>
)

export const MemberExpressionRenderer = ({ node }: { node: babylon.MemberExpression }) => (
  <NodeWrapper inline>
    <NodeRenderer node={ node.object } />
    { node.computed ? <BracketRenderer bracket="[" /> : null }
    { node.computed ? null : <PunctuationRenderer punctuation="." /> }
    <NodeRenderer node={ node.property } />
    { node.computed ? <BracketRenderer bracket="]" /> : null }
  </NodeWrapper>
)

export const BindExpressionRenderer = ({ node }: { node: babylon.BindExpression }) => (
  <NodeWrapper inline>
    <NodeRenderer node={ node.object } />
    <PunctuationRenderer punctuation="::" />
    <NodeRenderer node={ node.callee } />
  </NodeWrapper>
)

export const ConditionalExpressionRenderer = ({ node }: { node: babylon.ConditionalExpression }) => (
  <NodeWrapper inline>
    <NodeRenderer node={ node.test } />
    <PunctuationRenderer punctuation="?" />
    <NodeRenderer node={ node.consequent } />
    <PunctuationRenderer punctuation=":" />
    <NodeRenderer node={ node.alternate } />
  </NodeWrapper>
)

// NOTE: Because `Super` and `Import` are `Expression`, `node.callee` can always be rendered correctly.
export const CallExpressionRenderer = ({ node }: { node: babylon.CallExpression }) => (
  <NodeWrapper inline>
    <NodeRenderer node={ node.callee } />
    <BracketRenderer bracket="(" />
    <CommaSeparatedList elements={ node.arguments } inline />
    <BracketRenderer bracket=")" />
  </NodeWrapper>
)

export const NewExpressionRenderer = ({ node }: { node: babylon.NewExpression }) => (
  <NodeWrapper inline>
    <reservedKeywords.New />
    <NodeRenderer node={ node.callee } />
    <BracketRenderer bracket="(" />
    { node.arguments.map((argument, i) => <NodeRenderer key={ i } node={ argument } />) }
    <BracketRenderer bracket=")" />
  </NodeWrapper>
)

export const SequenceExpressionRenderer = ({ node }: { node: babylon.SequenceExpression }) => (
  <NodeWrapper inline>
    <CommaSeparatedList elements={ node.expressions } inline />
  </NodeWrapper>
)

export const DoExpressionRenderer = ({ node }: { node: babylon.DoExpression }) => (
  <NodeWrapper inline>
    <reservedKeywords.Do />
    <NodeRenderer node={ node.body } />
  </NodeWrapper>
)

export const ClassExpressionRenderer = ({ node }: { node: babylon.ClassExpression }) => (
  <NodeWrapper inline>
    <ClassRenderer node={ node } />
  </NodeWrapper>
)

// vim: set ts=2 sw=2 et:
