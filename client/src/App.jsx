import {Routes,Route} from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./components/Home.jsx";
import PageNotFound from "./components/PageNotFound.jsx";
import IdeaList from "./features/ideas/IdeaList.jsx";
import Login from "./features/auth/Login.jsx";
import Comments from "./features/ideas/Comments.jsx";

function App(){
    return(
        <Routes>
            <Route path="login" element={<Login/>}/>
            <Route path="comment" element={<Comments />} />
            <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="feed" element={<IdeaList/>} />
            {/*    protected routes will go here*/}
            </Route>
            <Route path="*" element={ <PageNotFound />  } />
        </Routes>
    )
}

export default App;