import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import EditData from "./components/EditData/EditData";
import Home from "./components/Home/Home";
import RegisterData from "./components/RegisterData/RegisterData";
import UserDetails from "./components/UserDetails/UserDetails";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

const App = () => {
    return (
        <>
        <Router>
        <Navbar/>
<Routes>
<Route exact path="/" element={<Home/>}/>
<Route exact path="/register" element={<RegisterData/> }></Route>
<Route exact path="/edit/:id" element={<EditData/>}/>
<Route exact path="/user_details/:id" element={<UserDetails/>}></Route>
</Routes>
        </Router>
            
            
            

        </>
    )
}

export default App;