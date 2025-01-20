// src/components/EditUser.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUsers, updateUser } from '../services/allAPI'; // Import getUsers and updateUser

const EditUser = () => {
    const { id } = useParams(); // Get user ID from URL params
    const [user, setUser] = useState({ name: '', email: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetch the user's current details when the component loads
    useEffect(() => {
        const fetchUserById = async () => {
            try {
                const usersData = await getUsers(); // Fetch all users
                const currentUser = usersData.find((u) => u.id === parseInt(id));
                if (currentUser) {
                    setUser(currentUser);
                } else {
                    throw new Error('User not found');
                }
            } catch (err) {
                setError('Failed to fetch user details.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserById();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateUser(id, user); // Use updateUser API function
            navigate('/users'); // Redirect to the user list page after successful update
        } catch (err) {
            setError('Failed to update user. Please try again.');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div>
            <h2>Edit User</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">Update User</button>
            </form>
        </div>
    );
};

export default EditUser;
