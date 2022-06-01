import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Contexts Providers
import { AuthContextProvider } from './context/AuthContextProvider';
import { ProductContextProvider } from './context/ProductContextProvider';
import { SucursalContextProvider } from './context/SucursalContextProvider';
import { SellsContextProvider } from './context/SellsContextProvider';
import { RolContextProvider } from './context/RolContextProvider';
import { ServiceContextProvider } from './context/ServiceContextProvider';
import { ClientsContextProvider } from './context/ClientsContextProvider';

import PageAnimation from './components/PageAnimation';
/*
//Layout
import AuthLayout from './views/layouts/AuthLayout';

//Public Views
import Login from './views/Login';
import SignUp from './views/SignUp';
import ConfirmAccount from './views/ConfirmAccount';
import PswForgot from './views/PasswordForgot';
import NewPassword from './views/NewPassword';

//Private View
import ProtectedLayout from './views/layouts/ProtectedLayout';
import CartView from './views/CartView';
import ProfileView from './views/ProfileView';
import ProductView from './views/ProductView';
import SellsView from './views/SellsView';
import TempCartView from './views/TempCartView';
import DetailView from './views/DetailView';
* */
function App() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <ProductContextProvider>
          <ServiceContextProvider>
            <SucursalContextProvider>
              <SellsContextProvider>
                <RolContextProvider>
                  <ClientsContextProvider>
                    <PageAnimation />
                  </ClientsContextProvider>
                </RolContextProvider>
              </SellsContextProvider>
            </SucursalContextProvider>
          </ServiceContextProvider>
        </ProductContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  )
}


export default App;
