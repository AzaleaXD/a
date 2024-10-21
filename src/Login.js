import React, { useState, useCallback } from 'react';
import styles from './Login.css'; // Use CSS modules

const FormInput = ({ label, value, onChange, error }) => (
    <div className={styles.formGroup}>
        <label>{label}</label>
        <input
            type="text"
            value={value}
            onChange={onChange}
            required
            className={styles.formInput}
        />
        {error && <p className={styles.formError}>{error}</p>}
    </div>
);

const FormButton = ({ onClick, disabled, children }) => (
    <button onClick={onClick} className={styles.formButton} disabled={disabled}>
        {children}
    </button>
);

function Login() {
    const [authKey, setAuthKey] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validate = useCallback(() => {
        const errors = {};
        if (!authKey) {
            errors.authKey = 'Authentication key is required';
        } else if (authKey.length < 6) {
            errors.authKey = 'Authentication key must be at least 6 characters long';
        }
        return errors;
    }, [authKey]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        setLoading(true);
        try {
            const response = await fetch('https://your-auth-server.com/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ authKey }),
            });
            const data = await response.json();
            if (data.success) {
                setMessage('Login successful!');
            } else {
                setMessage('Invalid authentication key.');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGetKey = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://your-auth-server.com/get-key', {
                method: 'GET',
            });
            const data = await response.json();
            if (data.key) {
                setAuthKey(data.key);
                alert(`Key retrieved successfully: ${data.key}`);
            } else {
                alert('CREATOR LAGI TIDUR BOSS!!!');
            }
        } catch (error) {
            alert('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
                <FormInput
                    label="Authentication Key:"
                    value={authKey}
                    onChange={(e) => setAuthKey(e.target.value)}
                    error={errors.authKey}
                />
                <FormButton disabled={loading}>
                    {loading ? 'Loading...' : 'Login'}
                </FormButton>
            </form>
            <FormButton onClick={handleGetKey} disabled={loading}>
                {loading ? 'Loading...' : 'Get Key'}
            </FormButton>
            {message && <p className={styles.formMessage}>{message}</p>}
            {loading && <div className={styles.loadingSpinner}></div>}
        </div>
    );
}

export default Login;