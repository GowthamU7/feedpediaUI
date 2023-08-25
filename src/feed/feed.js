import { useEffect, useState } from "react"
import './feed.css'

import { Link } from "react-router-dom"

function Feed(){
    
    const [feeds,setFeeds] =  useState([])
    useEffect(()=>{
       async function get(){
            let res = await fetch('https://feedpedia.onrender.com/feed')
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
                            <div className="feed_head">
                                <img src={feed.img} alt={feed.title}/>
                            </div>
                            <div className="feed_body">
                               <h3>{feed.title}<br/><small>{feed.tagline}</small></h3>
                                <div>
                                    <p>{
                                        feed.img.length>280?feed.img.substring(0,280):feed.img
                                    }   <Link to={`/watch/${feed._id}`} style={{textDecoration:'none'}}>more...</Link></p>
                                </div>
                                <div className="feed_foot">
                                    <p style={{
                                        fontFamily:'serif',
                                        fontSize:"x-small",
                                        fontWeight:"bold",
                                        position:'absolute',
                                    }}>Posted By {feed.author}</p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}


export default Feed