import { useState, createContext, useEffect } from 'react';
import AxiosClient from '../config/AxiosClient';
import swal from 'sweetalert';

const ServiceContext = createContext();
export const ServiceContextProvider = ({ children }) => {
    const [services, setServices] = useState([]);
    const [oneService, setOneService] = useState({});

    const [serviceCart , setServiceCart] = useState([]);

    useEffect(() => {

        getServices();
    }, []);

    const getServices = async () => {
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
            const { data } = await AxiosClient.get('services/get-services', config);
            setServices(data);
        } catch (error) {
            console.log(error);
        }
        const  cart = JSON.parse(localStorage.getItem('gomeria_carrito_servicios')) ; //gomeria_carrito
       
        if (cart) {
            setServiceCart(cart);
        }
    }

    const getOneService = async (id) => {
        services.forEach(service => {
            if (service._id === id) {
                setOneService(service); // set service
            }
        });
    }

    const createService = async (service) => {
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
        if (service.id || service._id) {
            console.log(service);

            try {
                const { data } = await AxiosClient.put(`services/update-service/${service.id || service._id}`, service, config);
                getServices();
                data ? swal('Servicio actualizado', '', 'success') : null;
            } catch (error) {
                swal('Error', error, 'error');
            }

        }
        else {
            try {
                const { data } = await AxiosClient.post('services/create-service', service, config);
                setServices([...services, data]);
                swal('Servicio creado', 'El servicio se ha creado correctamente', 'success');
            } catch (error) {
                swal('Error', 'No se pudo crear el servicio', 'error');
            }
        }
    }

    const updateService = async (service) => { }

    const deleteService = async (id) => {
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
                const { data } = await AxiosClient.delete(`services/delete-service/${id}`, config);
                setServices(services.filter(service => service._id !== id));
                swal('Servicio eliminado', '', 'success');
            } catch (error) {
                swal('Error', error.response.data.msg, 'error');
            }
        }
    }

    //Service Cart Functions Starts
    const addToCart = async (id) => {
        const tempServices = serviceCart; // to avoid one weird error
        const service = getCartService(id); //get new service
        const existentProduct = serviceCart.find(service => service._id === id); //search service in carrito

        if (existentProduct) { 
            swal('Error', 'Los Servicios solo se añaden una sola vez', 'error');
            return;
        } else { //if service not exist in carrito add product to carrito
            service.cantToSell = 1;
            tempServices.push(service);
            if (service.cantToSell) {
                swal('Exito', 'Producto agregado al carrito', 'success');
            }
        }
        setServiceCart(tempServices);
        localStorage.setItem('gomeria_carrito_servicios', JSON.stringify(tempServices));   //update localStorage
        
    }
    const getCartService = (id) => {
        return services.find(product => product._id === id);
    }

    const removeFromCart = async (id) => {
        const newCarrito = serviceCart.filter(product => product._id !== id);
        localStorage.setItem('gomeria_carrito_servicios', JSON.stringify(newCarrito));
        setServiceCart(newCarrito);
     }

    return (
        <ServiceContext.Provider value={{ oneService, services,getServices, getOneService, createService, updateService, deleteService, addToCart, removeFromCart, serviceCart, setServiceCart }}>
            {children}
        </ServiceContext.Provider>
    )
}

export default ServiceContext;