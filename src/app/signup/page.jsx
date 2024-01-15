'use client';

import { useContext, useEffect } from "react";
import authContext from "@/context/auth/authContext";
import { useFormik } from "formik";
import * as Yup from 'yup';
import Alert from "@/components/Alert";

const Signup = () => {


    const AuthContext = useContext(authContext);
    const { mensaje, registrarUsuario, cargando } = AuthContext;

    useEffect(() => {

    }, [cargando])

    const formik = useFormik({
        initialValues: {
            nombre: '',
            email: '',
            password: '',

        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('El nombre es obligatorio'),
            email: Yup.string().email('El email no es válido')
                .required('El email es obligatorio'),
            password: Yup.string().required('La contraseña es obligatoria')
                .min(6, 'La contraseña debe contener al menos 6 caracteres.')
        }),
        onSubmit: (values, { resetForm }) => {
            registrarUsuario(values)
            resetForm();
        }

    })


    return (
        <div className='md:w-4/5 xl:w-3/5 mx-auto mb-42' >

            {cargando && (

                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">

                    <div className="flex justify-center mb-4">
                        <div className="spinner">
                            <div className="double-bounce1"></div>
                            <div className="double-bounce2"></div>
                        </div>
                    </div>


                </div>
            )}


            <h2 className='text-4xl font-sans font-bold text-gray-800 text-center my-4'>Crear Cuenta</h2>


            {mensaje && <Alert />}

            <div className='flex justify-center  mt-5'>
                <div className='w-full max-w-lg'>
                    <form
                        className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'
                        onSubmit={formik.handleSubmit}
                    >
                        <div className='mb-4'>
                            <label className='block text-black text-sm font-bold mb-2'
                                htmlFor='nombre'>Nombre</label>
                            <input type="text"
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                id='nombre'
                                placeholder='Nombre de usuario'
                                value={formik.values.nombre}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />

                            {formik.touched.nombre && formik.errors.nombre ? (
                                <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                                    <p>{formik.errors.nombre} </p>
                                </div>
                            ) : null}
                        </div>
                        <div className='mb-4'>
                            <label className='block text-black text-sm font-bold mb-2'
                                htmlFor='email'>Email</label>
                            <input type="email"
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                id='email'
                                placeholder='Email'
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
                        <div className='mb-4'>
                            <label className='block text-black text-sm font-bold mb-2'
                                htmlFor='password'>Contraseña</label>
                            <input type="password"
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                id='password'
                                placeholder='Contraseña'
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                                    <p>{formik.errors.password} </p>
                                </div>
                            ) : null}
                        </div>

                        <input
                            type="submit"
                            className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold cursor-pointer"
                            value="Crear Cuenta"
                        />
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Signup