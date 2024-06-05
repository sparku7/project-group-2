import React, { useState } from 'react';

const PasswordInput = ({ onSubmit }) => {
    const [password, setPassword] = useState('');

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        onSubmit(password);
    };

    return (
        <form onSubmit={handlePasswordSubmit}>
            <br></br>
            <label>Enter Admin Password for more details:</label>
            <br></br>
            <br></br>
            <input
                className='input1'
                type="password"
                value={password}
                onChange={handlePasswordChange}
            />
            <br></br>
            <br></br>
            <button className='button1' type="submit">Submit</button>
        </form>
    );
};

export default PasswordInput;
