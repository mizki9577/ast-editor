// @flow
import type babylon from 'babylon'
import React from 'react'
import { renderNode, ReservedKeywordRenderer, OpenBracketRenderer, ClosingBracketRenderer, OperatorRenderer } from './JavaScriptASTRenderer.js'

export const ExpressionStatementRenderer = ({ node }: { node: babylon.ExpressionStatement }) => (
  <div>
    { renderNode(node.expression) }
  </div>
)

export const BlockStatementRenderer = ({ node }: { node: babylon.BlockStatement }) => (
  <span className="block-statement">
    <OpenBracketRenderer>{ '{' }</OpenBracketRenderer>
    <div className="block-body">
      { node.directives.map((directive, i) => renderNode(directive, i)) }
      { node.body.map((child, i) => renderNode(child, i)) }
    </div>
    <ClosingBracketRenderer>{ '}' }</ClosingBracketRenderer>
  </span>
)

export const EmptyStatementRenderer = ({ node }: { node: babylon.EmptyStatement }) => (
  <OperatorRenderer>;</OperatorRenderer>
)

export const DebuggerStatementRenderer = ({ node }: { node: babylon.EmptyStatement }) => (
  <ReservedKeywordRenderer>debuger</ReservedKeywordRenderer>
)

export const WithStatementRenderer = ({ node }: { node: babylon.WithStatement }) => (
  <div>
    <ReservedKeywordRenderer>with</ReservedKeywordRenderer>
    <OpenBracketRenderer>(</OpenBracketRenderer>
    { renderNode(node.object) }
    <ClosingBracketRenderer>)</ClosingBracketRenderer>
    { renderNode(node.body) }
  </div>
)

export const ReturnStatementRenderer = ({ node }: { node: babylon.ReturnStatement }) => (
  <div>
    <ReservedKeywordRenderer>return</ReservedKeywordRenderer>
    { renderNode(node.argument) }
  </div>
)

export const LabeledStatementRenderer = ({ node }: { node: babylon.LabeledStatement }) => (
  <div>
    { renderNode(node.label) }
    <span>:</span>
    { renderNode(node.body) }
  </div>
)

export const BreakStatementRenderer = ({ node }: { node: babylon.BreakStatement }) => (
  <div>
    <ReservedKeywordRenderer>break</ReservedKeywordRenderer>
    { renderNode(node.label) }
  </div>
)

export const ContinueStatementRenderer = ({ node }: { node: babylon.ContinueStatement }) => (
  <div>
    <ReservedKeywordRenderer>continue</ReservedKeywordRenderer>
    { renderNode(node.label) }
  </div>
)

export const IfStatementRenderer = ({ node }: { node: babylon.IfStatement }) => (
  <div>
    <ReservedKeywordRenderer>if</ReservedKeywordRenderer>
    <OpenBracketRenderer>(</OpenBracketRenderer>
    { renderNode(node.test) }
    <ClosingBracketRenderer>)</ClosingBracketRenderer>
    <span className="if-body">
      { renderNode(node.consequent) }
    </span>
    { node.alternate !== null ? <ReservedKeywordRenderer>else</ReservedKeywordRenderer> : null }
    { node.alternate !== null ? (
      <span className="if-body">
        { renderNode(node.alternate) }
      </span>
    ) : null }
  </div>
)

export const SwitchStatementRenderer = ({ node }: { node: babylon.SwitchStatement }) => (
  <div>
    <ReservedKeywordRenderer>switch</ReservedKeywordRenderer>
    <OpenBracketRenderer>(</OpenBracketRenderer>
    { renderNode(node.discriminant) }
    <ClosingBracketRenderer>)</ClosingBracketRenderer>
    <OpenBracketRenderer>{ '{' }</OpenBracketRenderer>
    <div className="cases-wrapper">
      { node.cases.map((c, i) => <SwitchCaseRenderer key={ i } node={ c } />) }
    </div>
    <ClosingBracketRenderer>{ '}' }</ClosingBracketRenderer>
  </div>
)

const SwitchCaseRenderer = ({ node }: { node: babylon.SwitchCase }) => (
  <div>
    <ReservedKeywordRenderer>{ node.test !== null ? 'case' : 'default' }</ReservedKeywordRenderer>
    { renderNode(node.test) }
    <span>:</span>
    <div className="case-body">
      { node.consequent.map((statement, i) => renderNode(statement, i)) }
    </div>
  </div>
)

export const ThrowStatementRenderer = ({ node }: { node: babylon.ThrowStatement }) => (
  <div>
    <ReservedKeywordRenderer>throw</ReservedKeywordRenderer>
    { renderNode(node.argument) }
  </div>
)

export const TryStatementRenderer = ({ node }: { node: babylon.TryStatement }) => (
  <div>
    <ReservedKeywordRenderer>try</ReservedKeywordRenderer>
    <BlockStatementRenderer node={ node.block } />
    { renderNode(node.handler) }
    { node.finalizer !== null ? <ReservedKeywordRenderer>finally</ReservedKeywordRenderer> : null }
    { renderNode(node.finalizer) }
  </div>
)

export const CatchClauseRenderer = ({ node }: { node: babylon.CatchClause }) => (
  <div>
    <ReservedKeywordRenderer>catch</ReservedKeywordRenderer>
    <OpenBracketRenderer>(</OpenBracketRenderer>
    { renderNode(node.param) }
    <ClosingBracketRenderer>)</ClosingBracketRenderer>
    { renderNode(node.body) }
  </div>
)

export const WhileStatementRenderer = ({ node }: { node: babylon.WhileStatement }) => (
  <div>
    <ReservedKeywordRenderer>while</ReservedKeywordRenderer>
    <OpenBracketRenderer>(</OpenBracketRenderer>
    { renderNode(node.test) }
    <ClosingBracketRenderer>)</ClosingBracketRenderer>
    { renderNode(node.body) }
  </div>
)

export const DoWhileStatementRenderer = ({ node }: { node: babylon.DoWhileStatement }) => (
  <div>
    <ReservedKeywordRenderer>do</ReservedKeywordRenderer>
    { renderNode(node.body) }
    <ReservedKeywordRenderer>while</ReservedKeywordRenderer>
    <OpenBracketRenderer>(</OpenBracketRenderer>
    { renderNode(node.test) }
    <ClosingBracketRenderer>)</ClosingBracketRenderer>
  </div>
)

export const ForStatementRenderer = ({ node }: { node: babylon.ForStatement }) => (
  <div className="for-statement">
    <ReservedKeywordRenderer>for</ReservedKeywordRenderer>
    <OpenBracketRenderer>(</OpenBracketRenderer>
    { renderNode(node.init) }
    <OperatorRenderer>;</OperatorRenderer>
    { renderNode(node.test) }
    <OperatorRenderer>;</OperatorRenderer>
    { renderNode(node.update) }
    <ClosingBracketRenderer>)</ClosingBracketRenderer>
    { renderNode(node.body) }
  </div>
)

export const ForInStatementRenderer = ({ node }: { node: babylon.ForInStatement }) => (
  <div className="for-statement">
    <ReservedKeywordRenderer>for</ReservedKeywordRenderer>
    <OpenBracketRenderer>(</OpenBracketRenderer>
    { renderNode(node.left) }
    <ReservedKeywordRenderer>in</ReservedKeywordRenderer>
    { renderNode(node.right) }
    <ClosingBracketRenderer>)</ClosingBracketRenderer>
    { renderNode(node.body) }
  </div>
)

export const ForOfStatementRenderer = ({ node }: { node: babylon.ForOfStatement }) => (
  <div className="for-statement">
    <ReservedKeywordRenderer>for</ReservedKeywordRenderer>
    { node.await ? <ReservedKeywordRenderer>await</ReservedKeywordRenderer> : null }
    <OpenBracketRenderer>(</OpenBracketRenderer>
    { renderNode(node.left) }
    <ReservedKeywordRenderer>of</ReservedKeywordRenderer>
    { renderNode(node.right) }
    <ClosingBracketRenderer>)</ClosingBracketRenderer>
    { renderNode(node.body) }
  </div>
)

// vim: set ts=2 sw=2 et:
