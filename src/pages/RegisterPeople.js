import React, { useEffect , useState} from 'react'
import { Link } from 'react-router-dom'
import '../styles/login.css'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

const RegisterPeople = () => {

    const[name, setName] = useState()
    const[lastname, setLastname] = useState()
    const[id, setId] = useState()
    const[idType, setIdType] = useState()
    const[email, setEmail] = useState()

    const[open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSubmit = (e) => {
        const requestOptions = {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": `{\"Names\":\"${name}\",\"LastNames\":\"${lastname}\",\"IdNumber\":\"${id}\",\"Email\":\"${email}\",\"IdType\":\"${idType}\"}`
        }
        fetch('http://localhost:3001/api/people', requestOptions)
        .then(response => {
            response.json()
            handleClickOpen()})
        .catch(err => {
            console.error(err)
        })
    }

    const handleChange = (e) => {
        e.target.name === "name" ? setName(e.target.value) :
        e.target.name === "lastname" ? setLastname(e.target.value) :
        e.target.name === "idnumber" ? setId(e.target.value) :
        e.target.name === "IdType" ? setIdType(e.target.value) :
        e.target.name === "email" ? setEmail(e.target.value) : console.log("pass")
    }

    return(
        <div className="page d-flex align-items-center">
            <div className="container d-flex justify-content-center">
                <div className="register-card">
                    <div className="logo d-flex justify-content-center align-items-center">
                        <img src={require('../images/logo.png')} className="img-fluid" width="40"></img>
                        <h1>Register</h1>
                    </div>
                    <div className="register-form">
                        <form>
                            <div className="row">
                                <div className="information col">
                                    <label htmlFor="name">Names</label>
                                    <input type="text" className="input" placeholder="Enter your names" name="name" id="name" onChange={handleChange}/>
                                </div>
                                <div className="information col">
                                    <label htmlFor="lastname">Lastnames</label>
                                    <input type="text" className="input" placeholder="Enter your lastnames" name="lastname" id="lastname" onChange={handleChange}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="information col-5">
                                    <label htmlFor="idnumber">Id Number</label>
                                    <input type="text" className="input" placeholder="Enter your id number" name="idnumber" id="idnumber" onChange={handleChange}/>
                                </div>
                                <div className="information col">
                                    <label htmlFor="IdType">Id type</label>
                                    <select className="input" name="IdType" id="IdType" onChange={handleChange}>
                                        <option disabled selected>Choose an identification type...</option>
                                        <option>C.C</option>
                                        <option>T.I</option>
                                        <option>Passport</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="information col">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="input" placeholder="Enter your email" name="email" id="email" onChange={handleChange}/>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button type="button" className="btn" onClick={handleSubmit}>Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Succesfully registered"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Successfully registered data, do you want to register as a user?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}><Link to="/login">Return to login</Link></Button>
                <Button onClick={handleClose} autoFocus>
                    <Link to="/registerU">Accept</Link>
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default RegisterPeople