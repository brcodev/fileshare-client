'use client';

import Alert from '@/components/Alert';
import useAuth from '@/hooks/useAuth';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
 

const Recovery = () => {

    const { mensaje, enviarCorreo, autenticado } = useAuth();

    const [success, setSuccess] = useState(false);


    const router = useRouter();    

    useEffect(() => {
        if (autenticado) {
            router.push('/');
        }
    }, [autenticado])

   
    
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('El email no es válido')
                .required('El email es obligatorio'),

        }),
        onSubmit: (valores, { resetForm }) => {
            enviarCorreo(valores)
            resetForm();
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false)
            }, 5000)
        }
    });


   

    return (
        <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
            <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4">Restablece tu contraseña</h2>

            {mensaje && <Alert />}

            {success ? <div className="bg-green-600 py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto">
                Si tu correo esta registrado recibirás un email con instrucciones
        </div> : ''}


            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <form
                        className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={formik.handleSubmit}
                    >

                        <div className="mb-4">
                            <label
                                className="block text-black text-sm font-bold mb-2"
                                htmlFor="email"
                            >Email</label>
                            <input
                                type="email"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                placeholder="Email del usuario"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                                    <p>{formik.errors.email} </p>
                                </div>
                            ) : null}
                        </div>
 
                        <input
                            type="submit"
                            className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold cursor-pointer "
                            value="Enviar correo"
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Recovery