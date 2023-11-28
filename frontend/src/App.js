
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Login from "./components/login-page";
import Register from "./components/register-page";
import Home from "./components/home-page";
import Navbar from './components/NavBar';
import NewPost from "./components/NewPost"
import MyPosts from "./components/myPosts";
import Post from "./components/post"
function App() {
  const url="http://localhost:2000/blog/api"
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
<Route path="/login" element={<Login url={url}/>}></Route>
<Route path="/register" element={<Register url={url}/>}></Route>
<Route path="/home" element={<Home url={url}/>}></Route>
<Route path="/NewPost" element={<NewPost url={url}/>}></Route>
<Route path="/post/:id" element={<Post url={url}/>}></Route>
<Route path="/mypost" element={<MyPosts url={url}/>}></Route>

  </Routes>
    </BrowserRouter>
   
    </>
  )
}

export default App;
