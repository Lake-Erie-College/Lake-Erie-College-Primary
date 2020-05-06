const defaultLocale = 'en-US'

function scrubber(node) {
    if (typeof node === 'object') {
        if (Array.isArray(node)) {
            node.forEach(function(item, index) {
                node[index] = scrubber(item)
            })
        } else {
            if (node !== null) {
                Object.keys(node).forEach(function(key) {
                    if (key !== 'en-US' && key !== 'fields') {
                        node[key] = scrubber(node[key])
                    } else {
                        node = scrubber(node[key])
                    }
                })
            }
        }
    }

    let updatedNode = node

    return updatedNode
}

exports.scrub = function(node) {
    const scrubbedNode = scrubber(node)
    return scrubbedNode
}