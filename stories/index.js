import React from 'react'
import { storiesOf } from '@storybook/react'

import { NodeRenderer } from '../src/renderer/JavaScriptASTRenderer.js'
import * as t from 'babel-types'

import 'office-ui-fabric-react/dist/css/fabric.min.css'
import '../style.css'

storiesOf('ArrowFunctionExpression', module)
  .add('general', () => <NodeRenderer node={ t.ArrowFunctionExpression([t.Identifier('a'), t.Identifier('b'), t.Identifier('c')], t.BlockStatement([])) } />)
  .add('async', () => <NodeRenderer node={ t.ArrowFunctionExpression([t.Identifier('a'), t.Identifier('b'), t.Identifier('c')], t.BlockStatement([]), true) } />)

storiesOf('ArrayExpression', module)
  .add('no element', () => <NodeRenderer node={ t.ArrayExpression([]) } />)
  .add('single element', () => <NodeRenderer node={ t.ArrayExpression([ t.Identifier('a') ]) } />)
  .add('multiple elements', () => <NodeRenderer node={ t.ArrayExpression([t.Identifier('a'), t.Identifier('b'), t.Identifier('c')]) } />)

storiesOf('ObjectExpression', module)
  .add('no property', () => <NodeRenderer node={ t.ObjectExpression([]) } />)
  .add('single property', () => <NodeRenderer node={ t.ObjectExpression([ t.ObjectProperty(t.Identifier('a'), t.NumericLiteral(1)) ]) } />)
  .add('multiple properties with a computed property', () => <NodeRenderer node={ t.ObjectExpression([
    t.ObjectProperty(t.Identifier('a'), t.NumericLiteral(1)),
    t.ObjectProperty(t.CallExpression(t.Identifier('b'), []), t.NumericLiteral(2), true),
    t.ObjectProperty(t.Identifier('c'), t.NumericLiteral(3)),
  ]) } />)
  .add('multiple properties with a shorthand property', () => <NodeRenderer node={ t.ObjectExpression([
    t.ObjectProperty(t.Identifier('a'), t.NumericLiteral(1)),
    t.ObjectProperty(t.Identifier('b'), t.Identifier('b'), false, true),
    t.ObjectProperty(t.Identifier('c'), t.Identifier('c'), false, true),
    t.ObjectProperty(t.Identifier('d'), t.NumericLiteral(4)),
  ]) } />)
  .add('multiple properties with spreading', () => <NodeRenderer node={ t.ObjectExpression([
    t.ObjectProperty(t.Identifier('a'), t.NumericLiteral(1)),
    t.ObjectProperty(t.Identifier('b'), t.NumericLiteral(2)),
    t.SpreadProperty(t.Identifier('c')),  // NOTE: This should be a SpreadElement.
  ]) } />)
  .add('single property and multiple methods', () => <NodeRenderer node={ t.ObjectExpression([
    t.ObjectProperty(t.Identifier('a'), t.NumericLiteral(1)),
    t.ObjectMethod('get', t.Identifier('b'), [], t.BlockStatement([])),
    t.ObjectMethod('set', t.Identifier('c'), [t.Identifier('x'), t.Identifier('y'), t.Identifier('z')], t.BlockStatement([])),
    t.ObjectMethod('method', t.Identifier('d'), [t.Identifier('x'), t.Identifier('y'), t.Identifier('z')], t.BlockStatement([])),
  ]) } />)
  .add('multiple computed methods', () => <NodeRenderer node={ t.ObjectExpression([
    t.ObjectMethod('get', t.CallExpression(t.Identifier('a'), []), [], t.BlockStatement([]), true),
    t.ObjectMethod('set', t.CallExpression(t.Identifier('b'), []), [t.Identifier('x'), t.Identifier('y'), t.Identifier('z')], t.BlockStatement([]), true),
    t.ObjectMethod('method', t.CallExpression(t.Identifier('c'), []), [t.Identifier('x'), t.Identifier('y'), t.Identifier('z')], t.BlockStatement([]), true),
  ]) } />)

storiesOf('FunctionExpression', module)
  .add('general', () => <NodeRenderer node={ t.FunctionExpression(null, [t.Identifier('a'), t.Identifier('b'), t.Identifier('c')], t.BlockStatement([])) } />)
  .add('generator', () => <NodeRenderer node={ t.FunctionExpression(null, [t.Identifier('a'), t.Identifier('b'), t.Identifier('c')], t.BlockStatement([]), true, false) } />)
  .add('async', () => <NodeRenderer node={ t.FunctionExpression(null, [t.Identifier('a'), t.Identifier('b'), t.Identifier('c')], t.BlockStatement([]), false, true) } />)

/*
MemberExpression
BindExpression
ConditionalExpression
CallExpression
NewExpression
SequenceExpression
DoExpression
*/

// vim: set ts=2 sw=2 et:
