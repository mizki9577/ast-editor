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

export const NodeRenderer = ({ node }: { node: babylon.Node }) => {
  if (node == null) return null

  switch (node.type) {
    case 'File':
      return <FileRenderer node={ node } />

    case 'Identifier':
      return <IdentifierRenderer node={ node } />

    //case 'PrivateName':

    // Literals [
    case 'RegExpLiteral':
      return <literals.RegExpLiteralRenderer node={ node } />

    case 'NullLiteral':
      return <literals.NullLiteralRenderer node={ node } />

    case 'StringLiteral':
      return <literals.StringLiteralRenderer node={ node } />

    case 'BooleanLiteral':
      return <literals.BooleanLiteralRenderer node={ node } />

    case 'NumericLiteral':
      return <literals.NumericLiteralRenderer node={ node } />
    // Literals ]

    case 'Program':
      return <ProgramRenderer node={ node } />

    // Statements [
    case 'ExpressionStatement':
      return <statements.ExpressionStatementRenderer node={ node } />

    case 'BlockStatement':
      return <statements.BlockStatementRenderer node={ node } />

    case 'EmptyStatement':
      return <statements.EmptyStatementRenderer node={ node } />

    case 'DebuggerStatement':
      return <statements.DebuggerStatementRenderer node={ node } />

    case 'WithStatement':
      return <statements.WithStatementRenderer node={ node } />

    case 'ReturnStatement':
      return <statements.ReturnStatementRenderer node={ node } />

    case 'LabeledStatement':
      return <statements.LabeledStatementRenderer node={ node } />

    case 'BreakStatement':
      return <statements.BreakStatementRenderer node={ node } />

    case 'ContinueStatement':
      return <statements.ContinueStatementRenderer node={ node } />

    case 'IfStatement':
      return <statements.IfStatementRenderer node={ node } />

    case 'SwitchStatement':
      return <statements.SwitchStatementRenderer node={ node } />

    case 'SwitchCase':
      return <statements.SwitchCaseRenderer node={ node } />

    case 'ThrowStatement':
      return <statements.ThrowStatementRenderer node={ node } />

    case 'TryStatement':
      return <statements.TryStatementRenderer node={ node } />

    case 'CatchClause':
      return <statements.CatchClauseRenderer node={ node } />

    case 'WhileStatement':
      return <statements.WhileStatementRenderer node={ node } />

    case 'DoWhileStatement':
      return <statements.DoWhileStatementRenderer node={ node } />

    case 'ForStatement':
      return <statements.ForStatementRenderer node={ node } />

    case 'ForInStatement':
      return <statements.ForInStatementRenderer node={ node } />

    case 'ForOfStatement':
      return <statements.ForOfStatementRenderer node={ node } />
    // Statements ]

    // Declarations [
    case 'FunctionDeclaration':
      return <declarations.FunctionDeclarationRenderer node={ node } />

    case 'VariableDeclaration':
      return <declarations.VariableDeclarationRenderer node={ node } />

    case 'VariableDeclarator':
      return <declarations.VariableDeclaratorRenderer node={ node } />

    case 'ClassDeclaration':
      return <declarations.ClassDeclarationRenderer node={ node } />
    // Declarations ]

    case 'Decorator':
      return <DecoratorRenderer node={ node } />

    //case 'Directive':
    //case 'DirectiveLiteral':

    // Expressions [
    case 'Super':
      return <expressions.SuperRenderer node={ node } />

    case 'Import':
      return <expressions.ImportRenderer node={ node } />

    case 'ThisExpression':
      return <expressions.ThisExpressionRenderer node={ node } />

    case 'ArrowFunctionExpression':
      return <expressions.ArrowFunctionExpressionRenderer node={ node } />

    case 'YieldExpression':
      return <expressions.YieldExpressionRenderer node={ node } />

    case 'AwaitExpression':
      return <expressions.AwaitExpressionRenderer node={ node } />

    case 'ArrayExpression':
      return <expressions.ArrayExpressionRenderer node={ node } />

    case 'ObjectExpression':
      return <expressions.ObjectExpressionRenderer node={ node } />

    case 'ObjectMethod':
      return <expressions.ObjectMethodRenderer node={ node } />

    case 'ObjectProperty':
      return <expressions.ObjectPropertyRenderer node={ node } />

    case 'FunctionExpression':
      return <expressions.FunctionExpressionRenderer node={ node } />

    case 'UnaryExpression':
      return <expressions.UnaryExpressionRenderer node={ node } />

    case 'UpdateExpression':
      return <expressions.UpdateExpressionRenderer node={ node } />

    case 'BinaryExpression':
      return <expressions.BinaryExpressionRenderer node={ node } />

    case 'AssignmentExpression':
      return <expressions.AssignmentExpressionRenderer node={ node } />

    case 'LogicalExpression':
      return <expressions.LogicalExpressionRenderer node={ node } />

    case 'SpreadElement':
      return <expressions.SpreadElementRenderer node={ node } />

    case 'MemberExpression':
      return <expressions.MemberExpressionRenderer node={ node } />

    case 'BindExpression':
      return <expressions.BindExpressionRenderer node={ node } />

    case 'ConditionalExpression':
      return <expressions.ConditionalExpressionRenderer node={ node } />

    case 'CallExpression':
      return <expressions.CallExpressionRenderer node={ node } />

    case 'NewExpression':
      return <expressions.NewExpressionRenderer node={ node } />

    case 'SequenceExpression':
      return <expressions.SequenceExpressionRenderer node={ node } />

    case 'DoExpression':
      return <expressions.DoExpressionRenderer node={ node } />

    case 'ClassExpression':
      return <expressions.ClassExpressionRenderer node={ node } />

    //case 'MetaProperty':
    // Expressions ]

    // Template Literals [
    //case 'TemplateLiteral':
    //case 'TaggedTemplateExpression':
    // Template Literals ]

    // Patterns [
    case 'ObjectPattern':
      return <patterns.ObjectPatternRenderer node={ node } />

    case 'AssignmentProperty':
      return <patterns.AssignmentPropertyRenderer node={ node } />

    case 'ArrayPattern':
      return <patterns.ArrayPatternRenderer node={ node } />

    case 'RestElement':
      return <patterns.RestElementRenderer node={ node } />

    case 'AssignmentPattern':
      return <patterns.AssignmentPatternRenderer node={ node } />
    // Patterns ]

    // Classes [
    case 'ClassMethod':
      return <classes.ClassMethodRenderer node={ node } />

    case 'ClassProperty':
      return <classes.ClassPropertyRenderer node={ node } />
    // Classes ]

    // Modules [
    case 'ImportDeclaration':
      return <modules.ImportDeclarationRenderer node={ node } />

    case 'ImportSpecifier':
      return <modules.ImportSpecifierRenderer node={ node } />

    case 'ImportDefaultSpecifier':
      return <modules.ImportDefaultSpecifierRenderer node={ node } />

    case 'ImportNamespaceSpecifier':
      return <modules.ImportNamespaceSpecifierRenderer node={ node } />

    case 'ExportNamedDeclaration':
      return <modules.ExportNamedDeclarationRenderer node={ node } />

    case 'ExportDefaultDeclaration':
      return <modules.ExportDefaultDeclarationRenderer node={ node } />

    case 'ExportAllDeclaration':
      return <modules.ExportAllDeclarationRenderer node={ node } />
    // Modules ]

    default:
      return <UnknownNodeRenderer node={ node } />
  }
}

const UnknownNodeRenderer = ({ node }: { node: babylon.Node }) => (
  <span className="ms-fontColor-neutralLight ms-bgColor-red">[UNKNOWN: { node.type }]</span>
)

const FileRenderer = ({ node }: { node: File }) => (
  <NodeRenderer node={ node.program } />
)

const IdentifierRenderer = ({ node }: { node: babylon.Identifier }) => (
  <span className="identifier ms-fontColor-neutralLight">
    { node.name }
  </span>
)

const ProgramRenderer = ({ node }: { node: babylon.Program }) => (
  <div>
    { node.directives.map((directive, i) => <NodeRenderer key={ i } node={ directive } />) }
    { node.body.map((child, i) => <NodeRenderer key={ i } node={ child } />) }
  </div>
)

export const FunctionRenderer = ({ node }: { node: babylon.Function }) => (
  <span>
    <span>{ node.async ? 'async' : '' }</span>
    <span>function</span>
    <span>{ node.generator ? '*' : '' }</span>
    <NodeRenderer node={ node.id } />
    <span>(</span>
    <span>{ node.params.map((param, i) => <NodeRenderer key={ i } node={ param } />) }</span>
    <span>)</span>
    <NodeRenderer node={ node.body } />
  </span>
)

const DecoratorRenderer = ({ node }: { node: babylon.Decorator }) => (
  <div>
    <span>@</span>
    <NodeRenderer node={ node.expression } />
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

export default (ast: babylon.Node) => <NodeRenderer node={ ast } />
// vim: set ts=2 sw=2 et:
