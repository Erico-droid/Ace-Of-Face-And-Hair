import React, {useEffect, useState} from 'react'
import DashboardAside from '../../Components/DashboardAside/DashboardAside'
import { Link } from 'react-router-dom'
import axios from 'axios'
import proxy from '../../proxy.json'
import AddIcon from '@mui/icons-material/Add';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';


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

export default function ManageTestimonials() {
    const [faqs, setFaqs] = useState([])
    const [message, setMessage] = useState("")    
    const [SnackbarOpen, setSnackbarOpen] = useState(false);
    const [severity, setSeverity] = useState("info")
    const [open, setOpen] = React.useState(false);
    const [faqDelete, setFaqDelete] = useState("")
    const handleModalOpen = () => setOpen(true);
    const handleModalClose = () => setOpen(false);

    const getFaqs = async () => {
        let response = await axios.get(`${proxy.proxy}/general_setting/testimonials/`)
        response = response.data
        setFaqs(response)
        if (response.length === 0) {
            document.getElementById("FAQTable").style.display = "none"
        } else {
            document.querySelector(".no-faqs").style.display = "none"
        }
    }

    const handleCreateFAQ = async () => {
        if (faqs.length === 0) {
            document.getElementById("FAQTable").style.display = "block"
            document.querySelector(".no-faqs").style.display = "none"
        }

        const tableRow = document.createElement('tr')
        tableRow.setAttribute("id", "newFaqRow")
        const tableData = document.createElement('td')
        const tableData2 = document.createElement('td')
        const tableData3 = document.createElement('td')
        const tableData4 = document.createElement('td')
        tableData4.innerHTML = '<button id = "closeBtn" class="MuiButtonBase-root MuiIconButton-root MuiIconButton-colorRed MuiIconButton-sizeLarge css-kf45sl-MuiButtonBase-root-MuiIconButton-root" tabindex="0" type="button" aria-label="delete"><svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeInherit css-g9bb88-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CancelIcon"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path></svg><span class="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"></span></button>'
        const questionInput = document.createElement("textArea")
        questionInput.setAttribute("name", "questionInput")
        questionInput.setAttribute("id", "QuestionInput")
        questionInput.setAttribute("type", "text")
        const answerInput = document.createElement("textArea")
        answerInput.setAttribute("name", "answerInput")
        answerInput.setAttribute("id", "AnswerInput")
        answerInput.setAttribute("type", "text")
        answerInput.setAttribute("rows", "5")
        answerInput.classList.add("answer-input")
        answerInput.setAttribute("required", "")
        questionInput.classList.add("question-input")
        questionInput.setAttribute("rows", "5")
        questionInput.setAttribute("required", "")
        const saveFaq = document.createElement("button")
        saveFaq.innerText = "Save Testimonial"
        saveFaq.classList.add("btn")
        saveFaq.classList.add("btn-save-faq")
        saveFaq.setAttribute("type", "submit")
        tableRow.appendChild(tableData)
        tableRow.appendChild(tableData2)
        tableRow.appendChild(tableData3)
        tableRow.appendChild(tableData4)
        tableData.appendChild(questionInput)
        tableData2.appendChild(answerInput)
        tableData3.appendChild(saveFaq)
        tableData3.classList.add("text-center")
        const table = document.getElementById("tBody");
        table.appendChild(tableRow)
        tableData.classList.add('text-center')
        tableData.style.padding = "20px 0px"
        tableData2.classList.add('text-center')
        tableData2.style.padding = "20px 0px"
        tableData3.classList.add('text-center')
        tableData3.style.padding = "20px 0px"
    }

    const handleResponse = (response) => {
        if (response.status === 200) {
            document.getElementById("newFaqRow").remove();
            document.querySelector("a.create-btn").style.display = "initial";
            setFaqs(response.data)
            setSeverity("success")
            setMessage("Your Testimonial has been added successfully.")
            handleSnackbarOpen() 
        } else {
            setSeverity("error")
            setMessage("There was an unexpected error, please try again later.")
            handleSnackbarOpen()
        }
    }


    const submitAndGetResponse = async () => {
        const url = `${proxy.proxy}/general_setting/create_testimonial/`
        let question = document.getElementById("QuestionInput").value
        let answer = document.getElementById("AnswerInput").value
       
        if (question.length === 0)
            setMessage("Testimonial input cannot be empty!")
        if (answer.length === 0)
            setMessage("Testimonial By input cannot be empty!")
        if (question.length === 0 && answer.length === 0)
            setMessage("Testimonial input and Testimonial By input cannot be empty!")
        
        if (question.length > 0 && answer.length > 0) {
            const data = {
                answer: answer,
                question: question
            } 
            const response = await axios.post(url, data)
            handleResponse(response)
        } else {
            setSeverity("error")
            handleSnackbarOpen()
        }
    }

    
    const handleSaveBtn = () => {
        const saveBtn = document.querySelector(".btn-save-faq")
            if (saveBtn) {
                saveBtn.addEventListener('click', () => {
                    submitAndGetResponse()
            })
        }
    }

    const handleCloseBtn = async () => {
        const closeBtn = await findbtn("closeBtn");
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {  
                document.getElementById("newFaqRow").remove();              
                document.querySelector("a.create-btn").style.display = "initial";
                if (faqs.length === 0) {
                    document.getElementById("FAQTable").style.display = "none"
                    document.querySelector(".no-faqs").style.display = "block"
                }
            })
        }
    }

    const handleCreateBtn = () => {
        handleCreateFAQ()
        document.querySelector("a.create-btn").style.display = "none";
        handleSaveBtn()
        handleCloseBtn()
    }

    const handleSnackbarOpen = () => {
        setSnackbarOpen(true)
    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false)
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
        let targetElement = event.target
        let target;
        let url = `${proxy.proxy}/general_setting/delete_testimonial/`
        if (targetElement.tagName === "TD") {
            target = targetElement
        } else {
            while (targetElement !== null && targetElement.tagName !== "TD") {
            targetElement = targetElement.parentElement;
            }

            if (targetElement !== null && targetElement.tagName === "TD") {
            target = targetElement;
            }
        }

        const deleteFaq = parseInt(target.getAttribute("value"))
        let toBeDeleted;
        for (let i = 0; i < faqs.length; i++) {
            if (parseInt(faqs[i]["id"]) === deleteFaq) {
                toBeDeleted = faqs[i]["question"];
                break
            }
        }


        setFaqDelete(toBeDeleted)
        handleModalOpen()
        const deleteBtn = await findbtn("delGoAheadBtn")
        const cancelBtn = await findbtn("cancelBtn")

        deleteBtn.addEventListener('click', async () => {
            const response = await axios.post(url, {"pk": deleteFaq})
            if (response.status === 200) {
                handleModalClose()
                setFaqs(response.data)
                if (response.data.length === 0) {
                    document.getElementById("FAQTable").style.display = "none"
                    document.querySelector(".no-faqs").style.display = "block"
                }
                setSeverity("info")
                setMessage("Your Testimonial has been deleted.")
                handleSnackbarOpen()
            } else {
                handleModalClose()
                setSeverity("error")
                setMessage("There was an unexpected error.")
                handleSnackbarOpen()
            }
        })

        cancelBtn.addEventListener('click', async () => {
            handleModalClose()
        })
    }

    const handleEditFaq = async (event) => {
        let targetElement = event.target
        let target;
        let url = `${proxy.proxy}/general_setting/get_particular_testimonial/`
        document.querySelector("a.create-btn").style.display = "none"
        let activeBtn = document.getElementById("closeBtn")
        if (activeBtn) {
            activeBtn.click()
        }
        //find the <td> element
        if (targetElement.tagName === "TD") {
            target = targetElement
        } else {
            while (targetElement !== null && targetElement.tagName !== "TD") {
            targetElement = targetElement.parentElement;
            }

            if (targetElement !== null && targetElement.tagName === "TD") {
            target = targetElement;
            }
        }
        const faqPk = parseInt(target.getAttribute("value"))
        //now let's find the row element
        while (targetElement !== null && targetElement.tagName !== "TR") {
        targetElement = targetElement.parentElement;
        }
        if (targetElement !== null && targetElement.tagName === "TR") {
        target = targetElement;
        }
        
        const tableRow = target

        //get the faq question
        const response = await axios.post(url, {"pk": faqPk})
        console.log(response)
        let question = tableRow.children[0]
        const qText = question.innerText
        question.innerText = ""
        question.innerHTML = '<textarea name="questionInput" id="QuestionInput" type="text" class="question-input" rows="5" required=""></textarea>'
        const qInput = await findbtn("QuestionInput")
        qInput.value = response.data.testimonial

        //get the faq answer
        let answer = tableRow.children[1]
        const aText = answer.innerText
        answer.innerText = ""
        answer.innerHTML = '<textarea name="answerInput" id="AnswerInput" type="text" rows="5" class="answer-input" required=""></textarea>'
        const aInput = await findbtn("AnswerInput")
        aInput.value = response.data.testimonial_by
        //handle the save btn
        let saveBtn = tableRow.children[2]
        const editBtnSave = saveBtn.firstChild
        saveBtn.removeChild(saveBtn.firstChild)
        saveBtn.innerHTML = '<button class="btn btn-save-faq" id = "saveEditFaq" type="submit">Update Testimonial</button>'

        //handle the cancel btn
        let cancelBtn = tableRow.children[3]
        const deleteBtnSave = cancelBtn.firstChild
        cancelBtn.removeChild(cancelBtn.firstChild)
        cancelBtn.innerHTML = '<button id = "closeBtn" class="MuiButtonBase-root MuiIconButton-root MuiIconButton-colorRed MuiIconButton-sizeLarge css-kf45sl-MuiButtonBase-root-MuiIconButton-root" tabindex="0" type="button" aria-label="delete"><svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeInherit css-g9bb88-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CancelIcon"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path></svg><span class="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"></span></button>'
    
        //add event listeners
        const saveEditFaq = await findbtn("saveEditFaq");
        saveEditFaq.addEventListener('click', async () => {
           const url = `${proxy.proxy}/general_setting/edit_testimonial/`
           let question = await findbtn("QuestionInput")
           question = question.value
           let answer = await findbtn("AnswerInput")
           answer = answer.value
           let id = faqPk
           const data = {
            question,
            answer,
            id
           }
           const response = await axios.post(url, data)
           console.log(response)
           setFaqs(response.data)
           setSeverity("info")
            setMessage("Your Testimonial has been updated.")
            handleSnackbarOpen()
            document.querySelector("a.create-btn").style.display = "block"
        })

        const closeBtn = await findbtn("closeBtn");
        closeBtn.addEventListener('click', () => {
            tableRow.children[0].innerText = qText
            tableRow.children[1].innerText = aText
            tableRow.children[2].removeChild(tableRow.children[2].firstChild)
            tableRow.children[2].appendChild(editBtnSave)
            tableRow.children[3].removeChild(tableRow.children[3].firstChild)
            tableRow.children[3].appendChild(deleteBtnSave)
            const table = document.getElementById("FAQTable")
            let activeBtn = table.querySelector("#QuestionInput")
            let counter = 0;
            if (!activeBtn) {                
                const checkForBtn = () => {                    
                    counter++;
                    activeBtn = table.querySelector("#QuestionInput")
                    if (activeBtn) {                        
                        clearInterval(intervalId);
                        document.querySelector("a.create-btn").style.display = "none"
                    }
                    if (counter >= 5) {
                        clearInterval(intervalId);
                        document.querySelector("a.create-btn").style.display = "block"
                    }
                };
                // const setTime = 
                const intervalId = setInterval(checkForBtn, 25);
            }
        })
    }


    useEffect(() => {
        getFaqs()
    }, [])


    return (
        <div className='row'>
            <Modal
                open={open}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Are you sure you want to delete testimonial with text "{faqDelete}" ?
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


            <Snackbar
            open={SnackbarOpen}
            autoHideDuration={5000}
            onClose={handleSnackbarClose}
            TransitionComponent={Slide}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
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

            <div className='col-md-2'>
            <DashboardAside />
            </div>
            <div className='col-md-10'>
            <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" data-scroll="true">
        <div className="container-fluid py-1 px-3">
            <nav aria-label="breadcrumb">
            <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                <li className="breadcrumb-item text-sm"><Link className="opacity-5 text-dark" to="/">Ace Of Face and Hair</Link></li>
                <li className="breadcrumb-item text-sm text-dark active" aria-current="page">Manage Testimonials</li>
            </ol>
            <h6 className="font-weight-bolder mb-0">Manage Testimonials</h6>
            </nav>
        </div>
        </nav>
            <div className="col-12 container-fluid main-area" style={{paddingTop: "15px"}}>
            <div className="card my-4">
                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div className="bg-gradient-primary  border-radius-lg pt-4 pb-3">
                    <h6 className="text-black text-capitalize ps-3">View and Manage Your Testimonials here</h6>
                </div>
                </div>
                <div className="card-body px-0 pb-2">
                <div className="table-responsive p-0 container-fluid">
                <table className="align-items-center mb-0" id = "FAQTable">
                    <thead>
                        <tr>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-center spacious">Testimonial</th>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center spacious">Testimonial By</th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 actions"></th>
                        <th className="text-secondary opacity-7 actions"></th>
                        </tr>
                    </thead>
                    <tbody id = "tBody">
                    {faqs.map((testimonial) => (
                    <tr key={Math.random()}>
                        <td className='text-center spacious'>{testimonial.testimonial}</td>
                        <td className='text-center spacious'>{testimonial.testimonial_by}</td>
                        <td className='text-center actions edit' value = {testimonial.id}>  
                        <Button variant="outlined" color="primary" startIcon = {<EditNoteIcon/>}  onClick={
                            handleEditFaq
                        }>
                            Edit
                        </Button>
                        </td>
                        <td className='text-center actions delete'value = {testimonial.id}> 
                        <Button variant="outlined" color="error" startIcon = {<DeleteIcon/>}  onClick={
                            handleDelete
                        } >
                            Delete
                        </Button></td>
                    </tr>
                    ))}
                    </tbody>
                    </table>
                    <div className = "no-faqs text-center">
                        <p>
                            You do not have any Testimonials at the moment
                        </p>
                    </div>
                </div>
                </div>
            </div>
            <div className = "text-right">
                <a onClick={handleCreateBtn} className='create-btn text-center main-btn'>
                    <i style={{marginRight: "15px"}}><AddIcon/></i>Add Testimonial
                </a>
            </div>
            </div>
        </div>
                <div style = {{display:"none"}}>
                    <IconButton aria-label="delete" size="large" color='red'>
                        <CancelIcon fontSize="inherit" sx={{color: "red"}} />
                    </IconButton>
                </div>
            </div>
    )
}
