import React, {FC} from 'react';
import {Provider} from 'react-redux';
import {store} from '@/components/Provider/index';


const ReduxProvider: FC = ({children,}) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};

export default ReduxProvider;