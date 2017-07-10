// @flow
import type babylon from 'babylon'
import * as React from 'react'
import { renderNode } from './JavaScriptASTRenderer.js'

export const ExpressionStatementRenderer = ({ node }: { node: babylon.ExpressionStatement }) => (
  <div>
    { renderNode(node.expression) }
    <span>;</span>
  </div>
)

export const BlockStatementRenderer = ({ node }: { node: babylon.BlockStatement }) => (
  <div>
    <span>{ '{' }</span>
    { node.directives.map((directive, i) => renderNode(directive, i)) }
    { node.body.map((child, i) => renderNode(child, i)) }
    <span>{ '}' }</span>
  </div>
)

export const EmptyStatementRenderer = ({ node }: { node: babylon.EmptyStatement }) => (
  <div>;</div>
)

export const DebuggerStatementRenderer = ({ node }: { node: babylon.EmptyStatement }) => (
  <div>debuger;</div>
)

export const WithStatementRenderer = ({ node }: { node: babylon.WithStatement }) => (
  <div>
    <span>with</span>
    <span>(</span>
    { renderNode(node.object) }
    <span>)</span>
    { renderNode(node.body) }
  </div>
)

export const ReturnStatementRenderer = ({ node }: { node: babylon.ReturnStatement }) => (
  <div>
    <span>return</span>
    { renderNode(node.argument) }
    <span>;</span>
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
    <span>break</span>
    { renderNode(node.label) }
    <span>;</span>
  </div>
)

export const ContinueStatementRenderer = ({ node }: { node: babylon.ContinueStatement }) => (
  <div>
    <span>continue</span>
    { renderNode(node.label) }
    <span>;</span>
  </div>
)

export const IfStatementRenderer = ({ node }: { node: babylon.IfStatement }) => (
  <div>
    <span>if</span>
    <span>(</span>
    { renderNode(node.test) }
    <span>)</span>
    { renderNode(node.consequent) }
    { node.alternate !== null ? <span>else</span> : null }
    { renderNode(node.alternate) }
  </div>
)

export const SwitchStatementRenderer = ({ node }: { node: babylon.SwitchStatement }) => (
  <div>
    <span>switch</span>
    <span>(</span>
    { renderNode(node.discriminant) }
    <span>)</span>
    <span>{ '{' }</span>
    { node.cases.map((c, i) => <SwitchCaseRenderer key={ i } node={ c } />) }
    <span>{ '}' }</span>
  </div>
)

const SwitchCaseRenderer = ({ node }: { node: babylon.SwitchCase }) => (
  <div>
    <span>{ node.test !== null ? 'case' : 'default' }</span>
    { renderNode(node.test) }
    <span>:</span>
    { node.consequent.map((statement, i) => renderNode(statement, i)) }
  </div>
)

export const ThrowStatementRenderer = ({ node }: { node: babylon.ThrowStatement }) => (
  <div>
    <span>throw</span>
    { renderNode(node.argument) }
    <span>;</span>
  </div>
)

export const TryStatementRenderer = ({ node }: { node: babylon.TryStatement }) => (
  <div>
    <span>try</span>
    <BlockStatementRenderer node={ node.block } />
    { renderNode(node.handler) }
    { node.finalizer !== null ? <span>finally</span> : null }
    { renderNode(node.finalizer) }
  </div>
)

export const CatchClauseRenderer = ({ node }: { node: babylon.CatchClause }) => (
  <div>
    <span>catch</span>
    <span>(</span>
    { renderNode(node.param) }
    <span>)</span>
    { renderNode(node.body) }
  </div>
)

export const WhileStatementRenderer = ({ node }: { node: babylon.WhileStatement }) => (
  <div>
    <span>while</span>
    <span>(</span>
    { renderNode(node.test) }
    <span>)</span>
    { renderNode(node.body) }
  </div>
)

export const DoWhileStatementRenderer = ({ node }: { node: babylon.DoWhileStatement }) => (
  <div>
    <span>do</span>
    { renderNode(node.body) }
    <span>while</span>
    <span>(</span>
    { renderNode(node.test) }
    <span>)</span>
  </div>
)

export const ForStatementRenderer = ({ node }: { node: babylon.ForStatement }) => (
  <div>
    <span>for</span>
    <span>(</span>
    { renderNode(node.init) }
    <span>;</span>
    { renderNode(node.test) }
    <span>;</span>
    { renderNode(node.update) }
    <span>)</span>
    { renderNode(node.body) }
  </div>
)

export const ForInStatementRenderer = ({ node }: { node: babylon.ForInStatement }) => (
  <div>
    <span>for</span>
    <span>(</span>
    { renderNode(node.left) }
    <span>in</span>
    { renderNode(node.right) }
    <span>)</span>
    { renderNode(node.body) }
  </div>
)

export const ForOfStatementRenderer = ({ node }: { node: babylon.ForOfStatement }) => (
  <div>
    <span>for</span>
    { node.await ? <span>await</span> : null }
    <span>(</span>
    { renderNode(node.left) }
    <span>of</span>
    { renderNode(node.right) }
    <span>)</span>
    { renderNode(node.body) }
  </div>
)

// vim: set ts=2 sw=2 et:
