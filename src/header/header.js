import './header.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { authContext } from '../context'



function Head(){
    const {tknData} = useContext(authContext)

    return (
        <div className='header'>
            <div className='nav'>
                <div className='nav_left'>
                    <Link 
                    to={"/"}
                    style={{textDecoration:"none",color:"white",fontFamily:'Courier New, Courier, monospace'}}
                    >Home</Link>
                </div>
                {tknData.tkn === '' || !tknData.tkn? <div className='nav_right'>
                    <div>
                    <Link 
                    to={"/login"}
                    style={{textDecoration:"none",color:"white",fontFamily:'Courier New, Courier, monospace'}}
                    >Login
                    </Link>
                    </div>
                </div>:
                <div className='nav_right'>
                <div>
                <Link 
                    to={"/newpost"}
                    style={{color:"white",fontFamily:'Courier New, Courier, monospace'}}
                    >New post</Link>
                    </div>
                    <div>
                    <Link 
                        to={"/logout"}
                        style={{color:"white",fontFamily:'Courier New, Courier, monospace'}}
                        >Logout</Link>
                        </div>
                    </div>
                    }
            </div>
        </div>
    )
}


export default Head