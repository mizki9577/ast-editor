// @flow
import type babylon from 'babylon'
import React from 'react'
import { NodeRenderer, ReservedKeywordRenderer, OpenBracketRenderer, ClosingBracketRenderer, OperatorRenderer } from './JavaScriptASTRenderer.js'

export const ExpressionStatementRenderer = ({ node }: { node: babylon.ExpressionStatement }) => (
  <div>
    <NodeRenderer node={ node.expression } />
  </div>
)

export const BlockStatementRenderer = ({ node }: { node: babylon.BlockStatement }) => (
  <span className="block-statement">
    <OpenBracketRenderer>{ '{' }</OpenBracketRenderer>
    <div className="block-body">
      { node.directives.map((directive, i) => <NodeRenderer key={ i } node={ directive } />) }
      { node.body.map((child, i) => <NodeRenderer key={ i } node={ child } />) }
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
    <NodeRenderer node={ node.object } />
    <ClosingBracketRenderer>)</ClosingBracketRenderer>
    <NodeRenderer node={ node.body } />
  </div>
)

export const ReturnStatementRenderer = ({ node }: { node: babylon.ReturnStatement }) => (
  <div>
    <ReservedKeywordRenderer>return</ReservedKeywordRenderer>
    <NodeRenderer node={ node.argument } />
  </div>
)

export const LabeledStatementRenderer = ({ node }: { node: babylon.LabeledStatement }) => (
  <div>
    <NodeRenderer node={ node.label } />
    <span>:</span>
    <NodeRenderer node={ node.body } />
  </div>
)

export const BreakStatementRenderer = ({ node }: { node: babylon.BreakStatement }) => (
  <div>
    <ReservedKeywordRenderer>break</ReservedKeywordRenderer>
    <NodeRenderer node={ node.label } />
  </div>
)

export const ContinueStatementRenderer = ({ node }: { node: babylon.ContinueStatement }) => (
  <div>
    <ReservedKeywordRenderer>continue</ReservedKeywordRenderer>
    <NodeRenderer node={ node.label } />
  </div>
)

export const IfStatementRenderer = ({ node }: { node: babylon.IfStatement }) => (
  <div>
    <ReservedKeywordRenderer>if</ReservedKeywordRenderer>
    <OpenBracketRenderer>(</OpenBracketRenderer>
    <NodeRenderer node={ node.test } />
    <ClosingBracketRenderer>)</ClosingBracketRenderer>
    <span className="if-body">
      <NodeRenderer node={ node.consequent } />
    </span>
    { node.alternate !== null ? <ReservedKeywordRenderer>else</ReservedKeywordRenderer> : null }
    { node.alternate !== null ? (
      <span className="if-body">
        <NodeRenderer node={ node.alternate } />
      </span>
    ) : null }
  </div>
)

export const SwitchStatementRenderer = ({ node }: { node: babylon.SwitchStatement }) => (
  <div>
    <ReservedKeywordRenderer>switch</ReservedKeywordRenderer>
    <OpenBracketRenderer>(</OpenBracketRenderer>
    <NodeRenderer node={ node.discriminant } />
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
    <NodeRenderer node={ node.test } />
    <span>:</span>
    <div className="case-body">
      { node.consequent.map((statement, i) => <NodeRenderer key={ i } node={ statement } />) }
    </div>
  </div>
)

export const ThrowStatementRenderer = ({ node }: { node: babylon.ThrowStatement }) => (
  <div>
    <ReservedKeywordRenderer>throw</ReservedKeywordRenderer>
    <NodeRenderer node={ node.argument } />
  </div>
)

export const TryStatementRenderer = ({ node }: { node: babylon.TryStatement }) => (
  <div>
    <ReservedKeywordRenderer>try</ReservedKeywordRenderer>
    <BlockStatementRenderer node={ node.block } />
    <NodeRenderer node={ node.handler } />
    { node.finalizer !== null ? <ReservedKeywordRenderer>finally</ReservedKeywordRenderer> : null }
    <NodeRenderer node={ node.finalizer } />
  </div>
)

export const CatchClauseRenderer = ({ node }: { node: babylon.CatchClause }) => (
  <div>
    <ReservedKeywordRenderer>catch</ReservedKeywordRenderer>
    <OpenBracketRenderer>(</OpenBracketRenderer>
    <NodeRenderer node={ node.param } />
    <ClosingBracketRenderer>)</ClosingBracketRenderer>
    <NodeRenderer node={ node.body } />
  </div>
)

export const WhileStatementRenderer = ({ node }: { node: babylon.WhileStatement }) => (
  <div>
    <ReservedKeywordRenderer>while</ReservedKeywordRenderer>
    <OpenBracketRenderer>(</OpenBracketRenderer>
    <NodeRenderer node={ node.test } />
    <ClosingBracketRenderer>)</ClosingBracketRenderer>
    <NodeRenderer node={ node.body } />
  </div>
)

export const DoWhileStatementRenderer = ({ node }: { node: babylon.DoWhileStatement }) => (
  <div>
    <ReservedKeywordRenderer>do</ReservedKeywordRenderer>
    <NodeRenderer node={ node.body } />
    <ReservedKeywordRenderer>while</ReservedKeywordRenderer>
    <OpenBracketRenderer>(</OpenBracketRenderer>
    <NodeRenderer node={ node.test } />
    <ClosingBracketRenderer>)</ClosingBracketRenderer>
  </div>
)

export const ForStatementRenderer = ({ node }: { node: babylon.ForStatement }) => (
  <div className="for-statement">
    <ReservedKeywordRenderer>for</ReservedKeywordRenderer>
    <OpenBracketRenderer>(</OpenBracketRenderer>
    <NodeRenderer node={ node.init } />
    <OperatorRenderer>;</OperatorRenderer>
    <NodeRenderer node={ node.test } />
    <OperatorRenderer>;</OperatorRenderer>
    <NodeRenderer node={ node.update } />
    <ClosingBracketRenderer>)</ClosingBracketRenderer>
    <NodeRenderer node={ node.body } />
  </div>
)

export const ForInStatementRenderer = ({ node }: { node: babylon.ForInStatement }) => (
  <div className="for-statement">
    <ReservedKeywordRenderer>for</ReservedKeywordRenderer>
    <OpenBracketRenderer>(</OpenBracketRenderer>
    <NodeRenderer node={ node.left } />
    <ReservedKeywordRenderer>in</ReservedKeywordRenderer>
    <NodeRenderer node={ node.right } />
    <ClosingBracketRenderer>)</ClosingBracketRenderer>
    <NodeRenderer node={ node.body } />
  </div>
)

export const ForOfStatementRenderer = ({ node }: { node: babylon.ForOfStatement }) => (
  <div className="for-statement">
    <ReservedKeywordRenderer>for</ReservedKeywordRenderer>
    { node.await ? <ReservedKeywordRenderer>await</ReservedKeywordRenderer> : null }
    <OpenBracketRenderer>(</OpenBracketRenderer>
    <NodeRenderer node={ node.left } />
    <ReservedKeywordRenderer>of</ReservedKeywordRenderer>
    <NodeRenderer node={ node.right } />
    <ClosingBracketRenderer>)</ClosingBracketRenderer>
    <NodeRenderer node={ node.body } />
  </div>
)

// vim: set ts=2 sw=2 et:
