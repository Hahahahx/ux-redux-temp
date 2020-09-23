import React from 'react'
import { Button } from 'antd'
import {useModule} from '@/components/Provider';



const Main = () => {

    const {UserModule} = useModule();

    return (
        <div style={{ textAlign: 'center' }}>
            <div className='page'>Main-Page</div>
            <Button ghost onClick={()=>{
                UserModule.reqUser();
            }}>Toggle-Name</Button>
        </div>
    )
}



export default React.memo(Main, () => true);