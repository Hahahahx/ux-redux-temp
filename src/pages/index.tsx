import React, { memo } from 'react';
import { RouterView } from '@/components/RouterContainer/Routers';
import { LinkTo } from '@/components/RouterContainer/LinkTo';
import { Layout } from 'antd';
// import { usePageStore } from '@/components/Provider/PageProvider';
import { PatchLink } from '@/components/RouterContainer/PatchLink';
import { Heart } from './__Component/Heart';
import Selection from '@/components/Selection/Selection';
import { useBusineesStore } from '@/components/Provider/BusinessProvider';


const Index = () => {

    // const { setLoading } = usePageStore(({ PageModule }) => ({
    //     setLoading: PageModule.setLoading
    // }))

    const { user } = useBusineesStore(({ UserModule }) => ({
        user: UserModule.user
    }))

    console.log('index')

    return (
        <Selection>
            <Layout className='layout'>
                <div className='logo'>
                    <div className='text'>{user}</div>
                    <Heart />
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
                <RouterView />
            </Layout>
        </Selection>
    )
}
export default memo(Index, () => true);

