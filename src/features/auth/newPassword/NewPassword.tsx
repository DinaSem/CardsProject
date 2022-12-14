import React from 'react';
import {useDispatch} from "react-redux";
import { useParams} from "react-router-dom";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useFormik} from "formik";
import {setNewPasswordTC} from "../recovery/passwordRecovery-reducer";
type FormikErrorType = {
    password?: string
}
export const NewPassword = () => {

    const dispatch = useDispatch()
    const param = useParams<'token'>()
    const resetPasswordToken = param.token

    const formik = useFormik({
        initialValues: {
            password: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.password) {
                errors.password = 'Требуется пароль'
            } else if (values.password.length < 3) {
                errors.password = 'Введите пароль больше 3 символов'
            }
            return errors
        },
        onSubmit: values => {
            if (resetPasswordToken) {
                dispatch(setNewPasswordTC(values.password, resetPasswordToken))
            }
            formik.resetForm()
        },
    })

    return (<form onSubmit={formik.handleSubmit}>
            <Grid container justifyContent={'center'}>
                <Grid item justifyContent={'center'} style={{
                    textAlign:'center',
                    border: '0.1px solid lightGrey',
                    padding: '33px',
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    maxWidth:'413px'
                }}>
                    <h2>Create new password</h2>
                    <FormControl>
                        <FormGroup>

                            <TextField type="password"
                                       label="Password"
                                       margin="normal"
                                       style={{borderColor: 'white'}}
                                       {...formik.getFieldProps('password')}
                            />
                            {formik.touched.password && formik.errors.password &&
                            <div style={{color: 'red'}}>{formik.errors.password}</div>}

                            <p>Create new password and we will send you further instructions to email</p>

                            <Button type={'submit'} variant={'contained'} color={'primary'}>
                                Create new password
                            </Button>

                        </FormGroup>
                    </FormControl>
                </Grid>
            </Grid>
        </form>
    );
};
