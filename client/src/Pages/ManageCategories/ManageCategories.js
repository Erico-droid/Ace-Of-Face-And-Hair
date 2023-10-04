import React, {useState, useEffect} from 'react'
import DashboardAside from '../../Components/DashboardAside/DashboardAside'
import { Link } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Button from '@mui/material/Button';
import proxy from '../../proxy.json';
import axios from 'axios'
import './ManageCategories.css'
import AddIcon from '@mui/icons-material/Add';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


export default function ManageCategories() {

    const [services, setServices] = useState([])    
    const [serviceModalOpen, setserviceModalOpen] = React.useState(false);
    const [serviceEditModalOpen, setEditserviceModalOpen] = React.useState(false);
    const [serviceDeleteModalOpen, setDeleteserviceModalOpen] = React.useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [beingDeleted, setBeingDeleted] = useState("")
    const [edit, setEdit] = useState(false)
    const [beingEdited, setBeingEdited] = useState("")
    const handleServiceModalOpen = () => setserviceModalOpen(true);
    const handleServiceModalClose = () => setserviceModalOpen(false);
    const handleEditServiceModalOpen = () => setEditserviceModalOpen(true);
    const handleEditServiceModalClose = () => {
        setEditserviceModalOpen(false)
        setCategoryData({
            categoryName: '',
            categoryDescription: ''
          })
        setBeingEdited("")
        document.getElementById("categoryEditForm").reset()
        setEdit(false)
    };
    const handleDeleteServiceModalOpen = () => setDeleteserviceModalOpen(true);
    const handleDeleteServiceModalClose = () => {
        setDeleteserviceModalOpen(false)
        setBeingDeleted("")
    }    
    const handleSnackbarClose = () => {
        setOpenSnackbar(false)
        setCategoryData({
            categoryName: '',
            categoryDescription: ''
        })
    };
    const [categoryData, setCategoryData] = useState({
        categoryName: '',
        categoryDescription: ''
      });
    const [message, setMessage] = useState("")
    const [severity, setSeverity] = useState("")

    const getServices = async () => {
        const url = `${proxy.proxy}/services`
        const response = await axios.get(url)
        const res = response.data.data
        setServices(res)
    }

    let editting;

    const handleSnackbarOpen = () => {
        setOpenSnackbar(true)
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCategoryData((prevCategoryData) => ({
          ...prevCategoryData,
          [name]: value
        }));
    };

    const handleCreateService = () => {
        handleServiceModalOpen()
    }

    const handleEditService = async (event) => {
        setEdit(true)
        const rows = document.getElementById("rowsCategories")
        let children = rows.children;
        let edit;
        var target = event.target;
        if (target.tagName !== "TD")
        while (target.tagName !== "TD") {
            target = target.parentNode
        }
        edit = target.querySelector("button").getAttribute("unique")
        setBeingEdited(edit)
        
        const url = `${proxy.proxy}/services/edit_service/${edit}`
        const response = await axios.get(url)
        setCategoryData({
            categoryName: response.data.data.name,
            categoryDescription: response.data.data.service_description
        })
        handleEditServiceModalOpen() 
    }


    const handleSubmit = async () => { 
        let url;
        if (!edit)       
            url = `${proxy.proxy}/services/create_service/`
        else
            url = `${proxy.proxy}/services/edit_service/${beingEdited}`

        var data = categoryData
        const response = await axios.post(url, data)
        if (response.status === 200) {
            setServices(response.data.data)
            setMessage(response.data.message)
            if (!edit) {
                setSeverity("success")
                handleServiceModalClose()
            }
            else {
                setSeverity("info")
                handleEditServiceModalClose()
            }
            handleSnackbarOpen()
        } else {            
            setSeverity("error")
            setMessage("There was an unexpected error")
            handleSnackbarOpen()
            handleServiceModalClose()
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

    const handleDeleteService = async (event) => {
        var target = event.target;
        if (target.tagName !== "TD")
        while (target.tagName !== "TD") {
            target = target.parentNode
        }

        const unique_slug = target.querySelector("button").getAttribute("unique")        
        const url = `${proxy.proxy}/services/delete_service/${unique_slug}`
        for (var i = 0; i < services.length; i++) {
            if (services[i].slug === unique_slug) {
                var name = services[i].name
            }
        }

        setBeingDeleted(name)
        handleDeleteServiceModalOpen()
        const deleteBtn = await findbtn("delGoAheadBtn")
        const cancelBtn = await findbtn("cancelBtn")

        deleteBtn.addEventListener('click', async () => {
            const response = await axios.delete(url)
            if (response.status === 200) {
                handleDeleteServiceModalClose()
                setServices(response.data.data)
                if (response.data.length === 0) {
                    document.getElementById("FAQTable").style.display = "none"
                    document.querySelector(".no-faqs").style.display = "block"
                }
                setSeverity("info")
                setMessage(response.data.message)
                handleSnackbarOpen()
            } else {
                handleDeleteServiceModalClose()
                setSeverity("error")
                setMessage("There was an unexpected error.")
                handleSnackbarOpen()
            }
        })

        cancelBtn.addEventListener('click', async () => {
            handleDeleteServiceModalClose()
        })
    }

    useEffect(() => {
        getServices()
    }, [])

  return (
    <div className='row mb-3'>
        <Snackbar
            open={openSnackbar}
            autoHideDuration={null}
            onClose={handleSnackbarClose}
            TransitionComponent={Slide}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
            <MuiAlert
                elevation={6}
                variant="filled"
                onClose={handleSnackbarClose}
                severity={severity} // Can be "success", "error", "warning", or "info"
            >
                {message}
            </MuiAlert>
            </Snackbar>
        <Modal
                open={serviceModalOpen}
                onClose={handleServiceModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <div className="inner">
                <form id = "categoryForm" >
                    <div className="form-group">
                        <div className="form-wrapper">
                            <div><label htmlFor="" >Name</label><input type="text" placeholder='Category Name' className="form-control first-name" id="categoryName"value={categoryData.categoryName}
                            onChange={handleChange} name="categoryName" /></div>
                        </div>
                    </div>

                    <div className="form-wrapper">
                        <div><label htmlFor="">Description</label><textarea id="categoryDescription" name="categoryDescription" rows="4" className="form-control message" cols="35" placeholder="Category Description" value={categoryData.categoryDescription}
                        onChange={handleChange}></textarea></div></div>
                    </form>
                </div>
                <div className='btns-actions'>
                        <Button variant="outlined" color="error" id = "delGoAheadBtn" startIcon={<DeleteIcon />} onClick={handleServiceModalClose}>
                            Delete
                        </Button>
                        <Button variant="outlined" color="primary" id = "cancelBtn" onClick={handleSubmit}>
                            Create Category
                        </Button>
                    </div>
                </Box>
            </Modal>
        
            
            <Modal
                open={serviceEditModalOpen}
                onClose={handleEditServiceModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <div className="inner">
                <form id = "categoryEditForm" >
                    <div className="form-group">
                        <div className="form-wrapper">
                            <div><label htmlFor="" >Name</label><input type="text" placeholder='Category Name' className="form-control first-name" id="categoryName"value={categoryData.categoryName}
                            onChange={handleChange} name="categoryName" /></div>
                        </div>
                    </div>

                    <div className="form-wrapper">
                        <div><label htmlFor="">Description</label><textarea id="categoryDescription" name="categoryDescription" rows="4" className="form-control message" cols="35" placeholder="Category Description" value={categoryData.categoryDescription}
                        onChange={handleChange}></textarea></div></div>
                    </form>
                </div>
                <div className='btns-actions'>
                        <Button variant="outlined" color="error" id = "delGoAheadBtn" startIcon={<DeleteIcon />} onClick={handleEditServiceModalClose}>
                            Cancel
                        </Button>
                        <Button variant="outlined" color="primary" id = "cancelBtn" onClick={handleSubmit}>
                            Edit Category
                        </Button>
                    </div>
                </Box>
            </Modal>

            <Modal
                open={serviceDeleteModalOpen}
                onClose={handleDeleteServiceModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Are you sure you want to delete category with name "{beingDeleted}" ?
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

        <div className='col-md-2'>
            <DashboardAside/>
        </div>
        <div className='col-md-10'>
            <div className='container-fluid'>
            <div className='navigation-bar row'>
            <div className='col-md-8'>
                <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" data-scroll="true">
                <div className="container-fluid py-1 px-3">
                    <div className='row'>
                    <nav aria-label="breadcrumb">
                    <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                        <li className="breadcrumb-item text-sm"><Link className="opacity-5 text-dark" to="/">Ace Of Face and Hair</Link></li>
                        <li className="breadcrumb-item text-sm text-dark active" aria-current="page">Manage Categories</li>
                    </ol>
                    <h6 className="font-weight-bolder mb-0">Manage Categories</h6>
                    </nav>
                    </div>
                    </div>
                </nav>
                </div>
                <div className="col-md-4">
                    <div className='new-service-btn'>
                        <Button variant="outlined" color="primary" startIcon = {<AddIcon/>} onClick={handleCreateService}>
                            Create New Category
                        </Button>
                    </div>
                    </div>
                </div>
                <div className=''>
                    <div className='card' id='servicesTable'>
                        {services.length > 0 ?
                    <table className="table align-items-center mb-0" id = "">
                        <thead>
                            <tr>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Category Name</th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Category Description</th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Services Count</th>
                            <th className="text-secondary opacity-7"></th>
                            <th className="text-secondary opacity-7"></th>
                            <th className="text-secondary opacity-7"></th>
                            </tr>
                        </thead>
                                        <tbody id = "rowsCategories">
                                            {services.map((Service) => {
                                                return (
                                                <tr key={Service.slug}>
                                                    <td>
                                                        <div className="d-flex px-2 py-1">
                                                        <div className="d-flex flex-column justify-content-center">
                                                            <h6 className="mb-0 text-sm">{Service.name}</h6>
                                                        </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <p className="text-xs font-weight-bold mb-0">{Service.service_description}</p>
                                                    </td>
                                                    <td className="align-middle text-center text-sm">
                                                        {Service.sub_services.length}
                                                        {/* <span className={Project.images.length === 0 ? "badge badge-sm bg-gradient-danger text-black" : 
                                                        "badge badge-sm bg-gradient-success text-black"} style={{fontSize: "15px",fontWeight: "800"}}>{Project.images.length}</span> */}
                                                    </td>
                                                    <td className='text-center actions-projs edit'>  
                                                        <Button variant="outlined" color="primary" unique = {Service.slug} startIcon = {<EditNoteIcon/>}  onClick={handleEditService}>
                                                            Edit
                                                        </Button>
                                                        </td>
                                                        <td className='text-center actions-projs delete'> 
                                                        <Button variant="outlined" color="error"  unique = {Service.slug} startIcon = {<DeleteIcon/>} onClick={handleDeleteService}>
                                                            Delete
                                                        </Button>
                                                        </td>
                                                    </tr>
                                                )})}
                                        </tbody>
                                        </table> :
                                    <div className = "no-projects text-center">
                                        <p>
                                            You do not have any sub services at the moment
                                        </p>
                                    </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
  )
}
