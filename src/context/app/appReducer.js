import {
    AGREGAR_DESCARGAS,
    AGREGAR_PASSWORD,
    CREAR_ENLACE_EXITO,
    DATOS_ARCHIVO,
    LIMPIAR_ALERTA,
    LIMPIAR_STATE,
    LISTA_LINKS,
    LISTA_LINKS_ACTUALIZADA,
    LOADING,
    MOSTRAR_ALERTA,
    SUBIR_ARCHIVO,
    SUBIR_ARCHIVO_ERROR,
    SUBIR_ARCHIVO_EXITO
} from "@/types"


export default (state, action) => {
    switch (action.type) {
        case LOADING:
            return{
                ...state,
                cargando: true
            }
        case MOSTRAR_ALERTA:
            return {
                ...state,
                mensaje_archivo: action.payload
            }
        case LIMPIAR_ALERTA:
            return {
                ...state,
                mensaje_archivo: null
            }
        case SUBIR_ARCHIVO:
            return {
                ...state,
                cargando: true
            }
        case SUBIR_ARCHIVO_EXITO:
            return {
                ...state,
                nombre: action.payload.nombre,
                nombre_original: action.payload.nombre_original,
                cargando: null

            }
        case DATOS_ARCHIVO:
            return{
                ...state,
                data_pass: action.payload.password,
                data_url: action.payload.archivo,
                url_link: action.payload.url_link
            }
        case SUBIR_ARCHIVO_ERROR:
            return {
                ...state,
                mensaje_archivo: action.payload,
                cargando: null
            }
        case CREAR_ENLACE_EXITO:
            return {
                ...state,
                url: action.payload,
                cargando: null

            }
        case LIMPIAR_STATE:
            return {
                ...state,
                mensaje_archivo: null,
                nombre: '',
                nombre_original: '',
                cargando: null,
                descargas: 1,
                password: '',
                autor: null,
                url: '',
                data_pass: null,
                data_url: null,
                loading: null
            }
        case AGREGAR_PASSWORD:
            return{
                ...state,
                password: action.payload
            }
        case AGREGAR_DESCARGAS:
            return{
                ...state,
                descargas: action.payload
            }
        case LISTA_LINKS:
            return{
                ...state,
                lista: action.payload
            }
        case LISTA_LINKS_ACTUALIZADA:
            return{
                ...state,
                lista: action.payload
            }
        
        default:
            return state
    }
}