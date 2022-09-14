import React from 'react';
import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import {registerTC} from "./auth-reducer";
import {Link, Navigate} from "react-router-dom";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useAppSelector} from "../../../components/hooks";
import s from '../Login/login.module.css'

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
            <Grid item justifyContent={'center'} className={s.card} style={{marginTop:'60px'}}>
                <h1>Sign Up</h1>
                <FormControl>
                    <FormGroup>
                        <TextField label="Email"
                                   margin="normal"
                                   variant="standard"
                                   id="standard-basic"
                                   {...formik.getFieldProps('email')}
                                   style={{minWidth: '347px', marginTop:'41px'}}
                        />
                        {formik.touched.email && formik.errors.email && <div style={{color: 'red'}}>{formik.errors.email}</div>}

                        <TextField type="password"
                                   label="Password"
                                   margin="normal"
                                   variant="standard"
                                   id="standard-basic"
                                   {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password && <div style={{color: 'red'}}>{formik.errors.password}</div>}

                        <TextField type="password"
                                   label="Confirm password"
                                   margin="normal"
                                   variant="standard"
                                   id="standard-basic"
                                   {...formik.getFieldProps('passwordConfirm')}
                        />
                        {formik.touched.passwordConfirm && formik.errors.passwordConfirm && <div style={{color: 'red'}}>{formik.errors.passwordConfirm}</div>}


                        <Button type={'submit'} variant={'contained'} color={'primary'} style={{marginTop:'69px', borderRadius:'30px'}}>
                            Sign Up
                        </Button>
                        <h6>Already have account?</h6>
                        <div>
                            <Link to={'/login'} className={s.signUp} >Sign In</Link>
                        </div>
                    </FormGroup>
                </FormControl>
            </Grid>
        </Grid>
    </form>
}