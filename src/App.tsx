import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Routers} from './components/RouterContainer/Routers';
import {routeConfig} from '@/config/router';
import NoMatch from './pages/__Component/NoMatch';
import { useModule } from './components/Provider/Provider';

function App() {

    const {PageModule} = useModule();

    return (
        <BrowserRouter>
            <Routers
                before={(location) => {
                    console.log(location);
                    PageModule.actionLocation(location);
                }}
                after={(location) => {
                }}
                routers={routeConfig}
                noMatch={
                    () => <NoMatch/>
                }/>
        </BrowserRouter>
    );
}

export default React.memo(App, () => true);
