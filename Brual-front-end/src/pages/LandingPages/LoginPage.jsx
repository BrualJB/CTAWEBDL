import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../Service/UserService';
import "../../components/Button";
import "../../styles/LoginPage.css";

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Call the API to login the user
            const { data } = await loginUser({ email, password });
            
            // Store user data in memory (not localStorage as it's not supported in artifacts)
            // In a real application, you would use localStorage or sessionStorage
            const userData = {
                token: data.token,
                user: data.user,
                role: data.role
            };

            // Navigate based on user role
            if (data.role === 'admin') {
                navigate('/admin-dashboard', { 
                    state: { 
                        name: data.user.name || email.split('@')[0],
                        userData: userData
                    } 
                });
            } else {
                navigate('/welcome', { 
                    state: { 
                        name: data.user.name || email.split('@')[0],
                        userData: userData
                    } 
                });
            }
        } catch (error) {
            console.error('Login failed:', error);
            setError(
                error.response?.data?.message || 
                'Login failed. Please check your credentials and try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    const handleRegisterClick = () => {
        console.log('Navigate to registration page');
        navigate('/register');
    };

    return (
        <div className="loginpage-container">
            <div className="loginpage-card">
                <h2 className="loginpage-title">Login</h2>
                
                {error && (
                    <div className="loginpage-error" style={{
                        color: '#dc3545',
                        backgroundColor: '#f8d7da',
                        border: '1px solid #f5c6cb',
                        borderRadius: '4px',
                        padding: '10px',
                        marginBottom: '15px'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="loginpage-form">
                    <div className="loginpage-input-group">
                        <label htmlFor="email" className="loginpage-label">Email:</label>
                        <input
                            type="email"
                            id="email"
                            className="loginpage-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>
                    <div className="loginpage-input-group">
                        <label htmlFor="password" className="loginpage-label">Password:</label>
                        <input
                            type="password"
                            id="password"
                            className="loginpage-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>
                    <Button
                        className="loginpage-button"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>
                </form>
                <div className="loginpage-register">
                    <Button
                        onClick={handleRegisterClick}
                        className="loginpage-register-button"
                        disabled={loading}
                    >
                        Register
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;