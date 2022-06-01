import { Route, Routes, useLocation } from "react-router-dom"

//Layout
import AuthLayout from '../views/layouts/AuthLayout';

//Public Views
import Login from '../views/Login';
import SignUp from '../views/SignUp';
import ConfirmAccount from '../views/ConfirmAccount';
import PswForgot from '../views/PasswordForgot';
import NewPassword from '../views/NewPassword';

//Private View
import ProtectedLayout from '../views/layouts/ProtectedLayout';
import CartView from '../views/CartView';
import ProfileView from '../views/ProfileView';
import ProductView from '../views/ProductView';
import SellsView from '../views/SellsView';
import TempCartView from '../views/TempCartView';
import DetailView from '../views/DetailView';
import AdminView from "../views/AdminView";
import ServiceView from "../views/ServiceView";
import ClientView from "../views/ClientView";

import { AnimatePresence } from "framer-motion";


const PageAnimation = () => {
    const location = useLocation();
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path='/' element={<AuthLayout />}>
                    <Route index element={<Login />} />
                    <Route path='signUp' element={<SignUp />} />
                    <Route path='confirmAccount/:token' element={<ConfirmAccount />} />
                    <Route path='passwordForgot' element={<PswForgot />} />
                    <Route path='passwordForgot/:token' element={<NewPassword />} />
                </Route>

                <Route path='/admin' element={<ProtectedLayout />}>
                    <Route index element={<ProductView />} />
                    <Route path='cart' element={<CartView />} />
                    <Route path='sells' element={<SellsView />} />
                    <Route path='profile' element={<ProfileView />} />
                    <Route path='tempCart' element={<TempCartView />} />
                    <Route path='detailSell' element={<DetailView />} />
                    <Route path='administration' element={<AdminView />} />
                    <Route path='services' element={<ServiceView />} />
                    <Route path='clients' element={<ClientView />} />
                </Route>
            </Routes>
        </AnimatePresence>
    )
}

export default PageAnimation;