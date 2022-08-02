import { data } from 'autoprefixer';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

export default function Pagination({ page }) {
    const router = useRouter()
    const [pageArr, setPageArr] = useState()
    const [totalPage, setTotalPage] = useState(page.total_page)
    const [pageSelect, setPageSelect] = useState(1)
    const [numPage, setNumPage] = useState(1)
    useEffect(() => {
        pagination()
    }, [])

    function pagination() {
        let arr = []
        for (numPage; numPage <= totalPage; numPage++) {
            arr.push(numPage)
        }
        setPageArr(arr)
        setPageSelect(router.query.page)
    }
    return (
        <div className="pagination">
            {/* <button style={{ cursor: 'pointer'}} onClick={() => setNumPage(numPage--)}>
                <i className="fa-solid fa-angle-left" />
            </button> */}
            {pageArr?.map((data, index) => (
                <div key={index}>
                    <a className={`${(pageSelect == data) && 'active'}`} href={`/member?page=${data.toString()}`}>
                        {data}
                    </a>
                </div>
            ))}
            {/* <button onClick={() => setNumPage(numPage++)}>
                <i className="fa-solid fa-chevron-right" />
            </button> */}
        </div>
    )
}
