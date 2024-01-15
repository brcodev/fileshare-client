"use client"

import { useReducer } from "react";
import appContext from "./appContext";
import {AGREGAR_DESCARGAS, 
        AGREGAR_PASSWORD, 
        CREAR_ENLACE_ERROR, 
        CREAR_ENLACE_EXITO, 
        DATOS_ARCHIVO, 
        LIMPIAR_ALERTA, 
        LIMPIAR_STATE, 
        LISTA_LINKS, 
        LISTA_LINKS_ACTUALIZADA, 
        LOADING, MOSTRAR_ALERTA, 
        SUBIR_ARCHIVO, 
        SUBIR_ARCHIVO_ERROR, 
        SUBIR_ARCHIVO_EXITO } from "@/types";
import appReducer from "./appReducer";
import clienteAxios from "@/config/axios";
import tokenAuth from "@/config/tokenAuth";




const AppState = ({ children }) => {

    const initialState = {
        mensaje_archivo: null,
        nombre: '',
        nombre_original: '',
        cargando: null,
        descargas: 1,
        password: '',
        autor: null,
        url: '',
        url_link: '',
        lista: [],
        data_pass: true,
        data_url: null,
        cargando: null

    }

    const [state, dispatch] = useReducer(appReducer, initialState);

    const mostrarAlerta = msg => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: msg
        });

        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA
            })
        }, 5000);
    }


    const subirArchivo = async (formData, nombreArchivo) => {

        dispatch({
            type: SUBIR_ARCHIVO
        })

        try {
            const respuesta = await clienteAxios.post('/api/files', formData);

            dispatch({
                type: SUBIR_ARCHIVO_EXITO,
                payload: {
                    nombre: respuesta.data.archivo,
                    nombre_original: nombreArchivo
                }
            })

        } catch (error) {
            dispatch({
                type: SUBIR_ARCHIVO_ERROR,
                payload: error.response.data.msg
            })
        }
    }

    const crearEnlace = async (formData) => {
        const datos = {
            nombre: state.nombre,
            nombre_original: state.nombre_original,
            descargas: state.descargas,
            password: state.password,
            autor: state.autor,

        }

        formData.append('descargas', state.descargas);
        formData.append('password', state.password);
        formData.append('autor', state.autor);


        dispatch({
            type: LOADING
        
        })
       
        

        try {
            const respuesta = await clienteAxios.post('/api/links', formData)
            
            dispatch({
                type: CREAR_ENLACE_EXITO,
                payload: respuesta.data.msg

            })
        } catch (error) {
           console.log(error);
        } 
    }


    const limpiarState = () => {
        dispatch({
            type: LIMPIAR_STATE
        })
    }

    const agregarPassword = (password) => {
        dispatch({
            type: AGREGAR_PASSWORD,
            payload: password
        })
    }

    const agregarDescargas = (descargas) => {

        if(descargas > 10){
            descargas = 10;
        }

        dispatch({
            type: AGREGAR_DESCARGAS,
            payload: descargas
        })
    }

    const getLinkList = async () => {
        const token = localStorage.getItem('fs_token');
        if(token){
            
            tokenAuth(token)
        }

        try {
            const respuesta =  await clienteAxios.get('/api/links/list')
            
            if(respuesta.data){
                dispatch({
                    type: LISTA_LINKS,
                    payload: respuesta.data
                })
            }
            
        } catch (error) {
            
        }
    }

    const getData = async (params) => {
        try {
            const respuesta =  await clienteAxios.get(`/api/links/${params.url}`)
            
            if(respuesta.data){
                dispatch({
                    type: DATOS_ARCHIVO,
                    payload: {
                        password: respuesta.data.password,
                        url_link: respuesta.data.url,
                        archivo: respuesta.data.archivo
                    }
                })
            }
            
        } catch (error) {
            
        }
    }


    const deleteLinkArchivo = async (lista, idLink) => {
        const token = localStorage.getItem('fs_token');
        if(token){
            tokenAuth(token)
        }
        try {
            const respuesta = await clienteAxios.delete(`/api/files/${idLink}`)
            const listaActualizada = lista.filter((link) => link._id !== idLink);
            dispatch({
                type: LISTA_LINKS_ACTUALIZADA,
                payload: listaActualizada
            
            })
            

        } catch (error) {
    
            
        }
    }




    return (
        <appContext.Provider

            value={{
                mensaje_archivo: state.mensaje_archivo,
                nombre: state.nombre,
                nombre_original: state.nombre_original,
                cargando: state.cargando,
                descargas: state.descargas,
                password: state.password,
                autor: state.autor,
                url: state.url,
                url_link: state.url_link,
                lista: state.lista,
                data_pass: state.data_pass,
                data_url: state.data_url,
                cargando: state.cargando,
                mostrarAlerta,
                subirArchivo,
                crearEnlace,
                limpiarState,
                agregarPassword,
                agregarDescargas,
                deleteLinkArchivo,
                getLinkList,
                getData
            }}

        >

            {children}

        </appContext.Provider>
    )
}

export default AppState;