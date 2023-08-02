import React, { useEffect, useRef } from 'react';
import './Error.css'

const LoginError = ({error, setError}) => {
    const display = useRef(0);
    
    const handleClose = () => {
        setError('');
    }

    return (
    <>  { error === '' ? null : 
            <div className='error' ref={display}>
                <button onClick={handleClose}>{error}</button>
            </div>
    }
    </>
    )
}

export default LoginError;