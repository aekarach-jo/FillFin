import React, { Fragment } from 'react'

export default function Layout_product({ children }) {
    return (
        <Fragment>
            <main>
                {children}
            </main>
        </Fragment>
    )
}
