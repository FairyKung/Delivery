import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateUser() {
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [salary, setSalary] = useState("");
    const [cost, setCost] = useState("");
    const [shipment, setShipment] = useState("");
    const [vehicles, setVehicles] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // เช็คว่าได้กรอกข้อมูลครบทุกช่องแล้ว
        if (!name || !lastname || !salary || !cost || !shipment || !vehicles) {
            setMessage("Please fill in all fields.");
            return;
        }

        try {
            // ส่งข้อมูลไปที่ API
            await axios.post("http://localhost:5000/create-user", { 
                name, 
                lastname, 
                salary, 
                cost, 
                shipment, 
                vehicles 
            });
            navigate('/'); // redirect ไปที่หน้า Home

        } catch (error) {
            setMessage("Error creating user, please try again.");
        }
    }

    return (
        <div className="container">
            <h1>Create User</h1>
            {message && <p className="text-danger">{message}</p>}

            <form onSubmit={handleSubmit}>
                <div className="w-25 p-3">
                    <label className="form-label">Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="w-25 p-3">
                    <label className="form-label">Lastname:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        required
                    />
                </div>

                <div className="w-25 p-3">
                    <label className="form-label">Salary:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        required
                    />
                </div>

                <div className="w-25 p-3">
                    <label className="form-label">Cost:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}
                        required
                    />
                </div>

                <div className="w-25 p-3">
                    <label className="form-label">Shipment:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={shipment}
                        onChange={(e) => setShipment(e.target.value)}
                        required
                    />
                </div>

                <div className="w-25 p-3">
                    <label className="form-label">Vehicles:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={vehicles}
                        onChange={(e) => setVehicles(e.target.value)}
                        required
                    />
                </div>

                <div className="w-25 p-3">
                    <button type="submit" className="btn btn-success">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default CreateUser;
