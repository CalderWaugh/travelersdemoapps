import React from 'react';
import '../App.css';
import Employee from './Employee';
import Manager from './Manager';

function Home(userState) {
    const { role, authorized } = userState.userState;
    return(
        <div className={'App'}>
            <h3 className={'header-three'}>Home</h3>
            {(authorized === true && role === 'emp') && <Employee userState={userState}/>}
            {(authorized === true && role === 'man') && <Manager userState={userState}/>}
            {(authorized !== true) && <p className={'failed'}>Unauthorized to access this page. Please head back to sign in.</p>}
        </div>
    )
}

export default Home;