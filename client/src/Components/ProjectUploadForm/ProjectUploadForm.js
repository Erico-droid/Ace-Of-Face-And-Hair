import React, { useEffect, useState } from 'react'
import './ProjectUploadForm.css'
import DashboardAside from '../DashboardAside/DashboardAside'
import { Link } from 'react-router-dom'
import axios from 'axios'
import source from '../../proxy.json'
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import LinearProgress from '@mui/joy/LinearProgress';
import BackHandIcon from '@mui/icons-material/BackHand';

export default function ProjectUploadForm() {

    const [formData, setFormData] = useState({
        projectName: '',
        projectDescription: '',
        images: [],
      });
    
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

    const handleRemoveUploadedChildren = () => {
        const doc = document.getElementById("file-list-container")
        const fath = document.getElementById("father-file-list-cont");
        doc.remove()
        const newDiv = document.createElement("DIV")
        newDiv.setAttribute('id', 'file-list-container')
    }
    
      const handleChange = (event) => {
        if (event.target.name === 'images') {
          setFormData({ ...formData, images: event.target.files });
          const textInfo = document.querySelector("span.file-upload-info");
          document.querySelector("div.file-list").style.display = "block"
          textInfo.innerText = `Here are the files you have selected for this project.`
        } else {
          setFormData({ ...formData, [event.target.name]: event.target.value });
        }        
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        const url = `${source.proxy}/portfolio/create_project`
        const formPayload = new FormData();
        formPayload.append('name', formData.projectName);
        formPayload.append('brief_description', formData.projectDescription);
        for (let i = 0; i < formData.images.length; i++) {
          formPayload.append('images', formData.images[i]);
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
          .then((response) => {
            // Handle the response from the Django backend
            let data = response.data
            setResponseMessage(data)
            handleSnackbarClose()
            handleResponseSnackbarOpen()
            resetForm()
            setFormData({
                projectName: '',
                projectDescription: '',
                images: [],
            })
            handleRemoveUploadedChildren()
          })
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
        removeButton.appendChild(deleteIcon);;
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

    function handleFiles(files) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          displayFileUploadProgress(file);
          // Perform file upload or any other desired operations here
        }
    }

    useEffect(() => {
        handleFileUpload()
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
                <li className="breadcrumb-item text-sm text-dark active" aria-current="page">Create Project</li>
            </ol>
            <h6 className="font-weight-bolder mb-0">Create Project</h6>
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
                    placeholder="Enter the name of the project here"
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
                    placeholder="Enter the brief description of the project here"
                    className="formbold-form-input">
                    </textarea>
                </div>

                <div className="mb-6 pt-4">
                    <label className="formbold-form-label formbold-form-label-2">
                    Upload Project Images
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
                        <button className="formbold-btn w-full" type='submit'>Create Project</button>
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
                        <div className='file-list files-div card' id = "father-file-list-cont" style={{display: "none"}}>
                            <div id = "file-list-container" className=''>
                            </div>
                        </div>
                        </div>
                    </div>
    </div>
    </div>
    </div>
    </div>
  )
}
