import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component'
import { LoginComponent } from './pages/login/login.component'
import { ProfileComponent } from './pages/profile/profile.component'
import { Register } from './pages/register/register'
import { Filme } from './pages/filme/filme'
import { MyOrders } from './pages/my-orders/my-orders'
import { Payment } from './pages/payment/payment'
import { SessionMap } from './pages/session-map/session-map'
import { Cart } from './pages/cart/cart'


export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    },
    {
        path: 'register',
        component: Register
    },
    {
        path: 'filme',
        component: Filme
    },
    {
        path: 'my-orders',
        component: MyOrders
    },
    {
        path: 'payment',
        component: Payment
    },
    {
        path: 'session-map',
        component: SessionMap
    }
    ,
    {
        path: 'cart',
        component: Cart
    }
];