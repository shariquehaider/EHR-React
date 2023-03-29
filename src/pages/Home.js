import Header from "../components/Navbar";
import Input from "../components/input";
import Button from "../components/Button";
import { doctorInput } from "../json/doctorRegistration";
import "../CSS/Home.css";
import { useState } from "react";

export default function Home(){

    const [doctor, setDoctor] = useState({
        id: "",
        blockAddress: "",
        name: "",
        specification: "",
        address: ""
    });

    function handleChange(event){
        const { name, value } = event.target;
        setDoctor(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    }

    function handleClick(event){
        console.log(doctor);
        event.preventDefault();
    }
    return (
        <div>
            <Header></Header>
            <div className="page_title">Doctor Registration</div>
            <form className="form_control">
            {doctorInput.map((element, i) => <Input key={element.key} placeHolder={element.placeholder} types={element.types} name={element.name} value={doctor[i]} change={handleChange}/> )}
            <Button onSubmit={handleClick}></Button>
            </form>
        </div>
    )
}