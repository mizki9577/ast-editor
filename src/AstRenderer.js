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
      return <AstRenderer node={ node.program } />

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

    case 'BlockStatementRenderer':
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

    case 'BlockStatementRenderer':
      return <BlockStatementRenderer node={ node } />

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

    default:
      return <UnknownNodeRenderer node={ node } />
  }
}

const UnknownNodeRenderer = ({ node }: { node: Node }) => (
  <div className="unknown-node">[UNKNOWN NODE TYPE: { node.type }]</div>
)

const IdentifierRenderer = ({ node }: { node: Node }) => (
  <div className="identifier">{ node.name }</div>
)

const PrivateNameRenderer = UnknownNodeRenderer

const RegExpLiteralRenderer = ({ node }: { node: Node }) => (
  <div className="literal regexp-literal">/{ node.pattern }/{ node.flags }</div>
)

const NullLiteralRenderer = ({ node }: { node: Node }) => (
  <div className="literal null-literal">null</div>
)

const StringLiteralRenderer = ({ node }: { node: Node }) => (
  <div className="literal string-literal">'{ node.value }'</div>
)

const BooleanLiteralRenderer = ({ node }: { node: Node }) => (
  <div className="literal boolean-literal">{ String(node.value) }</div>
)

const NumericLiteralRenderer = ({ node }: { node: Node }) => (
  <div className="literal numeric-literal">{ String(node.value) }</div>
)

// WIP. currently it ignores sourceType and directives, and not implemented ModuleDeclaration Renderer
const ProgramRenderer = ({ node }: { node: Node }) => (
  <div className="program">
    { node.body.map(child => <AstRenderer node={ child } />) }
  </div>
)

const FunctionRenderer = ({ node }: { node: Node }) => (
  <div className="function">
    { node.async ? 'async' : '' }
    { 'function' }
    { node.generator ? '*' : '' }
    { node.id !== null ? <IdentifierRenderer node={ node.id } /> : null }
    { '(' }
    { node.params.map(p => <AstRenderer node={ p } />) }
    { ')' }
    <BlockStatementRenderer node={ node.body } />
  </div>
)

const ExpressionStatementRenderer = ({ node }: { node: Node }) => (
  <div className="statement expression-statement">
    <AstRenderer node={ node.expression } />
    ;
  </div>
)

// WIP. what's directive?
const BlockStatementRenderer = ({ node }: { node: Node }) => (
  <div className="statement block-statement">
    { '{' }
    { node.body.map(child => <AstRenderer node={ child } />) }
    { '}' }
  </div>
)

const EmptyStatementRenderer = ({ node }: { node: Node }) => (
  <div className="statement empty-statement">;</div>
)

const DebuggerStatementRenderer = UnknownNodeRenderer

const WithStatementRenderer = ({ node }: { node: Node }) => (
  <div className="statement with-statement">
    with (
    <AstRenderer node={ node.object } />
    )
    <AstRenderer node={ node.body } />
  </div>
)

const ReturnStatementRenderer = ({ node }: { node: Node }) => (
  <div className="statement return-statement">
    return
    { node.argument !== null ? <AstRenderer node={ node.argument } /> : null }
  </div>
)

const LabeledStatementRenderer = ({ node }: { node: Node }) => (
  <div className="statement labeled-statement">
    { node.label }
    :
    <AstRenderer node={ node.body } />
  </div>
)

const BreakStatementRenderer = ({ node }: { node: Node }) => (
  <div className="statement break-statement">
    break
    { node.label !== null ? <IdentifierRenderer node={ node.label } /> : null }
  </div>
)

const ContinueStatementRenderer = ({ node }: { node: Node }) => (
  <div className="statement continue-statement">
    continue
    { node.label !== null ? <IdentifierRenderer node={ node.label } /> : null }
  </div>
)

const IfStatementRenderer = ({ node }: { node: Node }) => (
  <div className="statement if-statement">
    if (
    <AstRenderer node={ node.test } />
    )
    <AstRenderer node={ node.consequent } />
    { node.alternate !== null ? 'else' : '' }
    { node.alternate !== null ? <AstRenderer node={ node.conquest } /> : null }
  </div>
)

const SwitchStatementRenderer = ({ node }: { node: Node }) => (
  <div className="statement switch-statement">
    { 'switch (' }
    <AstRenderer node={ node.discriminant } />
    { ') {' }
    { node.cases.map(c => <SwitchCaseRenderer node={ c } />) }
    { '}' }
  </div>
)

const SwitchCaseRenderer = ({ node }: { node: Node }) => (
  <div className="switch-case">
    { node.test !== null ? 'case' : 'default' }
    { node.test !== null ? <AstRenderer node={ node.test } /> : null }
    :
    { node.consequent.map(statement => <AstRenderer node={ statement } />) }
  </div>
)

const ThrowStatementRenderer = ({ node }: { node: Node }) => (
  <div className="statement throw-statement">
    throw
    <AstRenderer node={ node.argument } />
  </div>
)

const TryStatementRenderer = ({ node }: { node: Node }) => (
  <div className="statement try-statement">
    try
    <BlockStatementRenderer node={ node.block } />
    { node.handler !== null ? <CatchClauseRenderer node={ node.handler } /> : null }
    { node.finalizer !== null ? 'finally' : '' }
    { node.finalizer !== null ? <BlockStatementRenderer node={ node.handler } /> : null }
  </div>
)

const CatchClauseRenderer = ({ node }: { node: Node }) => (
  <div className="catch-clause">
    catch (
    <AstRenderer node={ node.param } />
    )
    <BlockStatementRenderer node={ node.body } />
  </div>
)

const WhileStatementRenderer = ({ node }: { node: Node }) => (
  <div className="statement while-statement">
    while (
    <AstRenderer node={ node.test } />
    )
    <AstRenderer node={ node.body } />
  </div>
)

const DoWhileStatementRenderer = ({ node }: { node: Node }) => (
  <div className="statement dowhile-statement">
    do
    <AstRenderer node={ node.body } />
    while (
    <AstRenderer node={ node.test } />
    )
  </div>
)

const ForStatementRenderer = ({ node }: { node: Node }) => (
  <div className="statement for-statement">
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
  <div className="statement forin-statement">
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
  <div className="statement forof-statement">
    for (
    <AstRenderer node={ node.init } />
    of
    <AstRenderer node={ node.right } />
    )
    <AstRenderer node={ node.body } />
  </div>
)

const FunctionDeclarationRenderer = ({ node }: { node: Node }) => (
  <div className="declaration function-declaration">
    <FunctionRenderer node={ node } />
  </div>
)

const VariableDeclarationRenderer = ({ node }: { node: Node }) => (
  <div className="declaration variable-declaration">
    { node.kind }
    { node.declarations.map(declaration => <VariableDeclaratorRenderer node={ declaration } />) }
  </div>
)

const VariableDeclaratorRenderer = ({ node }: { node: Node }) => (
  <div className="variable-declarator">
    <AstRenderer node={ node.id } />
    { node.init !== null ? '=' : '' }
    { node.init !== null ? <AstRenderer node={ node.init } /> : null }
  </div>
)

const DecoratorRenderer = ({ node }: { node: Node }) => (
  <div className="decorator">
    @
    <AstRenderer node={ node.expression } />
  </div>
)

const DirectiveRenderer = ({ node }: { node: Node }) => (
  <div className="directive">
    <DirectiveLiteralRenderer node={ node.value } />
  </div>
)

const DirectiveLiteralRenderer = ({ node }: { node: Node }) => (
  <div className="literal directive-literal">'{ node.value }'</div>
)

const SuperRenderer = ({ node }: { node: Node }) => (
  <div className="expression super-expression">super</div>
)

const ImportRenderer = ({ node }: { node: Node }) => (
  <div className="expression import-expression">import</div>
)

const ThisExpressionRenderer = ({ node }: { node: Node }) => (
  <div className="expression this-expression">this</div>
)

const ArrowFunctionExpressionRenderer = ({ node }: { node: Node }) => (
  <div className="expression arrowfunction-expression">
    (
    { node.params.map(p => <AstRenderer node={ p } />) }
    ) =>
    <AstRenderer node={ node.body } />
  </div>
)

const YieldExpressionRenderer = ({ node }: { node: Node }) => (
  <div className="expression yield-expression">
    { 'yield' }
    { node.delegate ? '*' : '' }
    { node.argument !== null ? <AstRenderer node={ node.argument } /> : null }
  </div>
)

const AwaitExpressionRenderer = ({ node }: { node: Node }) => (
  <div className="expression await-expression">
    { 'await' }
    { node.argument !== null ? <AstRenderer node={ node.argument } /> : null }
  </div>
)

const ArrayExpressionRenderer = ({ node }: { node: Node }) => (
  <div className="expression array-expression">
    { '[' }
    { node.elements.map(e => e !== null ? <AstRenderer node={ e } /> : null) }
    { ']' }
  </div>
)

const ObjectExpressionRenderer = ({ node }: { node: Node }) => (
  <div className="expression object-expression">
    { '{' }
    { node.properties.map(p => <AstRenderer node={ p } />) }
    { '}' }
  </div>
)

// WIP for decorator
const ObjectPropertyRenderer = ({ node }: { node: Node }) => (
  <div className="object-property">
    { node.computed ? '[' : '' }
    <AstRenderer node={ node.key } />
    { node.computed ? ']' : '' }
    { node.shorthand ? '' : ':' }
    { node.shorthand ? null : <AstRenderer node={ node.value } /> }
  </div>
)

// WIP. I think some lines of this method must be wrong.
const ObjectMethodRenderer = ({ node }: { node: Node }) => (
  <div className="object-method">
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
  </div>
)

const FunctionExpressionRenderer = ({ node }: { node: Node }) => (
  <div className="expression function-expression">
    <FunctionRenderer node={ node } />
  </div>
)

// WIP. what does the property prefix mean? I think all unary operators are prefixed.
const UnaryExpressionRenderer = ({ node }: { node: Node }) => (
  <div className="expression unary-expression">
    { node.operator }
    <AstRenderer node={ node.argument } />
  </div>
)

const UpdateExpressionRenderer = ({ node }: { node: Node }) => (
  <div className="expression update-expression">
    { node.prefix ? node.operator : '' }
    <AstRenderer node={ node.argument } />
    { !node.prefix ? node.operator : '' }
  </div>
)

const BinaryExpressionRenderer = ({ node }: { node: Node }) => (
  <div className="expression binary-expression">
    <AstRenderer node={ node.left } />
    { node.operator }
    <AstRenderer node={ node.right } />
  </div>
)

const AssignmentExpressionRenderer = ({ node }: { node: Node }) => (
  <div className="expression assignment-expression">
    <AstRenderer node={ node.left } />
    { node.operator }
    <AstRenderer node={ node.right } />
  </div>
)

const LogicalExpressionRenderer = ({ node }: { node: Node }) => (
  <div className="expression logical-expression">
    <AstRenderer node={ node.left } />
    { node.operator }
    <AstRenderer node={ node.right } />
  </div>
)

const SpreadElementRenderer = ({ node }: { node: Node }) => (
  <div className="expression spread-element">
    ...
    <AstRenderer node={ node.argument } />
  </div>
)

// WIP. shall I handle optional prop?
const MemberExpressionRenderer = ({ node }: { node: Node }) => (
  <div className="expression member-expression">
    <AstRenderer node={ node.object } />
    { node.computed ? '[' : '.' }
    <AstRenderer node={ node.property } />
    { node.computed ? ']' : '' }
  </div>
)

const BindExpressionRenderer = ({ node }: { node: Node }) => (
  <div className="expression bind-expression">
    { node.object !== null ? <AstRenderer node={ node.object } /> : null }
    { '::' }
    <AstRenderer node={ node.callee } />
  </div>
)

const ConditionalExpressionRenderer = ({ node }: { node: Node }) => (
  <div className="expression conditional-expression">
    <AstRenderer node={ node.test } />
    { '?' }
    <AstRenderer node={ node.consequent } />
    { ':' }
    <AstRenderer node={ node.alternate } />
  </div>
)

// WIP. shall I handle optional prop?
const CallExpressionRenderer = ({ node }: { node: Node }) => (
  <div className="expression call-expression">
    <AstRenderer node={ node.callee } />
    { '(' }
    { node.arguments.map(argument => <AstRenderer node={ argument } />) }
    { ')' }
  </div>
)

// WIP. shall I handle optional prop?
const NewExpressionRenderer = ({ node }: { node: Node }) => (
  <div className="expression new-expression">
    { 'new' }
    <AstRenderer node={ node.object } />
    { '(' }
    { node.arguments.map(argument => <AstRenderer node={ argument } />) }
    { ')' }
  </div>
)

// WIP. put comma.
const SequenceExpressionRenderer = ({ node }: { node: Node }) => (
  <div className="expression sequence-expression">
    { node.expressions.map(expression => <AstRenderer node={ expression } />) }
  </div>
)

const DoExpressionRenderer = ({ node }: { node: Node }) => (
  <div className="expression do-expression">
    { 'do' }
    <BlockStatementRenderer node={ node.body } />
  </div>
)

const TemplateLiteralRenderer = UnknownNodeRenderer
const TaggedTemplateExpressionRenderer = UnknownNodeRenderer

export default AstRenderer
// vim: set ts=2 sw=2 et:
