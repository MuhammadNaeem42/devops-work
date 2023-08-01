import { useState } from "react";
import "./registerData.css";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

const RegisterData = () => {
    const navigate = useNavigate()
    const [inputVal, setInputVal] = useState({
        userName:"",
        email:"",
        phoneNumber:"",
        profession:"",
        address:""
    });

    


    const inputEvent = (e) => {
        const {name,value} = e.target;
        setInputVal((preVal)=>{
            return {
                ...preVal,
                [name]:value
            }
        })
    }

const addData = async (e) => {
    e.preventDefault();

    const {userName, email, phoneNumber, profession, address} = inputVal;

    const res =  await fetch("http://localhost:8000/register", {
        method : "POST", 
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            userName, email, phoneNumber, profession, address
        })
    })

    const data = await res.json();



    if(res.status === 422 || !data){
        alert("error");
    }else{
        alert("data added");
        navigate("/")
    }
}
    
 return(
    <>
        <div className="container mt-5">
            <form className="form">
            <div>
            <label htmlFor="userName">User Name <span>*</span></label>
                <input onChange={inputEvent} value={inputVal.userName} name="userName" type="text" placeholder="User Name"/>
                </div>
                <div>
                <label htmlFor="email">Email <span>*</span></label>
                <input onChange={inputEvent} value={inputVal.email} name="email" type="text" placeholder="Email" />
                </div>
                <div>
                <label htmlFor="phoneNumber">Phone Number <span>*</span></label>
                <input onChange={inputEvent} value={inputVal.phoneNumber} name="phoneNumber" type="text" placeholder="Phone Number" />
                </div>
                <div>
                <label htmlFor="profession">Profession <span>*</span></label>
                <input onChange={inputEvent} value={inputVal.profession} name="profession" type="text" placeholder="Profession" />
                </div>
                <div className="forAddress">
                <label htmlFor="address">Address <span>*</span></label>
                <textarea onChange={inputEvent} value={inputVal.address} name="address" placeholder="Address"></textarea>
                </div>
                <div className="forBtn">
                    <Button variant="contained" onClick={addData} >Submit</Button>
                </div>
            </form>
        </div>
    </>
 )   

}

export default RegisterData;