import React, {useState, useEffect} from 'react'
import './ViewReachOuts.css'
import { Link } from 'react-router-dom'
import DashboardAside from '../../Components/DashboardAside/DashboardAside'
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import proxy from '../../proxy.json'
import Modal from '@mui/material/Modal';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
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

export default function ViewReachOuts() {

    const [reachOuts, setReachOuts] = useState([])
    const handleModalOpen = () => setOpen(true);
    const handleModalClose = () => setOpen(false);
    const [openResponseSnackbar, setOpenResponseSnackbar] = useState(false);
    const [message, setMessage] = useState("")
    const [open, setOpen] = useState(false)
    const handleResponseSnackbarClose = () => {
      setOpenResponseSnackbar(false);
    };
  
      const handleResponseSnackbarOpen = () => {
          setOpenResponseSnackbar(true)
    }


    const getReachOuts = async () => {
        const url = `${proxy.proxy}/general_setting/reach-outs/`
        const response = await axios.get(url)
        setReachOuts(response.data.data)
        if (response.data.data.length === 0) {
            document.getElementById("reachOuts").style.display = "none"
            document.getElementById("no-reachs").style.display = "block"
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


    const handleDelete = async (event) => {
        var target = event.target;
        if (target.tagName !== "SPAN") {
            while (target.tagName !== "SPAN") {
                target = target.parentNode
            }
        }
        const pk = target.getAttribute("num-reach")
        setMessage("Are you sure you want to delete the reach out? ")
        handleModalOpen()
        const deleteBtn = await findbtn("delGoAheadBtn")
        const cancelBtn = await findbtn("cancelBtn")
        
        deleteBtn.addEventListener('click', async () => {            
            const url = `${proxy.proxy}/general_setting/delete_reach_out/`
            const response = await axios.post(url, pk)
            setReachOuts(response.data)
            if (reachOuts.length === 0) {
                document.getElementById("reachOuts").style.display = "none"
                document.getElementById("no-reachs").style.display = "block"
            }
            handleModalClose()
            setMessage("The Reach Out has been deleted")
            handleResponseSnackbarOpen()
        })

        cancelBtn.addEventListener('click', async () => {
            handleModalClose()
        })
    }

    useEffect(() => {
        getReachOuts()
    }, [])


  return (
    <div style={{marginBottom: "40px"}}>
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
                    <div className='text-center confirmation-text'><p>Are you sure you want to delete the reach out?</p></div>
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
            <div className='container-fluid'>
                <div className='navigation-bar'>
                <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" data-scroll="true">
                <div className="container-fluid py-1 px-3">
                    <nav aria-label="breadcrumb">
                    <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                        <li className="breadcrumb-item text-sm"><Link className="opacity-5 text-dark" to="/">Ace Of Face and Hair</Link></li>
                        <li className="breadcrumb-item text-sm text-dark active" aria-current="page">View Reach Outs</li>
                    </ol>
                    <h6 className="font-weight-bolder mb-0">View Reach Outs</h6>
                    </nav>
                </div>
                </nav>
                </div>
                <div id = "reachOuts">
                    <div className='mb-3'>
                    <div className="card-header p-0 position-relative mt-n4 z-index-2"><div className="bg-gradient-primary  border-radius-lg pt-4 pb-3"><h6 className="text-black text-capitalize ps-3">View People who have reached out to you here</h6></div></div>
                    </div>
                    <div className='row'>
                        {reachOuts.map((ReachOut) => {
                            return (<div className='col-md-3' key={ReachOut.id}>
                            <div className='card reach-out-card'>
                                <div className='card-body body-rel'>
                                    <h6>
                                        {ReachOut.name} reached out at {ReachOut.date} with message {ReachOut.message}.
                                    </h6>
                                    <h6 style={{marginTop: "20px"}}>
                                        You can communicate with {ReachOut.name} using email: <a href={'mailto:' + ReachOut.email}>{ReachOut.email}</a>
                                            or using his mobile number <a href={'tel:' + ReachOut.phone}>{ReachOut.phone}</a>.
                                    </h6>
                                    <span className='delete-span' onClick = {handleDelete} num-reach={ReachOut.id}><DeleteIcon/></span>
                                </div>
                            </div>
                        </div>
                        )})}
                    </div>
                </div>
                <div style = {{display: "none"}} id = "no-reachs" className='text-center'>
                    <p>You do not have any reach outs at the moment.</p>
                </div>
            </div>
        </div>
        </div>
    </div>
  )
}
