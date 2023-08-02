import React, { useState } from "react";
import './Modal.css';

export default function Modal() {
    const[modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal)
    }

    if(modal) {
        document.body.classList.add('active-modal')
    }
    else {
        document.body.classList.remove('active-modal')
    }

    return(
        <>
        {/* <button onClick={toggleModal} className='btn-modal'>
            <EmployeeTile />
        </button> */}

        {modal && (
            <div className="modal">
                <div onClick={toggleModal} className="overlay"></div>
                <div className="modal-content">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                    <button className='close-modal' onClick={toggleModal}>X</button>
                </div>
            </div>
        )}

        </>

    );
}