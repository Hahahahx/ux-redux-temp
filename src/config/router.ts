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