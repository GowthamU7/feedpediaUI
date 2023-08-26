import './signup.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'


function Signup(){

    const [input,setInput] = useState({email:'',password:'',cnPassword:'',authorialName:''})
    const [errors,setErrors] = useState({email:'',password:'',cnPassword:'',authorialName:''})

    function handleInputChange(e){
        let id = e.target.id
        let vl = e.target.value
        if(id === 'authorialName'){
            if( vl[0] === '@' ){
                vl = '@'+vl.split('@')[1]
            }else{
                vl = '@'+vl
            }
            setInput((p)=>{ return {...p,authorialName:vl}})
        }else{
            setInput((p)=>{ return {...p,[id]:vl}})
        }
        setErrors((p)=>{ return {...p,[id]:''}})
    }


    async function submitData(){
        if(errors.email === '' && errors.password === '' && errors.cnPassword === '' && errors.authorialName === ''){
            let res = await fetch('http://localhost:5000/signup',{
                method:'POST',
                body:JSON.stringify({
                    email:input.email,
                    password:input.password,
                    authorialName:input.authorialName
                })
            })

            let resData = await res.json()
            if(resData.msg){
                alert(resData.msg)
                window.location.assign('/login')
            }else{
                setErrors({...resData,cnPassword:''})
            }
        }
    }


    function handleSubmit(){

        input.email === ''? setErrors((p)=>{ return {...p,email:'Cannot be empty.'}}) : setErrors((p)=>{return {...p,email:''}})
        input.password === ''? setErrors((p)=>{ return {...p,password:'Password be empty.'}}) : setErrors((p)=>{return {...p,password:''}})
        input.cnPassword !== input.password ? setErrors((p)=>{ return {...p,cnPassword:'Confirm password should match!'}}) : setErrors((p)=>{return {...p,cnPassword:''}})
        input.authorialName === ''? setErrors((p)=>{ return {...p,authorialName:'Cannot be empty.'}}) :  setErrors((p)=>{return {...p,authorialName:''}})
        
        submitData()

    }

    return (
        <div className='signup'>
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
            <div>
                <input 
                type='text' 
                id='cnPassword' 
                onChange={handleInputChange} 
                value={input.cnPassword} 
                placeholder='Confirm Password..'
                required/><br/>
                <small>{errors.cnPassword}</small>
            </div>
            <div>
                <input 
                type='text' 
                id='authorialName' 
                onChange={handleInputChange} 
                value={input.authorialName} 
                placeholder='authorialName..'
                required/><br/>
                <small>{errors.authorialName}</small>
            </div>
            <button onClick={handleSubmit}>SignUp</button>
            <p>Already Registered? <Link to={"/login"} style={{color:'blue'}}>Login</Link></p>
        </div>
    )
}


export default Signup