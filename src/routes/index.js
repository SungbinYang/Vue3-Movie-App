import { createRouter, createWebHashHistory } from 'vue-router';
import Home from './Home';
import Movie from './Movie';
import About from './About';
import NotFound from './NotFound';

export default createRouter({
    // Hash, History모드 2가지로 나눔
    // Hash
    // https:google.com/#/search
    // 특정페이지에서 새로고침했을때 페이지를 찾을수 없다라는 메세지를 방지
    history: createWebHashHistory(),
    scrollBehavior() {
        return { top: 0 };
    },
    // pages를 구분하는 용도
    routes: [{
            // https:google/com/ :: 메인페이지
            path: '/',
            component: Home
        },
        {
            path: '/movie/:id',
            component: Movie
        },
        {
            path: '/about',
            component: About
        },
        {
            path: '/:notFound(.*)',
            component: NotFound
        }
    ]
});