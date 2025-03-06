import axios from "axios";
import { useState } from "react";
import backgroundImage from "../assests/admin-bg1.png"; // Ensure the image is stored in the `assets` folder

function AdminProfile() {
    const userid = sessionStorage.getItem("userid");
    const uname = sessionStorage.getItem("uname");
    const [user, setUser] = useState({
        uname: uname,
        userid: userid,
        pwd: "",
    });

    const handleInput = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:7777/api/admin", user)
            .then((resp) => {
                console.log(resp);
                alert("Profile updated successfully");
                sessionStorage.setItem("uname", user.uname);
            })
            .catch((error) => console.log("Error", error));
    };

    return (
        <div className="d-flex align-items-center justify-content-center vh-100 text-white"
            style={{ 
                backgroundImage: `url(${backgroundImage})`, 
                backgroundSize: "cover", 
                backgroundPosition: "center" 
            }}
        >
            <div className="card shadow-lg p-4" style={{ width: "400px", backgroundColor: "rgba(0, 0, 0, 0.7)", borderRadius: "15px" }}>
                <h4 className="text-center border-bottom pb-2 text-success">Admin Profile</h4>
                <h5 className="text-center my-3">Welcome, {user.uname}!</h5>
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input type="text" className="form-control" name="uname" value={user.uname} onChange={handleInput} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" name="userid" value={user.userid} disabled />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">New Password</label>
                        <input type="password" className="form-control" name="pwd" onChange={handleInput} />
                    </div>

                    <button type="submit" className="btn btn-success w-100">Update Profile</button>
                </form>
            </div>
        </div>
    );
}

export default AdminProfile;
