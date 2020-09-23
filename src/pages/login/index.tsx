import React from 'react'


const Login = () => {

    console.log('login')
    return <div className='page'>Login-Page</div>
}


export default React.memo(Login, () => true);