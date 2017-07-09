// @flow
import type babylon from 'babylon'
import React from 'react'
import { UnknownNodeRenderer, IdentifierRenderer, DirectiveRenderer } from './JavaScriptASTRenderer.js'
import { renderExpression } from './expression-renderers.js'
import { renderPattern } from './pattern-renderers.js'
import { renderDeclaration } from './declaration-renderers.js'
import { VariableDeclarationRenderer } from './declaration-renderers.js'

export const renderStatement = (node: babylon.Node) => {
  switch (node.type) {
    case 'ExpressionStatement':
      return <ExpressionStatementRenderer node={ node } />

    case 'BlockStatement':
      return <BlockStatementRenderer node={ node } />

    case 'EmptyStatement':
      return <EmptyStatementRenderer node={ node } />

    case 'DebuggerStatement':
      return <DebuggerStatementRenderer node={ node } />

    case 'WithStatement':
      return <WithStatementRenderer node={ node } />

    case 'ReturnStatement':
      return <ReturnStatementRenderer node={ node } />

    case 'LabeledStatement':
      return <LabeledStatementRenderer node={ node } />

    case 'BreakStatement':
      return <BreakStatementRenderer node={ node } />

    case 'ContinueStatement':
      return <ContinueStatementRenderer node={ node } />

    case 'IfStatement':
      return <IfStatementRenderer node={ node } />

    case 'SwitchStatement':
      return <SwitchStatementRenderer node={ node } />

    case 'ThrowStatement':
      return <ThrowStatementRenderer node={ node } />

    case 'TryStatement':
      return <TryStatementRenderer node={ node } />

    case 'WhileStatement':
      return <WhileStatementRenderer node={ node } />

    case 'DoWhileStatement':
      return <DoWhileStatementRenderer node={ node } />

    case 'ForStatement':
      return <ForStatementRenderer node={ node } />

    case 'ForInStatement':
      return <ForInStatementRenderer node={ node } />

    case 'ForOfStatement':
      return <ForOfStatementRenderer node={ node } />

    default:
      return (
        <div>
          { renderDeclaration(node) }
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
    { node.directives.map(directive => <DirectiveRenderer node={ directive } />) }
    { node.body.map(child => renderStatement(child)) }
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
    { node.cases.map(c => <SwitchCaseRenderer node={ c } />) }
    <span>{ '}' }</span>
  </div>
)

const SwitchCaseRenderer = ({ node }: { node: babylon.SwitchCase }) => (
  <div>
    <span>{ node.test !== null ? 'case' : 'default' }</span>
    { node.test !== null ? renderExpression(node.test) : null }
    <span>:</span>
    { node.consequent.map(statement => renderStatement(statement)) }
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
