// @flow
import type babylon from 'babylon'
import React from 'react'
import { NodeRenderer } from './JavaScriptASTRenderer.js'

export const ClassRenderer = ({ node }: { node: babylon.Class }) => (
  <span>
    { node.decorators ? node.decorators.map((decorator, i) => <NodeRenderer key={ i } node={ decorator } />) : null }
    <span>class</span>
    <NodeRenderer node={ node.id } />
    { node.superClass !== null ? <span>extends</span> : null }
    <NodeRenderer node={ node.superClass } />
    <ClassBodyRenderer node={ node.body } />
  </span>
)

const ClassBodyRenderer = ({ node }: { node: babylon.ClassBody }) => (
  <div>
    <span>{ '{' }</span>
    { node.body.map((child, i) => <NodeRenderer key={ i } node={ child } />) }
    <span>{ '}' }</span>
  </div>
)

export const ClassMethodRenderer = ({ node }: { node: babylon.ClassMethod }) => (
  <div>
    { node.decorators ? node.decorators.map((decorator, i) => <NodeRenderer key={ i } node={ decorator } />) : null }
    { node.static ? <span>static</span> : null }
    { node.kind === 'get' || node.kind === 'set' ? <span>{ node.kind }</span> : null }
    { node.computed ? <span>[</span> : null }
    <NodeRenderer node={ node.key } />
    { node.computed ? <span>]</span> : null }

    <span>(</span>
    { node.params.map((param, i) => { <NodeRenderer key={ i } node={ param } /> }) }
    <span>)</span>
    <NodeRenderer node={ node.body } />
  </div>
)

export const ClassPropertyRenderer = ({ node }: { node: babylon.ClassProperty }) => (
  <div>
    { node.static ? <span>static</span> : null }
    { node.computed ? <span>[</span> : null }
    <NodeRenderer node={ node.key } />
    { node.computed ? <span>]</span> : null }
    <span>:</span>
    <NodeRenderer node={ node.value } />
  </div>
)

// vim: set ts=2 sw=2 et:
