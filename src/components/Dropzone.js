import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import clienteAxios from "@/config/axios";
import useApp from "@/hooks/useApp";
import useAuth from "@/hooks/useAuth";
import FormAuth from "./FormAuth";

const Dropzone = () => {

    const [dataFile, setDataFile] = useState();

    const [maxSize, setMaxSize] = useState(1000000)

    const [image, setImage] = useState();

    const { cargando, mostrarAlerta, subirArchivo, crearEnlace } = useApp();

    const { usuario, autenticado } = useAuth();



    const onDropRejected = () => {
        mostrarAlerta('El limite para subir un archivo es de 1MB, regístrate para subir archivos sobre 1 MB');
    }

    useEffect(() => {
        if (autenticado) {
            setMaxSize(1000000 * 10)
        } else {
            setMaxSize(1000000)
        }
    }, [autenticado])


    
    const onDropAccepted = useCallback(async (acceptedFiles) => {

        const formData = new FormData();
        formData.append('archivo', acceptedFiles[0])

        setDataFile(formData)

        

    }, []) 


    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDropAccepted, onDropRejected, maxSize: maxSize });


    
    const archivos = acceptedFiles.map(archivo => (
        <li key={archivo.lastModified} className="bg-white flex-1 p-3 mb-4 shadow-lg rounded">
            {/*image ? <img src={image} /> : ''*/}
            <p className="font-bold text-xl break-all">{archivo.path}</p>
            <p className="text-sm text-gray-500">{archivo.size > (1024 * 1024) ? (archivo.size / Math.pow(1024, 2)).toFixed(2) + ' MB' : (archivo.size / 1024).toFixed(2) + ' kB'} </p>
        </li>
    ));

    useEffect(() => {

    }, [dataFile])



    return (
        <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4 ">

            {acceptedFiles.length > 0 ? (
                <div className="mt-10 w-full">
                    <h4 className="text-2xl font-bold text-center mb-4">Archivos</h4>
                    <ul>
                        {archivos}
                    </ul>

                    {

                        autenticado ? <FormAuth /> : ""

                    }

                    {cargando ? (


                        <div className="spinner">
                            <div className="double-bounce1"></div>
                            <div className="double-bounce2"></div>
                        </div>


                    ) :

                        (
                            <button
                                type="button"
                                className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800"
                                onClick={() => crearEnlace(dataFile)}
                            >
                                Crear Enlace
                            </button>
                        )


                    }


                </div>

            ) : (
                <div {...getRootProps({ className: 'dropzone w-full py-32' })} >
                    <input
                        className="h-100"
                        {...getInputProps()}

                    />

                    {

                        isDragActive ? <p className="text-2xl text-center text-gray-600">Suelta el archivo</p> :
                            <div className="text-center">
                                <p className="text-2xl text-center text-gray-600">Selecciona un archivo y arrástralo hacia aquí</p>
                                <button className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800" type="button" >
                                    Selecciona archivos para subir.
                                </button>
                            </div>
                    }


                </div>

            )}



        </div>
    )
}

export default Dropzone;



