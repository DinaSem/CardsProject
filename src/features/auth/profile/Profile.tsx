import React from 'react';
import {useDispatch} from "react-redux";
import { Navigate} from "react-router-dom";
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan';
import {useFormik} from "formik";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import avatar from '../../../images/avatar.jpg'
import {logoutTC, updateUserTC} from "./profile-reducer";
import {useAppSelector} from "../../../components/hooks";

export const Profile = () => {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
    const dispatch = useDispatch()
    const user = useAppSelector(state => state.profile.user)

    const onChangeNameHandler = (name: string) => {

        dispatch(updateUserTC({ ...user, name: name }))
    }
    const formik = useFormik({
        initialValues: {
        },
        validate: (values) => {
        },
        onSubmit: values => {
            dispatch(logoutTC())
        },
    })

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }
    // console.log('Profile '+ user)
    // console.log(user)
    return (<form onSubmit={formik.handleSubmit}>
                <Grid container justifyContent={'center'}>
                    <Grid item justifyContent={'center'} style={{ textAlign:'center', border: '0.1px solid lightGrey', padding:'33px', backgroundColor: 'white', borderRadius: '10px'}}>
                        <h2>Personal Information </h2>
                        <FormControl >
                            <img src={avatar} alt="" style={{borderRadius: '50%'}}/>
                            <FormGroup>
                                <span>
                                    <EditableSpan value={user?.name} onChange={onChangeNameHandler} />
                                </span>
                                <div>
                                    {user?.email}
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
