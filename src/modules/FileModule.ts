export enum UserActionTypes {
    SET_USER,
    SET_LOGIN
}


export class FileModule {

    static filename = 'UX';

    static reqUser(dispatch: any) {
        const filename = 'ddd';
        dispatch({
            type: 'sed',
            payload: {filename}
        });
    }
}


