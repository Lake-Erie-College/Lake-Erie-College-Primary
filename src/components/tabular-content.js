import React, { useState, useEffect } from 'react'
import { readRemoteFile } from 'react-papaparse'

import styles from './tabular-content.module.scss'

const TableHeader = ({ column }) => {
    return (
        <th
            role='columnheader'
        >
            {column}
        </th>
    )
}

const TableRow = ({headers, row, rowKey}) => {
    return (
        <tr role='row'>
        {row.map((column, colIdx) => (
                <td
                    key={`data-${rowKey}-${colIdx}`}
                    data-header={headers[colIdx]}
                    role='cell'
                >
                    {column}
                </td>
            ))}
        </tr>
    )
}

const TabularContent = ({ fileUrl, caption }) => {
    const [hover, toggleHover] = useState(false)
    const hoverState = typeof isHovered === 'undefined' ? hover : isHovered

    const tableCaption = typeof caption === 'undefined' ? null : caption

    const [headerRow, updateHeader] = useState([])
    const [rows, updateRows] = useState([])

    const fileKey = fileUrl.substr(fileUrl.lastIndexOf('/') + 1)

    useEffect(function effectFunction() {
        readRemoteFile(fileUrl, {
            download: true,
            complete: results => {
                if (results.data.length > 0) {
                    // Splice out the first data set as headers
                    updateHeader(results.data.splice(0, 1)[0])
                    updateRows(results.data)
                }
            },
        })
    }, [])

    return (
        <table className={styles.tabularContent} role='table'>
            { tableCaption && (
                <caption>{tableCaption}</caption>
            )}
            <thead className={styles.tableHeader} role='rowgroup'>
                <tr role='row'>
                    { headerRow.map(( column, i ) => <TableHeader column={column} key={`header-${fileKey}-${i}`}/>) }
                </tr>
            </thead>
            <tbody className={styles.tableBody} role='rowgroup'>
                { rows.map(( row, i ) => <TableRow headers={headerRow} row={row} key={`row-${fileKey}-${i}`} rowKey={`row-${fileKey}-${i}`} /> ) }
            </tbody>
        </table>
    )
}

export default TabularContent
