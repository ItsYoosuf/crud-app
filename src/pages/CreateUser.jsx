// src/components/CreateUser.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/allAPI'; // Import createUser from allAPI.js

const CreateUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createUser({ name, email }); // Use createUser API function
            navigate('/users'); // Redirect to the user list page after successful creation
        } catch (err) {
            setError('Failed to create user. Please try again.');
        }
    };

    return (
        <div>
            <h2>Create User</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">Create User</button>
            </form>
        </div>
    );
};

export default CreateUser;
