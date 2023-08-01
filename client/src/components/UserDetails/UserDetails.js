import styles from "./userDetails.module.css";
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import userImg from "./images/user.png"
import { NavLink, useParams, useNavigate } from "react-router-dom";
import {useState, useEffect } from "react";
const UserDetails = () => {
    const [userData, setUserData] = useState([]);
    const {id} = useParams("");
    const navigate = useNavigate();


    const getData = async() => {
      const res = await fetch(`http://localhost:8000/get_data/${id}`, {
        method : "GET",
        headers : {
            "Content-Type" : "application/json"
        }
      })

      const data = await res.json();
    setUserData(data)
      
      if(res.status === 422 || !data){
        console.log("error");
    }else{
        console.log("data added");
    }

    
    }

useEffect(()=>{
    getData();
}, [])

const deleteUser = async (id) => {
    console.log(id);
    const res = await fetch(`http://localhost:8000/delete_user/${id}`, {
     method : "DELETE",
     headers : {
         "Content-Type":"appliction/json"
     }
    });
    const deleteData = await res.json();
    console.log(deleteData);
 
    if(res.status === 422 || !deleteData){
     console.log("error");
 }else{
     console.log("get Data");
     navigate("/");
 }
 
     }
    return (
        <>
        <div className="container mt-5">
        <h2 className="text-center">Welcome {userData.userName}</h2>
<Card sx={{ minWidth: 275 }} className="mt-3">
    <CardContent>
    <div className={styles.wrapper}>
        <div className={styles.left}>
            <div className={styles.imgDiv}>
                <img src={userImg} alt="userImage" style={{width:"50px"}} />
            </div>


            <h5>Name: <span>{userData.userName}</span> </h5>
            <h5>Age: <span>22</span></h5>
            <h5>Email: <span>{userData.email}</span></h5>
            <h5>Occuption: <span>{userData.profession}</span></h5>

        </div>
        <div className={styles.right}>
        <div className={styles.btns}>
    <NavLink to={`/edit/${userData._id}`}>    <Button variant="contained" className="editBtn"><EditIcon/></Button></NavLink>
            <Button variant="contained" onClick={()=>{
                            deleteUser(userData._id);
                        }} className="deleteBtn"><DeleteIcon/></Button>
            </div>

            <h5>Mobile: <span>{userData.phoneNumber}</span> </h5>
            <h5>Location: <span>Pakistan</span></h5>
            <h5>Address: <span>{userData.address}</span></h5>
            
        </div>
        </div>
    </CardContent>
</Card>
</div>
        </>
    )
}


export default UserDetails;