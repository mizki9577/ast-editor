// @flow
import type babylon from 'babylon'

import React from 'react'
import * as literals from './literal-renderers.js'
import * as statements from './statement-renderers.js'
import * as expressions from './expression-renderers.js'
import * as declarations from './declaration-renderers.js'
import * as patterns from './pattern-renderers.js'
import * as modules from './module-renderers.js'
import * as classes from './class-renderers.js'

type File = babylon.Node & {
  type: 'File',
}

export const renderNode = (node: babylon.Node, key: ?number) => {
  if (node == null) return null

  switch (node.type) {
    case 'File':
      return <FileRenderer key={ key } node={ node } />

    case 'Identifier':
      return <IdentifierRenderer key={ key } node={ node } />

    //case 'PrivateName':

    // Literals [
    case 'RegExpLiteral':
      return <literals.RegExpLiteralRenderer key={ key } node={ node } />

    case 'NullLiteral':
      return <literals.NullLiteralRenderer key={ key } node={ node } />

    case 'StringLiteral':
      return <literals.StringLiteralRenderer key={ key } node={ node } />

    case 'BooleanLiteral':
      return <literals.BooleanLiteralRenderer key={ key } node={ node } />

    case 'NumericLiteral':
      return <literals.NumericLiteralRenderer key={ key } node={ node } />
    // Literals ]

    case 'Program':
      return <ProgramRenderer key={ key } node={ node } />

    // Statements [
    case 'ExpressionStatement':
      return <statements.ExpressionStatementRenderer key={ key } node={ node } />

    case 'BlockStatement':
      return <statements.BlockStatementRenderer key={ key } node={ node } />

    case 'EmptyStatement':
      return <statements.EmptyStatementRenderer key={ key } node={ node } />

    case 'DebuggerStatement':
      return <statements.DebuggerStatementRenderer key={ key } node={ node } />

    case 'WithStatement':
      return <statements.WithStatementRenderer key={ key } node={ node } />

    case 'ReturnStatement':
      return <statements.ReturnStatementRenderer key={ key } node={ node } />

    case 'LabeledStatement':
      return <statements.LabeledStatementRenderer key={ key } node={ node } />

    case 'BreakStatement':
      return <statements.BreakStatementRenderer key={ key } node={ node } />

    case 'ContinueStatement':
      return <statements.ContinueStatementRenderer key={ key } node={ node } />

    case 'IfStatement':
      return <statements.IfStatementRenderer key={ key } node={ node } />

    case 'SwitchStatement':
      return <statements.SwitchStatementRenderer key={ key } node={ node } />

    case 'ThrowStatement':
      return <statements.ThrowStatementRenderer key={ key } node={ node } />

    case 'TryStatement':
      return <statements.TryStatementRenderer key={ key } node={ node } />

    case 'CatchClause':
      return <statements.CatchClauseRenderer key={ key } node={ node } />

    case 'WhileStatement':
      return <statements.WhileStatementRenderer key={ key } node={ node } />

    case 'DoWhileStatement':
      return <statements.DoWhileStatementRenderer key={ key } node={ node } />

    case 'ForStatement':
      return <statements.ForStatementRenderer key={ key } node={ node } />

    case 'ForInStatement':
      return <statements.ForInStatementRenderer key={ key } node={ node } />

    case 'ForOfStatement':
      return <statements.ForOfStatementRenderer key={ key } node={ node } />
    // Statements ]

    // Declarations [
    case 'FunctionDeclaration':
      return <declarations.FunctionDeclarationRenderer key={ key } node={ node } />

    case 'VariableDeclaration':
      return <declarations.VariableDeclarationRenderer key={ key } node={ node } />

    case 'ClassDeclaration':
      return <declarations.ClassDeclarationReenderer key={ key } node={ node } />
    // Declarations ]

    case 'Decorator':
      return <DecoratorRenderer key={ key } node={ node } />

    //case 'Directive':
    //case 'DirectiveLiteral':

    // Expressions [
    case 'Super':
      return <expressions.SuperRenderer key={ key } node={ node } />

    case 'Import':
      return <expressions.ImportRenderer key={ key } node={ node } />

    case 'ThisExpression':
      return <expressions.ThisExpressionRenderer key={ key } node={ node } />

    case 'ArrowFunctionExpression':
      return <expressions.ArrowFunctionExpressionRenderer key={ key } node={ node } />

    case 'YieldExpression':
      return <expressions.YieldExpressionRenderer key={ key } node={ node } />

    case 'AwaitExpression':
      return <expressions.AwaitExpressionRenderer key={ key } node={ node } />

    case 'ArrayExpression':
      return <expressions.ArrayExpressionRenderer key={ key } node={ node } />

    case 'ObjectExpression':
      return <expressions.ObjectExpressionRenderer key={ key } node={ node } />

    case 'ObjectMethod':
      return <expressions.ObjectMethodRenderer key={ key } node={ node } />

    case 'ObjectProperty':
      return <expressions.ObjectPropertyRenderer key={ key } node={ node } />

    case 'FunctionExpression':
      return <expressions.FunctionExpressionRenderer key={ key } node={ node } />

    case 'UnaryExpression':
      return <expressions.UnaryExpressionRenderer key={ key } node={ node } />

    case 'UpdateExpression':
      return <expressions.UpdateExpressionRenderer key={ key } node={ node } />

    case 'BinaryExpression':
      return <expressions.BinaryExpressionRenderer key={ key } node={ node } />

    case 'AssignmentExpression':
      return <expressions.AssignmentExpressionRenderer key={ key } node={ node } />

    case 'LogicalExpression':
      return <expressions.LogicalExpressionRenderer key={ key } node={ node } />

    case 'MemberExpression':
      return <expressions.MemberExpressionRenderer key={ key } node={ node } />

    case 'BindExpression':
      return <expressions.BindExpressionRenderer key={ key } node={ node } />

    case 'ConditionalExpression':
      return <expressions.ConditionalExpressionRenderer key={ key } node={ node } />

    case 'CallExpression':
      return <expressions.CallExpressionRenderer key={ key } node={ node } />

    case 'NewExpression':
      return <expressions.NewExpressionRenderer key={ key } node={ node } />

    case 'SequenceExpression':
      return <expressions.SequenceExpressionRenderer key={ key } node={ node } />

    case 'DoExpression':
      return <expressions.DoExpressionRenderer key={ key } node={ node } />

    case 'ClassExpression':
      return <expressions.ClassExpressionRenderer key={ key } node={ node } />

    //case 'MetaProperty':
    // Expressions ]

    // Template Literals [
    //case 'TemplateLiteral':
    //case 'TaggedTemplateExpression':
    // Template Literals ]

    // Patterns [
    case 'ObjectPattern':
      return <patterns.ObjectPatternRenderer key={ key } node={ node } />

    case 'ArrayPattern':
      return <patterns.ArrayPatternRenderer key={ key } node={ node } />

    case 'RestElement':
      return <patterns.RestElementRenderer key={ key } node={ node } />

    case 'AssignmentPattern':
      return <patterns.AssignmentPatternRenderer key={ key } node={ node } />
    // Patterns ]

    // Classes [
    case 'ClassMethod':
      return <classes.ClassMethodRenderer key={ key } node={ node } />

    case 'ClassProperty':
      return <classes.ClassPropertyRenderer key={ key } node={ node } />
    // Classes ]

    // Modules [
    case 'ImportDeclaration':
      return <modules.ImportDeclarationRenderer key={ key } node={ node } />

    case 'ImportSpecifier':
      return <modules.ImportSpecifierRenderer key={ key } node={ node } />

    case 'ImportDefaultSpecifier':
      return <modules.ImportDefaultSpecifierRenderer key={ key } node={ node } />

    case 'ImportNamespaceSpecifier':
      return <modules.ImportNamespaceSpecifierRenderer key={ key } node={ node } />

    case 'ExportNamedDeclaration':
      return <modules.ExportNamedDeclarationRenderer key={ key } node={ node } />

    case 'ExportDefaultDeclaration':
      return <modules.ExportDefaultDeclarationRenderer key={ key } node={ node } />

    case 'ExportAllDeclaration':
      return <modules.ExportAllDeclarationRenderer key={ key } node={ node } />
    // Modules ]

    default:
      return <UnknownNodeRenderer key={ key } node={ node } />
  }
}

export const renderNodeList = (nodes: babylon.Node[], separator: React.Element<any>) => {
  const result = []
  let i = 0
  for (const node of nodes) {
    result.push(renderNode(node, ++i))
    result.push(Object.assign({}, separator, { key: ++i }))
  }
  result.pop()
  return result
}


export const UnknownNodeRenderer = ({ node }: { node: babylon.Node }) => (
  <span className="ms-fontColor-neutralLight ms-bgColor-red">[UNKNOWN: { node.type }]</span>
)

export const FileRenderer = ({ node }: { node: File }) => (
  renderNode(node.program)
)

export const IdentifierRenderer = ({ node }: { node: babylon.Identifier }) => (
  <span className="identifier ms-fontColor-neutralLight">
    { node.name }
  </span>
)

export const ProgramRenderer = ({ node }: { node: babylon.Program }) => (
  <div>
    { node.directives.map((directive, i) => renderNode(directive, i)) }
    { node.body.map((child, i) => renderNode(child, i)) }
  </div>
)

export const FunctionRenderer = ({ node }: { node: babylon.Function }) => (
  <span>
    <span>{ node.async ? 'async' : '' }</span>
    <span>function</span>
    <span>{ node.generator ? '*' : '' }</span>
    <span>{ renderNode(node.id) }</span>
    <span>(</span>
    <span>{ node.params.map((param, i) => renderNode(param, i)) }</span>
    <span>)</span>
    { renderNode(node.body) }
  </span>
)

export const DecoratorRenderer = ({ node }: { node: babylon.Decorator }) => (
  <div>
    <span>@</span>
    { renderNode(node.expression) }
  </div>
)

//

export const ReservedKeywordRenderer = ({ children }: { children: string }) => (
  <span className="keyword ms-fontColor-themePrimary">
    { children }
  </span>
)

export const OperatorRenderer = ({ children }: { children: string }) => (
  <span className="operator ms-fontColor-themeSecondary">
    { children }
  </span>
)

export const OperatorWithoutSpaceRenderer = ({ children }: { children: string }) => (
  <span className="operator-without-space ms-fontColor-themeSecondary">
    { children }
  </span>
)

export const OpenBracketRenderer = ({ children }: { children: string }) => (
  <span className="open-bracket ms-fontColor-themeSecondary">
    { children }
  </span>
)

export const ClosingBracketRenderer = ({ children }: { children: string }) => (
  <span className="closing-bracket ms-fontColor-themeSecondary">
    { children }
  </span>
)

export const CommaRenderer = () => (
  <span className="comma ms-fontColor-themeSecondary">,</span>
)

export const QuoteRenderer = ({ children }: { children: string }) => (
  <span className="ms-fontColor-themeSecondary">
    { children }
  </span>
)

export default renderNode
// vim: set ts=2 sw=2 et:
