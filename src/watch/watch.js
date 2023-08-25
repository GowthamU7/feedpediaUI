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
    },[params,editMode])

    function handleInput(e){
        
        let id = e.target.id
        let vl = e.target.value

        setTxtInput((p)=>{ return {...p,[id]:vl}})
        setErrors((p)=>{ return {...p,[id]:''}})

    }

    function fileToBlob(file){
        
        return new Promise((res,rej)=>{
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
                <div className='editButton'><button onClick={()=>{setEditMode(true)}}>Edit</button></div>:<div className='loginButton'>
                    <button>
                        <Link to={"/login"}
                            style={{ textDecoration: 'none', color: 'blue' }}
                        >Login To Edit</Link>
                    </button><br /></div>:''
            }
            {editMode?
                <><div>
                    <input
                        type="file"
                        onChange={handleFile}
                        required={true}
                        id="img" />
                    <p style={{ color: "red", fontSize: "small" }}>{erros.img}</p>
                </div><div>
                        <input
                            type="text"
                            value={txtInput.title}
                            onChange={handleInput}
                            placeholder="Title"
                            required={true}
                            id="title" />
                        <p style={{ color: "red", fontSize: "small" }}>{erros.title}</p>
                    </div><div>
                        <input
                            type="text"
                            value={txtInput.tagline}
                            onChange={handleInput}
                            placeholder="Tagline"
                            required={true}
                            id="tagline" />
                        <p style={{ color: "red", fontSize: "small" }}>{erros.tagline}</p>
                    </div><div>
                        <textarea
                            type="body"
                            value={txtInput.body}
                            onChange={handleInput}
                            placeholder="Body"
                            required={true}
                            id="body" />
                        <p style={{ color: "red", fontSize: "small" }}>{erros.body}</p>
                    </div><div>
                        <button onClick={handleSubmit}>Save</button>
                        <button onClick={()=>{setEditMode(false)}}>cancel</button>
                    </div></>
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