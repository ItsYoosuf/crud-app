import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateUser from './pages/CreateUser';
import EditUser from './pages/EditUser';
import UserList from './pages/UserList';

function App() {
  return (
    <Router>
      <div className="container">
        <h1 className="mt-4">CRUD Application</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/create" element={<CreateUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
