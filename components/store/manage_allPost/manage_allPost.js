import moment from 'moment'
import React, { Fragment } from 'react'
import nextConfig from '../../../next.config'

const apiUrl = nextConfig.apiPath
export default function Manage_allPost({ postList }) {

  function handleConfirmDelete(product_code) {
    Swal.fire({
      icon: 'warning',
      position: 'center',
      title: 'ยืนยันการลบสินค้า',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
      showCancelButton: true,
      showConfirmButton: true
    }).then(res => {
      if (res.isConfirmed) {
        onDeleteOrder(product_code)
      }
    })
  }

  async function onDeleteOrder(product_code) {
    const access_token = getCookie("access_token")
    const deleteOrder = await axios({
      method: 'GET',
      url: `${apiUrl}/api/store/product/delete/${product_code}`,
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    }).then(() => {
      Swal.fire('ลบแล้ว', '', 'success')
    })
  }

  return (
    <Fragment>
      <div className="text-box-top">
        <h2>สินค้าทั้งหมด</h2>
        <p>รายการสินค้าทั้งหมด {postList.length} รายการ</p>
      </div>
      <div className="column-product-recommend">
        {postList?.map((data, index) => (
          <div key={index} className="recommend-column">
            <div className="column-calendar">
              <img src="/assets/icons/icon-calendar.png" alt="image-calender" />
              <FormetDate dateTime={data.date} />
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

function FormetDate({ dateTime }) {
  dateTime = moment().format("DD MMM YYYY");
  return <h4>{dateTime}</h4>
}

function ShowImagePost({ image }) {
  if (!image) {
    return <img src="/assets/images/empty.png" alt="image-empty" />
  }
  const apiUrl = nextConfig.apiPath
  let image_split = image.split(",");
  const response = image_split.map((data, index) => {
    return (
      <img
        src={`${apiUrl}/${data}`}
        alt="image-product"
        style={{
          borderRadius: "10px",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          cursor: "pointer"
        }}
        key={index}
        onError={e => {
          e.target.setAttribute('src', '/assets/images/empty.png');
          return false;
        }} />
    )
  })
  return response;
}