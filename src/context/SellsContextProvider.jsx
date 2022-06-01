import { useState, useEffect, createContext } from 'react';
import AxiosClient from '../config/AxiosClient';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { Axios } from 'axios';

const SellsContext = createContext();
export const SellsContextProvider = ({ children }) => {

    const [sells, setSells] = useState([]);
    const [sell, setSell] = useState({});
    const [tempSell, setTempSell] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        getSells();
        setTempSell(JSON.parse(localStorage.getItem('gomeria_carrito_temp')));
    }, []);

    const getSells = async () => {  //get all sells
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
            const { data } = await AxiosClient.get('ventas/get-ventas', config);
            setSells(data);
        } catch (error) {
            console.log(error);
        }
    }

    const createSell = async (sell) => {    //create sell
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
        if (sell._id) {
            try {
                const {data} = await AxiosClient.put(`ventas/update-venta/${sell._id}`, sell, config);
                getSells();
                swal('Exito', 'Venta Actualizada', 'success');
            } catch (error) {
                console.log(error)
            }

        } else {
            try {
                const { data } = await AxiosClient.post('ventas/create-venta', sell, config);
                setSells([...sells, data]);
                swal('Exito', 'Venta creada', 'success');
                navigate('/admin/sells');
            } catch (error) {
                console.log(error.response.data.msg)
            }
            
        }
       
    }

    const getOneSell = async (id) => {
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
            const { data } = await AxiosClient.get(`ventas/get-one-venta/${id}`, config);
            return data;
        } catch (error) {
            console.log(data.error.msg);
        }
    }
    const createTempCart = async (id) => {  //create TempCart to edit sells
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
            const { data } = await AxiosClient.get(`ventas/get-one-venta/${id}`, config);
            data.products = data.products.map(product => {
                product.actCantSelled = product.cantToSell;
                return product;
            });

            setTempSell(data);
            localStorage.setItem('gomeria_carrito_temp', JSON.stringify(data));
        } catch (error) {
            console.log(error);
        }

        if (tempSell.cant) {
            navigate('/admin/tempCart');
        }
    }
    const deleteSell = async (id) => { 
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
            await AxiosClient.delete(`ventas/delete-venta/${id}`, config);
            setSells(sells.filter(sell => sell._id !== id));
            swal('Exito', 'Venta eliminada', 'success');
        } catch (error) {
            swal('Error', `${error.response.data.msg}`, 'error');
            console.log(error.response.data.msg);
        }

    }


    return (
        <SellsContext.Provider value={{ sells, setSells, createSell, getSells, createTempCart, deleteSell, tempSell, setTempSell,getOneSell, sell, setSell}}>
            {children}
        </SellsContext.Provider>
    )
}

export default SellsContext;