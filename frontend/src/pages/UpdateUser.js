import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateUser = () => {
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [salary, setSalary] = useState("");
    const [cost, setCost] = useState("");
    const [shipment, setShipment] = useState("");
    const [Vehicles, setVehicles] = useState("");
    const [message, setMessage] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/user/${id}`);
                setName(res.data.name);
                setLastname(res.data.lastname);
                setSalary(res.data.salary);
                setCost(res.data.cost);
                setShipment(res.data.shipment);
                setVehicles(res.data.Vehicles);
            } catch (error) {
                setMessage("Error Fetching User");
            }
        };

        if (id) {
            fetchUser();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/update-user/${id}`, { name, lastname, salary, cost, shipment, Vehicles });
            navigate("/");
        } catch (error) {
            setMessage("Error Updating User. Please Try Again");
        }
    };

    return (
        <div className='container'>
            <h2>Update User</h2>
            {message && <p className='text-danger'>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className='w-25 mb-3'>
                    <label className='form-label'>Name:</label>
                    <input
                        type='text'
                        className='form-control'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className='w-25 mb-3'>
                    <label className='form-label'>Lastname:</label>
                    <input
                        type='text'
                        className='form-control'
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        required
                    />
                </div>

                <div className='w-25 mb-3'>
                    <label className='form-label'>Salary:</label>
                    <input
                        type='number'
                        className='form-control'
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        required
                    />
                </div>

                <div className='w-25 mb-3'>
                    <label className='form-label'>Cost:</label>
                    <input
                        type='number'
                        className='form-control'
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}
                        required
                    />
                </div>

                <div className='w-25 mb-3'>
                    <label className='form-label'>Shipment:</label>
                    <input
                        type='number'
                        className='form-control'
                        value={shipment}
                        onChange={(e) => setShipment(e.target.value)}
                        required
                    />
                </div>

                <div className='w-25 mb-3'>
                    <label className='form-label'>Vehicles:</label>
                    <input
                        type='number'
                        className='form-control'
                        value={Vehicles}
                        onChange={(e) => setVehicles(e.target.value)}
                        required
                    />
                </div>

                <button type='submit' className='btn btn-success'>Submit</button>
            </form>
        </div>
    );
};

export default UpdateUser;
