import React, {useState, useEffect, useRef} from 'react'
import DashboardAside from '../../Components/DashboardAside/DashboardAside'
import { Link } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Button from '@mui/material/Button';
import proxy from '../../proxy.json';
import axios from 'axios'
import './ManageServices.css'
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
    border: '0px solid #000',
    boxShadow: 24,
    p: 4,
    maxHeight: "90vh",
    overflowY: "auto",
    borderRadius: "10px",
    overflowX: "hidden"
  };


export default function ManageServices() {

    const editNameInputRef = useRef(null)
    const newNameInputRef = useRef(null)
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [formData, setFormData] = useState({serviceName: '', serviceDescription: '', serviceImage: null, serviceCategories: []});
    const [services, setServices] = useState([])
    const [subEditModalOpen, setEditSubModalOpen] = React.useState(false);
    const [subDeleteModalOpen, setDeleteSubModalOpen] = React.useState(false);
    const [subAddModalOpen, setAddSubModalOpen] = React.useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [allCategories, setAllCategories] = useState([]);
    const [message, setMessage] = useState("")
    const [severity, setSeverity] = useState("")
    const [edit, setEdit] = useState("")
    const [selectedEditImage, setSelectedEditImage] = useState(null)
    const [previousSelection, setPreviousSelection] = useState([]);
    const [currentSelection, setCurrentSelection] = useState([]);
    const [beingEdited, setBeingEdited] = useState("")
    const [beingDeleted, setBeingDeleted] = useState("")

    const handleEditSubModalOpen = () => setEditSubModalOpen(true);
    const handleEditSubModalClose = () => {
        setEditSubModalOpen(false)
        setSelectedEditImage(null)
        setSelectedImage(null)
        setFormData({serviceName: '', serviceDescription: '', serviceImage: null, serviceCategories: []})
        setEdit(false)
        setBeingEdited("")
    };
    const handleDeleteSubModalOpen = () => setDeleteSubModalOpen(true);
    const handleDeleteSubModalClose = () => {
        setDeleteSubModalOpen(false)
        setBeingDeleted("")
    };
    const handleAddSubModalOpen = () => setAddSubModalOpen(true);
    const handleAddSubModalClose = () => setAddSubModalOpen(false);
    const handleSnackbarClose = () => {setOpenSnackbar(false);};

    const getServices = async () => {
        const url = `${proxy.proxy}/services/get_sub_services`
        const response = await axios.get(url)
        const res = response.data.data
        setServices(res)
    }


    const handleEditSub = async (event) => {
        setEdit(true)
        const target = event.target;
        var number;
        const children = document.getElementById("rowServices").children
        for (let i = 0; i < children.length; i++) {
            if (children[i].contains(target)) {
                number = i
                break;
            }
        }
        const unique = services[number].slug
        const response = await axios.get(`${proxy.proxy}/services/edit_sub_service/${unique}/`)
        const data = response.data.data;
        setBeingEdited(response.data.data.slug)
        let servicesArr = [];
        let originalSelection = [];
        for (let i = 0; i < data.services.length; i++){
            var serviceSlug = JSON.parse(data.services[i])
            servicesArr = [...servicesArr, serviceSlug]
            originalSelection = [...originalSelection, serviceSlug[0].fields.slug]
        }
        setPreviousSelection(originalSelection)
        let sCategories;
        if (servicesArr !== undefined)
            sCategories = servicesArr
        else
            sCategories = []

        setFormData(prevFormData => ({
        ...prevFormData,
        serviceName: data.name,
        serviceImage: data.image,
        serviceDescription: data.sub_service_description,
        serviceCategories: [
            ...prevFormData.serviceCategories, ...sCategories.map(category => category[0].fields.slug)
        ]
        }));

        let image = data.image;
        image = proxy.proxy + image
        setSelectedEditImage(image)

        handleEditSubModalOpen()
    }

    const getAllCategories = async () => {
        const url = `${proxy.proxy}/services`
        const response = await axios.get(url)
        setAllCategories(response.data.data)
    }

    const handleDeleteSub = async (event) => {
        const target = event.target;
        var number;
        const children = document.getElementById("rowServices").children
        for (let i = 0; i < children.length; i++) {
            if (children[i].contains(target)) {
                number = i
                break;
            }
        }
        const unique_slug = services[number].slug
        const name = services[number].name        
        const url = `${proxy.proxy}/services/delete_sub_service/${unique_slug}/`
        setBeingDeleted(name)
        handleDeleteSubModalOpen()
        const deleteBtn = await findbtn("delGoAheadBtn")
        const cancelBtn = await findbtn("cancelBtn")

        deleteBtn.addEventListener('click', async () => {
            const response = await axios.delete(url)
            if (response.status === 200) {
                handleDeleteSubModalClose()
                setServices(response.data.data)
                if (response.data.length === 0) {
                    document.getElementById("FAQTable").style.display = "none"
                    document.querySelector(".no-faqs").style.display = "block"
                }
                setSeverity("info")
                setMessage(response.data.message)
                handleSnackbarOpen()
            } else {
                handleDeleteSubModalClose()
                setSeverity("error")
                setMessage("There was an unexpected error.")
                handleSnackbarOpen()
            }
        })

        cancelBtn.addEventListener('click', async () => {
            handleDeleteSubModalClose()
        })
    }

    const handleAddSub = () => {
        handleAddSubModalOpen()
    }

    const handleImageChange = (event) => {
        const imageFile = event.target.files[0];
        setSelectedEditImage(null)
        if (imageFile && imageFile.type.startsWith('image/')) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            serviceImage: imageFile,
          }));
          setSelectedImage(imageFile);
        } else {
          setFormData((prevFormData) => ({
            ...prevFormData,
            serviceImage: null,
          }));
          setSelectedImage(null);
          alert('Please select a valid image file.');
        }

      };

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

      const handleFieldChange = (event) => {
        const { name, value, files, type } = event.target;

        if (type === 'select-multiple') {
          // For multi-select input
          const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
          setCurrentSelection(selectedOptions);
          setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: selectedOptions,
          }));
        } else {
          setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: files ? files[0] : value,
          }));
        }
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
        var url;
        if (!edit)
            url = `${proxy.proxy}/services/create_sub_service/`
        else
            url = `${proxy.proxy}/services/edit_sub_service/${beingEdited}/`
        const form = new FormData();
        form.append('name', formData.serviceName);
        form.append('sub_service_description', formData.serviceDescription);
        form.append('image', formData.serviceImage);
        form.append('services', JSON.stringify(formData.serviceCategories));

        if (edit) {
            var unselectedOptions = []
            if (currentSelection.length > 0)
                unselectedOptions = previousSelection.filter(option => !currentSelection.includes(option))
            form.append('removed_services', JSON.stringify(unselectedOptions));
        }

        try {
          const response = await axios.post(url, form);
          
          
          if (response.status === 200) {
            
            // Success handling
            setMessage(response.data.message)
            if (edit === true) {
                setSeverity("info")
                document.getElementById("editServiceForm").reset()
            }
            else {
                setSeverity("success")
                document.getElementById("createServiceForm").reset()
            }
            handleSnackbarOpen()
            setFormData({
                serviceName: "",
                serviceDescription: "",
                serviceImage: null,
                serviceCategories: []
            })
            setSelectedImage(null)
            handleEditSubModalClose()
            setServices(response.data.data)
          } else {
            // Error handling
            setMessage("There was an unexpected error.")
            setSeverity("error")
            handleSnackbarOpen()
            document.getElementById("editServiceForm").reset()
            setFormData({
                serviceName: "",
                serviceDescription: "",
                serviceImage: null,
                serviceCategories: []
            })
            setSelectedImage(null)
          }
        } catch (error) {
            setMessage("There was an unexpected error.")
            setSeverity("success")
            handleSnackbarOpen()
        }
      };

      const handleSnackbarOpen = () => {
        setOpenSnackbar(true)
    }

    useEffect(() => {
        getServices();
        getAllCategories()
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
                open={subEditModalOpen}
                onClose={handleEditSubModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <div className="inner">
                    <h6 className='service-create-h6'>Edit {formData.serviceName}</h6>
                                <form id = "editServiceForm" >
                                    <div className="form-group">
                                        <div className="form-wrapper">
                                          <div><label htmlFor="" >Name</label><input type="text" placeholder='Service Name' name='serviceName' className="form-control first-name" id="serviceName" value={formData.serviceName}
                                            onChange={handleFieldChange} ref={editNameInputRef}/></div>
                                        </div>
                                    </div>

                                    <div className="form-wrapper">
                                      <div><label htmlFor="">Description</label><textarea id="serviceDescription" value={formData.serviceDescription}
                                        onChange={handleFieldChange} name="serviceDescription" rows="4" className="form-control message" cols="35" placeholder="Service Description"></textarea></div></div>

                                      <div className="form-wrapper" id="categories" name="categories">
                                      <label htmlFor="">Categories</label>
                                      <select multiple={true} className="form-control" name='serviceCategories'  id="serviceCategories" onChange={handleFieldChange}
                                            value={formData.serviceCategories}>
                                            {allCategories.map((Category) => {
                                            return( <option key = {Category.slug} value={Category.slug}>{Category.name}</option> )
                                            })}
                                        </select>
                                    </div>

                                    <div className="form-wrapper button-img">

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        name = "serviceImage"
                                        id="serviceImage"
                                    />
                                    {edit && !selectedImage ?
                                        <div>
                                        <p>Selected Image:</p>
                                        <img
                                            src={selectedEditImage}
                                            alt="Selected"
                                            style={{ maxWidth: '100%', height: 'auto',
                                            borderRadius: "10px" }}
                                        />
                                        </div>
                                        :
                                        selectedImage && (
                                            <div>
                                            <p>Selected Image:</p>
                                            <img
                                                src={URL.createObjectURL(selectedImage)}
                                                alt="Selected"
                                                style={{ maxWidth: '100%', height: 'auto',
                                                borderRadius: "10px" }}
                                            />
                                            </div>
                                        )}
                                    </div>

                                    </form>
                            </div>

                <div className='btns-actions'>
                        <Button variant="outlined" color="error" id = "delGoAheadBtn" startIcon={<DeleteIcon />} onClick={handleEditSubModalClose}>
                            Cancel
                        </Button>
                        <Button variant="outlined" color="primary" id = "cancelBtn" onClick={handleSubmit}>
                            Edit
                        </Button>
                    </div>
                </Box>
            </Modal>

            <Modal
                open={subDeleteModalOpen}
                onClose={handleDeleteSubModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Are you sure you want to delete service with name "{beingDeleted}" ?
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


            <Modal
                open={subAddModalOpen}
                onClose={handleAddSubModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <div className="inner">
                    <h6 className='service-create-h6'>create a service</h6>
                    <form id = "createServiceForm" >
                        <div className="form-group">
                            <div className="form-wrapper">
                                <div><label htmlFor="" >Name</label><input name = "serviceName" type="text" placeholder='Service Name' value={formData.serviceName}
                                onChange={handleFieldChange} className="form-control first-name" id="serviceName" ref={newNameInputRef}/></div>
                            </div>
                        </div>

                        <div className="form-wrapper">
                            <div><label htmlFor="">Description</label><textarea id="serviceDescription" name="serviceDescription" rows="4" className="form-control message" cols="35" placeholder="Service Description" value={formData.serviceDescription}
                                onChange={handleFieldChange}></textarea></div></div>
                        <div className="form-wrapper" id="categories" >
                                    <label htmlFor="">Categories</label>
                                    <select multiple={true} className="form-control" name="serviceCategories" id="serviceCategories" onChange={handleFieldChange}
                                    value={formData.serviceCategories}>
                                    {allCategories.map((Category) => {
                                    return( <option key = {Category.slug} value={Category.slug}>{Category.name}</option> )
                                    })}
                                    </select>
                        </div>
                        <div className="form-wrapper button-img">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            name = "serviceImage"
                            id="serviceImage"
                        />
                        {selectedImage && (
                            <div>
                            <p>Selected Image:</p>
                            <img
                                src={URL.createObjectURL(selectedImage)}
                                alt="Selected"
                                style={{ maxWidth: '100%', height: 'auto',
                                borderRadius: "10px" }}
                            />
                            </div>
                        )}
                        </div>

                        </form>
                </div>
                <div className='btns-actions'>
                        <Button variant="outlined" color="error" id = "delGoAheadBtn" startIcon={<DeleteIcon />} onClick={handleAddSubModalClose}>
                            Cancel
                        </Button>
                        <Button variant="outlined" color="primary" id = "cancelBtn" startIcon={<AddIcon />} onClick={handleSubmit}>
                            Create
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
                        <li className="breadcrumb-item text-sm text-dark active" aria-current="page">Manage Services</li>
                    </ol>
                    <h6 className="font-weight-bolder mb-0">Manage Services</h6>
                    </nav>
                    </div>
                    </div>
                </nav>
                </div>
                <div className="col-md-4">
                    <div className='new-service-btn'>
                        <Button variant="outlined" color="primary" startIcon = {<AddIcon/>} onClick={handleAddSub}>
                            Create New Service
                        </Button>
                    </div>
                    </div>
                </div>
                <div className='row mt-3' id = "rowServices">
                        {services.map((Service) => {
                    return (
                        <div className="col-md-3 mt-2" key = {Service.slug}>
                            <div className="card-here" style={{width: "18rem"}}>
                        <img src={`${proxy.proxy}/${Service.image}`} className="card-img-top" alt="..." />
                        <div className="card-body card-body-here">
                            <h5 className="card-title h5-here">{Service.name}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">
                                    {Service.services.map((Category) => {
                                        return (
                                            Category.name
                                        )
                                    })}
                                </h6>
                            <p className="card-text p-here">{Service.sub_service_description}</p>
                            <div className='buttns-cont'>
                                <div className='row'>
                                    <div className='col-md-6'>
                                    <Button variant="outlined"  unique={Service.slug} color="primary" startIcon = {<EditNoteIcon/>} onClick = {handleEditSub}>
                                        Edit
                                    </Button>
                                    </div>
                                    <div className='col-md-6'>
                                    <Button variant="outlined"  unique={Service.slug} color="error" startIcon = {<DeleteIcon/>} onClick = {handleDeleteSub}>
                                        Delete
                                    </Button>
                                    </div>
                                </div>
                                </div>
                        </div>
                        </div>
                        </div>
                        )})}
                        </div>
                    </div>
                </div>
            </div>
  )
}
