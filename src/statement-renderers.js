// @flow
import type babylon from 'babylon'
import React from 'react'
import { UnknownNodeRenderer, IdentifierRenderer, DirectiveRenderer } from './JavaScriptASTRenderer.js'
import { renderExpression } from './expression-renderers.js'
import { renderPattern } from './pattern-renderers.js'
import { renderDeclaration } from './declaration-renderers.js'
import { VariableDeclarationRenderer } from './declaration-renderers.js'

export const renderStatement = (node: babylon.Node, key: ?number) => {
  switch (node.type) {
    case 'ExpressionStatement':
      return <ExpressionStatementRenderer key={ key } node={ node } />

    case 'BlockStatement':
      return <BlockStatementRenderer key={ key } node={ node } />

    case 'EmptyStatement':
      return <EmptyStatementRenderer key={ key } node={ node } />

    case 'DebuggerStatement':
      return <DebuggerStatementRenderer key={ key } node={ node } />

    case 'WithStatement':
      return <WithStatementRenderer key={ key } node={ node } />

    case 'ReturnStatement':
      return <ReturnStatementRenderer key={ key } node={ node } />

    case 'LabeledStatement':
      return <LabeledStatementRenderer key={ key } node={ node } />

    case 'BreakStatement':
      return <BreakStatementRenderer key={ key } node={ node } />

    case 'ContinueStatement':
      return <ContinueStatementRenderer key={ key } node={ node } />

    case 'IfStatement':
      return <IfStatementRenderer key={ key } node={ node } />

    case 'SwitchStatement':
      return <SwitchStatementRenderer key={ key } node={ node } />

    case 'ThrowStatement':
      return <ThrowStatementRenderer key={ key } node={ node } />

    case 'TryStatement':
      return <TryStatementRenderer key={ key } node={ node } />

    case 'WhileStatement':
      return <WhileStatementRenderer key={ key } node={ node } />

    case 'DoWhileStatement':
      return <DoWhileStatementRenderer key={ key } node={ node } />

    case 'ForStatement':
      return <ForStatementRenderer key={ key } node={ node } />

    case 'ForInStatement':
      return <ForInStatementRenderer key={ key } node={ node } />

    case 'ForOfStatement':
      return <ForOfStatementRenderer key={ key } node={ node } />

    default:
      return (
        <div key="declaration-wrapper">
          { renderDeclaration(node, key) }
        </div>
      )
  }
}

const ExpressionStatementRenderer = ({ node }: { node: babylon.ExpressionStatement }) => (
  <div>
    { renderExpression(node.expression) }
    <span>;</span>
  </div>
)

export const BlockStatementRenderer = ({ node }: { node: babylon.BlockStatement }) => (
  <div>
    <span>{ '{' }</span>
    { node.directives.map((directive, i) => <DirectiveRenderer key={ i } node={ directive } />) }
    { node.body.map((child, i) => renderStatement(child, i)) }
    <span>{ '}' }</span>
  </div>
)

const EmptyStatementRenderer = ({ node }: { node: babylon.EmptyStatement }) => (
  <div>;</div>
)

const DebuggerStatementRenderer = ({ node }: { node: babylon.EmptyStatement }) => (
  <div>debuger;</div>
)

const WithStatementRenderer = ({ node }: { node: babylon.WithStatement }) => (
  <div>
    <span>with</span>
    <span>(</span>
    { renderExpression(node.object) }
    <span>)</span>
    { renderStatement(node.body) }
  </div>
)

const ReturnStatementRenderer = ({ node }: { node: babylon.ReturnStatement }) => (
  <div>
    <span>return</span>
    { node.argument !== null ? renderExpression(node.argument) : null }
    <span>;</span>
  </div>
)

const LabeledStatementRenderer = ({ node }: { node: babylon.LabeledStatement }) => (
  <div>
    <IdentifierRenderer node={ node.label } />
    <span>:</span>
    { renderStatement(node.body) }
  </div>
)

const BreakStatementRenderer = ({ node }: { node: babylon.BreakStatement }) => (
  <div>
    <span>break</span>
    { node.label !== null ? <IdentifierRenderer node={ node.label } /> : null }
    <span>;</span>
  </div>
)

const ContinueStatementRenderer = ({ node }: { node: babylon.ContinueStatement }) => (
  <div>
    <span>continue</span>
    { node.label !== null ? <IdentifierRenderer node={ node.label } /> : null }
    <span>;</span>
  </div>
)

const IfStatementRenderer = ({ node }: { node: babylon.IfStatement }) => (
  <div>
    <span>if</span>
    <span>(</span>
    { renderExpression(node.test) }
    <span>)</span>
    { renderStatement(node.consequent) }
    { node.alternate !== null ? <span>else</span> : null }
    { node.alternate !== null ? renderStatement(node.alternate) : null }
  </div>
)

const SwitchStatementRenderer = ({ node }: { node: babylon.SwitchStatement }) => (
  <div>
    <span>switch</span>
    <span>(</span>
    { renderExpression(node.discriminant) }
    <span>)</span>
    <span>{ '{' }</span>
    { node.cases.map((c, i) => <SwitchCaseRenderer key={ i } node={ c } />) }
    <span>{ '}' }</span>
  </div>
)

const SwitchCaseRenderer = ({ node }: { node: babylon.SwitchCase }) => (
  <div>
    <span>{ node.test !== null ? 'case' : 'default' }</span>
    { node.test !== null ? renderExpression(node.test) : null }
    <span>:</span>
    { node.consequent.map((statement, i) => renderStatement(statement, i)) }
  </div>
)

const ThrowStatementRenderer = ({ node }: { node: babylon.ThrowStatement }) => (
  <div>
    <span>throw</span>
    { renderExpression(node.argument) }
    <span>;</span>
  </div>
)

const TryStatementRenderer = ({ node }: { node: babylon.TryStatement }) => (
  <div>
    <span>try</span>
    <BlockStatementRenderer node={ node.block } />
    { node.handler !== null ? <CatchClauseRenderer node={ node.handler } /> : null }
    { node.finalizer !== null ? <span>finally</span> : null }
    { node.finalizer !== null ? <BlockStatementRenderer node={ node.finalizer } /> : null }
  </div>
)

const CatchClauseRenderer = ({ node }: { node: babylon.CatchClause }) => (
  <div>
    <span>catch</span>
    <span>(</span>
    { renderPattern(node.param) }
    <span>)</span>
    <BlockStatementRenderer node={ node.body } />
  </div>
)

const WhileStatementRenderer = ({ node }: { node: babylon.WhileStatement }) => (
  <div>
    <span>while</span>
    <span>(</span>
    { renderExpression(node.test) }
    <span>)</span>
    { renderStatement(node.body) }
  </div>
)

const DoWhileStatementRenderer = ({ node }: { node: babylon.DoWhileStatement }) => (
  <div>
    <span>do</span>
    { renderStatement(node.body) }
    <span>while</span>
    <span>(</span>
    { renderExpression(node.test) }
    <span>)</span>
  </div>
)

const ForStatementRenderer = ({ node }: { node: babylon.ForStatement }) => (
  <div>
    <span>for</span>
    <span>(</span>
    { node.init !== null ? node.init.type === 'VariableDeclaration' ? <VariableDeclarationRenderer node={ node.init } /> : renderExpression(node.init) : null }
    <span>;</span>
    { node.test !== null ? renderExpression(node.test) : null }
    <span>;</span>
    { node.update !== null ? renderExpression(node.update) : null }
    <span>)</span>
    { renderStatement(node.body) }
  </div>
)

const ForInStatementRenderer = ({ node }: { node: babylon.ForInStatement }) => (
  <div>
    <span>for</span>
    <span>(</span>
    { node.left.type === 'VariableDeclaration' ? <VariableDeclarationRenderer node={ node.left } /> : renderExpression(node.left) }
    <span>in</span>
    { renderExpression(node.right) }
    <span>)</span>
    { renderStatement(node.body) }
  </div>
)

const ForOfStatementRenderer = ({ node }: { node: babylon.ForOfStatement }) => (
  <div>
    <span>for</span>
    { node.await ? <span>await</span> : null }
    <span>(</span>
    { node.left.type === 'VariableDeclaration' ? <VariableDeclarationRenderer node={ node.left } /> : renderExpression(node.left) }
    <span>of</span>
    { renderExpression(node.right) }
    <span>)</span>
    { renderStatement(node.body) }
  </div>
)

// vim: set ts=2 sw=2 et:
