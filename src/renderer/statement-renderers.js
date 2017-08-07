// @flow
import type babylon from 'babylon'
import React from 'react'
import { NodeRenderer, NodeWrapper, ReservedKeywordRenderer, OpenBracketRenderer, ClosingBracketRenderer, OperatorRenderer } from './JavaScriptASTRenderer.js'

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
      <OpenBracketRenderer>{ '{' }</OpenBracketRenderer>
      <div className="block-body">
        { node.directives.map((directive, i) => <NodeRenderer key={ i } node={ directive } />) }
        { node.body.map((child, i) => <NodeRenderer key={ i } node={ child } />) }
      </div>
      <ClosingBracketRenderer>{ '}' }</ClosingBracketRenderer>
    </span>
  </NodeWrapper>
)

export const EmptyStatementRenderer = ({ node }: { node: babylon.EmptyStatement }) => (
  <NodeWrapper>
    <OperatorRenderer>;</OperatorRenderer>
  </NodeWrapper>
)

export const DebuggerStatementRenderer = ({ node }: { node: babylon.EmptyStatement }) => (
  <NodeWrapper>
    <ReservedKeywordRenderer>debuger</ReservedKeywordRenderer>
  </NodeWrapper>
)

export const WithStatementRenderer = ({ node }: { node: babylon.WithStatement }) => (
  <NodeWrapper>
    <div>
      <ReservedKeywordRenderer>with</ReservedKeywordRenderer>
      <OpenBracketRenderer>(</OpenBracketRenderer>
      <NodeRenderer node={ node.object } />
      <ClosingBracketRenderer>)</ClosingBracketRenderer>
      <NodeRenderer node={ node.body } />
    </div>
  </NodeWrapper>
)

export const ReturnStatementRenderer = ({ node }: { node: babylon.ReturnStatement }) => (
  <NodeWrapper>
    <div>
      <ReservedKeywordRenderer>return</ReservedKeywordRenderer>
      <NodeRenderer node={ node.argument } />
    </div>
  </NodeWrapper>
)

export const LabeledStatementRenderer = ({ node }: { node: babylon.LabeledStatement }) => (
  <NodeWrapper>
    <div>
      <NodeRenderer node={ node.label } />
      <span>:</span>
      <NodeRenderer node={ node.body } />
    </div>
  </NodeWrapper>
)

export const BreakStatementRenderer = ({ node }: { node: babylon.BreakStatement }) => (
  <NodeWrapper>
    <div>
      <ReservedKeywordRenderer>break</ReservedKeywordRenderer>
      <NodeRenderer node={ node.label } />
    </div>
  </NodeWrapper>
)

export const ContinueStatementRenderer = ({ node }: { node: babylon.ContinueStatement }) => (
  <NodeWrapper>
    <div>
      <ReservedKeywordRenderer>continue</ReservedKeywordRenderer>
      <NodeRenderer node={ node.label } />
    </div>
  </NodeWrapper>
)

export const IfStatementRenderer = ({ node }: { node: babylon.IfStatement }) => (
  <NodeWrapper>
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
  </NodeWrapper>
)

export const SwitchStatementRenderer = ({ node }: { node: babylon.SwitchStatement }) => (
  <NodeWrapper>
    <div>
      <ReservedKeywordRenderer>switch</ReservedKeywordRenderer>
      <OpenBracketRenderer>(</OpenBracketRenderer>
      <NodeRenderer node={ node.discriminant } />
      <ClosingBracketRenderer>)</ClosingBracketRenderer>
      <OpenBracketRenderer>{ '{' }</OpenBracketRenderer>
      <div className="cases-wrapper">
        { node.cases.map((c, i) => <NodeRenderer key={ i } node={ c } />) }
      </div>
      <ClosingBracketRenderer>{ '}' }</ClosingBracketRenderer>
    </div>
  </NodeWrapper>
)

export const SwitchCaseRenderer = ({ node }: { node: babylon.SwitchCase }) => (
  <NodeWrapper>
    <div>
      <ReservedKeywordRenderer>{ node.test !== null ? 'case' : 'default' }</ReservedKeywordRenderer>
      <NodeRenderer node={ node.test } />
      <span>:</span>
      <div className="case-body">
        { node.consequent.map((statement, i) => <NodeRenderer key={ i } node={ statement } />) }
      </div>
    </div>
  </NodeWrapper>
)

export const ThrowStatementRenderer = ({ node }: { node: babylon.ThrowStatement }) => (
  <NodeWrapper>
    <div>
      <ReservedKeywordRenderer>throw</ReservedKeywordRenderer>
      <NodeRenderer node={ node.argument } />
    </div>
  </NodeWrapper>
)

export const TryStatementRenderer = ({ node }: { node: babylon.TryStatement }) => (
  <NodeWrapper>
    <div>
      <ReservedKeywordRenderer>try</ReservedKeywordRenderer>
      <NodeRenderer node={ node.block } />
      <NodeRenderer node={ node.handler } />
      { node.finalizer !== null ? <ReservedKeywordRenderer>finally</ReservedKeywordRenderer> : null }
      <NodeRenderer node={ node.finalizer } />
    </div>
  </NodeWrapper>
)

export const CatchClauseRenderer = ({ node }: { node: babylon.CatchClause }) => (
  <NodeWrapper>
    <div>
      <ReservedKeywordRenderer>catch</ReservedKeywordRenderer>
      <OpenBracketRenderer>(</OpenBracketRenderer>
      <NodeRenderer node={ node.param } />
      <ClosingBracketRenderer>)</ClosingBracketRenderer>
      <NodeRenderer node={ node.body } />
    </div>
  </NodeWrapper>
)

export const WhileStatementRenderer = ({ node }: { node: babylon.WhileStatement }) => (
  <NodeWrapper>
    <div>
      <ReservedKeywordRenderer>while</ReservedKeywordRenderer>
      <OpenBracketRenderer>(</OpenBracketRenderer>
      <NodeRenderer node={ node.test } />
      <ClosingBracketRenderer>)</ClosingBracketRenderer>
      <NodeRenderer node={ node.body } />
    </div>
  </NodeWrapper>
)

export const DoWhileStatementRenderer = ({ node }: { node: babylon.DoWhileStatement }) => (
  <NodeWrapper>
    <div>
      <ReservedKeywordRenderer>do</ReservedKeywordRenderer>
      <NodeRenderer node={ node.body } />
      <ReservedKeywordRenderer>while</ReservedKeywordRenderer>
      <OpenBracketRenderer>(</OpenBracketRenderer>
      <NodeRenderer node={ node.test } />
      <ClosingBracketRenderer>)</ClosingBracketRenderer>
    </div>
  </NodeWrapper>
)

export const ForStatementRenderer = ({ node }: { node: babylon.ForStatement }) => (
  <NodeWrapper>
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
  </NodeWrapper>
)

export const ForInStatementRenderer = ({ node }: { node: babylon.ForInStatement }) => (
  <NodeWrapper>
    <div className="for-statement">
      <ReservedKeywordRenderer>for</ReservedKeywordRenderer>
      <OpenBracketRenderer>(</OpenBracketRenderer>
      <NodeRenderer node={ node.left } />
      <ReservedKeywordRenderer>in</ReservedKeywordRenderer>
      <NodeRenderer node={ node.right } />
      <ClosingBracketRenderer>)</ClosingBracketRenderer>
      <NodeRenderer node={ node.body } />
    </div>
  </NodeWrapper>
)

export const ForOfStatementRenderer = ({ node }: { node: babylon.ForOfStatement }) => (
  <NodeWrapper>
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
  </NodeWrapper>
)

// vim: set ts=2 sw=2 et:
