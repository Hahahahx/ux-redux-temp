请使用脚手架安装该模板 [ux-react-cli](https://www.npmjs.com/package/ux-react-cli).

>在你开始使用它之前，你应该先具备编写React Hook的能力，
在该项目中所有的组件都会以函数组件的形式呈现。也需要了解
Redux的事件流程，虽然采用了面向对象的封装，但能够帮助你
了解我为什么这么做，以及提出更好的建议。

## 使用说明

### 一、路由

项目配备自动化路由，路由以`src/pages`文件夹为目录。<br/>
在该目录下，所有`小写`且`不包含特殊字符`的文件夹均视作项目的路由，除此你必须要在该
目录（路由）下创建`index.tsx`来作为该路由的渲染组件。<br/>
如此就会被webpack中的路由插件生成`router.ts`
到`src/config`目录中：
```
    pages->login->index.tsx
    pages->main->index.tsx
    pages->main->user->index.tsx
    pages->main->friend->index.tsx
```
即创建了login页面与main页面。以及main的子集页面user与friend

----
在pages的根目录下也会有顶级路由`/`，
在非登录页为首页的webApp中顶级路由只作为引导，其`index.tsx`应为：
```typescript
const Index = () => {
    return (
        <RouterView />
    )
}
export default React.memo(Index, () => true);
```
可以看到，代码块中的`<RouterView/>`为子集路由的映射。

___
在该项目中的所有路由都采用配置的方式呈现，所以，在每个路由`index.tsx`的同级
目录下创建一个`route.config`就可以配置该路由的属性。<br/>
`route.config`是JSON文件。路由配置规则如下：
```
{
    "noLazy":true,    
    "default":true
} 
```
当noLazy为true时，该路由为非动态路由，建议在`/`、`/main`这种根路由下使用该规则。<br/>
如果不使用该规则，那么在子集路由渲染页面时，会因为匹配到自身的动态引入导致页面的重新渲染。
其结果往往是我们不希望看到的。<br/>
default被应用在父级路由引导子集路由时的默认路由，如顶级路由`/`只是一个空白的页面，
那么此时我们就需要将`/login`或者`/main`的default开启。<br/>
如此一来，我们在渲染`/`顶级路由时，就会访问默认路由，去加载`login->index.tsx`或`main->index.tsx`。


除了上述的路由管理，我们可能还会遇到一些与业务耦合的组件，推荐在当前的路由目录下
新建`__Component`目录，来存放当前路由所依赖的业务组件。同时如果是与页面紧密耦合的
状态逻辑也应该是在该目录下新建`__Module`来存放状态。

所生成的路由映射表`router.ts`:
```typescript
import Page from '@/pages/index.tsx';
export const routeConfig = [
    {
        noLazy: true,
        child: [
            {
                default: true,
                child: [],
                componentPath: 'pages/login/index.tsx',
                path: '/login'
            },
            {
                child: [],
                componentPath: 'pages/main/index.tsx',
                path: '/main'
            }
        ],
        componentPath: 'pages/index.tsx',
        path: '',
        component: Page
    }
]
```
可见，静态路由会有component属性。我们独立封装了React-router以便适配生成的路由映射表：
```typescript
import { Routers } from '@/components/RouterContainer/Routers';
import { routeConfig } from '@/config/router';
import NoMatch from '@/pages/__Component/NoMatch';

function App() {
  return (
    <BrowserRouter>
      <Routers
        routers={routeConfig}
        noMatch={
          () => <NoMatch/>
        }
        intercept={(route) => {

        }} />
    </BrowserRouter>
  );
}
```
配备了路由拦截器 `intercept` 该方法是在每次路由引导前处理，
但我也没用过，暂时不知道效果是否会如预期一般，不建议使用

### 二、状态管理
>在项目需求出来后就可以进行业务状态层的编写了。

在该项目的状态管理中，我们约束用户必须采用`面向对象`的形式来编写，这有助于
更好的管理项目，面向对象的形式使我们更能清晰的看见状态的结构。

`src/modules`作为我们的状态管理目录，其结构为:
```
    modules->models->User.ts
    modules->services->UserApi.ts
    modules->UserModule.ts
```
如此我们就算建立了一个有关于User的业务状态管理链，将所有业务状态都存在modules中，
主要目的是为了保证Api的独立性，以便适应更多的场合，如多端。<br/>
其中models我们存放所有状态的数据结构。
如User.ts：
```typescript
export class User {
    name:string = 'ux'
    birthYear:number = 1998
}
```
services中做Api的统一管理，在这一层中我们封装了axios在`modules/ajax`中，
它定义了请求方式和返回对象以便于在services中调用，
service要求我们根据接口文档划分好接口分类，如UserApi.ts：
```typescript
class UserApi {
    PostLogin(params: LoginParams): Promise<Response<any>> {
        return request.post('/user/login', params);
    }

    GetUserInfo(id: string): Promise<Response<User>> {
        return request.get('/user/userInfo', {id})
            .then(res=>{
                return res.result;          // as User 
            });
    }
}

export default new UserApi();

export interface LoginParams {
    username: string,
    password: string
}
```
其接口的命名规则应该为http请求方式+路由的最后一级，我们可以对返回对象进行约束，
如`Promise<Response<User>>`清晰的表明其返回的结果一个User对象。

可见，所有对后端反馈数据的定义我们都可以也应该在services中完成。

Modules，我们约束了状态类的写法，你只需要确保在Config配置中导入的状态类实例对象
与状态类同名即可，如UserModule.ts：
```typescript
import User from "@/modules/UserModule"
import FileModule from "@/modules/FileModule"
export const modules = {UserModule:User,FileModule}
```
不管UserModule的实例对象叫什么，确保它仍然是赋值给属性"UserModule"的即可，
因为UserModule才是该状态类的真正的名字，我们在解析的时候使用了constructor.name。
```typescript
class FileModule {

    @LocalStorage
    @SesstionStorage
    filename = 'FileModule';

    @SesstionStorage
    fileType = 'txt'

    @Update
    private update() { }

    @Action
    reqFile() {
        return UserApi.GetUserInfo('id1').then(res => {
            this.filename = 'FileModule被Action更新了';
            this.fileType = 'action'
        })
    }

    reqFilebyUpdate() {
        this.filename = 'FileModule被Update更新了';
        this.fileType = 'update'
        this.update()
    }
}
```
每一个类都可以提供一个update函数来更新你所做的状态改变，该update()必须要被@Update装饰，
且命名必须为"update"。

你也可以使用@Action，但是需要确保所装饰的函数的返回值是一个Promise对象，且你的状态修改也是在该流程中完成的。

被@SessionStorage和@LocalStorage装饰的字段会被注册到内存和本地中。<br/>
提供了deleteSession(moduleName:string,property?:string)和deleteLocal()可以让你自由的删除他们。<br/>
你需要确保你不会在你的事件流中使用到被删除的属性。因为被装饰的属性会不断的在更新状态中更新对应的Local或Session

在组件中使用：
```typescript

const Main = () => {

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
```


