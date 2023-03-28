import Header from "../components/Navbar";
import Form from "../components/Form";
import "../CSS/Home.css";
import "../CSS/Navbar.css";


export default function DoctorDetails(){
    return (
        <div>
            <Header></Header>
            <div className="page_title">Doctor Details</div>
            <Form></Form>
        </div>
    )
}