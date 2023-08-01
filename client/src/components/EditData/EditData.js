import { useEffect, useState } from "react";
import "./editData.css";
import Button from '@mui/material/Button';
import { useParams , useNavigate } from "react-router-dom";

const EditData = () => {

    const {id} = useParams("");
    const navigate = useNavigate();

    const [inputVal, setInputVal] = useState({
        userName:"",
        email:"",
        phoneNumber:"",
        profession:"",
        address:""
    });

    const getData = async () => {
      const res = await fetch(`http://localhost:8000/get_data/${id}`, {
        method : "GET",
        headers : {
            "Content-Type" : "application/json"
        }
      })

      const data = await res.json();
      setInputVal(data);

      if(res.status === 422 || !data){
        console.log("error");
    }else{
        console.log("data added");
    }

    }

    useEffect(()=>{
        getData();
    },[])


    const inputEvent = (e) => {
        const {name,value} = e.target;
        setInputVal((preVal)=>{
            return {
                ...preVal,
                [name]:value
            }
        })
    }

    const submitData = async (e) => {
        e.preventDefault();
        const {userName, email, phoneNumber, profession, address} = inputVal;
        const res = await fetch(`http://localhost:8000/update_user/${id}`, {
            method : "PATCH",
            headers : {
                "Content-Type":"application/json"
            },
            body : JSON.stringify(
                {
                    userName, email, phoneNumber, profession, address
                }
            )
        });

        const data = res.json();
        console.log(data);

        if(data.status === 404 || !data){
            alert("fill the data");
        }else{
            alert("Successfully data Updated");
            navigate("/")
        }

    }


    
 return(
    <>
        <div className="container mt-5">
            <form className="form">
            <div>
            <label htmlFor="userName">User Name </label>
                <input onChange={inputEvent} value={inputVal.userName} name="userName" type="text" placeholder="User Name"/>
                </div>
                <div>
                <label htmlFor="email">Email </label>
                <input onChange={inputEvent} value={inputVal.email} name="email" type="text" placeholder="Email" />
                </div>
                <div>
                <label htmlFor="phoneNumber">Phone Number </label>
                <input onChange={inputEvent} value={inputVal.phoneNumber} name="phoneNumber" type="text" placeholder="Phone Number" />
                </div>
                <div>
                <label htmlFor="profession">Profession </label>
                <input onChange={inputEvent} value={inputVal.profession} name="profession" type="text" placeholder="Profession" />
                </div>
                <div className="forAddress">
                <label htmlFor="address">Address </label>
                <textarea onChange={inputEvent} value={inputVal.address} name="address" placeholder="Address"></textarea>
                </div>
                <div className="forBtn">
                    <Button onClick={submitData} variant="contained">Edit</Button>
                </div>
            </form>
        </div>
    </>
 )   

}

export default EditData;