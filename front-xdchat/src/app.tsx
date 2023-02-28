import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import "./app.css";
import {StompProvider} from "./contexts/stompContext";
import {Chat} from "./pages/chat";
import {AuthProvider, RequireAuth} from "./contexts/authContext";
import LoginPage from "./pages/loginPage";
import Spinner from "./components/spinner";
import ErrorPage from "./pages/errorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RequireAuth><Chat/></RequireAuth>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "login",
        element: <LoginPage/>,
    },
]);

function App() {
    return <StompProvider>
        <AuthProvider>
            <RouterProvider router={router} fallbackElement={<Spinner/>}/>
        </AuthProvider>
    </StompProvider>
}

export default App;
