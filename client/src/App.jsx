import {Routes,Route} from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./components/Home.jsx";
import PageNotFound from "./components/PageNotFound.jsx";

function App(){
    return(
        <Routes>
            <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            {/*    protected routes will go here*/}
            </Route>
            <Route path="*" element={ <PageNotFound />  } />
        </Routes>
    )
}

export default App;