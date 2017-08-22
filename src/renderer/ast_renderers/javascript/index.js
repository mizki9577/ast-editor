// @flow
import type babylon from 'babylon'

import * as React from 'react'
import * as t from 'babel-types'

import * as literals from './literal-renderers.js'
import * as statements from './statement-renderers.js'
import * as expressions from './expression-renderers.js'
import * as declarations from './declaration-renderers.js'
import * as patterns from './pattern-renderers.js'
import * as modules from './module-renderers.js'
import * as classes from './class-renderers.js'
import * as reservedKeywords from './reserved-keywords.js'

type File = babylon.Node & {
  type: 'File',
}

export const NodeWrapper = ({ className='', inline=false, block=false, children }
  : { className?: string, inline?: boolean, block?: boolean, children: React.Node }) => {
  if (inline === block) return undefined

  const props = {
    className: className,
  }

  const Wrapper = inline ? 'span' : block ? 'div' : null
  if (Wrapper === null) return undefined

  return (
    <Wrapper {...props}>
      { children }
    </Wrapper>
  )
}

export const NodeRenderer = ({ node }: { node: babylon.Node }) => {
  if (t.isFile(node))       return <FileRenderer node={ node } />
  if (t.isIdentifier(node)) return <IdentifierRenderer node={ node } />
  // case 'PrivateName':
  // Literals [
  if (t.isRegExpLiteral(node))  return <literals.RegExpLiteralRenderer node={ node } />
  if (t.isNullLiteral(node))    return <literals.NullLiteralRenderer node={ node } />
  if (t.isStringLiteral(node))  return <literals.StringLiteralRenderer node={ node } />
  if (t.isBooleanLiteral(node)) return <literals.BooleanLiteralRenderer node={ node } />
  if (t.isNumericLiteral(node)) return <literals.NumericLiteralRenderer node={ node } />
  // Literals ]
  if (t.isProgram(node)) return <ProgramRenderer node={ node } />
  // Statements [
  if (t.isExpressionStatement(node)) return <statements.ExpressionStatementRenderer node={ node } />
  if (t.isBlockStatement(node))      return <statements.BlockStatementRenderer node={ node } />
  if (t.isEmptyStatement(node))      return <statements.EmptyStatementRenderer node={ node } />
  if (t.isDebuggerStatement(node))   return <statements.DebuggerStatementRenderer node={ node } />
  if (t.isWithStatement(node))       return <statements.WithStatementRenderer node={ node } />
  if (t.isReturnStatement(node))     return <statements.ReturnStatementRenderer node={ node } />
  if (t.isLabeledStatement(node))    return <statements.LabeledStatementRenderer node={ node } />
  if (t.isBreakStatement(node))      return <statements.BreakStatementRenderer node={ node } />
  if (t.isContinueStatement(node))   return <statements.ContinueStatementRenderer node={ node } />
  if (t.isIfStatement(node))         return <statements.IfStatementRenderer node={ node } />
  if (t.isSwitchStatement(node))     return <statements.SwitchStatementRenderer node={ node } />
  if (t.isSwitchCase(node))          return <statements.SwitchCaseRenderer node={ node } />
  if (t.isThrowStatement(node))      return <statements.ThrowStatementRenderer node={ node } />
  if (t.isTryStatement(node))        return <statements.TryStatementRenderer node={ node } />
  if (t.isCatchClause(node))         return <statements.CatchClauseRenderer node={ node } />
  if (t.isWhileStatement(node))      return <statements.WhileStatementRenderer node={ node } />
  if (t.isDoWhileStatement(node))    return <statements.DoWhileStatementRenderer node={ node } />
  if (t.isForStatement(node))        return <statements.ForStatementRenderer node={ node } />
  if (t.isForInStatement(node))      return <statements.ForInStatementRenderer node={ node } />
  if (t.isForOfStatement(node))      return <statements.ForOfStatementRenderer node={ node } />
  // Statements ]
  // Declarations [
  if (t.isFunctionDeclaration(node)) return <declarations.FunctionDeclarationRenderer node={ node } />
  if (t.isVariableDeclaration(node)) return <declarations.VariableDeclarationRenderer node={ node } />
  if (t.isVariableDeclarator(node))  return <declarations.VariableDeclaratorRenderer node={ node } />
  if (t.isClassDeclaration(node))    return <declarations.ClassDeclarationRenderer node={ node } />
  // Declarations ]
  if (t.isDecorator(node)) return <DecoratorRenderer node={ node } />
  //case 'Directive':
  //case 'DirectiveLiteral':
  // Expressions [
  if (t.isSuper(node))                   return <expressions.SuperRenderer node={ node } />
  if (t.isImport(node))                  return <expressions.ImportRenderer node={ node } />
  if (t.isThisExpression(node))          return <expressions.ThisExpressionRenderer node={ node } />
  if (t.isArrowFunctionExpression(node)) return <expressions.ArrowFunctionExpressionRenderer node={ node } />
  if (t.isYieldExpression(node))         return <expressions.YieldExpressionRenderer node={ node } />
  if (t.isAwaitExpression(node))         return <expressions.AwaitExpressionRenderer node={ node } />
  if (t.isArrayExpression(node))         return <expressions.ArrayExpressionRenderer node={ node } />
  if (t.isObjectExpression(node))        return <expressions.ObjectExpressionRenderer node={ node } />
  if (t.isObjectMethod(node))            return <expressions.ObjectMethodRenderer node={ node } />
  if (t.isObjectProperty(node))          return <expressions.ObjectPropertyRenderer node={ node } />
  if (t.isFunctionExpression(node))      return <expressions.FunctionExpressionRenderer node={ node } />
  if (t.isUnaryExpression(node))         return <expressions.UnaryExpressionRenderer node={ node } />
  if (t.isUpdateExpression(node))        return <expressions.UpdateExpressionRenderer node={ node } />
  if (t.isBinaryExpression(node))        return <expressions.BinaryExpressionRenderer node={ node } />
  if (t.isAssignmentExpression(node))    return <expressions.AssignmentExpressionRenderer node={ node } />
  if (t.isLogicalExpression(node))       return <expressions.LogicalExpressionRenderer node={ node } />
  if (t.isSpreadElement(node) || t.isSpreadProperty(node)) return <expressions.SpreadElementRenderer node={ node } />
  if (t.isMemberExpression(node))        return <expressions.MemberExpressionRenderer node={ node } />
  if (t.isBindExpression(node))          return <expressions.BindExpressionRenderer node={ node } />
  if (t.isConditionalExpression(node))   return <expressions.ConditionalExpressionRenderer node={ node } />
  if (t.isCallExpression(node))          return <expressions.CallExpressionRenderer node={ node } />
  if (t.isNewExpression(node))           return <expressions.NewExpressionRenderer node={ node } />
  if (t.isSequenceExpression(node))      return <expressions.SequenceExpressionRenderer node={ node } />
  if (t.isDoExpression(node))            return <expressions.DoExpressionRenderer node={ node } />
  if (t.isClassExpression(node))         return <expressions.ClassExpressionRenderer node={ node } />
  // case 'MetaProperty':
  // Expressions ]
  // Template Literals [
  // case 'TemplateLiteral':
  // case 'TaggedTemplateExpression':
  // Template Literals ]
  // Patterns [
  if (t.isObjectPattern(node))        return <patterns.ObjectPatternRenderer node={ node } />
  //if (t.isAssignmentProperty(node)) return <patterns.AssignmentPropertyRenderer node={ node } />
  if (t.isArrayPattern(node))         return <patterns.ArrayPatternRenderer node={ node } />
  if (t.isRestElement(node))          return <patterns.RestElementRenderer node={ node } />
  if (t.isAssignmentPattern(node))    return <patterns.AssignmentPatternRenderer node={ node } />
  // Patterns ]
  // Classes [
  if (t.isClassMethod(node))   return <classes.ClassMethodRenderer node={ node } />
  if (t.isClassProperty(node)) return <classes.ClassPropertyRenderer node={ node } />
  // Classes ]
  // Modules [
  if (t.isImportDeclaration(node))        return <modules.ImportDeclarationRenderer node={ node } />
  if (t.isImportSpecifier(node))          return <modules.ImportSpecifierRenderer node={ node } />
  if (t.isImportDefaultSpecifier(node))   return <modules.ImportDefaultSpecifierRenderer node={ node } />
  if (t.isImportNamespaceSpecifier(node)) return <modules.ImportNamespaceSpecifierRenderer node={ node } />
  if (t.isExportNamedDeclaration(node))   return <modules.ExportNamedDeclarationRenderer node={ node } />
  if (t.isExportDefaultDeclaration(node)) return <modules.ExportDefaultDeclarationRenderer node={ node } />
  if (t.isExportAllDeclaration(node))     return <modules.ExportAllDeclarationRenderer node={ node } />
  // Modules ]
  return node == null ? null : <UnknownNodeRenderer node={ node } />
}

const UnknownNodeRenderer = ({ node }: { node: babylon.Node }) => (
  <NodeWrapper inline className="ms-fontColor-neutralLight ms-bgColor-red">
    [UNKNOWN: { node.type }]
  </NodeWrapper>
)

const FileRenderer = ({ node }: { node: File }) => (
  <NodeWrapper block>
    <NodeRenderer node={ node.program } />
  </NodeWrapper>
)

const IdentifierRenderer = ({ node }: { node: babylon.Identifier }) => (
  <NodeWrapper inline className="identifier ms-fontColor-neutralLight">
    { node.name }
  </NodeWrapper>
)

const ProgramRenderer = ({ node }: { node: babylon.Program }) => (
  <NodeWrapper block>
    { node.directives.map((directive, i) => <NodeRenderer key={ i } node={ directive } />) }
    { node.body.map((child, i) => <NodeRenderer key={ i } node={ child } />) }
  </NodeWrapper>
)

export const FunctionRenderer = ({ node }: { node: babylon.Function }) => (
  <NodeWrapper inline>
    { node.async ? <reservedKeywords.Async /> : null }
    <reservedKeywords.Function />
    { node.generator ? <PunctuationRenderer punctuation="*" /> : null }
    <NodeRenderer node={ node.id } />
    <BracketRenderer bracket="(" />
    <CommaSeparatedList elements={ node.params } inline />
    <BracketRenderer bracket=")" />
    <NodeRenderer node={ node.body } />
  </NodeWrapper>
)

const DecoratorRenderer = ({ node }: { node: babylon.Decorator }) => (
  <NodeWrapper block>
    <PunctuationRenderer punctuation="@" />
    <NodeRenderer node={ node.expression } />
  </NodeWrapper>
)

//

export const CommaSeparatedList = ({ className='', elements, inline=false }: { className?: string, elements: babylon.Node[], inline?: boolean }) => {
  className += ' comma-separated-list' + (inline ? ' inline' : '')
  return (
    <div className={ className }>
      { elements.map((element, i) => <NodeRenderer key={i} node={ element } />) }
    </div>
  )
}

export const PunctuationRenderer = ({ punctuation }: { punctuation: string }) => {
  let className = 'punctuation ms-fontColor-themeSecondary'
  if (punctuation === '.') {
    className += ' member'
  }

  return (
    <span className={ className }>
      { punctuation }
    </span>
  )
}

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

export default (ast: babylon.Node) => <NodeRenderer node={ ast } />
// vim: set ts=2 sw=2 et:
