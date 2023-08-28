import './signup.css'
import { useState } from 'react'

function Signup(){

    const [input,setInput] = useState({email:'',password:'',cnPassword:'',authorialName:''})
    const [errors,setErrors] = useState({email:'',password:'',cnPassword:'',authorialName:''})

    function handleInputChange(e){
        let id = e.target.id
        let vl = e.target.value
    
        if(id === 'authorialName'){
            if(vl[0] === '@') vl = vl.split('@')[1]
            setInput((p)=>{ return {...p,authorialName:vl.length === 1 && vl[0] === '@'?'':'@'+vl}})
        }else{
            setInput((p)=>{ return {...p,[id]:vl}})
        }
        setErrors((p)=>{ return {...p,[id]:''}})
    }


    async function submitData(){
        if(errors.email === '' && errors.password === '' && errors.cnPassword === '' && errors.authorialName === ''){
            let res = await fetch('https://feedpedia.onrender.com/signup',{
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
        <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
            
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-20 w-auto"
                    src='../feedpedia.png'
                    alt="Your Company"
                />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create your account
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
                <span class="text-sm text-red-600"> {errors.email} </span>
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
                <span class="text-sm text-red-600"> {errors.password} </span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="cnPassword" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirm
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="cnPassword"
                  name="cnPassword"
                  type="text"
                  autoComplete="current-password"
                  value={input.cnPassword}
                  onChange={handleInputChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <span class="text-sm text-red-600"> {errors.cnPassword} </span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  authorialName
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="authorialName"
                  name="authorialName"
                  type="text"
                  value={input.authorialName}
                  onChange={handleInputChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <span class="text-sm text-red-600"> {errors.authorialName} </span>
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={handleSubmit}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{' '}
            <a href="https://feedpediaui.onrender.com/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              signIn
            </a>
          </p>
        </div>
        </div>
        </div>
    )
}


export default Signup