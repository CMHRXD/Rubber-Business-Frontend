import { createContext, useState, useEffect } from 'react';
import swal from 'sweetalert';
import AxiosClient from '../config/AxiosClient';

const ClientsContext = createContext();
export const ClientsContextProvider = ({ children }) => {

    const [clients, setClients] = useState([]);
    const [oneClient, setOneClient] = useState({});
    const [clientCart, setClientCart] = useState({});
    const [tempClientCart, setTempClientCart] = useState({});


    useEffect(() => {
        getClients();
    }, []);

    const getClients = async () => {

        const userToken = localStorage.getItem('gomeria_token');
        if (!userToken) {
            return;
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            }
        };

        try {
            const { data } = await AxiosClient.get('clients/get-clients', config);
            setClients(data);
            const cart = JSON.parse(localStorage.getItem('gomeria_carrito_client'));
            if (cart) {
                setClientCart(cart);
            }

        } catch (error) {
            console.log(error.response.data.msg);
        }
    }

    const createClient = async (client) => {
        const userToken = localStorage.getItem('gomeria_token');
        if (!userToken) {
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            }
        };

        if (client._id) {
            try {
                const { data } = await AxiosClient.put(`clients/update-client/${client._id}`, client, config);
                setClients(clients.map(client => client._id === data._id ? data : client));
                swal('Cliente actualizado', '', 'success');

            } catch (error) {
                swal('Error', `${error.response.data.msg}`, 'success');
            }

        } else {
            try {
                const { data } = await AxiosClient.post('clients/add-client', client, config);
                setClients([...clients, data]);
                swal("Exito", "Cliente Creado Correctamente", "success");
            } catch (error) {
                swal("Error", `${error.response.data.msg}`, "error");
            }
        }
    }
    const editClient = async (id) => {

        clients.forEach(client => {
            if (client._id === id) {
                setOneClient(client); // set client
            }
        })
    }

    const deleteClient = async (id) => {

        const userToken = localStorage.getItem('gomeria_token');
        if (!userToken) {
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            }
        };
        const swalResponse = await swal({
            title: "¿Estas seguro?",
            text: "Una vez eliminado no podras recuperar este registro",
            icon: "warning",
            buttons: ["Cancelar", "Eliminar"],
            dangerMode: true,
        });
        if (swalResponse) {

            try {
                await AxiosClient.delete(`clients/delete-client/${id}`, config);
                setClients(clients.filter(client => id !== client._id));
                swal("Exito", "Cliente Eliminado Correctamente", "success");
            } catch (error) {
                swal("Error", `${error.response.data.msg}`, "error");
            }
        }
    }

    //Clietn - Cart
    const addToCart = async (id) => {
      
        if (clientCart._id) {
            swal("Error", "Ya existe cliente en el carrito de compras", "error");
            return;
        }
        const client = clients.find(client => client._id === id);
        if (client) {
            setClientCart(client);
            localStorage.setItem('gomeria_carrito_client', JSON.stringify(client));
            swal("Exito", "Cliente Agregado Correctamente", "success");
        }
    }

    const addToTempCart = async (id) => {
        const client = clients.find(client => client._id === id);
        if (client) {
            setTempClientCart(client);
            localStorage.setItem('gomeria_carrito_temp_client', JSON.stringify(client));
        }
    }
    const deleteFromCart = async () => {
        setClientCart({});
        localStorage.removeItem('gomeria_carrito_client');
    }

    return (
        <ClientsContext.Provider value={{ oneClient,getClients, clients, createClient, editClient, deleteClient,addToCart, clientCart,deleteFromCart,addToTempCart,tempClientCart}}>
            {children}
        </ClientsContext.Provider>
    )
}

export default ClientsContext;