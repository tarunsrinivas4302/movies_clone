import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import SingleMovie from "./pages/SingleMovie";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const App = () => {


    const Layout = () => {
        return (
            <>
                <header className="abs-head"><Header /></header>
                <main>
                    <Outlet />
                </main>
                <footer className="footer h-96"><Footer /></footer>
            </>
        )
    }


    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [

                {
                    path: "/home",
                    element: <Home />
                },
                {
                    path: "/movie/:name/:id",
                    element: <SingleMovie />
                }
            ]
        },
        {
            path: "*",
            element: <h1>404 Not Found</h1>
        }
    ])



    return (
        <RouterProvider router={router} />
    );
}

export default App
