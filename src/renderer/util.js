// @flow
import type { Node } from 'babylon'
import ramda from 'ramda'
import * as t from 'babel-types'

export const getFirstChildPath = (ast: Node, path: (string | number)[]) => {
  const node = ramda.path(path, ast)

  if (Array.isArray(node)) {
    if (node.length > 0) return [...path, 0]
    else return path
  }

  if (t.isFile(node)) return [...path, 'program']

  if (t.isIdentifier(node)) return path

  //case 'PrivateName':

  // Literals [
  if (t.isRegExpLiteral(node)) return path
  if (t.isNullLiteral(node)) return path
  if (t.isStringLiteral(node)) return path
  if (t.isBooleanLiteral(node)) return path
  if (t.isNumericLiteral(node)) return path
  // Literals ]

  if (t.isProgram(node)) return [...path, 'body']

  // Statements [
  if (t.isExpressionStatement(node)) return [...path, 'expression']
  if (t.isBlockStatement(node)) return [...path, 'body']
  if (t.isEmptyStatement(node)) return path
  if (t.isDebuggerStatement(node)) return path
  if (t.isWithStatement(node)) return [...path, 'object']
  if (t.isReturnStatement(node)) return [...path, 'argument']
  if (t.isLabeledStatement(node)) return [...path, 'label']
  if (t.isBreakStatement(node)) return [...path, 'label']
  if (t.isContinueStatement(node)) return [...path, 'label']
  if (t.isIfStatement(node)) return [...path, 'test']
  if (t.isSwitchStatement(node)) return [...path, 'discriminant']
  if (t.isSwitchCase(node)) return [...path, 'expression']
  if (t.isThrowStatement(node)) return [...path, 'argument']
  if (t.isTryStatement(node)) return [...path, 'block']
  if (t.isCatchClause(node)) return [...path, 'param']
  if (t.isWhileStatement(node)) return [...path, 'test']
  if (t.isDoWhileStatement(node)) return [...path, 'body']
  if (t.isForStatement(node)) return [...path, 'init']
  if (t.isForInStatement(node)) return [...path, 'left']
  if (t.isForOfStatement(node)) return [...path, 'left']
  // Statements ]

  // Declarations [
  if (t.isFunctionDeclaration(node)) return [...path, 'id']
  if (t.isVariableDeclaration(node)) return [...path, 'declarations']
  if (t.isVariableDeclarator(node)) return [...path, 'id']
  if (t.isClassDeclaration(node)) return [...path, 'id']
  // Declarations ]

  if (t.isDecorator(node)) return [...path, 'expression']

  //case 'Directive':
  //case 'DirectiveLiteral':

  // Expressions [
  if (t.isSuper(node)) return path
  if (t.isImport(node)) return path
  if (t.isThisExpression(node)) return path
  if (t.isArrowFunctionExpression(node)) return [...path, 'params']
  if (t.isYieldExpression(node)) return [...path, 'argument']
  if (t.isAwaitExpression(node)) return [...path, 'argument']
  if (t.isArrayExpression(node)) return [...path, 'elements']
  if (t.isObjectExpression(node)) return [...path, 'properties']
  if (t.isObjectMethod(node)) return [...path, 'key']
  if (t.isObjectProperty(node)) return [...path, 'key']
  if (t.isFunctionExpression(node)) return [...path, 'id']
  if (t.isUnaryExpression(node)) {
    if (node.prefix) return [...path, 'operator']
    else return [...path, 'argument']
  }
  if (t.isUpdateExpression(node)) {
    if (node.prefix) return [...path, 'operator']
    else return [...path, 'argument']
  }
  if (t.isBinaryExpression(node)) return [...path, 'left']
  if (t.isAssignmentExpression(node)) return [...path, 'left']
  if (t.isLogicalExpression(node)) return [...path, 'left']
  if (t.isSpreadElement(node) || t.isSpreadProperty(node)) return [...path, 'argument']
  if (t.isMemberExpression(node)) return [...path, 'object']
  if (t.isBindExpression(node)) return [...path, 'object']
  if (t.isConditionalExpression(node)) return [...path, 'test']
  if (t.isCallExpression(node)) return [...path, 'callee']
  if (t.isNewExpression(node)) return [...path, 'callee']
  if (t.isSequenceExpression(node)) return [...path, 'expressions']
  if (t.isDoExpression(node)) return [...path, 'body']
  if (t.isClassExpression(node)) return [...path, 'id']
  //case 'MetaProperty':
  // Expressions ]

  // Template Literals [
  //case 'TemplateLiteral':
  //case 'TaggedTemplateExpression':
  // Template Literals ]

  // Patterns [
  if (t.isObjectPattern(node)) return [...path, 'properties']
  //if (t.isAssignmentProperty(node)) { }
  if (t.isArrayPattern(node)) return [...path, 'elements']
  if (t.isRestElement(node)) return [...path, 'argument']
  if (t.isAssignmentPattern(node)) return [...path, 'left']
  // Patterns ]

  // Classes [
  if (t.isClassMethod(node)) return [...path, 'key']
  if (t.isClassProperty(node)) return [...path, 'key']
  // Classes ]

  // Modules [
  if (t.isImportDeclaration(node)) return [...path, 'specifiers']
  if (t.isImportSpecifier(node)) return [...path, 'imported']
  if (t.isImportDefaultSpecifier(node)) return path
  if (t.isImportNamespaceSpecifier(node)) return path
  if (t.isExportNamedDeclaration(node)) return [...path, 'declaration']
  if (t.isExportDefaultDeclaration(node)) return [...path, 'declaration']
  // Modules ]

  return path
}

// vim: set ts=2 sw=2 et:
