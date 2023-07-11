import {Outlet} from "react-router-dom";
import Navbar from "./common/Navbar.jsx";

function Layout(){
    return (
        <>
            <div className="min-h-full">

                <Navbar />
                <main>
                    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-2">
                        <Outlet />
                    </div>
                </main>
            {/*    Footer goes here*/}
            </div>
        </>);

}

export default Layout;