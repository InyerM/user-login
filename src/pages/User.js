import React, { useState } from 'react'
import {useParams} from 'react-router-dom'
import '../styles/userInfo.css'

const User = () => {

    const username = useParams()
    const[info, setInfo] = useState([])

    React.useEffect(() => {
        fetch("http://localhost:3001/api/infoUsers", {
            "method": "GET",
            "headers": {}
        })
        .then(response => response.json())
        .then(data => {
            let filteredData = data.filter(user => user.Username === username.id)
            setInfo(filteredData)
        })
        .catch(err => {
            console.error(err)
        })
    }, [])

    return(
        <div className="page d-flex align-items-center">
            <div className="container d-flex justify-content-center">
                <div className="user-card row">
                    <div className="info col-9">
                        <p>Names</p>
                        <h3>{info[0]?.Names}</h3>
                    </div>
                    <div className="info col-3">
                        <p>User Id</p>
                        <h3>{info[0]?.Id}</h3>
                    </div>
                    <div className="info col-9">
                        <p>Lastnames</p>
                        <h3>{info[0]?.Lastnames}</h3>
                    </div>
                    <div className="info col-3">
                        <p>Type of Id</p>
                        <h3>{info[0]?.TypeOfId}</h3>
                    </div>
                    <div className="info col-5">
                        <p>Identification</p>
                        <h3>{info[0]?.IdentificationNumber}</h3>
                    </div>
                    <div className="info col-7">
                        <p>Username</p>
                        <h3>{info[0]?.Username}</h3>
                    </div>
                    <div className="info col">
                        <p>Email</p>
                        <h3>{info[0]?.Email}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User