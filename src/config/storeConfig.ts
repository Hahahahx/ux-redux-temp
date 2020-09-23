import { UserModule } from "@/modules/UserModule"
import { PageModule } from "@/pages/__Module/PageModule"

export const businessStore = {
    get UserModule() {
        return new UserModule()
    }
}

export const pageStore = {
    get PageModule() {
        return new PageModule() 
    }
}
