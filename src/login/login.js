import './login.css'
import { useState,useContext, useEffect } from 'react'
import { authContext } from '../context'


function Login(){

    const [input,setInput] = useState({email:'',password:''})
    const [errors,setErrors] = useState({email:'',password:''})
    const {tknData,triggerSetToken} = useContext(authContext)
    useEffect(()=>{
        if(tknData.tkn !== '') window.location.assign('/')
    },[tknData])

    function handleInputChange(e){
        let id = e.target.id
        let vl = e.target.value
        setInput((p)=>{ return {...p,[id]:vl}})
        setErrors((p)=>{ return {...p,[id]:''}})
    }

    async function handleLogin(e){

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
            triggerSetToken('','')
            alert(res_data.msg)
        }
        if(res_data.msg === "Email or password is incorrect."){
            alert("Email or password is incorrect.")
        }

        
    }

    return (
        <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
            
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-20 w-auto"
                    src='../feedpedia.png'
                    alt="Your Company"
                />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={input.email}
                  onChange={handleInputChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <span className="text-sm text-red-600"> {errors.email} </span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={input.password}
                  onChange={handleInputChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <span className="text-sm text-red-600"> {errors.password} </span>
              </div>
            </div>
            <div>
              <button
                type="button"
                onClick={handleLogin}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a href="https://feedpediaui.onrender.com/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              signUp
            </a>
          </p>
        </div>
        </div>
        </div>
    )
}


export default Login