import { useEffect, useState } from "react"
import './feed.css'



import { Link } from "react-router-dom"

function Feed(){
    
    const [feeds,setFeeds] =  useState([])
    useEffect(()=>{
       async function get(){
            let res = await fetch(`https://feedpedia.onrender.com/feed`)
            let resData = await res.json()
            setFeeds(resData)
       }
       get()
    },[])


    return (
        <div className="feeds">
            {
                feeds.map((feed,i)=>{
                    return (
                        <div className="feed" key={i}>
                        <Link to={`/watch/${feed._id}`}>
                            <div class="max-w-md mx-auto bg-white rounded-xl shadow-xl overflow-hidden md:max-w-2xl">
                                <div class="md:flex h-80 md-h-60">
                                    <div class="md:shrink-0">
                                        <img class="h-48 w-full object-cover md:h-full md:w-48" src={feed.img} alt={feed.title}/>
                                    </div>
                                <div class="p-8">
                                    <div class="font-sans uppercase tracking-wide text-sm text-indigo-500 font-semibold">{feed.title}</div>
                                        <p href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{feed.tagline}</p>
                                        <p class="font-sans mt-2 text-slate-500 break-all">{feed.body.length>20?feed.body.substring(0,20):feed.body}{feed.body.length>30?<span className="text-indigo-500"> ..more</span>:''}</p>
                                    </div>
                                 
                                </div>
                                <p className="pl-8 text-yellow-900 text-sm">Post By {feed.author}</p>
                            </div>
                        </Link>
                    </div>
                    )
                })
            }
        </div>
    )
}


export default Feed