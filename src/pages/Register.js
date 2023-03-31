import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = document.getElementsByName("email")[0].value;
        const password = document.getElementsByName("password")[0].value;
        const confirm = document.getElementsByName("confirm")[0].value;
        const phonenumber = document.getElementsByName("phonenumber")[0].value;
        const address = document.getElementsByName("address")[0].value;

        
        fetch('https://shopmee-server-2.onrender.com/register', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email,
                password: password,
                confirm: confirm,
                phonenumber: phonenumber,
                address: address
            })
        })
        .then(res => { 
            return res.json()
        })
        .then(data => {
            //console.log(data);
            if (data === "OK") {
                toast.success("Registration success!");
                navigate('/login');
            }
            else{
                toast.error(data);
            }
        })
        .catch(e => { 
            //console.log(e.message);
            toast.error(e.message);
        })
    }

    return (
        <div className="container d-flex justify-content-center">
            <div className="jumbotron p-3">
                <form onSubmit={handleSubmit} className="d-flex flex-column">
                    <h2 className="mb-4">Register a new account</h2>

                    <label htmlFor="email" className="form-label m-1">Email</label>
                    <input type="email" name="email" className="form-control mb-3" required />

                    <label htmlFor="password" className="form-label m-1">Password</label>
                    <input type="password" name="password" className="form-control mb-3" required />

                    <label htmlFor="confirm" className="form-label m-1">Confirm password</label>
                    <input type="password" name="confirm" className="form-control mb-3" required />

                    <label htmlFor="phonenumber" className="form-label m-1">Phone number</label>
                    <input type="number" name="phonenumber" className="form-control mb-3" required />

                    <label htmlFor="address" className="form-label m-1">Address</label>
                    <input type="text" name="address" className="form-control mb-3" required />

                    <button className="btn btn-primary mb-3">Register</button>

                    <Link to='/register' id="switch" className="form-text text-center" >Have an account already? Login now.</Link>
                </form>
            </div>
        </div>
    );
}

export default Register;