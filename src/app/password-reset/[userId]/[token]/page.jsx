"use client";
import useAuth from '@/hooks/useAuth';
import { useRouter, useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Alert from '@/components/Alert';

const ResetPassword = () => {

    const router = useRouter()

    const params = useParams()

    const [urlValidation, setUrlValidation] = useState(false);
    const [loading, setLoading] = useState(true);


    const { autenticado, confirmarUrl, resetUrl, nuevaPass, mensaje, cargando } = useAuth();

    const { userId, token } = params


    useEffect(() => {
        confirmarUrl(userId, token)
    }, [])

    useEffect(() => {
        if (autenticado) {
            router.push('/');
        }
    }, [autenticado, cargando])

    useEffect(() => {
        if (resetUrl) {
            setUrlValidation(true)
        }
    }, [resetUrl])

    useEffect(() => {

    }, [mensaje])


    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .required('La contraseña debe contener al menos 6 caracteres'),
            confirmPassword: Yup.string()
                .required("Repite la contraseña")
                .oneOf([Yup.ref("password")], "Las contraseñas no coinciden"),
        }),
        onSubmit: valores => {
            nuevaPass(valores, userId, token)
            setLoading(false)
            setTimeout(() => {
                router.push('/');
            }, 5000)
        }
    });



    return (

        <>

            {urlValidation && (

                <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">

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


                    {mensaje && (<Alert />) } 

                       { !mensaje&&loading&& (

                            <>

                                <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4">Ingresa tu nueva contraseña</h2>


                                <div className="flex justify-center mt-5">
                                    <div className="w-full max-w-lg">
                                        <form
                                            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                                            onSubmit={formik.handleSubmit}

                                        >
                                            <div className="mb-4">
                                                <label
                                                    className="block text-black text-sm font-bold mb-2"
                                                    htmlFor="password"
                                                >Contraseña</label>
                                                <input
                                                    type="password"
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    id="password"
                                                    placeholder="Contraseña"
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
                                            <div className="mb-4">
                                                <label
                                                    className="block text-black text-sm font-bold mb-2"
                                                    htmlFor="confirmPassword"
                                                >Confirmar contraseña</label>
                                                <input
                                                    type="password"
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    id="confirmPassword"
                                                    placeholder="Repite la contraseña"
                                                    value={formik.values.confirmPassword}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                                    <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                                                        <p>{formik.errors.confirmPassword} </p>
                                                    </div>
                                                ) : null}
                                            </div>



                                            <input
                                                type="submit"
                                                className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold cursor-pointer "
                                                value="Restablecer contraseña"
                                            />
                                        </form>
                                    </div>
                                </div>
                            </>

                        )


                    }


                </div>

            )}

        </>


    )
}

export default ResetPassword