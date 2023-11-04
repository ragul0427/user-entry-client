import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Login,Register,Home } from "./components";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="register" element={<Register/>}/>
    </Route>
  )
);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;