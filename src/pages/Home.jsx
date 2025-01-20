import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h2>Welcome to the CRUD Application</h2>
      <Link to="/users" className="btn btn-primary">View Users</Link>
      <Link to="/users/create" className="btn btn-success ml-2">Create User</Link>
    </div>
  );
};

export default Home;
