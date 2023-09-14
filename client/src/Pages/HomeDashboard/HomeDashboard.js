import React, {useEffect, useState} from 'react'
import './HomeDashboard.css'
import DashboardAside from '../../Components/DashboardAside/DashboardAside'
import axios from 'axios'
import proxy from '../../proxy.json'
import {Link} from 'react-router-dom'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import GradeIcon from '@mui/icons-material/Grade';
import MessageIcon from '@mui/icons-material/Message';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Chart } from 'react-chartjs-2';
import 'chart.js/auto';
import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js';
import CheckIcon from '@mui/icons-material/Check';

ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title);


export default function
() {

    const [projects, setProjects] = useState([])
    const [data, setData] = useState({
      datasets: []
    })
    
    const [todaysVisits, setTodaysVisits] = useState(0)
    const [thisWeeksVisits, setThisWeeksVisits] = useState(0)
    const [thisMonthsVisits, setThisMonthsVisits] = useState(0)
    const [lastYearsVisitsDiff, setLastYearsVisitsDiff] = useState(0)
    const [yesterVisitsDiff, setYesterVisitsDiff] = useState(0)
    const [lastWeeksVisitsDiff, setLastWeeksVisitsDiff] = useState(0)
    const [lastMonthsVisitsDiff, setLastMonthsVisitsDiff] = useState(0)
    const [thisYearsVisits, setThisYearsVisits] = useState(0)

    const getAnalysis = async () => {
      const url = `${proxy.proxy}/dashboard/provide_analysis/`
      const response = await axios.get(url)
      var data = response.data   
      var todays_visits = data["todays_visits"]
      var thismonths_visits = data["thismonths_visits"]
      var thisyears_visits = data["thisyears_visits"] 
      var lastyears_visits = data["thisyears_visits"]
      var last_months_visits = data["last_months_visits"]
      var yesterday_visits = data["yesterday_visits"]
      var thisweeks_visits = data["thisweeks_visits"]
      var lastweek_visits = data["lastweek_visits"]
      setThisMonthsVisits(thismonths_visits)
      setThisWeeksVisits(thisweeks_visits)
      setThisYearsVisits(thisyears_visits)
      setTodaysVisits(todays_visits)
      setYesterVisitsDiff((todays_visits/(todays_visits+yesterday_visits)) * 100)
      setLastMonthsVisitsDiff((thismonths_visits/(thismonths_visits+last_months_visits)) * 100)
      setLastWeeksVisitsDiff((thisweeks_visits/(thisweeks_visits + lastweek_visits)) * 100)
      setLastYearsVisitsDiff((thisyears_visits/(thisyears_visits + lastyears_visits)) * 100)
    }

    const ChartExample = () => {
      const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: 'Example Bar Chart',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
            ],
          },
        ],
      };
      
      setData(data)
      }

      const options = {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };

    const getProjects = async () => {
        const headers = {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'localhost:3000'
        }
        let projects = await axios.get(`${proxy.proxy}/portfolio`)
        projects = projects.data;
        if (projects.length === 0) {
            const prTable = document.getElementById("projectsTable")
            prTable.style.display = "none"
            document.querySelector(".project-detail-text").style.display = "none"
            const noProjects = document.querySelector(".no-projects");
            noProjects.style.display = "block"
        } else {
            setProjects(projects)
        }
    }

    useEffect(() => {
        getProjects()
        getAnalysis()
        
    }, [])

  return (
<div className='db-bg'>
    <div className='row'>
        <div className='col-md-2'>
            <DashboardAside />
        </div>
        <div className='col-md-10'>
  <main className="main-content home-ds position-relative h-100 border-radius-lg ">
    <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" data-scroll="true">
      <div className="container-fluid py-1 px-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
            <li className="breadcrumb-item text-sm"><Link className="opacity-5 text-dark" href="/">Ace Of Face and Hair</Link></li>
            <li className="breadcrumb-item text-sm text-dark active" aria-current="page">Dashboard</li>
          </ol>
          <h6 className="font-weight-bolder mb-0">Dashboard</h6>
        </nav>
      </div>
    </nav>
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div className="card">
            <div className="card-header p-3 pt-2">
              <div className="icon icon-lg icon-shape bg-gradient-dark shadow-dark text-center border-radius-xl mt-n4 position-absolute">
                <i className="material-icons opacity-10"><GradeIcon/></i>
              </div>
              <div className="text-end pt-1">
                <p className="text-sm mb-0 text-capitalize">Today's Visitors</p>
                <h4 className="mb-0">{todaysVisits}</h4>
              </div>
            </div>
            <hr className="dark horizontal my-0"></hr>
            <div className="card-footer p-3">
              <p className="mb-0">
                <span className={ yesterVisitsDiff > 0 ? "text-success text-sm font-weight-bolder": "text-danger text-sm font-weight-bolder"}>
                  {yesterVisitsDiff > 0 ? "+ ".concat(yesterVisitsDiff.toString()): "- ".concat(yesterVisitsDiff.toString())}% 
                  </span> than yesterday</p>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6">
          <div className="card">
            <div className="card-header p-3 pt-2">
              <div className="icon icon-lg icon-shape bg-gradient-info shadow-info text-center border-radius-xl mt-n4 position-absolute">
                <i className="material-icons opacity-10"><CalendarMonthIcon/></i>
              </div>
              <div className="text-end pt-1">
                <p className="text-sm mb-0 text-capitalize">This Weeks Visitors</p>
                <h4 className="mb-0">{thisWeeksVisits}</h4>
              </div>
            </div>
            <hr className="dark horizontal my-0"></hr>
            <div className="card-footer p-3">
              <p className="mb-0">
                  <span className={ lastWeeksVisitsDiff > 0 ? "text-success text-sm font-weight-bolder": "text-danger text-sm font-weight-bolder"}>
                  {lastWeeksVisitsDiff > 0 ? "+ ".concat(lastWeeksVisitsDiff.toString()): "- ".concat(lastWeeksVisitsDiff.toString())}% 
                  </span> than last week</p>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div className="card">
            <div className="card-header p-3 pt-2">
              <div className="icon icon-lg icon-shape bg-gradient-primary  text-center border-radius-xl mt-n4 position-absolute  text-black">
                <i className="material-icons opacity-10" style={{color: "black"}}><PeopleAltIcon/></i>
              </div>
              <div className="text-end pt-1">
                <p className="text-sm mb-0 text-capitalize">This months visitors</p>
                <h4 className="mb-0">{thisMonthsVisits}</h4>
              </div>
            </div>
            <hr className="dark horizontal my-0"></hr>
            <div className="card-footer p-3">
            <p className="mb-0">
              <span className={ lastMonthsVisitsDiff > 0 ? "text-success text-sm font-weight-bolder": "text-danger text-sm font-weight-bolder"}>
              {lastMonthsVisitsDiff > 0 ? "+ ".concat(lastMonthsVisitsDiff.toString()): "- ".concat(lastMonthsVisitsDiff.toString())}% 
              </span> than last month</p>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div className="card">
            <div className="card-header p-3 pt-2">
              <div className="icon icon-lg icon-shape bg-gradient-success shadow-success text-center border-radius-xl mt-n4 position-absolute">
                <i className="material-icons opacity-10"><MessageIcon/></i>
              </div>
              <div className="text-end pt-1">
                <p className="text-sm mb-0 text-capitalize">This years visitors</p>
                <h4 className="mb-0">{thisYearsVisits}</h4>
              </div>
            </div>
            <hr className="dark horizontal my-0"></hr>
            <div className="card-footer p-3">
            <p className="mb-0">
              <span className={ lastYearsVisitsDiff > 0 ? "text-success text-sm font-weight-bolder": "text-danger text-sm font-weight-bolder"}>
              {lastYearsVisitsDiff > 0 ? "+ ".concat(lastYearsVisitsDiff.toString()): "- ".concat(lastYearsVisitsDiff.toString())}% 
              </span> than last year</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-lg-4 col-md-6 mt-4 mb-4">
          <div className="card z-index-2 ">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
              <div className="bg-gradient-primary  border-radius-lg py-3 pe-1">
                <div className="chart">
                  <canvas id="chart-bars" className="chart-canvas" height="170"></canvas>
                </div>
              </div>
            </div>
            <div className="card-body">
              <h6 className="mb-0 ">Website Views</h6>
              <p className="text-sm ">Last Campaign Performance</p>
              <hr className="dark horizontal"></hr>
              <div className="d-flex ">
                <i className="material-icons text-sm my-auto me-1">schedule</i>
                <p className="mb-0 text-sm"> campaign sent 2 days ago </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 mt-4 mb-4">
          <div className="card z-index-2  ">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
              <div className="bg-gradient-success shadow-success border-radius-lg py-3 pe-1">
                <div className="chart">
                {data && <Chart data={data} options={options} />}
                </div>
              </div>
            </div>
            <div className="card-body">
              <h6 className="mb-0 "> Daily Sales </h6>
              <p className="text-sm "> (<span className="font-weight-bolder">+15%</span>) increase in today sales. </p>
              <hr className="dark horizontal"></hr>
              <div className="d-flex ">
                <i className="material-icons text-sm my-auto me-1">schedule</i>
                <p className="mb-0 text-sm"> updated 4 min ago </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 mt-4 mb-3">
          <div className="card z-index-2 ">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
              <div className="bg-gradient-dark shadow-dark border-radius-lg py-3 pe-1">
                <div className="chart">
                  <canvas id="chart-line-tasks" className="chart-canvas" height="170"></canvas>
                </div>
              </div>
            </div>
            <div className="card-body">
              <h6 className="mb-0 ">Completed Tasks</h6>
              <p className="text-sm ">Last Campaign Performance</p>
              <hr className="dark horizontal"></hr>
              <div className="d-flex ">
                <i className="material-icons text-sm my-auto me-1">schedule</i>
                <p className="mb-0 text-sm">just updated</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-lg-8 col-md-6 mb-md-0 mb-4">
          <div className="card">
            <div className="card-header pb-0">
              <div className="row">
                <div className="col-lg-12 col-7">
                    <div className='project-detail-text'>
                  <h6>Projects</h6>
                  <p className="text-sm mb-0 pl-0">
                    <i><CheckIcon/></i>
                    <span className="font-weight-bold ms-1">{projects.length} projects</span> are being displayed
                  </p>
                  </div>
                  <div className='no-projects text-center' style={{display: "none"}}>
                    <p>There aren't any projects to show at the moment.</p>
                    <Link to = "/dashboard-actions/manage-projects/create-project" className='unique-link'>Add project</Link>
                  </div>
                </div>
                <div className="col-lg-6 col-5 my-auto text-end">
                  <div className="dropdown float-lg-end pe-4">
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body px-0 pb-2">
              <div className="table-responsive">
                <table className="table align-items-center mb-0" id = "projectsTable">
                  <thead>
                    <tr>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name</th>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Images</th>
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Description</th>
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Views</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((project) => {
                          return (<tr key={Math.random}>
                          <td>
                            <div className="d-flex px-2 py-1">
                              <div className="d-flex flex-column justify-content-center">
                                <h6 className="mb-0 text-sm">{project.name}</h6>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="avatar-group mt-2">
                              {project.images.map((Image) => {
                              return (
                              <a href="#" className="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Ryan Tompson">
                                <img src={proxy.proxy + Image} className='avatar-img'></img>
                              </a>) 
                              })}
                            </div>
                          </td>
                          <td className="align-middle text-center text-sm">
                            <span className="text-xs font-weight-bold">{project.brief_description}</span>
                          </td>
                          <td className="align-middle">
                            <div className={"w-60 progress-wrapper mx-auto"}>
                              <div className="progress-info">
                                <div className="progress-percentage">
                                  <span className="text-xs font-weight-bold">{project.view_count}</span>
                                </div>
                              </div>
                              <div className="progress">
                                <div className={"w-".concat((project.view_count).toString()) + " progress-bar bg-gradient-info"} role="progressbar" aria-valuenow={(project.view_count*5).toString()} aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                            </div>
                          </td>
                        </tr>)
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="card h-100">
            <div className="card-header pb-0">
              <h6>Orders overview</h6>
              <p className="text-sm">
                <i className="fa fa-arrow-up text-success" aria-hidden="true"></i>
                <span className="font-weight-bold">24%</span> this month
              </p>
            </div>
            <div className="card-body p-3">
              <div className="timeline timeline-one-side">
                <div className="timeline-block mb-3">
                  <span className="timeline-step">
                    <i className="material-icons text-success text-gradient">notifications</i>
                  </span>
                  <div className="timeline-content">
                    <h6 className="text-dark text-sm font-weight-bold mb-0">$2400, Design changes</h6>
                    <p className="text-secondary font-weight-bold text-xs mt-1 mb-0">22 DEC 7:20 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  </div>
  </div>
  </div>
  )
}
