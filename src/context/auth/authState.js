"use client"

import React, { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";

import {CERRAR_SESION,
        LIMPIAR_ALERTA, 
        LOADING, 
        LOGIN_ERROR, 
        LOGIN_EXITOSO, 
        REGISTRO_ERROR, 
        REGISTRO_EXITOSO, 
        RESET_URL_ERROR, 
        RESET_URL_OK, 
        RESTABLECER_OK, 
        USUARIO_AUTENTICADO } from "@/types";

import clienteAxios from "@/config/axios";
import tokenAuth from "@/config/tokenAuth";


const AuthState = ({ children }) => {


    const initialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('fs_token') : '',
        autenticado: null,
        usuario: null,
        userId: null,
        mensaje: null,
        resetUrl: false,
        cargando: null
    }

    const registrarUsuario = async datos => {

        dispatch({
            type: LOADING
        
        })

        try {
            const respuesta = await clienteAxios.post('/api/users/', datos)
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: { ok : respuesta.data.msg}
            });


        } catch (error) {
            dispatch({
                type: REGISTRO_ERROR,
                payload: error.response.data.msg
            })
        }

        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA
            })
        }, 3000)

    }

    const enviarCorreo = async (email) => {

        

        try {
            await clienteAxios.post('/api/users/recovery-email', email);
        } catch (error) {
            
        }
    }

    const confirmarUrl = async (userId, token) => {
        const data = {
            userId: userId,
            token: token
        }
        try {
            const respuesta = await clienteAxios.post(`/api/users/verify`, data);
            dispatch({
                type: RESET_URL_OK,

            })

 
        } catch (error) {
            dispatch({
                type: RESET_URL_ERROR
            })
        }
        
    }


    const nuevaPass = async (valores, userId, token) => {
        const data = {
            userId : userId,
            token : token,
            password : valores.password,
            confirmPassword : valores.confirmPassword

        }

        dispatch({
            type: LOADING
        
        })
        
        try {
            const respuesta = await clienteAxios.post('/api/users/password-reset', data)
            dispatch({
                type: RESTABLECER_OK,
                payload: {ok : 'Su contraseña ha sido restablecida'}
            })
        } catch (error) {
            dispatch({
                type: RESTABLECER_OK,
                payload: error.response.data.msg
            })
        }

        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA
            })
        }, 5000)
    }

    const iniciarSesion = async (datos) => {

        dispatch({
            type: LOADING
        
        })

        try {
            const respuesta = await clienteAxios.post('/api/auth', datos);
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data.token
            })
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            })
            
        }

        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA
            })
        }, 3000)
    }

    
    const [ state, dispatch ] = useReducer(authReducer, initialState);


    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('fs_token');
        if(token){
            tokenAuth(token)
        }

        try {
            const respuesta =  await clienteAxios.get('/api/auth')
            
            if(respuesta.data.user){
                dispatch({
                    type: USUARIO_AUTENTICADO,
                    payload: respuesta.data.user
                })
            }
            
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            })

            console.log(error);
        }
    }


   const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
        
    
   }
        
        


    return (
        <authContext.Provider
     
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                userId: state.userId,
                mensaje: state.mensaje,
                resetUrl: state.resetUrl,
                cargando: state.cargando,
                registrarUsuario,
                enviarCorreo,
                confirmarUrl,
                nuevaPass,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >
            {children}
        </authContext.Provider>


    )

}

export default AuthState;