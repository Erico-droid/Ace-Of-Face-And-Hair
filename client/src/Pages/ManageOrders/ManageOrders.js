import React, {useEffect, useState} from 'react'
import DashboardAside from '../../Components/DashboardAside/DashboardAside'
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom'
import proxy from '../../proxy.json'
import axios from 'axios'

export default function ManageOrders() {

    const [orders, setOrders] = useState([])

    const getOrders = async () => {
        const url =  `${proxy.proxy}/services/get_orders`
        const response = await axios.get(url)
        let data = response.data.data
        for (var i = 0; i < data.length; i++) {
            let customerData = JSON.parse(data[i].customer)
            data[i].customer = customerData[0].fields
        }
        setOrders(data)
    }

    useEffect(() => {
        getOrders()
    }, [])

  return (
    <div className='db-bg'>
    <div className='row'>
    <div className='col-md-2'>
        <DashboardAside />
    </div>
    <div className='col-md-10'>
    <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" data-scroll="true">
      <div className="container-fluid py-1 px-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
            <li className="breadcrumb-item text-sm"><Link className="opacity-5 text-dark" to="/">Ace Of Face and Hair</Link></li>
            <li className="breadcrumb-item text-sm text-dark active" aria-current="page">Manage Orders</li>
          </ol>
          <h6 className="font-weight-bolder mb-0">Manage Orders</h6>
        </nav>
      </div>
    </nav>
    <div className="col-12 container-fluid" style={{paddingTop: "15px"}}>
          <div className="card my-4">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div className="bg-gradient-primary  border-radius-lg pt-4 pb-3">
                <h6 className="text-black text-capitalize ps-3">View and Manage Your Orders here</h6>
              </div>
            </div>
            <div className="card-body px-0 pb-2">
              <div className="table-responsive p-0" style={{maxHeight:"500px"}} id = "projectsTable">
                {orders.length > 0 ?
              <table className="table align-items-center mb-0" id = "projectsTable">
                  <thead>
                    <tr>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Code</th>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Date</th>
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">name</th>
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">email</th>
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">phone</th>
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">location</th>
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">notes</th>
                    </tr>
                  </thead>
                  <tbody>
                   {orders.map((Order) => {
                    return (<tr key={Math.random} project-slug = {Order.slug}>
                      <td>
                        <div className="d-flex px-2 py-1">
                          <div className="d-flex flex-column justify-content-center">
                            <h6 className="mb-0 text-sm">{Order.code}</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="text-xs font-weight-bold mb-0">{Order.created}</p>
                      </td>
                      <td className="align-middle text-center text-sm">
                        {Order.customer.first_name} {Order.customer.last_name}
                      </td>
                      <td className="align-middle text-center">
                        {Order.customer.email}
                      </td>
                      <td className="align-middle text-center text-sm">
                        {Order.customer.phone_number}
                      </td>
                      <td className="align-middle text-center text-sm">
                        {Order.location}
                      </td>
                      <td className="align-middle text-center text-sm">
                        {Order.extra_notes}
                      </td>
                    </tr>)
                   })}
                  </tbody>
                </table>
                : 
                <div className = "no-projects text-center">
                    <p>
                        You do not have any orders at the moment
                    </p>
                </div> 
                }
              </div>
            </div>
          </div>
    </div>
    </div>
    </div>
    </div>
  )
}
