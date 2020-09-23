import Page from '@/pages/index.tsx';
// 自动装配路由映射表
export const routeConfig = [
    {
        path: '',
        noLazy: true,
        child: [
            {
                authority: true,
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
        component: Page
    }
]