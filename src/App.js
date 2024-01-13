import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./views/Login";
import Main from "./views/Main";
import User from "./views/User";
import { AuthProvider } from "./context/AuthContext";
import Glucose from "./views/Glucose";
import AddGlucose from "./views/AddGlucose";

const App = () => {
  const [isAuth, setIsAuth] = React.useState(false);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: <Main />,
    },
    {
      path: "/add-user",
      element: <User />,
    },
    {
      path:"/glucose",
      element: <Glucose/>,
    },
    {
      path:"/add-glucose",
      element: <AddGlucose/>,
    }
  ]);

  React.useEffect(() => {
    const token = localStorage.getItem("User");
    if (token === null) {
      setIsAuth(false);
      router.navigate("/");
    }

    if (token) {
      setIsAuth(true);
      router.navigate("/dashboard");
    }
  }, []);

  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
};

export default App;
