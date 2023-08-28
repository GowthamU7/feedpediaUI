
import { useState,useEffect } from "react"
import { useContext } from "react"  
import { authContext } from "../context"
import { ToastContainer,toast } from "react-toastify"

  export default function Myfeed() {

    const [feeds,setFeeds] = useState([])
    const {tknData,triggerSetToken} = useContext(authContext)

    useEffect(()=>{
        async function get(){
            let res =await fetch(`https://feedpedia.onrender.com/myfeed?author=${tknData.author}`,{
            headers:{authorization:`Bearer ${tknData.tkn}`}})
            let resData = await res.json()
            console.log(resData)
            if(resData.msg === "Token Expired!"){
                triggerSetToken('','')
                window.location.assign("/login")
            }
            else setFeeds(resData)
        }
        get()
    },[tknData])


    async function deletePost(id){
        let res = await fetch(`https://feedpedia.onrender.com/delete/${id}`,{method:'DELETE' ,headers:{authorization:`Bearer ${tknData.tkn}`}})
        let resData = await res.json()
        console.log(resData)
        if(resData.msg === "post deleted"){
            setFeeds([])
            toast('Post Deleted.',{theme:"colored",type:"info",position:"top-right"})
        }else{
            setFeeds([])
        }
    }

    return (
        <div className="w-50 m-10 shadow">
            <ToastContainer/>
            <ul role="list" className="divide-y divide-gray-100">
        {feeds.map((feed,i) => (
          <li key={i} className="flex justify-between gap-x-6 py-5 p-4">
            <div className="flex min-w-0 gap-x-4">
              <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={feed.img} alt="" />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{feed.title}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{feed.tagline}</p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900 text-yellow-500">{feed.author}</p>
              <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="w-6 h-6 hover:cursor-pointer"
              onClick={()=>deletePost(feed._id)}
              >
                <path 
                fillRule="evenodd" 
                d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
            </svg>
            </div>
          </li>
        ))}
      </ul>
        </div>
    )
  }
  
