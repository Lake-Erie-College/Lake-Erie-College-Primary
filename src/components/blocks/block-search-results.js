import React from 'react'
import SearchResults from '../search/search-results'

const BlockSearchResults = () => {
    const searchIndices = [
        { name: `prod_LEC_Pages`, title: `Pages`, hitComp: `SearchHit` },
        { name: `prod_LEC_People`, title: `People`, hitComp: `SearchHit` },
        { name: `prod_LEC_Offerings`, title: `Offerings`, hitComp: `SearchHit` },
        // { name: `Posts`, title: `Blog Posts`, hitComp: `PostHit` },
    ]
    
    return (
        <SearchResults indices={searchIndices} />
    )
}

export default BlockSearchResults