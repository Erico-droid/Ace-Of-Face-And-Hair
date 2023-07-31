import React, {useState, useEffect} from 'react'
import DashboardAside from '../../Components/DashboardAside/DashboardAside'
import { Link } from 'react-router-dom'
import axios from 'axios'
import source from '../../proxy.json'
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import LinearProgress from '@mui/joy/LinearProgress';
import BackHandIcon from '@mui/icons-material/BackHand';
import {useParams} from 'react-router-dom';
import './EditProject.css';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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

export default function EditProject() {
    const params = useParams();
    const [formData, setFormData] = useState({
        projectName: '',
        projectDescription: '',
        images: []
        });
    const [slug, setSlug] = useState("")
    const [newImages, setNewImages] = useState([])
    const [open, setOpen] = React.useState(false);
    const [imageDelete, setImageDelete] = useState ("")
    const handleModalOpen = () => setOpen(true);
    const handleModalClose = () => setOpen(false);
    const [update, setUpdate] = useState(false)
    const [deletedImages, setDeletedImages] = useState([])

    const handleGetData = async (slug = params["slug"]) => {
        setSlug(slug)
        const inptProjectName = document.getElementById("projectName")
        const inptProjectDescription = document.getElementById("ProjectDescription")
        const url = `${source.proxy}/portfolio/edit_project/${slug}/`;
        const response = await axios.get(url)
        if (response) {
            var data = response.data;
            setFormData({ ...formData, images: data["images"], projectDescription: data["brief_description"], projectName: data["name"]  });
            inptProjectName.value =  formData.projectName
            inptProjectDescription.value = formData.projectDescription
            if (data["images"].length > 0) {
                document.getElementById("existingImages").style.display = "block"
            } else {
                document.getElementById("existingImages").style.display = "none"
            }
        }
    }

    const [uploadProgress, setUploadProgress] = useState(0)
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [openResponseSnackbar, setOpenResponseSnackbar] = useState(false);
    const [responseMessage, setResponseMessage] = useState({})

    const handleResponseSnackbarClose = () => {
    setOpenResponseSnackbar(false);
    };

    const resetForm = () => {
        const name = document.querySelector("input#projectName");
        const desc = document.querySelector("textarea#ProjectDescription");
        const images = document.querySelector("input.file-input")
        const form = document.getElementById("projectForm")
        name.value = " "
    }

    const handleSnackbarClose = () => {
    setOpenSnackbar(false);
    };

    const handleSnackbarOpen = () => {
        setOpenSnackbar(true)
    }

    const handleResponseSnackbarOpen = () => {
        setOpenResponseSnackbar(true)
    }

      const handleChange = (event) => {
        if (event.target.name === 'images') {
          setNewImages(event.target.files)
          const textInfo = document.querySelector("span.file-upload-info");
          document.querySelector("div.file-list").style.display = "block"
          textInfo.innerText = `Here are the files you have selected for this project.`
        } else {
          setFormData({ ...formData, [event.target.name]: event.target.value });
        }
        setUpdate(true)
      };
      
      const handleNewSlug = (new_slug) => {
        const path = window.location.pathname       
        let newPath = path.slice(0, path.lastIndexOf('/') + 1)
        newPath += new_slug
        window.location.pathname = newPath
      }

      const handleSubmit = (event) => {
        event.preventDefault();
        const url = `${source.proxy}/portfolio/edit_project/${slug}/`
        const formPayload = new FormData();
        formPayload.append('name', formData.projectName);
        formPayload.append('brief_description', formData.projectDescription);
        for (let i = 0; i < formData.images.length; i++) {
          formPayload.append('images', formData.images[i]);
        }

        for (var i = 0; i < newImages.length; i++) {
            formPayload.append('images', newImages[i]);
        }

        for (var i = 0; i < deletedImages.length; i++) {
            formPayload.append('deleted_images', deletedImages[i])
        }

        axios.post(url, formPayload, {
            headers: {
                'Content-Type': 'multipart/form-data',
              },
            onUploadProgress: (progressEvent) => {
                document.querySelector("section.wow.fadeIn.bg-gray.animated").style.display = "block"
                const { loaded, total, ...extra } = progressEvent;
                const progress = Math.round((loaded / total) * 100);
                setUploadProgress(progress);
                if (uploadProgress === 100) {
                    setOpenSnackbar(true)
                }
              }
            })
          .then(async (response) => {
            // Handle the response from the Django backend
            let data = response.data
            params["slug"] = data["data"]["slug"]
            setSlug(data["data"]["slug"])
            handleGetData(data["data"]["slug"])
            setDeletedImages([])
            setResponseMessage(data)
            handleSnackbarClose()
            handleResponseSnackbarOpen()
            handleNewSlug(data["data"]["slug"])
            }
          )
          .catch((error) => {
            // Handle any error that occurred during the request
            setResponseMessage(error)
            handleSnackbarClose()
            handleResponseSnackbarOpen()
          });
      };

    function displayFileUploadProgress(file) {
        const fileList = document.createElement('div');
        fileList.classList.add('formbold-file-list');
        fileList.classList.add('formbold-mb-5');

        const fileItem = document.createElement('div');
        fileItem.classList.add('formbold-file-item');

        const fileName = document.createElement('span');
        fileName.classList.add('formbold-file-name');
        fileName.textContent = file.name;

        const removeButton = document.createElement('div');
        removeButton.classList.add('remove-button');
        const deleteIcon = document.createElement('span');
        deleteIcon.innerHTML = '<button><svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z" fill="currentColor"></path></svg></button>';
        removeButton.appendChild(deleteIcon);
        removeButton.addEventListener('click', () => {
        fileList.remove();
        });

        fileList.appendChild(fileItem);
        fileItem.appendChild(fileName);
        fileItem.appendChild(removeButton);

        const fileListContainer = document.getElementById('file-list-container');
        fileListContainer.appendChild(fileList);
      }

    const handleFileUpload = () => {
        const fileDropArea = document.querySelector('.file-drop-area');
        const fileInput = document.querySelector('.file-input');

        fileDropArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            fileDropArea.classList.add('drag-over');
        });

        fileDropArea.addEventListener('dragleave', (e) => {
            e.preventDefault();
            fileDropArea.classList.remove('drag-over');
        });

        fileDropArea.addEventListener('drop', (e) => {
            e.preventDefault();
            fileDropArea.classList.remove('drag-over');
            handleFiles(e.dataTransfer.files);
        });

        fileInput.addEventListener('change', (e) => {
            handleFiles(e.target.files);
        });
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

    const deleteImage = (index) => {
        var imageArr = formData.images;
        imageArr.splice(index,1);
        setFormData({images: imageArr});
        setOpen(false)
        setUpdate(true)
    }

    const handleImageDelete = async (event) => {
        let target = event.target;
        const divImages = document.getElementById("divImages")
        if (target.tagName !== "SPAN") {
            while (target.tagName !== "SPAN") {
                target = target.parentNode
            }
        }
        const img = target.parentNode.querySelector('img');
        var toBeDeleted = 0;
        for (var i = 0; i < divImages.children.length; i++) {
            if (divImages.children[i].contains(img)) {
                toBeDeleted = i;
            }
        }

        const targetImage = formData.images[toBeDeleted];
        setImageDelete(`${source.proxy.concat(targetImage)}`)
        setOpen(true)


        const deleteBtn = await findbtn("delGoAheadBtn")
        const cancelBtn = await findbtn("cancelBtn")

        deleteBtn.addEventListener('click', async () => {
            setDeletedImages([...deletedImages, formData.images[toBeDeleted]])
            deleteImage(toBeDeleted);
        })

        cancelBtn.addEventListener('click', async () => {
            handleModalClose()
        })
    }

    function handleFiles(files) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          displayFileUploadProgress(file);
          // Perform file upload or any other desired operations here
        }
    }

    useEffect(() => {
        console.log(window)
        handleFileUpload()
        handleGetData()
    }, [])


  return (
    <div>
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
                sx={{
                backgroundColor: 'rgba(0,0,0,0.5)',
                color: 'white',
                '& .MuiAlert-action': {
                    display: 'none', // Hide the close button
                },
                }}
                icon={<BackHandIcon />}
            >
                <span className='wallabeng'>Your images are getting done, Hold up.</span>
                <LinearProgress
                sx={{ color: 'white', marginTop: '10px' }}
                size="sm"
                variant="plain"
                />
            </MuiAlert>
            </Snackbar>

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
                {responseMessage.message}
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
                    <div className='text-center'>
                    <img src={imageDelete} className='delete-image mb-3' />
                    </div>
                    <div className='text-center'><p>Are you sure you want to delete this image?</p></div>
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

    <div className= 'row'>
    <div className= 'col-md-2'>
        <DashboardAside />
    </div>
    <div className= 'col-md-10 mb-5'>
        <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" data-scroll="true">
        <div className="container-fluid py-1 px-3">
            <nav aria-label="breadcrumb">
            <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                <li className="breadcrumb-item text-sm"><Link className="opacity-5 text-dark" to="/">Ace Of Face and Hair</Link></li>
                <li className="breadcrumb-item text-sm"><Link className="opacity-5 text-dark" to="/dashboard-actions/manage-projects">Manage Projects</Link></li>
                <li className="breadcrumb-item text-sm text-dark active" aria-current="page">Edit Project</li>
            </ol>
            <h6 className="font-weight-bolder mb-0">Edit Project</h6>
            </nav>
        </div>
        </nav>
        <div className='row'>
            <div className='col-md-7'>
                <div className='container-fluid'>
        <div className="formbold-main-wrapper">
            <div className="formbold-form-wrapper card">
                <form onSubmit={handleSubmit} className= "formbold-form" id = "projectForm">
                <div className="formbold-mb-5">
                    <label htmlFor="email" className="formbold-form-label">
                    Project Name:
                    </label>
                    <input
                    type="text"
                    name="projectName"
                    id="projectName"
                    value={formData.projectName}
                    onChange={handleChange}
                    required
                    className="formbold-form-input"
                    />
                </div>

                <div className="formbold-mb-5">
                    <label htmlFor="email" className="formbold-form-label">
                    Project Brief Description:
                    </label>
                    <textarea
                    id="ProjectDescription"
                    name="projectDescription"
                    value={formData.projectDescription}
                    onChange={handleChange}
                    rows="4"
                    cols="40"
                    required
                    className="formbold-form-input">
                    </textarea>
                </div>

                <div className="mb-6 pt-4">
                    <label className="formbold-form-label formbold-form-label-2">
                    Add Project Images
                    </label>

                    <div className="container d-flex justify-content-center">
                        <div className="file-drop-area">
                        <span className="choose-file-button">Choose files</span>
                        <span className="file-message">or drag and drop images here</span>
                        <input
                         className="file-input"
                         type="file"
                         multiple
                         onChange={handleChange}
                         name = "images"
                         />
                        </div>
                    </div>

                    <div id="file-upload-progress" style={{display: "none"}}>
                    <div className="progress-bar" style = {{background: "black"}}></div>
                    <div id="file-name"></div>
                    </div>
                    </div>
                    <div>
                        {update ?
                        <button className="formbold-btn w-full" type='submit'>Submit Changes</button>
                        : <span className='text-center changes-detail'>No changes have been detected, update your project inorder to be able to submit changes.</span>
                        }
                    </div>
                    </form>
                    </div>
                    </div></div></div>
                    <div className='col-md-5'>
                        <div className='container-fluid'>
                        <div className='card text-center mb-3'>
                            <span className='file-upload-info'>Your files will appear here once you select them.</span>
                        </div>
                        <section className="wow fadeIn bg-gray animated" style={{visibility: "visible", animationNname: "fadeIn", display: "none"}}>
                            <div className="progress-bar-main progress-bar-style2">
                                <div className="progress-bar-sub">
                                    <div className="progress">
                                        <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width: `${uploadProgress}%`}}><span>{uploadProgress}%</span></div>
                                    </div>
                                    <div className="progress-name text-black"><strong>Upload progress</strong></div>
                                </div>
                            </div>
                        </section>
                        <div className='file-list files-div card' style={{display: "none"}}>
                            <div id = "file-list-container" className=''>
                            </div>
                        </div>
                        </div>
                    </div>
    </div>
    <div className='col-md-12 mt-3' id = "existingImages">
        <div className='card image-card'>
        <div className='heading'>
            <h5>Existing Images</h5>
        </div>
            <div className='container-fluid'>
                <div className='row' id = "divImages">
                    {formData.images.map((Image) => {
                    return (<div className='col-md-2' key = {Math.random()}>
                                <div className='image-container'>
                                    <div className='image-placeholder'>
                                        <img src={`${source.proxy}/${Image}`} className='existing-image'/>
                                        <span onClick={handleImageDelete} className = "delete-absolute"><DeleteIcon /></span>
                                    </div>
                                </div>
                            </div>)
                    })}
                </div>
                </div>
        </div>
    </div>
    </div>
    </div>
    </div>
  )
}
