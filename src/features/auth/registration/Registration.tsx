import React from 'react';
import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import {registerTC} from "./auth-reducer";
import {Navigate} from "react-router-dom";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useAppSelector} from "../../../components/hooks";

type FormikErrorType = {
    email?: string
    password?: string
    passwordConfirm?:string
}

export const Registration = () => {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            passwordConfirm: ''

        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Требуется email'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Неправильный формат email'
            }
            if (!values.password) {
                errors.password = 'Требуется пароль'
            } else if (values.password.length < 3) {
                errors.password = 'Введите пароль больше 3 символов'
            }
            if (!values.passwordConfirm) {
                errors.passwordConfirm = 'Повторите пароль'
            } else if (values.password.length < 3) {
                errors.passwordConfirm = 'Введите пароль больше 3 символов'
            } else if (values.password!==values.passwordConfirm) {
                errors.passwordConfirm = 'Пароли не совпадают'
            }

            return errors
        },
        onSubmit: values => {
            dispatch(registerTC(values))
            formik.resetForm()
        },
    })
    if(isLoggedIn){
        return <Navigate to={'/'}/>
    }
    return <form onSubmit={formik.handleSubmit}>
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'} style={{ textAlign:'center', border: '0.1px solid lightGrey', padding:'33px', backgroundColor: 'white', borderRadius: '10px'}}>
                <h2>Sign Up</h2>
                <FormControl>
                    <FormGroup>
                        <TextField label="Email"
                                   margin="normal"
                                   {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email && <div style={{color: 'red'}}>{formik.errors.email}</div>}

                        <TextField type="password"
                                   label="Password"
                                   margin="normal"
                                   {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password && <div style={{color: 'red'}}>{formik.errors.password}</div>}

                        <TextField type="password"
                                   label="Confirm password"
                                   margin="normal"
                                   {...formik.getFieldProps('passwordConfirm')}
                        />
                        {formik.touched.passwordConfirm && formik.errors.passwordConfirm && <div style={{color: 'red'}}>{formik.errors.passwordConfirm}</div>}


                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Sign Up
                        </Button>
                    </FormGroup>
                </FormControl>
            </Grid>
        </Grid>
    </form>
}