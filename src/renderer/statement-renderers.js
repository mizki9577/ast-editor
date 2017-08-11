// @flow
import type babylon from 'babylon'
import React from 'react'
import { NodeRenderer, NodeWrapper, BracketRenderer, PunctuationRenderer } from './JavaScriptASTRenderer.js'
import * as reservedKeywords from './reserved-keywords.js'

export const ExpressionStatementRenderer = ({ node }: { node: babylon.ExpressionStatement }) => (
  <NodeWrapper block>
    <NodeRenderer node={ node.expression } />
  </NodeWrapper>
)

export const BlockStatementRenderer = ({ node }: { node: babylon.BlockStatement }) => (
  <NodeWrapper inline className="block-statement">
    <BracketRenderer bracket="{" />
    <div className="block-body">
      { Array.isArray(node.directives) ? node.directives.map((directive, i) => <NodeRenderer key={ i } node={ directive } />) : null }
      { node.body.map((child, i) => <NodeRenderer key={ i } node={ child } />) }
    </div>
    <BracketRenderer bracket="}" />
  </NodeWrapper>
)

export const EmptyStatementRenderer = ({ node }: { node: babylon.EmptyStatement }) => (
  <NodeWrapper>
    <PunctuationRenderer punctuation=";" />
  </NodeWrapper>
)

export const DebuggerStatementRenderer = ({ node }: { node: babylon.EmptyStatement }) => (
  <NodeWrapper>
    <reservedKeywords.Debugger />
  </NodeWrapper>
)

export const WithStatementRenderer = ({ node }: { node: babylon.WithStatement }) => (
  <NodeWrapper block>
    <reservedKeywords.With />
    <BracketRenderer bracket="(" />
    <NodeRenderer node={ node.object } />
    <BracketRenderer bracket=")" />
    <NodeRenderer node={ node.body } />
  </NodeWrapper>
)

export const ReturnStatementRenderer = ({ node }: { node: babylon.ReturnStatement }) => (
  <NodeWrapper block>
    <reservedKeywords.Return />
    <NodeRenderer node={ node.argument } />
  </NodeWrapper>
)

export const LabeledStatementRenderer = ({ node }: { node: babylon.LabeledStatement }) => (
  <NodeWrapper block>
    <NodeRenderer node={ node.label } />
    <PunctuationRenderer punctuation=":" />
    <NodeRenderer node={ node.body } />
  </NodeWrapper>
)

export const BreakStatementRenderer = ({ node }: { node: babylon.BreakStatement }) => (
  <NodeWrapper block>
    <reservedKeywords.Break />
    <NodeRenderer node={ node.label } />
  </NodeWrapper>
)

export const ContinueStatementRenderer = ({ node }: { node: babylon.ContinueStatement }) => (
  <NodeWrapper block>
    <reservedKeywords.Continue />
    <NodeRenderer node={ node.label } />
  </NodeWrapper>
)

export const IfStatementRenderer = ({ node }: { node: babylon.IfStatement }) => (
  <NodeWrapper block className="if-statement">
    <reservedKeywords.If />
    <BracketRenderer bracket="(" />
    <NodeRenderer node={ node.test } />
    <BracketRenderer bracket=")" />
    <span className="if-body">
      <NodeRenderer node={ node.consequent } />
    </span>
    { node.alternate !== null ? <reservedKeywords.Else /> : null }
    { node.alternate !== null ? (
      <span className="else-body">
      <NodeRenderer node={ node.alternate } />
    </span>
    ) : null }
  </NodeWrapper>
)

export const SwitchStatementRenderer = ({ node }: { node: babylon.SwitchStatement }) => (
  <NodeWrapper block>
    <reservedKeywords.Switch />
    <BracketRenderer bracket="(" />
    <NodeRenderer node={ node.discriminant } />
    <BracketRenderer bracket=")" />
    <BracketRenderer bracket="{" />
    <div className="cases-wrapper">
      { node.cases.map((c, i) => <NodeRenderer key={ i } node={ c } />) }
    </div>
    <BracketRenderer bracket="}" />
  </NodeWrapper>
)

export const SwitchCaseRenderer = ({ node }: { node: babylon.SwitchCase }) => (
  <NodeWrapper block>
    { node.test !== null ? <reservedKeywords.Case /> : <reservedKeywords.Default /> }
    <NodeRenderer node={ node.test } />
    <PunctuationRenderer punctuation=":" />
    <div className="case-body">
      { node.consequent.map((statement, i) => <NodeRenderer key={ i } node={ statement } />) }
    </div>
  </NodeWrapper>
)

export const ThrowStatementRenderer = ({ node }: { node: babylon.ThrowStatement }) => (
  <NodeWrapper block>
    <reservedKeywords.Throw />
    <NodeRenderer node={ node.argument } />
  </NodeWrapper>
)

export const TryStatementRenderer = ({ node }: { node: babylon.TryStatement }) => (
  <NodeWrapper block>
    <reservedKeywords.Try />
    <NodeRenderer node={ node.block } />
    <NodeRenderer node={ node.handler } />
    { node.finalizer !== null ? <reservedKeywords.Finally /> : null }
    <NodeRenderer node={ node.finalizer } />
  </NodeWrapper>
)

export const CatchClauseRenderer = ({ node }: { node: babylon.CatchClause }) => (
  <NodeWrapper block>
    <reservedKeywords.Catch />
    <BracketRenderer bracket="(" />
    <NodeRenderer node={ node.param } />
    <BracketRenderer bracket=")" />
    <NodeRenderer node={ node.body } />
  </NodeWrapper>
)

export const WhileStatementRenderer = ({ node }: { node: babylon.WhileStatement }) => (
  <NodeWrapper block>
    <reservedKeywords.While />
    <BracketRenderer bracket="(" />
    <NodeRenderer node={ node.test } />
    <BracketRenderer bracket=")" />
    <NodeRenderer node={ node.body } />
  </NodeWrapper>
)

export const DoWhileStatementRenderer = ({ node }: { node: babylon.DoWhileStatement }) => (
  <NodeWrapper block>
    <reservedKeywords.Do />
    <NodeRenderer node={ node.body } />
    <reservedKeywords.While />
    <BracketRenderer bracket="(" />
    <NodeRenderer node={ node.test } />
    <BracketRenderer bracket=")" />
  </NodeWrapper>
)

export const ForStatementRenderer = ({ node }: { node: babylon.ForStatement }) => (
  <NodeWrapper block className="for-statement">
    <reservedKeywords.For />
    <BracketRenderer bracket="(" />
    <NodeRenderer node={ node.init } />
    <PunctuationRenderer punctuation=";" />
    <NodeRenderer node={ node.test } />
    <PunctuationRenderer punctuation=";" />
    <NodeRenderer node={ node.update } />
    <BracketRenderer bracket=")" />
    <NodeRenderer node={ node.body } />
  </NodeWrapper>
)

export const ForInStatementRenderer = ({ node }: { node: babylon.ForInStatement }) => (
  <NodeWrapper block className="for-statement">
    <reservedKeywords.For />
    <BracketRenderer bracket="(" />
    <NodeRenderer node={ node.left } />
    <reservedKeywords.In />
    <NodeRenderer node={ node.right } />
    <BracketRenderer bracket=")" />
    <NodeRenderer node={ node.body } />
  </NodeWrapper>
)

export const ForOfStatementRenderer = ({ node }: { node: babylon.ForOfStatement }) => (
  <NodeWrapper block className="for-statement">
    <reservedKeywords.For />
    { node.await ? <reservedKeywords.Await /> : null }
    <BracketRenderer bracket="(" />
    <NodeRenderer node={ node.left } />
    <reservedKeywords.Of />
    <NodeRenderer node={ node.right } />
    <BracketRenderer bracket=")" />
    <NodeRenderer node={ node.body } />
  </NodeWrapper>
)

// vim: set ts=2 sw=2 et:
