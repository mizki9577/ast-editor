// @flow
import type babylon from 'babylon'
import React from 'react'
import { UnknownNodeRenderer } from './JavaScriptASTRenderer.js'

export const renderModuleDeclaration = (node: babylon.ModuleDeclaration) => {
  switch (node.type) {
    /*
    case 'ImportDeclaration':
      return <ImportDeclarationRenderer node={ node } />

    case 'ExportNamedDeclaration':
      return <ExportNamedDeclarationRenderer node={ node } />

    case 'ExportDefaultDeclaration':
      return <ExportDefaultDeclarationRenderer node={ node } />

    case 'ExportAllDeclaration':
      return <ExportAllDeclarationRenderer node={ node } />
    */

    default:
      return <UnknownNodeRenderer node={ node } />
  }
}

// vim: set ts=2 sw=2 et:
