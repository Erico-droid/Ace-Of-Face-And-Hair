import React, {useEffect, useState} from 'react'
import DashboardAside from '../../Components/DashboardAside/DashboardAside'
import { Link } from 'react-router-dom'
import axios from 'axios'
import proxy from '../../proxy.json'
import AddIcon from '@mui/icons-material/Add';
import './manageFAQ.css'

export default function ManageFAQ() {
    
    const [faqs, setFaqs] = useState([])

    const getFaqs = async () => {
        let response = await axios.get(`${proxy.proxy}/general_setting/frequently_asked_questions/`)
        response = response.data
        if (response.length === 0) {
            document.getElementById("FAQTable").style.display = "none"
        }
    }
    

// const handleCreateFAQ = async () => {
//     const tableRow = document.createElement('<tr>')
// }

// create for me a tableData and inside it add a question input
// create for me another td inside it enter answer input
// create for me another td inside it enter a save button

// append them to the table called FAQTable after appending the td's to the tableRow
    const handleCreateFAQ = async () => {
        const tableRow = document.createElement('tr')
        const tableData = document.createElement('td')
        const tableData2 = document.createElement('td')
        const tableData3 = document.createElement('td')
        const questionInput = document.createElement("textArea")
        questionInput.setAttribute("name", "questionInput")
        questionInput.setAttribute("type", "text")
        const answerInput = document.createElement("textArea")
        answerInput.setAttribute("name", "answerInput")
        answerInput.setAttribute("type", "text")
        answerInput.classList.add("answer-input")
        questionInput.classList.add("question-input")
        const saveFaq = document.createElement("button")
        saveFaq.innerText = "Save this FAQ"
        saveFaq.classList.add("btn")
        saveFaq.classList.add("btn-primary")
        tableRow.appendChild(tableData)
        tableRow.appendChild(tableData2)
        tableRow.appendChild(tableData3)
        tableData.appendChild(questionInput)
        tableData2.appendChild(answerInput)
        tableData3.appendChild(saveFaq)
        tableData3.classList.add("text-center")
        const table = document.getElementById("FAQTable");
        table.appendChild(tableRow)
        tableData.classList.add('text-center')
        tableData.style.padding = "20px 0px"
        tableData2.classList.add('text-center')
        tableData2.style.padding = "20px 0px"
        tableData3.classList.add('text-center')
        tableData3.style.padding = "20px 0px"
    }

    useEffect(() => {
        getFaqs()
        handleCreateFAQ()
    }, [])

    return (
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
                <li className="breadcrumb-item text-sm text-dark active" aria-current="page">Manage FAQ's</li>
            </ol>
            <h6 className="font-weight-bolder mb-0">Manage FAQ's</h6>
            </nav>
        </div>
        </nav>
            <div className="col-12 container-fluid" style={{paddingTop: "15px"}}>
            <div className="card my-4">
                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                    <h6 className="text-black text-capitalize ps-3">View and Manage Your FAQ's here</h6>
                </div>
                </div>
                <div className="card-body px-0 pb-2">
                <div className="table-responsive p-0">
                <table className="table align-items-center mb-0" id = "FAQTable">
                    <thead>
                        <tr>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Question</th>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Answer</th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Delete</th>
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
                    <div class = "no-FAQ's text-center">
                        <p>
                            You do not have any FAQ's at the moment
                        </p>
                    </div>
                </div>
                </div>
            </div>
            <div className = "text-right col-md-12">
                <Link className='main-btn' to = "/dashboard-actions/manage-FAQ's/create-project">
                    <i style={{marginRight: "15px"}}><AddIcon/></i>Add FAQ
                </Link>
            </div>
            </div>
        </div>
            </div>
    )
}
