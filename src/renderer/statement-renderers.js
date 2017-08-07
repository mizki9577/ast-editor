// @flow
import type babylon from 'babylon'
import React from 'react'
import { NodeRenderer, NodeWrapper, BracketRenderer, PunctuationRenderer } from './JavaScriptASTRenderer.js'
import * as reservedKeywords from './reserved-keywords.js'

export const ExpressionStatementRenderer = ({ node }: { node: babylon.ExpressionStatement }) => (
  <NodeWrapper>
    <div>
      <NodeRenderer node={ node.expression } />
    </div>
  </NodeWrapper>
)

export const BlockStatementRenderer = ({ node }: { node: babylon.BlockStatement }) => (
  <NodeWrapper>
    <span className="block-statement">
      <BracketRenderer bracket="{" />
      <div className="block-body">
        { node.directives.map((directive, i) => <NodeRenderer key={ i } node={ directive } />) }
        { node.body.map((child, i) => <NodeRenderer key={ i } node={ child } />) }
      </div>
      <BracketRenderer bracket="}" />
    </span>
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
  <NodeWrapper>
    <div>
      <reservedKeywords.With />
      <BracketRenderer bracket="(" />
      <NodeRenderer node={ node.object } />
      <BracketRenderer bracket=")" />
      <NodeRenderer node={ node.body } />
    </div>
  </NodeWrapper>
)

export const ReturnStatementRenderer = ({ node }: { node: babylon.ReturnStatement }) => (
  <NodeWrapper>
    <div>
      <reservedKeywords.Return />
      <NodeRenderer node={ node.argument } />
    </div>
  </NodeWrapper>
)

export const LabeledStatementRenderer = ({ node }: { node: babylon.LabeledStatement }) => (
  <NodeWrapper>
    <div>
      <NodeRenderer node={ node.label } />
      <PunctuationRenderer punctuation=":" />
      <NodeRenderer node={ node.body } />
    </div>
  </NodeWrapper>
)

export const BreakStatementRenderer = ({ node }: { node: babylon.BreakStatement }) => (
  <NodeWrapper>
    <div>
      <reservedKeywords.Break />
      <NodeRenderer node={ node.label } />
    </div>
  </NodeWrapper>
)

export const ContinueStatementRenderer = ({ node }: { node: babylon.ContinueStatement }) => (
  <NodeWrapper>
    <div>
      <reservedKeywords.Continue />
      <NodeRenderer node={ node.label } />
    </div>
  </NodeWrapper>
)

export const IfStatementRenderer = ({ node }: { node: babylon.IfStatement }) => (
  <NodeWrapper>
    <div className="if-statement">
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
    </div>
  </NodeWrapper>
)

export const SwitchStatementRenderer = ({ node }: { node: babylon.SwitchStatement }) => (
  <NodeWrapper>
    <div>
      <reservedKeywords.Switch />
      <BracketRenderer bracket="(" />
      <NodeRenderer node={ node.discriminant } />
      <BracketRenderer bracket=")" />
      <BracketRenderer bracket="{" />
      <div className="cases-wrapper">
        { node.cases.map((c, i) => <NodeRenderer key={ i } node={ c } />) }
      </div>
      <BracketRenderer bracket="}" />
    </div>
  </NodeWrapper>
)

export const SwitchCaseRenderer = ({ node }: { node: babylon.SwitchCase }) => (
  <NodeWrapper>
    <div>
      { node.test !== null ? <reservedKeywords.Case /> : <reservedKeywords.Default /> }
      <NodeRenderer node={ node.test } />
      <PunctuationRenderer punctuation=":" />
      <div className="case-body">
        { node.consequent.map((statement, i) => <NodeRenderer key={ i } node={ statement } />) }
      </div>
    </div>
  </NodeWrapper>
)

export const ThrowStatementRenderer = ({ node }: { node: babylon.ThrowStatement }) => (
  <NodeWrapper>
    <div>
      <reservedKeywords.Throw />
      <NodeRenderer node={ node.argument } />
    </div>
  </NodeWrapper>
)

export const TryStatementRenderer = ({ node }: { node: babylon.TryStatement }) => (
  <NodeWrapper>
    <div>
      <reservedKeywords.Try />
      <NodeRenderer node={ node.block } />
      <NodeRenderer node={ node.handler } />
      { node.finalizer !== null ? <reservedKeywords.Finally /> : null }
      <NodeRenderer node={ node.finalizer } />
    </div>
  </NodeWrapper>
)

export const CatchClauseRenderer = ({ node }: { node: babylon.CatchClause }) => (
  <NodeWrapper>
    <div>
      <reservedKeywords.Catch />
      <BracketRenderer bracket="(" />
      <NodeRenderer node={ node.param } />
      <BracketRenderer bracket=")" />
      <NodeRenderer node={ node.body } />
    </div>
  </NodeWrapper>
)

export const WhileStatementRenderer = ({ node }: { node: babylon.WhileStatement }) => (
  <NodeWrapper>
    <div>
      <reservedKeywords.While />
      <BracketRenderer bracket="(" />
      <NodeRenderer node={ node.test } />
      <BracketRenderer bracket=")" />
      <NodeRenderer node={ node.body } />
    </div>
  </NodeWrapper>
)

export const DoWhileStatementRenderer = ({ node }: { node: babylon.DoWhileStatement }) => (
  <NodeWrapper>
    <div>
      <reservedKeywords.Do />
      <NodeRenderer node={ node.body } />
      <reservedKeywords.While />
      <BracketRenderer bracket="(" />
      <NodeRenderer node={ node.test } />
      <BracketRenderer bracket=")" />
    </div>
  </NodeWrapper>
)

export const ForStatementRenderer = ({ node }: { node: babylon.ForStatement }) => (
  <NodeWrapper>
    <div className="for-statement">
      <reservedKeywords.For />
      <BracketRenderer bracket="(" />
      <NodeRenderer node={ node.init } />
      <PunctuationRenderer punctuation=";" />
      <NodeRenderer node={ node.test } />
      <PunctuationRenderer punctuation=";" />
      <NodeRenderer node={ node.update } />
      <BracketRenderer bracket=")" />
      <NodeRenderer node={ node.body } />
    </div>
  </NodeWrapper>
)

export const ForInStatementRenderer = ({ node }: { node: babylon.ForInStatement }) => (
  <NodeWrapper>
    <div className="for-statement">
      <reservedKeywords.For />
      <BracketRenderer bracket="(" />
      <NodeRenderer node={ node.left } />
      <reservedKeywords.In />
      <NodeRenderer node={ node.right } />
      <BracketRenderer bracket=")" />
      <NodeRenderer node={ node.body } />
    </div>
  </NodeWrapper>
)

export const ForOfStatementRenderer = ({ node }: { node: babylon.ForOfStatement }) => (
  <NodeWrapper>
    <div className="for-statement">
      <reservedKeywords.For />
      { node.await ? <reservedKeywords.Await /> : null }
      <BracketRenderer bracket="(" />
      <NodeRenderer node={ node.left } />
      <reservedKeywords.Of />
      <NodeRenderer node={ node.right } />
      <BracketRenderer bracket=")" />
      <NodeRenderer node={ node.body } />
    </div>
  </NodeWrapper>
)

// vim: set ts=2 sw=2 et:
