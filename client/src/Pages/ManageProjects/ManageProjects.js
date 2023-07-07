import React, {useState, useEffect} from 'react'
import DashboardAside from '../../Components/DashboardAside/DashboardAside'
import {Link} from 'react-router-dom'
import axios from 'axios'
import proxy from '../../proxy.json'
import AddIcon from '@mui/icons-material/Add';

export default function 

() {

    const [projects, setProjects] = useState([])

    const getProjects = async () => {
        let projects = await axios.get(`${proxy.proxy}/dashboard/get_projects`)
        projects = projects.data;
        if (projects.length === 0) {
            document.getElementById("projectsTable").style.display = "none"
            document.querySelector(".no-projects").style.display = "block"
        } else {
            setProjects(projects)
        }
    } 

    
    useEffect(() => {
        getProjects()
    }, [])


  return (
    <div>
        <div className='row db-bg'>
        <div className='col-md-2'>
            <DashboardAside />
        </div>
        <div className='col-md-10'>
        <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" data-scroll="true">
      <div className="container-fluid py-1 px-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
            <li className="breadcrumb-item text-sm"><Link className="opacity-5 text-dark" to="/">Ace Of Face and Hair</Link></li>
            <li className="breadcrumb-item text-sm text-dark active" aria-current="page">Manage Projects</li>
          </ol>
          <h6 className="font-weight-bolder mb-0">Manage Projects</h6>
        </nav>
      </div>
    </nav>
        <div className="col-12 container-fluid" style={{paddingTop: "15px"}}>
          <div className="card my-4">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                <h6 className="text-black text-capitalize ps-3">View and Manage Your Projects here</h6>
              </div>
            </div>
            <div className="card-body px-0 pb-2">
              <div className="table-responsive p-0">
              <table className="table align-items-center mb-0" id = "projectsTable">
                  <thead>
                    <tr>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Project Name</th>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Company</th>
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Images</th>
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Employed</th>
                      <th className="text-secondary opacity-7"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="d-flex px-2 py-1">
                          <div>
                            <img src="../assets/img/team-2.jpg" className="avatar avatar-sm me-3 border-radius-lg" alt="user1"></img>
                          </div>
                          <div className="d-flex flex-column justify-content-center">
                            <h6 className="mb-0 text-sm">John Michael</h6>
                            <p className="text-xs text-secondary mb-0">john@creative-tim.com</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="text-xs font-weight-bold mb-0">Manager</p>
                        <p className="text-xs text-secondary mb-0">Organization</p>
                      </td>
                      <td className="align-middle text-center text-sm">
                        <span className="badge badge-sm bg-gradient-success">Online</span>
                      </td>
                      <td className="align-middle text-center">
                        <span className="text-secondary text-xs font-weight-bold">23/04/18</span>
                      </td>
                      <td className="align-middle">
                        <a href="javascript:;" className="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                          Edit
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex px-2 py-1">
                          <div>
                            <img src="../assets/img/team-2.jpg" className="avatar avatar-sm me-3 border-radius-lg" alt="user1"></img>
                          </div>
                          <div className="d-flex flex-column justify-content-center">
                            <h6 className="mb-0 text-sm">John Michael</h6>
                            <p className="text-xs text-secondary mb-0">john@creative-tim.com</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="text-xs font-weight-bold mb-0">Manager</p>
                        <p className="text-xs text-secondary mb-0">Organization</p>
                      </td>
                      <td className="align-middle text-center text-sm">
                        <span className="badge badge-sm bg-gradient-success">Online</span>
                      </td>
                      <td className="align-middle text-center">
                        <span className="text-secondary text-xs font-weight-bold">23/04/18</span>
                      </td>
                      <td className="align-middle">
                        <a href="javascript:;" className="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                          Edit
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class = "no-projects text-center">
                    <p>
                        You do not have any projects at the moment
                    </p>
                </div>
              </div>
            </div>
          </div>
        <div className = "text-right col-md-12">
            <a className='main-btn' href = "#">
                <i style={{marginRight: "15px"}}><AddIcon/></i>Add Project
            </a>
        </div>
        </div>
      </div>
        </div>
    </div>
  )
}
