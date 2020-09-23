import { observable, action } from "mobx";

export class PageModule {

    @observable
    isLoading: boolean = true;

    @action
    setLoading = (loadingState: boolean) => {
        this.isLoading = loadingState
    }

}