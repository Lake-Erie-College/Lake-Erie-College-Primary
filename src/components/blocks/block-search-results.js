import React from 'react'
import SearchResults from '../search/search-results'

const BlockSearchResults = ({searchType, primaryHeading, summary}) => {
    const searchIndices = {
        default: {},
        Pages: { name: `prod_LEC_Pages`, title: `Pages`, hitComp: `SearchHit` },
        People: { name: `prod_LEC_People`, title: `People`, hitComp: `SearchHit` },
        Offerings: { name: `prod_LEC_Offerings`, title: `Offerings`, hitComp: `SearchHit` },
    }

    const selectedIndex = searchIndices[searchType] || searchIndices.default

    return (
        <div>
            <SearchResults index={selectedIndex.name} hitComp={selectedIndex.hitComp} />
        </div>
    )
}

export default BlockSearchResults