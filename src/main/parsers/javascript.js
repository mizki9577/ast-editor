const babylon = require('babylon')
const t       = require('babel-types')
const { default: traverse } = require('babel-traverse')

const parse = src => {
  const ast = babylon.parse(src, {
    sourceType: 'module',
    plugins: ['jsx', 'flow'],
  })

  const nodes = {}
  let id = 0

  traverse(ast, {
    exit(path) {
      const entries = Object.entries(path.node)
      for (const [key, value] of entries) {
        if (t.isNode(value)) {
          const nodeId = id++
          nodes[nodeId] = value
          path.node[key] = nodeId
        } else if (Array.isArray(value)) {
          path.node[key] = value.map(item => {
            const itemId = id++
            nodes[itemId] = item
            return itemId
          })
        }
      }

      if (t.isProgram(path.node)) {
        const nodeId = id++
        nodes[nodeId] = path.node
      }
    }
  })

  return nodes
}

module.exports = parse
// vim: set ts=2 sw=2 et:
