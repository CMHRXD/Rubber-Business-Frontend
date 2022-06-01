import { useEffect, useState, createContext } from 'react';
import AxiosClient from '../config/AxiosClient';
import swal from 'sweetalert';

const ProductContext = createContext();
export const ProductContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({});
    const [carrito, setCarrito] = useState([]);

    useEffect(() => {

        getProducts();

    }, []);

    const getProducts = async () => {
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

        const { data } = await AxiosClient.get('productos/get-productos', config);
        setProducts(data);

        //Get Carrito
        const  carrito = JSON.parse(localStorage.getItem('gomeria_carrito')) ; //gomeria_carrito_temp
       
        if (carrito) {
            setCarrito(carrito);
        }
    }

    //CART PROCESS
    const addToCart =  (id) => {
        let tempCart = carrito;
        const data = getCartProduct(id); //search product
        const existentProduct = carrito.find(product => product._id === id); //search product in carrito

        if (existentProduct) { //if product exist in carrito increment quantity
            existentProduct.cantToSell += 1;
            tempCart = [...tempCart]  //update carrito      
        } else { //if product not exist in carrito add product to carrito
            data.cantToSell = 1;
            tempCart.push(data);
            if (data.cantToSell) {
                swal('Exito', 'Producto agregado al carrito', 'success');
            }
        }
        setCarrito(tempCart);
        localStorage.setItem('gomeria_carrito', JSON.stringify(tempCart));   //update localStorage
    }

    const getCartProduct = (id) => {
        const product = products.find(product => product._id === id);
        return product;
    }

    const checkStock = (id, cantToSell) => {
        const product = products.find(product => product._id === id);
        if (product.cant - cantToSell < 0) {
            swal('Error', 'No hay suficiente stock', 'error');
            return false;
        }
        return true;
    }
    const updateStockSelled = (id, cantToSell) => {
        const product = products.find(product => product._id === id);
        product.cant -= cantToSell;
        saveProduct(product);
        setProducts([...products]);
    }

    //END CART PROCESS
    const saveProduct = async (product) => {
        const userToken = localStorage.getItem('gomeria_token');
        if (!userToken) {
            return;
        }
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${userToken}`,
            }
        };
        if (product.id || product._id) {
            try {
                const { data } = await AxiosClient.put(`productos/update-producto/${product.id || product._id}`, product, config);
               
                getProducts();
                product.id? swal('Producto actualizado', '', 'success'): null;
            } catch (error) {
                console.log(error.response.data.msg)
            }
        } else {
            try {
                const { data } = await AxiosClient.post('productos/create-producto', product, config);
                swal('Producto Añadido Correctamente', '', 'success');
                getProducts();
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }
    }

    const updateProduct = async (id) => {
        products.forEach(product => {
            if (product._id === id) {
                setProduct(product); // set product
            }
        });
    }

    const deleteProduct = async (id) => {
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
                const { data } = await AxiosClient.delete(`productos/delete-producto/${id}`, config);
                setProducts(products.filter(product => product._id !== id));    // filter the product that is not the one that is deleted
                swal("Eliminado", "El producto ha sido eliminado", "success");
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }
    }



    return (
        <ProductContext.Provider value={{ carrito,setCarrito,product,setProducts, products,getProducts, saveProduct, updateProduct, deleteProduct, addToCart,checkStock,updateStockSelled,getCartProduct}}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductContext;