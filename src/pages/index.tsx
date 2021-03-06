import React, {memo} from 'react';
import {RouterView} from '@/components/RouterContainer/Routers';
import {LinkTo} from '@/components/RouterContainer/LinkTo';
import {Layout} from 'antd';
import {PatchLink} from '@/components/RouterContainer/PatchLink';
import {Heart} from './__Component/Heart';
import Selection from '@/components/Selection/Selection';


const Index = () => {

    //const {UserModule} = useModule();

    console.log('------------------------')

    return (
        <Selection>
            <Layout className='layout'>
                <div className='ux-logo'>
                    {/* <div className='text'>{UserModule.user.name}</div> */}
                    <Heart/>
                </div>
                <div className='bread'>
                    <PatchLink
                        to='/main'
                        componentPath='pages/main/index.tsx'
                    >main</PatchLink> /
                    <PatchLink
                        to='/login'
                        componentPath='pages/login/index.tsx'
                    >login</PatchLink> /
                    <LinkTo to={`/${Math.random()}`}>
                        noMatch
                    </LinkTo>
                </div>
                <RouterView/>
            </Layout>
        </Selection>
    );
};
export default memo(Index, () => true);

