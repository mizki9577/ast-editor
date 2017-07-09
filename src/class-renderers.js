// @flow
import type babylon from 'babylon'
import React from 'react'
import { UnknownNodeRenderer, renderNode } from './JavaScriptASTRenderer.js'

export const ClassRenderer = ({ node }: { node: babylon.Class }) => (
  <span>
    { node.decorators ? node.decorators.map((decorator, i) => renderNode(decorator, i)) : null }
    <span>class</span>
    { renderNode(node.id) }
    { node.superClass !== null ? <span>extends</span> : null }
    { renderNode(node.superClass) }
    <ClassBodyRenderer node={ node.body } />
  </span>
)

export const ClassBodyRenderer = ({ node }: { node: babylon.ClassBody }) => (
  <div>
    <span>{ '{' }</span>
    { node.body.map((child, i) => renderNode(child, i)) }
    <span>{ '}' }</span>
  </div>
)

export const ClassMethodRenderer = ({ node }: { node: babylon.ClassMethod }) => (
  <div>
    { node.decorators ? node.decorators.map((decorator, i) => renderNode(decorator, i)) : null }
    { node.static ? <span>static</span> : null }
    { node.kind === 'get' || node.kind === 'set' ? <span>{ node.kind }</span> : null }
    { node.computed ? <span>[</span> : null }
    { renderNode(node.key) }
    { node.computed ? <span>]</span> : null }

    <span>(</span>
    { node.params.map((param, i) => { renderNode(param, i) }) }
    <span>)</span>
    { renderNode(node.body) }
  </div>
)

// NOTE: According to Babylon AST Specification, `value` should not be null.
export const ClassPropertyRenderer = ({ node }: { node: babylon.ClassProperty }) => (
  <div>
    { node.static ? <span>static</span> : null }
    { node.computed ? <span>[</span> : null }
    { renderNode(node.key) }
    { node.computed ? <span>]</span> : null }
    <span>:</span>
    { renderNode(node.value) }
  </div>
)

export const ClassPrivatePropertyRenderer = ({ node }: { node: babylon.ClassPrivateProperty }) => <UnknownNodeRenderer node={ node } />

// vim: set ts=2 sw=2 et:
