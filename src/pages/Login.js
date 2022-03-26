import React, { useEffect , useState} from 'react'
import '../styles/login.css'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Alert from '@mui/material/Alert'

const Login = () => {

    const[usernameLink, setUL] = useState()
    const[username, setUsername] = useState()
    const[password, setPassword] = useState()
    const[open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSubmit = (e) => {
        fetch("http://localhost:3001/api/users", {
            "method": "GET",
            "headers": {}
            })
            .then(response => response.json())
            .then(data => {
                let found = false


                for(let user of data){
                    user.Username === username && user.Password === password ? found = true : found = false
                    if(found){
                        setUL(user.Username)
                        break
                    }
                }


                found ? handleClickOpen() : window.alert("Incorrect password")
            })
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
                <div className="login-card">
                    <div className="logo d-flex justify-content-center">
                        <img src={require('../images/logo.png')} className="img-fluid" width="150"></img>
                    </div>
                    <div className="login">
                        <form>
                            <div className="information">
                                <i className='bx bx-user icon' ></i>
                                <input type="text" className="input" placeholder="Username" name="username" onChange={handleChange}/>
                            </div>
                            <div className="information">
                                <i className='bx bx-key icon' ></i>
                                <input type="password" className="input" placeholder="Password" name="password" onChange={handleChange}/>
                            </div>
                            <div>
                                <p>Don't you have any account? <Link to={`/registerP`}><b>Register</b></Link></p>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button type="button" className="btn" onClick={handleSubmit}>Login</button>
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
                {"Succesfully login"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    You have entered the correct information by logging in.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    <Link to={`/user/${usernameLink}`}>Accept</Link>
                </Button>
                </DialogActions>
            </Dialog>
        </div>
        
    )
}

export default Login