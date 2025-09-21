import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Products from '../Products/Products'
import TopProducts from '../TopProducts/TopProducts'
import Banner from '../Banner/Banner'
import Subscribe from '../Subscribe/Subscribe'
import Footer from '../Footer/Footer'

const SignUp = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('customer'); // default value
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    fetch(`${import.meta.env.VITE_API_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        role,   // send role to backend
        email,
        password,
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
     if(data.status === 201){
        const userinfo = {
            status: data.status,
            message: data.message,
            id : data.userID,
            name : data.name,
            role : role
        }
        localStorage.setItem('userinfo', JSON.stringify(userinfo));
        window.location.href = '/login';
     }
    })
    .catch((error) => {
      setError(error.message);
    });
  };

  return (
    <>
    <Navbar/>
    <div className="login-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter name"
          />
        </div>

        {/* User Type Radio Buttons */}
        <div className="form-group">
          <label>User Type:</label>
          <div className="radio-group">
            <label className="radio-option">
              <input
                type="radio"
                value="customer"
                checked={role === 'customer'}
                onChange={(event) => setRole(event.target.value)}
              />
              <span>Customer</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                value="admin"
                checked={role === 'admin'}
                onChange={(event) => setRole(event.target.value)}
              />
              <span>Admin</span>
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter password"
          />
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Confirm password"
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
    <Products/>
    <TopProducts/>
    <Banner/>
    <Subscribe/>
    <Footer/>

    {/* Inline CSS for radio buttons */}
    <style>{`
       .radio-group {
  display: flex;
  gap: 20px;
  margin-top: 5px;
}
.radio-group label {
  font-size: 17px;
  color: #333;
}
.radio-group input[type="radio"] {
  width: 15px;
  height: 15px;
  margin-right: 5px;
}
    `}</style>
 </> );
};

export default SignUp;
