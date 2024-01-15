import React, { useRef } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { locale, addLocale, updateLocaleOption, updateLocaleOptions, localeOption, localeOptions } from 'primereact/api';
import useApp from '@/hooks/useApp';


export default function Delete({ idLink, toast, lista}) {

    
    const { deleteLinkArchivo } = useApp();


    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmado', detail: 'Link eliminado', life: 3000 });
        
    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Cancelado', detail: 'Operación cancelada', life: 3000 });
    }


    const deleteLink = (list,link) => {
        confirmDialog({
            message: '¿Deseas eliminarlo?',
            header: 'Eliminar Link y archivo',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept : () => deleteLinkArchivo(list,link),
            reject
        });

    };


    addLocale('es', {
        firstDayOfWeek: 1,
        dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
        dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
        dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
        monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
        monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
        today: 'Hoy',
        clear: 'Limpiar',
        accept: 'Si',
        //...
    });

    locale('es');



    return (
        <>
           
            <div className="card flex flex-wrap justify-content-center">
                <Button onClick={() => deleteLink(lista,idLink)} label="Eliminar" id={idLink} className='bg-red-600 border-red-600 p-2 '></Button>
            </div>
        </>
    )
}