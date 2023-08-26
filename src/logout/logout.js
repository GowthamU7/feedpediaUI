import { useContext, useEffect, useState } from "react"
import { authContext } from "../context"

import './logout.css'

function Logout(){
    const {tknData,triggerSetToken} = useContext(authContext)
    const [showcf,setShowCf] = useState(true)
    const [dismsg,setDisMsg] = useState('Already logged Out.')

    function hadnleGoback(){
        window.location.assign('/')
    }

    useEffect(()=>{
        if(!tknData.tkn){
            setShowCf(false)
            setDisMsg('Logout Successfull.')
        }
    },[tknData])

    async function handleLogout(){
        if(tknData.tkn){
            var res = await fetch('http://localhost:5000/logout',{
                method:'DELETE',
                headers:{authorization:`Bearer ${tknData.tkn}`}
            })
            var resData = await res.json()
            if(resData.msg === "Logged out!"){
                setShowCf(resData.msg)
                triggerSetToken('','')
                window.location.assign('/login')
            }else{
                alert('something went wrong, try later.')
            }
        }
    }

    return (
        <div className="logout">
            {
                showcf?<div>
                <h4>Confirm Logout</h4>
                <div className="buttons">
                <button onClick={handleLogout}>Yes</button>
                <button onClick={hadnleGoback}>No! Go back</button>
                </div>
            </div>:<h3>{dismsg}</h3>
            }
        </div>
    )
}


export default Logout