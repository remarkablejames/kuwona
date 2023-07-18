import {Routes,Route} from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./components/Home.jsx";
import PageNotFound from "./components/PageNotFound.jsx";
import IdeaList from "./features/ideas/IdeaList.jsx";
import Login from "./features/auth/Login.jsx";
import Comments from "./features/ideas/Comments.jsx";
import CreatePost from "./features/ideas/CreatePost.jsx";

function App(){
    return(
        <Routes>
            <Route path="login" element={<Login/>}/>
            <Route path="/" element={<Layout />}>
                <Route path="feed" element={<Home />} >
                    <Route index element={<IdeaList/>} />
                    <Route path="comment" element={<Comments />} />
                    <Route path="newpost" element={<CreatePost />} />

                </Route>
            <Route path="feed" element={<IdeaList/>} />
            {/*    protected routes will go here*/}
            </Route>
            <Route path="*" element={ <PageNotFound />  } />
        </Routes>
    )
}

export default App;