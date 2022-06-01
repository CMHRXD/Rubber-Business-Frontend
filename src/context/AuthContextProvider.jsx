import { useState, useEffect, createContext } from 'react';
import AxiosClient from '../config/AxiosClient';
import swal from 'sweetalert';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

  const [auth, setAuth] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authenticateUser = async () => {
      const userToken = localStorage.getItem('gomeria_token');
      if (!userToken) {
        setIsLoading(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        }
      };

      try {
        const { data } = await AxiosClient.get('users/profile', config);
        setAuth(data);
      } catch (error) {
        console.log(error.response.data.msg)
      }
      setIsLoading(false);
    }
    authenticateUser();
  }, []);

  const getUser = async (id) => {
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
      const { data } = await AxiosClient.get(`users/admin/get-users`, config);
      //filter data
      const user = data.filter(user => user.id === id);
      return user;
    } catch (error) {
      console.log(error.response.data.msg)
    }

  }

  const createUser = async (user) => {
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
      const { data } = await AxiosClient.post(`users/admin/create-user`, user, config);
      swal("Usuario Creado Correctamente", "", "success");
    } catch (error) {
      swal(`${error.response.data.msg}`, "", "error");
    }
  }

  const updateUser = async (id, profile) => {
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
      const { data } = await AxiosClient.put(`users/profile/${id}`, profile, config);
      setAuth(data);
      swal("Success", "Usuario Actualizado Correctamente", "success");
    } catch (error) {
      swal("Error", `${error.response.data.msg}`, "error");
      //console.log(error.response.data.msg)
    }
  }

  const updatePassword = async (password) => {
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
      const { data } = await AxiosClient.put(`users/pasword-update`, password, config);
      
      swal("Success", "Contraseña Actualizada Correctamente", "success");
      
    } catch (error) {
      console.log(error)
      swal("Error", `${error.response.data.msg}`, "error");
      
    }
  }

  const logout = () => {
    localStorage.removeItem('gomeria_token');
    setAuth({});
  }



  return (
    <AuthContext.Provider value={{ auth, isLoading, setAuth, getUser, updateUser, logout,updatePassword,createUser}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;