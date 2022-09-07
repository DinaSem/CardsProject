import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {forgotPasswordTC, logOutTC, setIsLoggedOutAC, updateUserTC} from "../Login/auth-reducer";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {AppRootStateType} from "../../app/store";
import {UserDataResponseType} from "../../api/cards-api";
import {EditableSpan} from '../../components/EditableSpan/EditableSpan';
import TextField from "@mui/material/TextField";
import {useFormik} from "formik";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import avatar from '../../images/avatar.jpg'

type FormikErrorType = {

}

const Profile = () => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn)
    const dispatch = useDispatch()
    // const navigate = useNavigate()
    const userName = useSelector<AppRootStateType, any>((state) => state.auth.user?.name)
    const userEmail = useSelector<AppRootStateType, any>((state) => state.auth.user?.email)
    const [nameFromInput, setNameFromInput] = useState<string>('')


    const formik = useFormik({
        initialValues: {
        },
        validate: (values) => {
        },
        onSubmit: values => {
            dispatch(logOutTC())
        },
    })

    useEffect(() => {
        userName && setNameFromInput(userName)

    }, [userName])

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (<form onSubmit={formik.handleSubmit}>
                <Grid container justifyContent={'center'}>
                    <Grid item justifyContent={'center'} style={{ textAlign:'center', border: '0.1px solid lightGrey', padding:'33px', backgroundColor: 'white', borderRadius: '10px'}}>
                        <h2>Personal Information</h2>
                        <FormControl >
                            <img src={avatar} alt="" style={{borderRadius: '50%'}}/>
                            <FormGroup>
                                <span>
                                    <EditableSpan value={nameFromInput} onChange={setNameFromInput} />
                                </span>
                                <div>
                                    {userEmail}
                                </div>

                                <Button type={'submit'} variant={'contained'} color={'primary'}>
                                    Log out
                                </Button>

                            </FormGroup>
                        </FormControl>
                    </Grid>
                </Grid>
            </form>
    )
};

export default Profile;