import React from 'react'
import { Button } from 'antd'
import { useModule } from '@/components/Provider/Provider';



const Main = () => {

    const { UserModule, FileModule } = useModule();

    return (
        <div style={{ textAlign: 'center' }}>
            <div className='page'>
                FileModule - fileType:{FileModule.fileType} <br/>
                UserModule - user:name:{UserModule.user.name}
            </div>
            <Button ghost onClick={() => {
                UserModule.reqUser()
            }}>ChangeFileModule</Button>
        </div>
    )
}

export default React.memo(Main, () => true);