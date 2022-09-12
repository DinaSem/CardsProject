import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {AppRootStateType} from "../../bll/store";
import {loginTC} from "../../bll/login-reducer";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}
export const Login = () => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false

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

            return errors
        },
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()
        },
    })

        if (isLoggedIn) {
            navigate('/')
        }

    return <form onSubmit={formik.handleSubmit} >
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'} style={{
                textAlign:'center',
                border: '0.1px solid lightGrey',
                padding: '33px',
                backgroundColor: 'white',
                borderRadius: '10px',
                maxWidth:'413px'
            }}>
                <h1>Sign in</h1>
                <FormControl>
                    <FormGroup>
                        <TextField label="Email"
                                   margin="normal"
                                   variant="standard"
                                   id="standard-basic"
                                   {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email &&
                        <div style={{color: 'red'}}>{formik.errors.email}</div>}
                        <TextField type="password"
                                   label="Password"
                                   margin="normal"
                                   variant="standard"
                                   id="standard-basic"
                                   {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password &&
                        <div style={{color: 'red'}}>{formik.errors.password}</div>}
                        <FormControlLabel label={'Remember me'}
                                          control={<Checkbox
                                              checked={formik.values.rememberMe}
                                              {...formik.getFieldProps('rememberMe')}/>}/>
                        <div>
                            <Link to={'/recovery'}>Forgot Password</Link>
                        </div>

                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                        <h6>Already haven't an account?</h6>
                        <div>
                            <Link to={'/registration'}>Sign Up</Link>
                        </div>
                    </FormGroup>
                </FormControl>
            </Grid>
        </Grid>
    </form>
}