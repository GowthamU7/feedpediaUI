import './login.css'
import { useState,useContext, useEffect } from 'react'
import { authContext } from '../context'
import { Link } from 'react-router-dom'

function Login(){

    const [input,setInput] = useState({email:'',password:''})
    const [errors,setErrors] = useState({email:'',password:''})
    const {tknData,triggerSetToken} = useContext(authContext)

    useEffect(()=>{
        if( tknData.tkn !== '' ) window.location.assign('/')
    },[tknData])

    function handleInputChange(e){
        let id = e.target.id
        let vl = e.target.value
        setInput((p)=>{ return {...p,[id]:vl}})
        setErrors((p)=>{ return {...p,[id]:''}})
    }

    async function handleLogin(){

        if( input.email === "" || input.password === "") {
            if (input.email === '') setErrors((p)=>{ return {...p,email:'Email is required'}})
            if (input.password === '') setErrors((p)=>{ return {...p,password:'Password is required'}})
            return ;
        }
        
        var res = await fetch('https://feedpedia.onrender.com/login',{
            method:'POST',
            body:JSON.stringify({...input}),
            headers:{authorization:`Bearer ${tknData.tkn}`}
        })

        setInput({email:'',password:''})

        var res_data = await res.json()
       
        if(res_data.tkn){
            triggerSetToken(res_data.tkn,res_data.authorialName)
        }
        if(res_data.msg === "Token Expired"){
            triggerSetToken('')
            alert(res_data.msg)
        }
        if(res_data.msg === "Email or password is incorrect."){
            alert("Email or password is incorrect.")
        }

    }

    return (
        <div className='login'>
            <div>
                <input 
                type='email' 
                id='email' 
                onChange={handleInputChange} 
                value={input.email} 
                placeholder='Email..'
                required/><br/>
                <small>{errors.email}</small>
            </div>
            <div>
                <input 
                type='password' 
                id='password' 
                onChange={handleInputChange} 
                value={input.password} 
                placeholder='Password..'
                required/><br/>
                <small>{errors.password}</small>
            </div>
            <button onClick={handleLogin}>Login</button>
            <p>Not registered? <Link to={"/signup"} style={{color:'blue'}}>SignUp</Link></p>
        </div>
    )
}


export default Login