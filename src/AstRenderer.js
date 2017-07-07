// @flow
import React from 'react'
import type { Node } from 'babylon'

type Props = {|
  node: ?Node,
|}

const AstRenderer = ({ node }: Props) => {
  if (node == null) return null
  switch (node.type) {
    case 'File':
      return <FileRenderer node={ node } />

    case 'Identifier':
      return <IdentifierRenderer node={ node } />

    case 'PrivateName':
      return <PrivateNameRenderer node={ node } />

    case 'RegExpLiteral':
      return <RegExpLiteralRenderer node={ node } />

    case 'NullLiteral':
      return <NullLiteralRenderer node={ node } />

    case 'StringLiteral':
      return <StringLiteralRenderer node={ node } />

    case 'BooleanLiteral':
      return <BooleanLiteralRenderer node={ node } />

    case 'NumericLiteral':
      return <NumericLiteralRenderer node={ node } />

    case 'Program':
      return <ProgramRenderer node={ node } />

    case 'Function':
      return <FunctionRenderer node={ node } />

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

    case 'FunctionDeclaration':
      return <FunctionDeclarationRenderer node={ node } />

    case 'VariableDeclaration':
      return <VariableDeclarationRenderer node={ node } />

    case 'Super':
      return <SuperRenderer node={ node } />

    case 'Import':
      return <ImportRenderer node={ node } />

    case 'ThisExpression':
      return <ThisExpressionRenderer node={ node } />

    case 'ArrowFunctionExpression':
      return <ArrowFunctionExpressionRenderer node={ node } />

    case 'YieldExpression':
      return <YieldExpressionRenderer node={ node } />

    case 'AwaitExpression':
      return <AwaitExpressionRenderer node={ node } />

    case 'ArrayExpression':
      return <ArrayExpressionRenderer node={ node } />

    case 'ObjectExpression':
      return <ObjectExpressionRenderer node={ node } />

    case 'ObjectProperty':
      return <ObjectPropertyRenderer node={ node } />

    case 'ObjectMethod':
      return <ObjectMethodRenderer node={ node } />

    case 'FunctionExpression':
      return <FunctionExpressionRenderer node={ node } />

    case 'UnaryExpression':
      return <UnaryExpressionRenderer node={ node } />

    case 'UpdateExpression':
      return <UpdateExpressionRenderer node={ node } />

    case 'BinaryExpression':
      return <BinaryExpressionRenderer node={ node } />

    case 'AssignmentExpression':
      return <AssignmentExpressionRenderer node={ node } />

    case 'LogicalExpression':
      return <LogicalExpressionRenderer node={ node } />

    case 'SpreadElement':
      return <SpreadElementRenderer node={ node } />

    case 'MemberExpression':
      return <MemberExpressionRenderer node={ node } />

    case 'BindExpression':
      return <BindExpressionRenderer node={ node } />

    case 'ConditionalExpression':
      return <ConditionalExpressionRenderer node={ node } />

    case 'CallExpression':
      return <CallExpressionRenderer node={ node } />

    case 'NewExpression':
      return <NewExpressionRenderer node={ node } />

    case 'SequenceExpression':
      return <SequenceExpressionRenderer node={ node } />

    case 'DoExpression':
      return <DoExpressionRenderer node={ node } />

    case 'TemplateLiteral':
      return <TemplateLiteralRenderer node={ node } />

    case 'TaggedTemplateExpression':
      return <TaggedTemplateExpressionRenderer node={ node } />

    case 'ObjectPattern':
      return <ObjectPatternRenderer node={ node } />

    case 'ArrayPattern':
      return <ArrayPatternRenderer node={ node } />

    case 'RestElement':
      return <RestElementRenderer node={ node } />

    case 'AssignmentPattern':
      return <AssignmentPatternRenderer node={ node } />

    default:
      return <UnknownNodeRenderer node={ node } />
  }
}

const UnknownNodeRenderer = ({ node }: { node: Node }) => (
  <span>[UNKNOWN NODE TYPE: { node.type }]</span>
)

const FileRenderer = ({ node }: { node: Node }) => (
  <AstRenderer node={ node.program } />
)

const IdentifierRenderer = ({ node }: { node: Node }) => (
  <span>{ node.name }</span>
)

const PrivateNameRenderer = UnknownNodeRenderer

const RegExpLiteralRenderer = ({ node }: { node: Node }) => (
  <span>/{ node.pattern }/{ node.flags }</span>
)

const NullLiteralRenderer = ({ node }: { node: Node }) => (
  <span>null</span>
)

const StringLiteralRenderer = ({ node }: { node: Node }) => (
  <span>'{ node.value }'</span>
)

const BooleanLiteralRenderer = ({ node }: { node: Node }) => (
  <span>{ String(node.value) }</span>
)

const NumericLiteralRenderer = ({ node }: { node: Node }) => (
  <span>{ String(node.value) }</span>
)

// WIP. currently it ignores sourceType and directives, and not implemented ModuleDeclaration Renderer
const ProgramRenderer = ({ node }: { node: Node }) => (
  <span>
    { node.body.map(child => <AstRenderer node={ child } />) }
  </span>
)

const FunctionRenderer = ({ node }: { node: Node }) => (
  <span>
    { node.async ? 'async' : '' }
    { 'function' }
    { node.generator ? '*' : '' }
    { node.id !== null ? <IdentifierRenderer node={ node.id } /> : null }
    { '(' }
    { node.params.map(p => <AstRenderer node={ p } />) }
    { ')' }
    <BlockStatementRenderer node={ node.body } />
  </span>
)

const ExpressionStatementRenderer = ({ node }: { node: Node }) => (
  <div>
    <AstRenderer node={ node.expression } />
    ;
  </div>
)

// WIP. what's directive?
const BlockStatementRenderer = ({ node }: { node: Node }) => (
  <div>
    { '{' }
    { node.body.map(child => <AstRenderer node={ child } />) }
    { '}' }
  </div>
)

const EmptyStatementRenderer = ({ node }: { node: Node }) => (
  <div>;</div>
)

const DebuggerStatementRenderer = UnknownNodeRenderer

const WithStatementRenderer = ({ node }: { node: Node }) => (
  <div>
    with (
    <AstRenderer node={ node.object } />
    )
    <AstRenderer node={ node.body } />
  </div>
)

const ReturnStatementRenderer = ({ node }: { node: Node }) => (
  <div>
    return
    { node.argument !== null ? <AstRenderer node={ node.argument } /> : null }
    ;
  </div>
)

const LabeledStatementRenderer = ({ node }: { node: Node }) => (
  <div>
    <IdentifierRenderer node={ node.label } />
    :
    <AstRenderer node={ node.body } />
  </div>
)

const BreakStatementRenderer = ({ node }: { node: Node }) => (
  <div>
    break
    { node.label !== null ? <IdentifierRenderer node={ node.label } /> : null }
    ;
  </div>
)

const ContinueStatementRenderer = ({ node }: { node: Node }) => (
  <div>
    continue
    { node.label !== null ? <IdentifierRenderer node={ node.label } /> : null }
    ;
  </div>
)

const IfStatementRenderer = ({ node }: { node: Node }) => (
  <div>
    if (
    <AstRenderer node={ node.test } />
    )
    <AstRenderer node={ node.consequent } />
    { node.alternate !== null ? 'else' : '' }
    { node.alternate !== null ? <AstRenderer node={ node.conquest } /> : null }
  </div>
)

const SwitchStatementRenderer = ({ node }: { node: Node }) => (
  <div>
    { 'switch (' }
    <AstRenderer node={ node.discriminant } />
    { ') {' }
    { node.cases.map(c => <SwitchCaseRenderer node={ c } />) }
    { '}' }
  </div>
)

const SwitchCaseRenderer = ({ node }: { node: Node }) => (
  <div>
    { node.test !== null ? 'case' : 'default' }
    { node.test !== null ? <AstRenderer node={ node.test } /> : null }
    :
    { node.consequent.map(statement => <AstRenderer node={ statement } />) }
  </div>
)

const ThrowStatementRenderer = ({ node }: { node: Node }) => (
  <div>
    throw
    <AstRenderer node={ node.argument } />
    ;
  </div>
)

const TryStatementRenderer = ({ node }: { node: Node }) => (
  <div>
    try
    <BlockStatementRenderer node={ node.block } />
    { node.handler !== null ? <CatchClauseRenderer node={ node.handler } /> : null }
    { node.finalizer !== null ? 'finally' : '' }
    { node.finalizer !== null ? <BlockStatementRenderer node={ node.handler } /> : null }
  </div>
)

const CatchClauseRenderer = ({ node }: { node: Node }) => (
  <div>
    catch (
    <AstRenderer node={ node.param } />
    )
    <BlockStatementRenderer node={ node.body } />
  </div>
)

const WhileStatementRenderer = ({ node }: { node: Node }) => (
  <div>
    while (
    <AstRenderer node={ node.test } />
    )
    <AstRenderer node={ node.body } />
  </div>
)

const DoWhileStatementRenderer = ({ node }: { node: Node }) => (
  <div>
    do
    <AstRenderer node={ node.body } />
    while (
    <AstRenderer node={ node.test } />
    )
  </div>
)

const ForStatementRenderer = ({ node }: { node: Node }) => (
  <div>
    for (
    { node.init !== null ? <AstRenderer node={ node.init } /> : null }
    ;
    { node.test !== null ? <AstRenderer node={ node.test } /> : null }
    ;
    { node.update !== null ? <AstRenderer node={ node.update } /> : null }
    )
    <AstRenderer node={ node.body } />
  </div>
)

const ForInStatementRenderer = ({ node }: { node: Node }) => (
  <div>
    for (
    <AstRenderer node={ node.init } />
    in
    <AstRenderer node={ node.right } />
    )
    <AstRenderer node={ node.body } />
  </div>
)

// WIP. what's await???
const ForOfStatementRenderer = ({ node }: { node: Node }) => (
  <div>
    for (
    <AstRenderer node={ node.left } />
    of
    <AstRenderer node={ node.right } />
    )
    <AstRenderer node={ node.body } />
  </div>
)

const FunctionDeclarationRenderer = ({ node }: { node: Node }) => (
  <FunctionRenderer node={ node } />
)

const VariableDeclarationRenderer = ({ node }: { node: Node }) => (
  <span>
    { node.kind }
    { node.declarations.map(declaration => <VariableDeclaratorRenderer node={ declaration } />) }
  </span>
)

const VariableDeclaratorRenderer = ({ node }: { node: Node }) => (
  <span>
    <AstRenderer node={ node.id } />
    { node.init !== null ? '=' : '' }
    { node.init !== null ? <AstRenderer node={ node.init } /> : null }
  </span>
)

const DecoratorRenderer = ({ node }: { node: Node }) => (
  <span>
    @
    <AstRenderer node={ node.expression } />
  </span>
)

const DirectiveRenderer = ({ node }: { node: Node }) => (
  <DirectiveLiteralRenderer node={ node.value } />
)

const DirectiveLiteralRenderer = ({ node }: { node: Node }) => (
  <span>'{ node.value }'</span>
)

const SuperRenderer = ({ node }: { node: Node }) => (
  <span>super</span>
)

const ImportRenderer = ({ node }: { node: Node }) => (
  <span>import</span>
)

const ThisExpressionRenderer = ({ node }: { node: Node }) => (
  <span>this</span>
)

const ArrowFunctionExpressionRenderer = ({ node }: { node: Node }) => (
  <span>
    (
    { node.params.map(p => <AstRenderer node={ p } />) }
    ) =>
    <AstRenderer node={ node.body } />
  </span>
)

const YieldExpressionRenderer = ({ node }: { node: Node }) => (
  <span>
    { 'yield' }
    { node.delegate ? '*' : '' }
    { node.argument !== null ? <AstRenderer node={ node.argument } /> : null }
  </span>
)

const AwaitExpressionRenderer = ({ node }: { node: Node }) => (
  <span>
    { 'await' }
    { node.argument !== null ? <AstRenderer node={ node.argument } /> : null }
  </span>
)

const ArrayExpressionRenderer = ({ node }: { node: Node }) => (
  <span>
    { '[' }
    { node.elements.map(e => e !== null ? <AstRenderer node={ e } /> : null) }
    { ']' }
  </span>
)

const ObjectExpressionRenderer = ({ node }: { node: Node }) => (
  <span>
    { '{' }
    { node.properties.map(p => <AstRenderer node={ p } />) }
    { '}' }
  </span>
)

// WIP for decorator
const ObjectPropertyRenderer = ({ node }: { node: Node }) => (
  <span>
    { node.computed ? '[' : '' }
    <AstRenderer node={ node.key } />
    { node.computed ? ']' : '' }
    { node.shorthand ? '' : ':' }
    { node.shorthand ? null : <AstRenderer node={ node.value } /> }
  </span>
)

// WIP. I think some lines of this method must be wrong.
const ObjectMethodRenderer = ({ node }: { node: Node }) => (
  <span>
    { node.async ? 'async' : '' }
    { node.generator ? '*' : '' }
    { node.kind !== 'method' ? node.kind : '' }
    { node.computed ? '[' : '' }
    <AstRenderer node={ node.key } />
    { node.computed ? ']' : '' }

    { '(' }
    { node.params.map(p => <AstRenderer node={ p } />) }
    { ')' }
    <BlockStatementRenderer node={ node.body } />
  </span>
)

const FunctionExpressionRenderer = ({ node }: { node: Node }) => (
  <FunctionRenderer node={ node } />
)

// WIP. what does the property prefix mean? I think all unary operators are prefixed.
const UnaryExpressionRenderer = ({ node }: { node: Node }) => (
  <span>
    { node.operator }
    <AstRenderer node={ node.argument } />
  </span>
)

const UpdateExpressionRenderer = ({ node }: { node: Node }) => (
  <span>
    { node.prefix ? node.operator : '' }
    <AstRenderer node={ node.argument } />
    { !node.prefix ? node.operator : '' }
  </span>
)

const BinaryExpressionRenderer = ({ node }: { node: Node }) => (
  <span>
    <AstRenderer node={ node.left } />
    { node.operator }
    <AstRenderer node={ node.right } />
  </span>
)

const AssignmentExpressionRenderer = ({ node }: { node: Node }) => (
  <span>
    <AstRenderer node={ node.left } />
    { node.operator }
    <AstRenderer node={ node.right } />
  </span>
)

const LogicalExpressionRenderer = ({ node }: { node: Node }) => (
  <span>
    <AstRenderer node={ node.left } />
    { node.operator }
    <AstRenderer node={ node.right } />
  </span>
)

const SpreadElementRenderer = ({ node }: { node: Node }) => (
  <span>
    ...
    <AstRenderer node={ node.argument } />
  </span>
)

// WIP. shall I handle optional prop?
const MemberExpressionRenderer = ({ node }: { node: Node }) => (
  <span>
    <AstRenderer node={ node.object } />
    { node.computed ? '[' : '.' }
    <AstRenderer node={ node.property } />
    { node.computed ? ']' : '' }
  </span>
)

const BindExpressionRenderer = ({ node }: { node: Node }) => (
  <span>
    { node.object !== null ? <AstRenderer node={ node.object } /> : null }
    { '::' }
    <AstRenderer node={ node.callee } />
  </span>
)

const ConditionalExpressionRenderer = ({ node }: { node: Node }) => (
  <span>
    <AstRenderer node={ node.test } />
    { '?' }
    <AstRenderer node={ node.consequent } />
    { ':' }
    <AstRenderer node={ node.alternate } />
  </span>
)

// WIP. shall I handle optional prop?
const CallExpressionRenderer = ({ node }: { node: Node }) => (
  <span>
    <AstRenderer node={ node.callee } />
    { '(' }
    { node.arguments.map(argument => <AstRenderer node={ argument } />) }
    { ')' }
  </span>
)

// WIP. shall I handle optional prop?
const NewExpressionRenderer = ({ node }: { node: Node }) => (
  <span>
    { 'new' }
    <AstRenderer node={ node.object } />
    { '(' }
    { node.arguments.map(argument => <AstRenderer node={ argument } />) }
    { ')' }
  </span>
)

// WIP. put comma.
const SequenceExpressionRenderer = ({ node }: { node: Node }) => (
  <span>
    { node.expressions.map(expression => <AstRenderer node={ expression } />) }
  </span>
)

const DoExpressionRenderer = ({ node }: { node: Node }) => (
  <span>
    { 'do' }
    <BlockStatementRenderer node={ node.body } />
  </span>
)

// Not implemented. they must be awful works.
const TemplateLiteralRenderer = UnknownNodeRenderer
const TaggedTemplateExpressionRenderer = UnknownNodeRenderer

const AssignmentPropertyRenderer = ({ node }: { node: Node }) => (
  <ObjectPropertyRenderer node={ node } />
)

const ObjectPatternRenderer = ({ node }: { node: Node }) => (
  <span>
    { '{' }
    { node.properties.map(property => <AstRenderer node={ property } />) }
    { '}' }
  </span>
)

const ArrayPatternRenderer = ({ node }: { node: Node }) => (
  <span>
    { '[' }
    { node.elements.map(element => element !== null ? <AstRenderer node={ element } /> : null) }
    { ']' }
  </span>
)

const RestElementRenderer = ({ node }: { node: Node }) => (
  <span>
    { '...' }
    <AstRenderer node={ node.pattern } />
  </span>
)

const AssignmentPatternRenderer = ({ node }: { node: Node }) => (
  <span>
    <AstRenderer node={ node.left } />
    { '=' }
    <AstRenderer node={ node.right } />
  </span>
)

export default AstRenderer
// vim: set ts=2 sw=2 et:
