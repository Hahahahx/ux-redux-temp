import { useModule } from '@/components/Provider/Provider'
import { Button } from 'antd'
import React from 'react'


const Login = () => {

    const { FileModule } = useModule()

    return (
        <div style={{ textAlign: 'center' }}>
            <div className='page'>
                FileModule-filename:{FileModule.filename}
            </div>
            <Button ghost onClick={() => {
                FileModule.reqFile()
            }}>ChangeFileModuleByAction</Button>
            <Button ghost onClick={() => {
                FileModule.reqFilebyUpdate()
            }}>ChangeUserModuleByUpdate</Button>
        </div>
    )
}


export default React.memo(Login, () => true);