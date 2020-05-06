import React from 'react'
import SearchResults from '../search/search-results'

const BlockSearchResults = () => {
    const searchIndices = [
        { name: `prod_LEC_Content`, title: `Pages`, hitComp: `PageHit` },
        // { name: `Posts`, title: `Blog Posts`, hitComp: `PostHit` },
    ]
    
    return (
        <SearchResults indices={searchIndices} />
    )
}

export default BlockSearchResults