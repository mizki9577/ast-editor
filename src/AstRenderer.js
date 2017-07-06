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

    case 'Program':
      return (
        <div className="program">
          { node.body.map(child => <AstRenderer node={ child } />) }
        </div>
      )

    case 'ExpressionStatement':
      return (
        <span className="expression-statement">
          <AstRenderer node={ node.expression } />
          ;
        </span>
      )

    case 'CallExpression':
      return (
        <span className="call-expression">
          <AstRenderer node={ node.callee } />
          (
          <div className="arguments">
            { node.arguments.map(argument => <AstRenderer node={ argument } />) }
          </div>
          )
        </span>
      )

    case 'MemberExpression':
      return (
        <span className="member-expression">
          <AstRenderer node={ node.object } />
          .
          <AstRenderer node={ node.property } />
        </span>
      )

    case 'Identifier':
      return <span className="identifier">{ node.name }</span>

    case 'StringLiteral':
      return (
        <span className="string-literal">
          "
          { node.value }
          "
        </span>
      )

    default:
      console.error(node.type)
      return null
  }
}

export default AstRenderer
// vim: set ts=2 sw=2 et:
