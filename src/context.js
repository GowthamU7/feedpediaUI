import { createContext, useEffect, useState } from "react";

export const authContext = createContext()

export function AuthContextProvider({children}){

    const [tknData,setTokenData] = useState(()=>{
        let data = {tkn:'',author:''}
        let token = localStorage.getItem('tkn')
        data.tkn = token !== null ? token : ''
        let author = localStorage.getItem('author')
        data.author = author !== null? author : ''
        return data
    })

    useEffect(()=>{
        localStorage.setItem('tkn',tknData.tkn)
        localStorage.setItem('author',tknData.author)
    },[tknData])

    return <authContext.Provider value={{tknData,triggerSetToken:(tkn,author)=>setTokenData({tkn,author})}}>
        {children}
    </authContext.Provider>
}

