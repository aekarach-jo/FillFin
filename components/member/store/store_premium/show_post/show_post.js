
import React, { Fragment } from 'react'
import nextConfig from '../../../../../next.config'
import moment from 'moment'

const apiUrl = nextConfig.apiPath
export default function Show_post({ postList }) {
    console.log(postList);
    return (
        <Fragment>
            <div className="text-box-top">
                <h2>รายการโพสต์</h2>
                <p>โพสต์ทั้งหมด ... รายการ</p>
            </div>
            <div className="column-product-recommend">
                {postList?.map((data, index) => (
                    <div key={index} className="recommend-column">
                        <div className="column-calendar">
                            <img src="/assets/icons/icon-calendar.png" />
                            <FormatDate dateTime={data.date}/>
                        </div>
                        <div className="detail-text">
                        <p>{data.caption}</p>
                        </div>
                        <div className="column-img">
                            <ShowImagePost image={data.post_img} />
                        </div>
                    </div>
                ))}
            </div>
        </Fragment>
    )
}


function FormatDate({dateTime}){
    dateTime = moment().format("DD MMM YYYY");
    return <h4>{dateTime}</h4>
  }
  

function ShowImagePost({ image }) {
    if (!image) {
        return <img src="/assets/images/empty.png" />
    }
    const apiUrl = nextConfig.apiPath
    let image_split = image.split(",");
    const response = image_split.map((data, index) => {
        return (
            <img
                src={`${apiUrl}/${data}`}
                key={index}
                onError={e => {
                    e.target.setAttribute('src', '/assets/images/empty.png');
                    return false;
                }} />
        )
    })
    return response;
}