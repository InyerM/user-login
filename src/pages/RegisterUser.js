import React, { useEffect , useState} from 'react'
import '../styles/login.css'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

const RegisterUser = () => {

    const[lastId, setLastId] = useState([])
    const[username, setUsername] = useState()
    const[password, setPassword] = useState()
    const[open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }
    

    useEffect(() => {
        fetch('http://localhost:3001/api/lastId')
        .then(response => response.json())
        .then(data => setLastId(data))
    }, [])

    const handleSubmit = (e) => {
        const id = lastId[0].Id

        const requestOptions = {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": `{\n\t\"Id\" : ${id},\n\t\"UserName\" : \"${username}\",\n\t\"Password\" : \"${password}\"\n}`
        }

        fetch('http://localhost:3001/api/users', requestOptions)
        .then(response => {response.json()
                        handleClickOpen()})
        .catch(err => {
            console.error(err)
        })
    }

    const handleChange = (e) => {
        e.target.name === "username" ? setUsername(e.target.value) :
        e.target.name === "password" ? setPassword(e.target.value) : console.log("pass")
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
                            <div className="information">
                                <label htmlFor="username">Username</label>
                                <input type="text" className="input" placeholder="Enter your username" name="username" onChange={handleChange}/>
                            </div>

                            <div className="information">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="input" placeholder="Enter your password" name="password" onChange={handleChange}/>
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
                {"Succesfully registered as a User"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Successfully registered data, returning to login menu
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    <Link to="/login">Accept</Link>
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default RegisterUser