// @flow
import type babylon from 'babylon'
import React from 'react'
import { UnknownNodeRenderer, IdentifierRenderer, DecoratorRenderer } from './JavaScriptASTRenderer.js'
import { renderExpression } from './expression-renderers.js'
import { renderPattern } from './pattern-renderers.js'
import { BlockStatementRenderer } from './statement-renderers.js'

export const ClassRenderer = ({ node }: { node: babylon.Class }) => (
  <span>
    { node.decorators ? node.decorators.map(decorator => <DecoratorRenderer node={ decorator } />) : null }
    <span>class</span>
    { node.id !== null ? <IdentifierRenderer node={ node.id } /> : null }
    { node.superClass !== null ? <span>extends</span> : null }
    { node.superClass !== null ? renderExpression(node.superClass) : null }
    <ClassBodyRenderer node={ node.body } />
  </span>
)

const ClassBodyRenderer = ({ node }: { node: babylon.ClassBody }) => (
  <div>
    <span>{ '{' }</span>
    { node.body.map(child => (
      child.type === 'ClassMethod'              ? <ClassMethodRenderer node={ child } /> :
      child.type === 'ClassProperty'            ? <ClassPropertyRenderer node={ child } /> :
      /* child.type === 'ClassPrivateProperty' */ <ClassPrivatePropertyRenderer node={ child } />
    )) }
    <span>{ '}' }</span>
  </div>
)

const ClassMethodRenderer = ({ node }: { node: babylon.ClassMethod }) => (
  <div>
    { node.decorators ? node.decorators.map(decorator => <DecoratorRenderer node={ decorator } />) : null }
    { node.static ? <span>static</span> : null }
    { node.kind === 'get' || node.kind === 'set' ? <span>{ node.kind }</span> : null }
    { node.computed ? <span>[</span> : null }
    { renderExpression(node.key) }
    { node.computed ? <span>]</span> : null }

    <span>(</span>
    { node.params.map(param => { renderPattern(param) }) }
    <span>)</span>
    <BlockStatementRenderer node={ node.body } />
  </div>
)

const ClassPropertyRenderer = ({ node }: { node: babylon.ClassProperty }) => (
  <div>
    { node.static ? <span>static</span> : null }
    { node.computed ? <span>[</span> : null }
    { renderExpression(node.key) }
    { node.computed ? <span>]</span> : null }
    <span>:</span>
    { renderExpression(node.value) }
  </div>
)

const ClassPrivatePropertyRenderer = () => <UnknownNodeRenderer node={ null } />

// vim: set ts=2 sw=2 et: