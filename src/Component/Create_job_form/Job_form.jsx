import { Alert, TextField, styled } from '@mui/material'
import React, { useState } from 'react'

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import axios from 'axios';
// import Alert_component from '../Alert_component';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const Job_form = () => {

  const [snackopen, setsnackopen] = useState(false);

  const snackhandleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setsnackopen(false);
  };



  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const [job_details, setJobsetails] = useState({
    job_title: "",
    job_short_description: "",
    job_description: "",
    job_requirements: "",
    job_responsibilities: "",
    qualifications_and_skills: "",
    job_department: "",
    job_location: "",
    sallary: "",
    job_type: ""
  })

  const {
    job_title,
    job_short_description,
    job_description,
    job_requirements,
    job_responsibilities,
    qualifications_and_skills,
    job_department,
    job_location,
    sallary,
    job_type
  } = job_details


  const onchnageHandeler = (e) => {
    setJobsetails({
      ...job_details,
      [e.target.name]: e.target.value
    })
  }

  const [job_list, setJobList] = useState([])


  const create_a_job = async (url, data) => {
    const my_data = JSON.stringify(data)
    try {
      const res = await axios.post(url, my_data)
      if (res.status >= 200 && res.status < 300) {
        setsnackopen(true)
        get_jobs()
        console.log(res.data);

        setJobsetails({
          job_title: "",
          job_short_description: "",
          job_description: "",
          job_requirements: "",
          job_responsibilities: "",
          qualifications_and_skills: "",
          job_department: "",
          job_location: "",
          sallary: "",
          job_type: ""
        })
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const get_jobs = async (url, data) => {
    const my_data = JSON.stringify(data)
    try {
      const res = await axios.post(url, my_data)
      if (res.status >= 200 && res.status < 300) {
        setJobList(res.data)
        setsnackopen(true)
      }
    } catch (error) {
      console.log(error.message);
    }
  }



  const onsubmitHandeler = () => {
    // job_list.push(job_details)
    // console.log(job_list);
    // setsnackopen(true)
    // setOpen(false);
    // setJobsetails({
    //   job_title: "",
    //   job_short_description: "",
    //   job_description: "",
    //   job_requirements: "",
    //   job_responsibilities: "",
    //   qualifications_and_skills: "",
    //   job_department: "",
    //   job_location: "",
    //   sallary: "",
    //   job_type: ""
    // })

    // create_a_job()
  }




  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#1ca774",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));


  return (
    <>

      <>
        <Button variant="outlined" onClick={handleClickOpen}>
          Create a Job
        </Button>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: 'relative', background: "#1ca774" }} >
            <Toolbar>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Create Job
              </Typography>
              <Button autoFocus color="inherit" onClick={handleClose}>
                <CloseIcon />
              </Button>
            </Toolbar>
          </AppBar>
          <List >
            <form className='w-[80%]  mx-auto mq900:w-[90%]'>
              <div className='w-[100%] py-[10px] flex justify-center items-center'>
                <TextField className='w-[80%] mq900:w-[100%]' id="outlined-basic" label="Job Title" variant="outlined" name='job_title' value={job_title} onChange={onchnageHandeler} />
              </div>
              <div className='w-[100%] py-[10px] flex justify-center items-center'>
                <TextField className='w-[80%] mq900:w-[100%]' id="outlined-basic" label="Job Short Description" variant="outlined" name='job_short_description' value={job_short_description} onChange={onchnageHandeler} />
              </div>
              <div className='w-[100%] py-[10px] flex justify-center items-center'>
                <TextField className='w-[80%] mq900:w-[100%]' id="outlined-basic" label="Job Description" variant="outlined" name='job_description' value={job_description} onChange={onchnageHandeler} />
              </div>
              <div className='w-[100%] py-[10px] flex justify-center items-center'>
                <TextField className='w-[80%] mq900:w-[100%]' id="outlined-basic" label="Job Requirement" variant="outlined" name="job_requirements" value={job_requirements} onChange={onchnageHandeler} />
              </div>
              <div className='w-[100%] py-[10px] flex justify-center items-center'>
                <TextField className='w-[80%] mq900:w-[100%]' id="outlined-basic" label="Job Responsibilities" variant="outlined" name='job_responsibilities' value={job_responsibilities} onChange={onchnageHandeler} />
              </div>
              <div className='w-[100%] py-[10px] flex justify-center items-center'>
                <TextField className='w-[80%] mq900:w-[100%]' id="outlined-basic" label="Job Department" variant="outlined" name='job_department' value={job_department} onChange={onchnageHandeler} />
              </div>
              <div className='w-[100%] py-[10px] flex justify-center items-center'>
                <TextField className='w-[80%] mq900:w-[100%]' id="outlined-basic" label="Qualification and Skills" variant="outlined" name='qualifications_and_skills' value={qualifications_and_skills} onChange={onchnageHandeler} />
              </div>
              <div className='w-[100%] py-[10px] flex justify-center items-center'>
                <TextField className='w-[80%] mq900:w-[100%]' id="outlined-basic" label="Job Location" variant="outlined" name='job_location' value={job_location} onChange={onchnageHandeler} />
              </div>
              <div className='w-[100%] py-[10px] flex justify-center items-center'>
                <TextField className='w-[80%] mq900:w-[100%]' id="outlined-basic" label="Job Type" variant="outlined" name='job_type' value={job_type} onChange={onchnageHandeler} />
              </div>
              <div className='w-[100%] py-[10px] flex justify-center items-center'>
                <TextField className='w-[80%] mq900:w-[100%]' id="outlined-basic" label="Sallary" variant="outlined" name='sallary' value={sallary} onChange={onchnageHandeler} />
              </div>
            </form>
            <div className='w-[100%] py-[10px] flex justify-center items-center'>
              <button className='text-white w-[250px] py-[25px] text-[20px] rounded-[10px] cursor-pointer bg-primary-text' onClick={onsubmitHandeler} >Submit</button>
            </div>
          </List>
        </Dialog>

        {/* {snackopen && } */}

        <Snackbar
          open={snackopen}
          autoHideDuration={5000}
          onClose={snackhandleClose}
        // message="Data Posted Successfully"
        >
          <Alert severity="success" onClose={snackhandleClose}>
            Data Posted Successfully
          </Alert>
        </Snackbar>



        {
          job_list.length > 0 &&
          <div className='w-[100%] px-[25px]'>
            <TableContainer component={Paper} className='w-[90%] my-[20px]'>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Job Title</StyledTableCell>
                    <StyledTableCell>Job Short Description</StyledTableCell>
                    <StyledTableCell>Job Description</StyledTableCell>
                    <StyledTableCell>Job Requirement</StyledTableCell>
                    <StyledTableCell>Job Responsibilities</StyledTableCell>
                    <StyledTableCell>Job Department</StyledTableCell>
                    <StyledTableCell>Qualification and Skills</StyledTableCell>
                    <StyledTableCell>Job Location</StyledTableCell>
                    <StyledTableCell>Job Type</StyledTableCell>
                    <StyledTableCell>Sallary</StyledTableCell>
                    {/* <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {job_list && job_list.map((row) => (
                    <StyledTableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <StyledTableCell scope="row">{row.job_title}</StyledTableCell>
                      <StyledTableCell scope="row">{row.job_short_description}</StyledTableCell>
                      <StyledTableCell scope="row">{row.job_description}</StyledTableCell>
                      <StyledTableCell scope="row">{row.job_requirements}</StyledTableCell>
                      <StyledTableCell scope="row">{row.job_responsibilities}</StyledTableCell>
                      <StyledTableCell scope="row">{row.job_department}</StyledTableCell>
                      <StyledTableCell scope="row">{row.qualifications_and_skills}</StyledTableCell>
                      <StyledTableCell scope="row">{row.job_location}</StyledTableCell>
                      <StyledTableCell scope="row">{row.job_type}</StyledTableCell>
                      <StyledTableCell scope="row">{row.sallary}</StyledTableCell>
                      {/* <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell> */}
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        }
      </>


    </>
  )
}

export default Job_form