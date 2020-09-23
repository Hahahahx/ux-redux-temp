import React from 'react'
import { Button } from 'antd'
import { useBusineesStore } from '@/components/Provider/BusinessProvider'



const Main = () => {

    const { setUser } = useBusineesStore(({ UserModule }) => ({
        setUser: UserModule.setUser
    }))

    console.log('main')

    return (
        <div style={{ textAlign: 'center' }}>
            <div className='page'>Main-Page</div>
            <Button ghost onClick={()=>setUser()}>Toggle-Name</Button>
        </div>
    )
}



export default React.memo(Main, () => true);