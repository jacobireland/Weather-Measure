import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../components/Home";
import Forecast from "../components/Forecast";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {path: "", element: <Home/>},
            {path: "forecast", element: <Forecast/>}
        ]
    }
])