import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {forgotPasswordTC, loginTC, setEmailAC} from "../Login/auth-reducer";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {Link, Navigate, useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import {AppRootStateType} from "../../app/store";
import {useFormik} from "formik";
import email from "../../images/emailPigen.jpg";


type FormikErrorType = {
    email?: string
}
const Recovery = () => {
    // const[email, setEmail]=useState<string>('')
    // const dispatch = useDispatch()
    //
    // const onClickHandler = () => {
    //     if(email){
    //         dispatch(forgotPasswordTC(email))
    //     }
    // }
    //
    // if(email){
    //     dispatch(setEmailAC(email))
    // }
    const emailIsSent = useSelector<AppRootStateType, boolean>((state) => state.auth.sent)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Требуется email'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Неправильный формат email'
            }
            return errors
        },
        onSubmit: values => {
            if (values.email) {
                dispatch(forgotPasswordTC(values.email))
            }
            formik.resetForm()
        },
    })
const backToLoginOnClickHandler = () => {
    return <Navigate to={'/login'}/>
}

    return (<>
            {!emailIsSent &&
            <form onSubmit={formik.handleSubmit}>
                <Grid container justifyContent={'center'}>
                    <Grid item justifyContent={'center'} style={{
                        textAlign: 'center',
                        border: '0.1px solid lightGrey',
                        padding: '33px',
                        backgroundColor: 'white',
                        borderRadius: '10px',
                        maxWidth: '413px',
                        justifyContent: 'center'
                    }}>
                        <h2>Forgot your password?</h2>
                        <FormControl>
                            <FormGroup>
                                <TextField label="Email"
                                           margin="normal"
                                           {...formik.getFieldProps('email')}
                                />
                                {formik.touched.email && formik.errors.email &&
                                <div style={{color: 'red'}}>{formik.errors.email}</div>}

                                <p>Enter your email address and we will send you further instructions</p>

                                <Button type={'submit'} variant={'contained'} color={'primary'}>
                                    Send Instructions
                                </Button>
                                <h6>Did you remember your password?</h6>
                                <div>
                                    <Link to={'/login'}>Try logging in</Link>
                                </div>
                            </FormGroup>
                        </FormControl>
                    </Grid>
                </Grid>
            </form>
            }
            {emailIsSent &&
            <form onSubmit={formik.handleSubmit}>
                <Grid container justifyContent={'center'}>
                    <Grid item justifyContent={'center'} style={{
                        textAlign: 'center',
                        border: '0.1px solid lightGrey',
                        padding: '33px',
                        backgroundColor: 'white',
                        borderRadius: '10px',
                        maxWidth: '413px',
                        justifyContent: 'center'
                    }}>
                        <h2>Check Email</h2>
                        <img src={email} alt="" style={{borderRadius: '50%', width: '100px'}}/>
                        <FormControl>
                            <FormGroup>

                                <p>We’ve sent an Email with instructions to example@mail.com</p>

                                <Button variant={'contained'} color={'primary'} onClick={backToLoginOnClickHandler}>
                                    Back to login
                                </Button>

                            </FormGroup>
                        </FormControl>
                    </Grid>
                </Grid>
            </form>
            }
        </>
    );
};

export default Recovery;