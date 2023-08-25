import './App.css';
import { BrowserRouter,Routes,Route, Outlet } from 'react-router-dom';
import Head from './header/header';
import Login from './login/login';
import Signup from './signup/signup';
import Logout from './logout/logout';
import Feed from './feed/feed';
import Postfeed from './postFeed/postFeed';
import Watch from './watch/watch';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Head/>
        <Routes>
          <Route path='' element={<Feed/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/newpost' element={<Postfeed/>}/>
          <Route path='/logout' element={<Logout/>}/>
          <Route path='/watch/:id' element={<Watch/>}/>
        </Routes>
      </BrowserRouter>
      <div className='main_App'>
        <Outlet/>
      </div>
    </div>
  );
}

export default App;
