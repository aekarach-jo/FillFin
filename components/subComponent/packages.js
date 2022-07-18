import Image from 'next/image'
import React, { Fragment, useState } from 'react'
import nextConfig from '../../next.config'

const apiUrl = nextConfig.apiPath
export default function Packages({ packages, setPackageId }) {
  const [handleChoose, setHandlaChoose] = useState(false)
  return (
    <Fragment>
      <div className="column" >
        {packages.length > 0 && packages?.map((data, index) => (
          <div key={index}>
            <div className="column-detail">
              <div className="column-img">
                <Image
                  width={217}
                  height={223}
                  src={`${apiUrl}${data.image}`}
                  style={{ cursor: "pointer" }}
                  alt="image-package"
                  quality={20}
                />
                <div className="bg-img">
                  <div className="bg-color">
                  </div>
                  <div className="text">
                    <h2>{data.name}</h2>
                    <button onClick={() => setPackageId(data.package_id)}
                      style={{ cursor: "pointer" }}
                      className="column-detail"
                    >เลือก</button>
                  </div>
                </div>
              </div>
              <div className="text-line">
                <p>{data.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Fragment >
  )
}
