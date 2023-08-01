import "./home.css";
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const Home = () => {
    const [usersData, setUsersData] = useState([]);
    const getData = async () => {
        const res = await fetch("http://localhost:8000/get_data",{
            method : "GET",
            headers : {
                "Content-Type" : "Application/json"
            }
        })

        const data = await res.json();
        setUsersData(data);

        if(res.status === 422 || !data){
            console.log("error");
        }else{
            console.log("get Data");
        }
    }

    useEffect(()=>{
        getData();
    },[])

    const deleteUser = async (id) => {
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
    getData();
}

    }
  return (
        <div className="container mt-5">
            <div className="add_btn mt-2 mb-3">
            <Button variant="contained">
        <NavLink to="/register" style={{color:"#FFFFF7", textDecoration:"none"}}>ADD DATA</NavLink>
      </Button>
            </div>


            <table class="table table-dark">
            <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Profession</th>
      <th scope="col">Details</th>
      <th scope="col">Edit</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
  {usersData.map((ele, id)=>{
                    return(
                    <tr>
                <td>{id+1}</td>
                    <td>{ele.userName}</td>
                    {/* <td>{ele.email}</td> */}
                    {/* <td>{ele.phoneNumber}</td> */}
                    <td>{ele.profession}</td>
                    {/* <td>{ele.address}</td> */}
                    <td>
                    <NavLink to={`/user_details/${ele._id}`}>    <Button  variant="contained" className="readBtn">
                        <VisibilityIcon/>
                        </Button>
                        </NavLink>
                        </td>
<td>
                    <NavLink to={`/edit/${ele._id}`}>    <Button className="editBtn" variant="contained">
                        <EditIcon/>
                        </Button>
                        </NavLink>
                        </td>
                        <td>
                        <Button className="deleteBtn" onClick={()=>{
                            deleteUser(ele._id);
                        }} variant="contained">
                            <DeleteIcon/>
                        </Button>
                    </td>    
                </tr>
                )
                })}
  </tbody>
            </table>
        </div>
  )
}

export default Homes