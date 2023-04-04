import Add from "./components/Blogs/Add";
import Login from "./components/Login";
import Register from "./components/Register";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <>hello</>,
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/blog/add",
    element: <Add />
  }
]);
function App() {
  return (
    <RouterProvider router={routes} />
  );
}

export default App;
