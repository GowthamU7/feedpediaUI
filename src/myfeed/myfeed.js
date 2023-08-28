
import { useState,useEffect } from "react"
import { useContext } from "react"  
import { authContext } from "../context"

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
            alert('Post Deleted')
        }else{
            setFeeds([])
        }
    }

    return (
        <div className="w-50 m-10">
            <ul role="list" className="divide-y divide-gray-100">
        {feeds.map((feed,i) => (
          <li key={i} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={feed.img} alt="" />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{feed.title}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{feed.tagline}</p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">{feed.author}</p>
              <button className="ml-5 w-20 rounded-xl bg-red-300 text-white-800"
              onClick={()=>deletePost(feed._id)}          
              >Delete</button>
            </div>
          </li>
        ))}
      </ul>
        </div>
    )
  }
  