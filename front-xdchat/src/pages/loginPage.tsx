import {useState} from 'react';
import '../css/loginPage.css';
import {useAuth} from "../contexts/authContext";
import {useLocation, useNavigate} from "react-router-dom";

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    let navigate = useNavigate();
    let location = useLocation();
    let auth = useAuth();

    let from = location.state?.from?.pathname || "/";

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        auth.signin(username).then(() => {
            console.log("auth.signin success!");
            navigate(from, {replace: true});
        });
    }

    return (
        <div className="login-page">
            <form onSubmit={handleSubmit} className="login-form">
                <label className="login-form__label">
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                           className="login-form__input"/>
                </label>
                <button type="submit" className="login-form__button">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;