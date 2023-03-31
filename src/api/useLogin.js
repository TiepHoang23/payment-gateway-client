import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../contexts/AuthContext';

export const useLogin = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const login = (username, password) => {
    fetch('http://localhost:8000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => {
        //if (!res.ok) {throw Error("Something went wrong")}
        return res.json();
      })
      .then((data) => {
        if (data.isSuccess) {
          //console.log(data.email);
          toast.success('Login success');
          // Set AuthContext data
          const state = { token: data.token, user: data.user };
          setUser(state);
          // Set LocalStorage
          localStorage.setItem('user', JSON.stringify(state));
          navigate('/cart');
        } else {
          toast.error(data);
        }
      })
      .catch((e) => {
        console.log(e.message);
        toast.error('Something went wrong');
      });
  };

  return { login };
};
