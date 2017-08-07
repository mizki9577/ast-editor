// @flow
import type babylon from 'babylon'

import React from 'react'
import * as t from 'babel-types'

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

export const NodeWrapper = ({ children }) => {
  const newProps = {
    className: (children.props.className !== null ? children.props.className : ''),
  }
  const props = Object.assign({}, children.props, newProps)
  const newChildren = React.cloneElement(children, props, children.props.children)

  return newChildren
}

export const NodeRenderer = ({ node }: { node: babylon.Node }) => {
  let children = null

  if (t.isFile(node)) {
    children = <FileRenderer node={ node } />
  }

  else if (t.isIdentifier(node)) {
    children = <IdentifierRenderer node={ node } />
  }

  //case 'PrivateName':

  // Literals [
  else if (t.isRegExpLiteral(node)) {
    children = <literals.RegExpLiteralRenderer node={ node } />
  }

  else if (t.isNullLiteral(node)) {
    children = <literals.NullLiteralRenderer node={ node } />
  }

  else if (t.isStringLiteral(node)) {
    children = <literals.StringLiteralRenderer node={ node } />
  }

  else if (t.isBooleanLiteral(node)) {
    children = <literals.BooleanLiteralRenderer node={ node } />
  }

  else if (t.isNumericLiteral(node)) {
    children = <literals.NumericLiteralRenderer node={ node } />
  }
  // Literals ]

  else if (t.isProgram(node)) {
    children = <ProgramRenderer node={ node } />
  }

  // Statements [
  else if (t.isExpressionStatement(node)) {
    children = <statements.ExpressionStatementRenderer node={ node } />
  }

  else if (t.isBlockStatement(node)) {
    children = <statements.BlockStatementRenderer node={ node } />
  }

  else if (t.isEmptyStatement(node)) {
    children = <statements.EmptyStatementRenderer node={ node } />
  }

  else if (t.isDebuggerStatement(node)) {
    children = <statements.DebuggerStatementRenderer node={ node } />
  }

  else if (t.isWithStatement(node)) {
    children = <statements.WithStatementRenderer node={ node } />
  }

  else if (t.isReturnStatement(node)) {
    children = <statements.ReturnStatementRenderer node={ node } />
  }

  else if (t.isLabeledStatement(node)) {
    children = <statements.LabeledStatementRenderer node={ node } />
  }

  else if (t.isBreakStatement(node)) {
    children = <statements.BreakStatementRenderer node={ node } />
  }

  else if (t.isContinueStatement(node)) {
    children = <statements.ContinueStatementRenderer node={ node } />
  }

  else if (t.isIfStatement(node)) {
    children = <statements.IfStatementRenderer node={ node } />
  }

  else if (t.isSwitchStatement(node)) {
    children = <statements.SwitchStatementRenderer node={ node } />
  }

  else if (t.isSwitchCase(node)) {
    children = <statements.SwitchCaseRenderer node={ node } />
  }

  else if (t.isThrowStatement(node)) {
    children = <statements.ThrowStatementRenderer node={ node } />
  }

  else if (t.isTryStatement(node)) {
    children = <statements.TryStatementRenderer node={ node } />
  }

  else if (t.isCatchClause(node)) {
    children = <statements.CatchClauseRenderer node={ node } />
  }

  else if (t.isWhileStatement(node)) {
    children = <statements.WhileStatementRenderer node={ node } />
  }

  else if (t.isDoWhileStatement(node)) {
    children = <statements.DoWhileStatementRenderer node={ node } />
  }

  else if (t.isForStatement(node)) {
    children = <statements.ForStatementRenderer node={ node } />
  }

  else if (t.isForInStatement(node)) {
    children = <statements.ForInStatementRenderer node={ node } />
  }

  else if (t.isForOfStatement(node)) {
    children = <statements.ForOfStatementRenderer node={ node } />
  }
  // Statements ]

  // Declarations [
  else if (t.isFunctionDeclaration(node)) {
    children = <declarations.FunctionDeclarationRenderer node={ node } />
  }

  else if (t.isVariableDeclaration(node)) {
    children = <declarations.VariableDeclarationRenderer node={ node } />
  }

  else if (t.isVariableDeclarator(node)) {
    children = <declarations.VariableDeclaratorRenderer node={ node } />
  }

  else if (t.isClassDeclaration(node)) {
    children = <declarations.ClassDeclarationRenderer node={ node } />
  }
  // Declarations ]

  else if (t.isDecorator(node)) {
    children = <DecoratorRenderer node={ node } />
  }

  //case 'Directive':
  //case 'DirectiveLiteral':

  // Expressions [
  else if (t.isSuper(node)) {
    children = <expressions.SuperRenderer node={ node } />
  }

  else if (t.isImport(node)) {
    children = <expressions.ImportRenderer node={ node } />
  }

  else if (t.isThisExpression(node)) {
    children = <expressions.ThisExpressionRenderer node={ node } />
  }

  else if (t.isArrowFunctionExpression(node)) {
    children = <expressions.ArrowFunctionExpressionRenderer node={ node } />
  }

  else if (t.isYieldExpression(node)) {
    children = <expressions.YieldExpressionRenderer node={ node } />
  }

  else if (t.isAwaitExpression(node)) {
    children = <expressions.AwaitExpressionRenderer node={ node } />
  }

  else if (t.isArrayExpression(node)) {
    children = <expressions.ArrayExpressionRenderer node={ node } />
  }

  else if (t.isObjectExpression(node)) {
    children = <expressions.ObjectExpressionRenderer node={ node } />
  }

  else if (t.isObjectMethod(node)) {
    children = <expressions.ObjectMethodRenderer node={ node } />
  }

  else if (t.isObjectProperty(node)) {
    children = <expressions.ObjectPropertyRenderer node={ node } />
  }

  else if (t.isFunctionExpression(node)) {
    children = <expressions.FunctionExpressionRenderer node={ node } />
  }

  else if (t.isUnaryExpression(node)) {
    children = <expressions.UnaryExpressionRenderer node={ node } />
  }

  else if (t.isUpdateExpression(node)) {
    children = <expressions.UpdateExpressionRenderer node={ node } />
  }

  else if (t.isBinaryExpression(node)) {
    children = <expressions.BinaryExpressionRenderer node={ node } />
  }

  else if (t.isAssignmentExpression(node)) {
    children = <expressions.AssignmentExpressionRenderer node={ node } />
  }

  else if (t.isLogicalExpression(node)) {
    children = <expressions.LogicalExpressionRenderer node={ node } />
  }

  else if (t.isSpreadElement(node)) {
    children = <expressions.SpreadElementRenderer node={ node } />
  }

  else if (t.isMemberExpression(node)) {
    children = <expressions.MemberExpressionRenderer node={ node } />
  }

  else if (t.isBindExpression(node)) {
    children = <expressions.BindExpressionRenderer node={ node } />
  }

  else if (t.isConditionalExpression(node)) {
    children = <expressions.ConditionalExpressionRenderer node={ node } />
  }

  else if (t.isCallExpression(node)) {
    children = <expressions.CallExpressionRenderer node={ node } />
  }

  else if (t.isNewExpression(node)) {
    children = <expressions.NewExpressionRenderer node={ node } />
  }

  else if (t.isSequenceExpression(node)) {
    children = <expressions.SequenceExpressionRenderer node={ node } />
  }

  else if (t.isDoExpression(node)) {
    children = <expressions.DoExpressionRenderer node={ node } />
  }

  else if (t.isClassExpression(node)) {
    children = <expressions.ClassExpressionRenderer node={ node } />
  }

  //case 'MetaProperty':
  // Expressions ]

  // Template Literals [
  //case 'TemplateLiteral':
  //case 'TaggedTemplateExpression':
  // Template Literals ]

  // Patterns [
  else if (t.isObjectPattern(node)) {
    children = <patterns.ObjectPatternRenderer node={ node } />
  }

  /*
  else if (t.isAssignmentProperty(node)) {
    children = <patterns.AssignmentPropertyRenderer node={ node } />
  }
  */

  else if (t.isArrayPattern(node)) {
    children = <patterns.ArrayPatternRenderer node={ node } />
  }

  else if (t.isRestElement(node)) {
    children = <patterns.RestElementRenderer node={ node } />
  }

  else if (t.isAssignmentPattern(node)) {
    children = <patterns.AssignmentPatternRenderer node={ node } />
  }
  // Patterns ]

  // Classes [
  else if (t.isClassMethod(node)) {
    children = <classes.ClassMethodRenderer node={ node } />
  }

  else if (t.isClassProperty(node)) {
    children = <classes.ClassPropertyRenderer node={ node } />
  }
  // Classes ]

  // Modules [
  else if (t.isImportDeclaration(node)) {
    children = <modules.ImportDeclarationRenderer node={ node } />
  }

  else if (t.isImportSpecifier(node)) {
    children = <modules.ImportSpecifierRenderer node={ node } />
  }

  else if (t.isImportDefaultSpecifier(node)) {
    children = <modules.ImportDefaultSpecifierRenderer node={ node } />
  }

  else if (t.isImportNamespaceSpecifier(node)) {
    children = <modules.ImportNamespaceSpecifierRenderer node={ node } />
  }

  else if (t.isExportNamedDeclaration(node)) {
    children = <modules.ExportNamedDeclarationRenderer node={ node } />
  }

  else if (t.isExportDefaultDeclaration(node)) {
    children = <modules.ExportDefaultDeclarationRenderer node={ node } />
  }

  else if (t.isExportAllDeclaration(node)) {
    children = <modules.ExportAllDeclarationRenderer node={ node } />
  }
  // Modules ]

  else {
    children = node == null ? null : <UnknownNodeRenderer node={ node } />
  }

  return children
}

const UnknownNodeRenderer = ({ node }: { node: babylon.Node }) => (
  <NodeWrapper>
    <span className="ms-fontColor-neutralLight ms-bgColor-red">[UNKNOWN: { node.type }]</span>
  </NodeWrapper>
)

const FileRenderer = ({ node }: { node: File }) => (
  <NodeWrapper>
    <div>
      <NodeRenderer node={ node.program } />
    </div>
  </NodeWrapper>
)

const IdentifierRenderer = ({ node }: { node: babylon.Identifier }) => (
  <NodeWrapper>
    <span className="identifier ms-fontColor-neutralLight">
      { node.name }
    </span>
  </NodeWrapper>
)

const ProgramRenderer = ({ node }: { node: babylon.Program }) => (
  <NodeWrapper>
    <div>
      { node.directives.map((directive, i) => <NodeRenderer key={ i } node={ directive } />) }
      { node.body.map((child, i) => <NodeRenderer key={ i } node={ child } />) }
    </div>
  </NodeWrapper>
)

export const FunctionRenderer = ({ node }: { node: babylon.Function }) => (
  <NodeWrapper>
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
  </NodeWrapper>
)

const DecoratorRenderer = ({ node }: { node: babylon.Decorator }) => (
  <NodeWrapper>
    <div>
      <span>@</span>
      <NodeRenderer node={ node.expression } />
    </div>
  </NodeWrapper>
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

export const BracketRenderer = ({ bracket }: { bracket: string }) => {
  switch (bracket) {
    case '(':
      return <span className="open-bracket ms-fontColor-themeSecondary">(</span>

    case '[':
      return <span className="open-bracket ms-fontColor-themeSecondary">[</span>

    case '{':
      return <span className="open-bracket ms-fontColor-themeSecondary">{ '{' }</span>

    case ')':
      return <span className="close-bracket ms-fontColor-themeSecondary">)</span>

    case ']':
      return <span className="close-bracket ms-fontColor-themeSecondary">]</span>

    case '}':
      return <span className="close-bracket ms-fontColor-themeSecondary">{ '}' }</span>
  }
}

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
