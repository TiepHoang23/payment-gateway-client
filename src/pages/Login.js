import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../api/useLogin';

const Login = () => {
  const { login } = useLogin();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleLogin = async (e) => {
    e.preventDefault();

    await login(username, password);
  };

  return (
    <div className='container d-flex justify-content-center form-container'>
      <div className='jumbotron p-3'>
        <form className='d-flex flex-column' onSubmit={handleLogin}>
          <h2 className='mb-4'>Login into your account</h2>

          <label htmlFor='email' className='form-label m-1'>
            Username
          </label>
          <input
            type='text'
            name='Username'
            className='form-control mb-3'
            required
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />

          <label htmlFor='password' className='form-label m-1'>
            Password
          </label>
          <input
            type='password'
            name='password'
            className='form-control mb-3'
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <button className='btn btn-primary mb-3'>Login</button>

          <Link to='/register' id='switch' className='form-text text-center'>
            Don't have an account yet? Register now.
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
