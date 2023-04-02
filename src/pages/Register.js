import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post(
        ' http://localhost:8000/api/auth/register',
        {
          username: username,
          password: password,
        }
      );

      if (response.status) {
        toast.success('Registration success!');
        navigate('/login');
      } else {
        toast.error(response.data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className='container d-flex justify-content-center'>
      <div className='jumbotron p-3'>
        <form onSubmit={handleSubmit} className='d-flex flex-column'>
          <h2 className='mb-4'>Register a new account</h2>

          <label htmlFor='username' className='form-label m-1'>
            username
          </label>
          <input
            type='username'
            name='username'
            className='form-control mb-3'
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor='password' className='form-label m-1'>
            Password
          </label>
          <input
            type='password'
            name='password'
            className='form-control mb-3'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor='confirm' className='form-label m-1'>
            Confirm password
          </label>
          <input
            type='password'
            name='confirm'
            className='form-control mb-3'
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button className='btn btn-primary mb-3'>Register</button>

          <Link to='/login' id='switch' className='form-text text-center'>
            Have an account already? Login now.
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
