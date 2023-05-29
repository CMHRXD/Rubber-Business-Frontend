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
