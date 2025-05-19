import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerAPI } from '../services/allAPI';

const SignUp = () => {

  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    username: '', email: '', password: ''
  });
  console.log(inputData);

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("inside handle register");
    if (inputData.username && inputData.email && inputData.password) {
      try {
        const result = await registerAPI(inputData);
        console.log(result.status);
        if (result.status == 200) {
          alert(`Welcome ${result.data?.username}, please login and explore`);
          navigate('/sign-in');
          setInputData({ username: '', email: '', password: '' });
        } else {
          if (result.response.status == 406) {
            alert(result.response.data);
            setInputData({ username: '', email: '', password: '' });
          }
        }

      } catch (err) {
        console.log(err);
      }

    } else {
      alert("Please fill the form completely");
    }
  };

  const handleChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div  className="container-fluid px-0" style={{backgroundColor: 'rgba(165, 172, 172, 0.678)', marginTop: '-5px',
        height: 'auto',
        padding: '30px 0'}}>
      <div className="container py-5">
        <h1 className="text-center mb-4">Sign Up</h1>
        <form className="mx-auto" style={{ maxWidth: '400px' }} onSubmit={handleRegister}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Username"
              className="form-control"
              id="username"
              onChange={handleChange}
              value={inputData.username}
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              placeholder="Email"
              className="form-control"
              id="email"
              onChange={handleChange}
              value={inputData.email}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              id="password"
              onChange={handleChange}
              value={inputData.password}
            />
          </div>
          <button
            type="submit"
            className="btn btn-dark w-100"
          >
            Sign Up
          </button>
        </form>
  
        <div className="text-center mt-4">
          <p>Have an account?</p>
          <Link to="/sign-in" className="text-primary">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
