import { createContext, useEffect, useState } from "react";

export const authContext = createContext()

export function AuthContextProvider({children}){

    const [tknData,setTokenData] = useState(()=>{
        
        let token = localStorage.getItem('tkn')
        token = token === 'null' || token === '' ? '' :token
        let author = localStorage.getItem('author')
        author = author === 'null' || author === ''?'':author
        return {tkn:token,author}
    })

    useEffect(()=>{
        localStorage.setItem('author',tknData.author)
        localStorage.setItem('tkn',tknData.tkn)
    },[tknData])

    return <authContext.Provider value={{tknData,triggerSetToken:(tkn,author)=>setTokenData({tkn,author})}}>
        {children}
    </authContext.Provider>
}

