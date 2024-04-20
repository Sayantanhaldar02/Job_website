import { Alert, TablePagination, TextField, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'

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


  useEffect(() => {
    get_jobs()
  }, [])

  const [alert_message, setalert_message] = useState("")
  const [method, setmethod] = useState("post")
  const [dataId, setdataId] = useState(0)

  const [snackopen, setsnackopen] = useState(false);

  const snackhandleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setsnackopen(false);
  };



  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setmethod("post")
    setJobsetails({
      companyId: "",
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
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const [job_details, setJobsetails] = useState({
    companyId:0,
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
    companyId,
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


  const URL = `https://jsonplaceholder.typicode.com/posts`

  const create_a_job = async (url, data) => {
    const my_data = JSON.stringify(data)
    try {
      const res = await axios.post(url, my_data)
      if (res.status >= 200 && res.status < 300) {
        setalert_message("Data POsted Successfully")
        setOpen(false)
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

  const get_jobs = async () => {
    try {
      const res = await axios.get(URL)
      if (res.status >= 200 && res.status < 300) {
        setJobList(res.data)
      }
    } catch (error) {
      console.log(error.message);
    }
  }




  const onsubmitHandeler = async () => {
    if (method === "update" && dataId !== 0) {
      console.log(dataId);
      try {
        const res = await axios.patch(`${URL}/${dataId}`, job_details)
        if (res.status >= 200 && res.status < 300) {
          setalert_message("Update Successfully")
          setOpen(false)
          setsnackopen(true)
          console.log(res.data)
          get_jobs()
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      const job_data = {
        companyId:companyId,
        jobTitle:job_title,
        jobShortDescription:job_short_description,
        jobDetails:job_description,
        jobRequirements:job_requirements,
        jobResponsibilities:job_responsibilities,
        qualificationsAndSkills:qualifications_and_skills,
        jobDepartment:job_department,
        jobLocation:job_location,
        salary:sallary,
        jobType:job_type,
      }
      console.log(job_data);
      // create_a_job(URL, job_data)

    }

    // setsnackopen(true)
    // setOpen(false);
  }

  const job_delete_handeler = async (id) => {
    console.log(id);
    try {
      const res = await axios.delete(`${URL}/${id}`)
      if (res.status >= 200 && res.status < 300) {
        setalert_message("Deleted Successfully")
        setsnackopen(true)
        get_jobs()
        console.log(res.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  }


  // job update handeler start
  const job_update_handeler = async (id) => {
    setdataId(id)
    setmethod("update")
    const data = job_list.length > 0 && job_list.filter((data) => data.id === id)[0]
    setJobsetails({
      job_title: data.jobTitle,
      job_short_description: data.jobShortDescription,
      job_description: data.jobDetails,
      job_requirements: data.jobRequirements,
      job_responsibilities: data.jobResponsibilities,
      qualifications_and_skills: data.qualificationsAndSkills,
      job_department: data.jobDepartment,
      job_location: data.jobLocation,
      sallary: data.salary,
      job_type: data.jobType
    })
    setOpen(true)
  }
  

  // job update handeler end



  // table related code start
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

  // pagination code start
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // pagination code end

  // table related code end




  return (
    <>

      <>
        <Button variant="outlined" onClick={handleClickOpen}>
          Create a Job
        </Button>.

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
                <TextField className='w-[80%] mq900:w-[100%]' id="outlined-basic" label="Company Id" variant="outlined" name='companyId' value={companyId} type='number' onChange={onchnageHandeler} />
              </div>
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
              <button className='text-white w-[250px] py-[25px] text-[20px] rounded-[10px] cursor-pointer bg-primary-text' onClick={onsubmitHandeler} >{method === "post" ? "Submit" : "Update"}</button>
            </div>
          </List>
        </Dialog>

        {/* {snackopen && } */}

        <Snackbar
          open={snackopen}
          autoHideDuration={2000}
          onClose={snackhandleClose}
        // message="Data Posted Successfully"
        >
          <Alert severity="success" onClose={snackhandleClose}>
            {alert_message && alert_message}
          </Alert>
        </Snackbar>



        {
          job_list.length > 0 &&
          <div className='w-[100%] px-[25px]'>
            <TableContainer sx={{ maxHeight: 550 }} className='w-[90%] my-[20px]'>
              <Table sx={{ minWidth: 650 }} stickyHeader aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Company Id</StyledTableCell>
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
                    <StyledTableCell>Update</StyledTableCell>
                    <StyledTableCell>Delete</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {job_list && job_list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <StyledTableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <StyledTableCell scope="row">{row.companyId}</StyledTableCell>
                      <StyledTableCell scope="row">{row.jobTitle}</StyledTableCell>
                      <StyledTableCell scope="row">{row.jobShortDescription}</StyledTableCell>
                      <StyledTableCell scope="row">{row.jobDetails}</StyledTableCell>
                      <StyledTableCell scope="row">{row.jobRequirements}</StyledTableCell>
                      <StyledTableCell scope="row">{row.jobResponsibilities}</StyledTableCell>
                      <StyledTableCell scope="row">{row.qualificationsAndSkills}</StyledTableCell>
                      <StyledTableCell scope="row">{row.jobDepartment}</StyledTableCell>
                      <StyledTableCell scope="row">{row.jobLocation}</StyledTableCell>
                      <StyledTableCell scope="row">{row.jobType}</StyledTableCell>
                      <StyledTableCell scope="row">{row.salary}</StyledTableCell>
                      <StyledTableCell scope="row"><Button onClick={() => job_update_handeler(row.id)}>Update</Button></StyledTableCell>
                      <StyledTableCell scope="row"><Button onClick={() => job_delete_handeler(row.id)}>Delete</Button></StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={job_list.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        }


        {/* {
          job_list.length > 0 &&
          <div className='w-[100%] px-[25px] h-[350px]'>
            <TableContainer sx={{ maxHeight: 550 }} className='w-[90%] my-[20px]'>
              <Table sx={{ minWidth: 750 }} stickyHeader aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell sx={{ minWidth: 100 }} >User id</StyledTableCell>
                    <StyledTableCell>Id</StyledTableCell>
                    <StyledTableCell>Title</StyledTableCell>
                    <StyledTableCell>Body</StyledTableCell>
                    <StyledTableCell>Update</StyledTableCell>
                    <StyledTableCell>Delete</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {job_list && job_list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <StyledTableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <StyledTableCell scope="row">{row.userId}</StyledTableCell>
                      <StyledTableCell scope="row">{row.id}</StyledTableCell>
                      <StyledTableCell scope="row">{row.title}</StyledTableCell>
                      <StyledTableCell scope="row">{row.body}</StyledTableCell>
                      <StyledTableCell scope="row"><Button onClick={() => job_update_handeler(row.id)}>Update</Button></StyledTableCell>
                      <StyledTableCell scope="row"><Button onClick={() => job_delete_handeler(row.id)}>Delete</Button></StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={job_list.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        } */}
      </>


    </>
  )
}

export default Job_form