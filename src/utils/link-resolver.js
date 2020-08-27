const siterootSlug = 'lake-erie-college'
const defaultLocale = 'en-US'

exports.path = function(node) {
    if (typeof node === 'undefined') {
        return '/'
    }

    if (typeof node === 'string') {
        return node
    }

    const slug = typeof node.slug !== 'undefined' ? node.slug : null
    const category = typeof node.category !== 'undefined' ? node.category : null

    let url = '/'

    if (slug !== null) {
        if (slug === siterootSlug) {
            return url
        }

        // Handle JSON output from Rich Text
        if (typeof slug[defaultLocale] !== 'undefined') {
            url = `${url}${slug[defaultLocale]}/`
        } else {
            url = `${url}${slug}/`
        }

        if (category !== null) {
            if (typeof category.slug !== 'undefined') {
                url = `/${category.slug}${url}`
            } else if (
                typeof category[defaultLocale] !== 'undefined' &&
                category[defaultLocale] !== null
            ) {
                // Unfortunately need to cover for the category being under 'fields'
                // in the JSON response
                if (
                    typeof category[defaultLocale].fields !== 'undefined' &&
                    typeof category[defaultLocale].fields.slug !== 'undefined'
                ) {
                    url = `/${category[defaultLocale].fields.slug[defaultLocale]}${url}`
                }
            }
        }
    }

    // Backup for all other types
    return url
}
