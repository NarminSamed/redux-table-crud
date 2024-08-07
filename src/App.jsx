import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import Header from "./components/Header/index.jsx";
import Categories from "./pages/Categories/index.jsx";
import AddCategory from "./pages/AddCategory/index.jsx";
import Basket from "./pages/Basket/index.jsx";
import Favorites from "./pages/Favorites/index.jsx";
import Detail from "./pages/Detail/index.jsx";
import EditCategory from "./pages/EditCategory/index.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Outlet />
      </>
    ),
    children: [
      {
        path: "/",
        element: <Categories />,
      },
      {
        path: "/:id",
        element: <Detail />,
      },
      {
        path: "/edit-category/:id",
        element: <EditCategory />,
      },
  
      {
        path: "/addcategory",
        element: <AddCategory />,
      },
     
      {
        path: "/favorites",
        element: <Favorites />,
      },
      {
        path: "/basket",
        element: <Basket />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
