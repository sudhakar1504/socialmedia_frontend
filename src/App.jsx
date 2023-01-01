import './App.css';
import Register from './Pages/Register/Register';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './Pages/Login/Login';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Home from './Pages/Home/Home';
import Createpost from './Pages/Createpost/Createpost';
import Viewpost from './Pages/Viewpost/Viewpost';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create/:id",
    element: <Createpost />,
  },
  {
  path: "/viewpost/:id",
  element: <Viewpost />,
},
]);

function App() {
  return (
   <div>
     <ToastContainer limit={1}/>
    <RouterProvider router={router} />
   </div>
  );
}

export default App;
