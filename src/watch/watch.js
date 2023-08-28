import { useEffect, useState } from 'react'
import './watch.css'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { authContext } from '../context'
import { Link } from 'react-router-dom'

function Watch(){

    const params = useParams()
    const [feed,setFeed] = useState({body:'',tagline:'',title:'',img:'',author:''})
    const [editMode,setEditMode] = useState(false)
    const [showEditButton,setShowEditButton] = useState(false)
    const {tknData,triggerSetToken} = useContext(authContext)
    const [txtInput,setTxtInput] = useState({title:'',tagline:'',img:'',body:''})
    const [erros,setErrors] = useState({title:'',tagline:'',img:'',body:''})

    useEffect(()=>{
        async function get(){
            let res = await fetch(`https://feedpedia.onrender.com/feed/${params.id}`)
            let resData = await res.json()
            setFeed({...resData})
            setTxtInput({...resData,img:''})
            if(tknData.author === resData.author) setShowEditButton(true)
        }
        get()
    },[params,editMode,tknData])

    function handleInput(e){
        
        let id = e.target.id
        let vl = e.target.value

        setTxtInput((p)=>{ return {...p,[id]:vl}})
        setErrors((p)=>{ return {...p,[id]:''}})

    }

    function fileToBlob(file){
        
        return new Promise((res,rej)=>{

            if(Math.ceil(file.size/1000) > 30) return rej('File size exceeds 30 KB.')
            
            let file_Reader = new FileReader()
            file_Reader.onload = (e)=>{
                return res(e.target.result)
            }
            file_Reader.readAsDataURL(file)
        })

    }

    function handleFile(e){
        
        let file = e.target.files[0]
        fileToBlob(file).then((dt)=>{
            setTxtInput((p)=>{ return {...p,img:dt}})
            setErrors((p)=>{ return {...p,img:''}})
        }).catch((e)=>{
            setErrors((p)=>{ return {...p,img:'File size exceeds 30 KB.'}})
        })

    }

    async function handleSubmit(){
        
        let res = await fetch(`https://feedpedia.onrender.com/feed?id=${params.id}`,{
            method:'PUT',
            body:JSON.stringify({...txtInput,author:tknData.author}),
            headers:{authorization:`Bearer ${tknData.tkn}`}
        })

        let resData = await res.json()
    
        if(resData.updatedFeed){
            setFeed({
                title:resData.updatedFeed.title,
                tagline:resData.updatedFeed.tagline,
                body:resData.updatedFeed.body,
                img:resData.updatedFeed.img,
                author:resData.updatedFeed.author
            })
            setEditMode(false)
            return alert('Posted, Hurrey!')
        }
        if(resData.msg === 'Token Expired!'){
            alert('Session Expired or does not Exist, login to continue..')
            triggerSetToken('','')
        }else{
            setErrors({...resData})
        }

    }


    return (
        <div className='watchFeed'> 
            {   !editMode && feed.author === tknData.author?
                showEditButton ?
                <div className='editButton'>
                    <button 
                    className='bg-teal-400 w-1/3 font-sans mb-6 rounded-l'
                    onClick={()=>{setEditMode(true)}}>Edit Post</button></div>:<div className='loginButton'>
                    <button>
                        <Link to={"/login"}
                            style={{ textDecoration: 'none', color: 'blue' }}
                        >Login To Edit</Link>
                    </button><br /></div>:''
            }
            {editMode?
                <div className="w-full">
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6">
                
              <div>
                  <div className="flex items-center justify-between">
                  <label class="block">
                    <span class="sr-only">Choose profile photo</span>
                        <input type="file" class="block w-full text-sm text-slate-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-violet-50 file:text-violet-700
                                hover:file:bg-violet-100
                                " onChange={handleFile}/>
                    </label>
                    <span class="text-sm text-red-600">{erros.img}</span>
                  </div>
                </div>

                <div>
                  <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                    Title
                  </label>
                  <div className="mt-2">
                    <input
                      id="title"
                      name="title"
                      type="text"
                      value={txtInput.title}
                      onChange={handleInput}
                      required
                      className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <span class="text-sm text-red-600"> {erros.title} </span>
                  </div>
                </div>
    
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="tagline" className="block text-sm font-medium leading-6 text-gray-900">
                      Tagline
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="tagline"
                      name="tagline"
                      type="text"
                      value={txtInput.tagline}
                      onChange={handleInput}
                      required
                      className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <span class="text-sm text-red-600"> {erros.tagline} </span>
                  </div>
                </div>
    
    
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="body" className="block text-sm font-medium leading-6 text-gray-900">
                      Body
                    </label>
                  </div>
                  <div className="mt-2">
                    <textarea
                      id="body"
                      name="body"
                      type="text"
                      value={txtInput.body}
                      onChange={handleInput}
                      required
                      className="pl-2 block w-full h-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <span class="text-sm text-red-600"> {erros.body} </span>
                  </div>
                </div>
                <div className='flex justify-between'>
                <div className='w-1/3'>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex w-full justify-center rounded-md bg-green-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    send
                  </button>
                </div>
                <div className='w-1/2'>
                  <button
                    type="button"
                    onClick={()=>setEditMode(false)}
                    className="flex w-full justify-center rounded-md bg-green-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Cancel
                  </button>
                </div>
                </div>
              </form>
            </div>
            </div>
                    :
                    <div className='article'>
                        <div className='watchImg'>
                            <img src={feed.img} alt={feed.title} />
                        </div>
                        <div className='watchHead'>
                            <h3>{feed.title}<br/><small>{feed.tagline}</small></h3>
                        </div>
                        <div className='watchBody'>
                            <article>
                                {feed.body}
                            </article>
                        </div>
                    </div>}
        </div>
    )
}

export default Watch