import React, {useState, useEffect} from 'react'
import DashboardAside from '../../Components/DashboardAside/DashboardAside'
import {Link} from 'react-router-dom'
import axios from 'axios'
import proxy from '../../proxy.json'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};


export default function ManageProjects() {

    const [projects, setProjects] = useState([])
    const [open, setOpen] = React.useState(false);
    const [projectDelete, setProjectDelete] = useState ("")
    const handleModalOpen = () => setOpen(true);
    const handleModalClose = () => setOpen(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [openResponseSnackbar, setOpenResponseSnackbar] = useState(false);
    const [responseMessage, setResponseMessage] = useState({})
    const [message, setMessage] = useState("")
    const handleResponseSnackbarClose = () => {
      setOpenResponseSnackbar(false);
      };
  
      const handleResponseSnackbarOpen = () => {
          setOpenResponseSnackbar(true)
      }

    const getProjects = async () => {
        let projects = await axios.get(`${proxy.proxy}/portfolio`)
        projects = projects.data;
        console.log(projects)
        if (projects.length === 0) {
            document.getElementById("projectsTable").style.display = "none"
            document.querySelector(".no-projects").style.display = "block"
        } else {
          document.getElementById("projectsTable").style.display = "flex"
            document.querySelector(".no-projects").style.display = "none"
            setProjects(projects)
        }
    } 

    function findbtn( id ) {
      return new Promise((resolve, reject) => {
        const intervalId = setInterval(() => {
          const btn = document.getElementById(id);
          if (btn) {
            clearInterval(intervalId);
            resolve(btn);
          }
        }, 50);
      });
    }

    const handleProjectDelete = async (event) => {
      var target = event.target
      if (target.tagName !== 'TD') {
        while (target.tagName !== 'TD') {
          target = target.parentNode
        }
      }
      let tBody = document.querySelector('tbody');
      for (let i = 0; i < tBody.children.length; i++) {
        if (tBody.children[i].contains(target)) {
          target = tBody.children[i];
        }
      }
      
      const title = target.firstChild.querySelector("h6.mb-0.text-sm").innerText
      setProjectDelete(title)
      handleModalOpen()
      const deleteBtn = await findbtn("delGoAheadBtn")
      const cancelBtn = await findbtn("cancelBtn")
      
      deleteBtn.addEventListener('click', async () => {
        const slug = target.getAttribute("project-slug")
        const url = `${proxy.proxy}/portfolio/delete_project/${slug}`
        const response = await axios.delete(url)
        setProjects(response.data.data)
        handleModalClose()
        setMessage(response.data.message)
        handleResponseSnackbarOpen()
      })

      cancelBtn.addEventListener('click', async () => {
          handleModalClose()
      })

    }

    useEffect(() => {
        getProjects()
    }, [])


  return (
    <div>

            <Snackbar
            open={openResponseSnackbar}
            autoHideDuration={null}
            onClose={handleResponseSnackbarClose}
            TransitionComponent={Slide}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
            <MuiAlert
                elevation={6}
                variant="filled"
                onClose={handleResponseSnackbarClose}
                severity="info" // Can be "success", "error", "warning", or "info"
            >
                {message}
            </MuiAlert>
            </Snackbar>

            <Modal
                open={open}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <div className='text-center confirmation-text'><p>Are you sure you want to delete project with name {projectDelete}?</p></div>
                </Typography>
                <div className='btns-actions'>
                        <Button variant="outlined" color="error" id = "delGoAheadBtn" startIcon={<DeleteIcon />}>
                            Delete
                        </Button>
                        <Button variant="outlined" color="primary" id = "cancelBtn">
                            Don't Delete
                        </Button>
                    </div>
                </Box>
            </Modal>
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
              <div className="bg-gradient-primary  border-radius-lg pt-4 pb-3">
                <h6 className="text-black text-capitalize ps-3">View and Manage Your Projects here</h6>
              </div>
            </div>
            <div className="card-body px-0 pb-2">
              <div className="table-responsive p-0" style={{maxHeight:"500px"}} id = "projectsTable">
              <table className="table align-items-center mb-0" id = "projectsTable">
                  <thead>
                    <tr>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Project Name</th>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Description</th>
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Image Count</th>
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Created On</th>
                      <th className="text-secondary opacity-7"></th>
                      <th className="text-secondary opacity-7"></th>
                    </tr>
                  </thead>
                  <tbody>
                   {projects.map((Project) => {
                    return (<tr key={Math.random} project-slug = {Project.slug}>
                      <td>
                        <div className="d-flex px-2 py-1">
                          <div className="d-flex flex-column justify-content-center">
                            <h6 className="mb-0 text-sm">{Project.name}</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="text-xs font-weight-bold mb-0">{Project.brief_description}</p>
                      </td>
                      <td className="align-middle text-center text-sm">
                        <span className={Project.images.length === 0 ? "badge badge-sm bg-gradient-danger text-black" : 
                        "badge badge-sm bg-gradient-success text-black"} style={{fontSize: "15px",fontWeight: "800"}}>{Project.images.length}</span>
                      </td>
                      <td className="align-middle text-center">
                        <span className="text-secondary text-xs font-weight-bold">{Project.created_at}</span>
                      </td>
                      <td className='text-center actions-projs edit'>  
                        <Link to={`/dashboard-actions/manage-projects/edit-project/${Project.slug}`} className="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                        <Button variant="outlined" color="primary" startIcon = {<EditNoteIcon/>}>
                            Edit
                        </Button>
                        </Link>
                        </td>
                        <td className='text-center actions-projs delete'> 
                        <Button variant="outlined" color="error" startIcon = {<DeleteIcon/>}   onClick={handleProjectDelete} >
                            Delete
                        </Button>
                        </td>
                    </tr>)
                   })}
                  </tbody>
                </table>
                <div className = "no-projects text-center">
                    <p>
                        You do not have any projects at the moment
                    </p>
                </div>
              </div>
            </div>
          </div>
        <div className = "text-right col-md-12">
            <Link className='main-btn' to = "/dashboard-actions/manage-projects/create-project">
                <i style={{marginRight: "15px"}}><AddIcon/></i>Add Project
            </Link>
        </div>
        </div>
      </div>
        </div>
    </div>
  )
}
