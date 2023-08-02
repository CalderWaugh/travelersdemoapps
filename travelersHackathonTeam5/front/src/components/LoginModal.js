import React, { useState, useRef, useEffect } from 'react';
import LoginPrompt from './LoginPrompt';
import SignupPrompt from './SignupPrompt';
import './LoginModal.css';
import LoginError from './LoginError';

const LoginModal = ({ open, onRequestClose, setOpen }) => {
    const [loginOrSignup, setLoginOrSignup] = useState(true);
    const [error, setErrorState] = useState('');
    const dialogRef = useRef(null);

    useEffect(() => {
        const dialogNode = dialogRef.current;
        if (open) {
            dialogNode.showModal()
        } else {
            dialogNode.close()
        }
    }, [open])

    useEffect(() => {
        setErrorState('');
    }, [loginOrSignup])

    useEffect(() => {
        const dialogNode = dialogRef.current
        const handleCancel = (event) => {
            event.preventDefault()
            setLoginOrSignup(true);
            setOpen(false)
        }
        dialogNode.addEventListener('cancel', handleCancel);
        return () => {
            dialogNode.removeEventListener('cancel', handleCancel)
        }
    }, [onRequestClose])

    return (
        <>
            <dialog ref={dialogRef}>
            <LoginError error={error} setError={setErrorState}/>
                    {
                        loginOrSignup ?
                            <LoginPrompt setOpen={setOpen} setError={setErrorState}/> :
                            <SignupPrompt setOpen={setOpen} setError={setErrorState} setBack={setLoginOrSignup}/>
                    }
                <div className="switch-field">
                <button onClick={() => setLoginOrSignup(!loginOrSignup)} >
                    {loginOrSignup ? 'Register' : 'Back to Login'}</button>
                </div>
            </dialog>
        </>
    )
}

export default LoginModal;