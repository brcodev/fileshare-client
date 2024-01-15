import {
     REGISTRO_EXITOSO,
     REGISTRO_ERROR,
     LIMPIAR_ALERTA,
     LOGIN_ERROR,
     LOGIN_EXITOSO,
     USUARIO_AUTENTICADO,
     CERRAR_SESION,
     RESET_URL_OK,
     RESET_URL_ERROR,
     RESTABLECER_OK,
     RESTABLECER_ERROR,
     LOADING

} from "@/types";

export default (state, action) => {
    switch(action.type) {
        case REGISTRO_EXITOSO:
        case REGISTRO_ERROR:
        case LOGIN_ERROR:
        case RESTABLECER_OK:
        case RESTABLECER_ERROR:
            return{
                ...state,
                mensaje: action.payload,
                cargando: null
            }
        case LOADING:
            return{
                ...state,
                cargando: true
            }
        case RESET_URL_OK:
            return{
                ...state,
                resetUrl: true,
            }
        case RESET_URL_ERROR:
            return{
                ...state,
                resetUrl: false
            }
        case LOGIN_EXITOSO:
            localStorage.setItem('fs_token', action.payload)
            return{
                ...state,
                token: action.token,
                autenticado: true,
                cargando: null
            }
        case LIMPIAR_ALERTA:
            return{
                ...state,
                mensaje: null
            }
        case USUARIO_AUTENTICADO:
            return{
                ...state,
                usuario: action.payload.nombre,
                userId: action.payload.id,
                autenticado: true
            }
        case CERRAR_SESION:
            localStorage.removeItem('fs_token')
            return{
                ...state,
                usuario: null,
                token: null,
                autenticado: false,
                userId: null
            }
        default:
            return state;
    }
}