import {Outlet} from "react-router-dom";
import Navbar from "./common/Navbar.jsx";

function Layout(){
    return (
        <>
            <div className="min-h-full bg-slate-100">

                {/*<Navbar />*/}
                <main>
                    <div className="w-full">
                        <Outlet />
                    </div>
                </main>
            {/*    Footer goes here*/}
            </div>
        </>);

}

export default Layout;