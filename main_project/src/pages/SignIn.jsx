import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginAPI } from '../services/allAPI';

const SignIn = () => {
  const navigate = useNavigate();

  const [inputData, setInputData] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.id]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (inputData.email && inputData.password) {
      setLoading(true);
      try {
        const result = await loginAPI(inputData);
        if (result.status === 200) {
          sessionStorage.setItem('user', JSON.stringify(result.data.user)); // user is object ✅
          sessionStorage.setItem('token', result.data.token); // token is string ✅
          alert("Logged in successfully!");
          setInputData({ email: '', password: '' });
          setTimeout(() => {
            navigate('/');
          }, 1000);
        }
        
      } catch (err) {
        console.error(err);
        const status = err?.response?.status;
        const message = err?.response?.data;
  
        if (status === 404) {
          alert("Incorrect email or password.");
        } else if (status === 401) {
          alert("Unauthorized access.");
        } else {
          alert("Something went wrong. Please try again.");
        }
      }
      setLoading(false);
    } else {
      alert('Please fill in both fields.');
    }
  };

  return (
   <div  className="container-fluid px-0" style={{backgroundColor: 'rgba(165, 172, 172, 0.678)', marginTop: '-5px',
        height: 'auto',
        padding: '30px 0'}}>
      <div className="container py-5" >
        <h1 className="text-center mb-4">Sign In</h1>
        <form className="mx-auto" style={{ maxWidth: '400px' }} onSubmit={handleLogin}>
          {errorMsg && (
            <div className="alert alert-danger">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="alert alert-success">
              {successMsg}
            </div>
          )}
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
          <div className="mb-3 position-relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="form-control"
              id="password"
              onChange={handleChange}
              value={inputData.password}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="position-absolute top-50 end-0 translate-middle-y pe-3 text-primary cursor-pointer"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>
          <button
            type="submit"
            className="btn btn-dark w-100"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <div className="text-center mt-4">
          <p>Don't have an account?</p>
          <Link to="/sign-up" className="text-primary">Sign up</Link>
        </div>
      </div>
   </div>
  );
};

export default SignIn;
