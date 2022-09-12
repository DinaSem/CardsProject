import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { Navigate} from "react-router-dom";
import {AppRootStateType} from "../../bll/store";
import {EditableSpan} from '../../components/EditableSpan/EditableSpan';
import {useFormik} from "formik";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import avatar from '../../images/avatar.jpg'
import {logoutTC} from "../../bll/profile-reducer";


const Profile = () => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn)
    const dispatch = useDispatch()
    // const navigate = useNavigate()
    const userName = useSelector<AppRootStateType, any>((state) => state.profile.user.name)
    const userEmail = useSelector<AppRootStateType, any>((state) => state.profile.user.email)
    const [nameFromInput, setNameFromInput] = useState<string>('')


    const formik = useFormik({
        initialValues: {
        },
        validate: (values) => {
        },
        onSubmit: values => {
            dispatch(logoutTC())
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