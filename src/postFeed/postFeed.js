import { useContext, useEffect } from "react";
import { authContext } from "../context";
import { useState } from "react";

import './postFeed.css'

function Postfeed(){

    const [txtInput,setTxtInput] = useState({title:'',tagline:'',img:'',body:''})
    const [erros,setErrors] = useState({title:'',tagline:'',img:'',body:''})
    const {tknData,triggerSetToken} = useContext(authContext)
    
    useEffect(()=>{
        if(tknData.tkn === ''){
            alert('Session expired, login to continue..')
        }
    })

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
        
        let res = await fetch('http://localhost:5000/feed',{
            method:'POST',
            body:JSON.stringify({...txtInput,author:tknData.author}),
            headers:{authorization:`Bearer ${tknData.tkn}`}
        })

        let resData = await res.json()
       
        if(resData.msg === 'Posted, Hurrey!'){return alert('Posted, Hurrey!')}
        if(resData.msg === 'Token Expired!'){
            alert('Your session has Expired, login to continue..')
            triggerSetToken('','')
        }else{
            setErrors({...resData})
        }

    }

    return(
        <div className="postFeed">
            <div>
            <input
                type="text"
                value={txtInput.title}
                onChange={handleInput}
                placeholder="Title"
                required={true}
                id="title"
                />
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
                <input
                    type="file"
                    onChange={handleFile}
                    required={true}
                    id="img" />
                <p style={{ color: "red", fontSize: "small" }}>{erros.img}</p>
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
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}


export default Postfeed