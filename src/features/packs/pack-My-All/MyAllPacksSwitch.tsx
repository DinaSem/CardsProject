import React from 'react';
import {setMyPacksAC} from "../packs-reducer";
import {useAppDispatch, useAppSelector} from "../../../components/hooks";
import {Button} from "@mui/material";

export const MyAllPacksSwitch = () => {
    const myPackId = useAppSelector(state => state.packs.user_id)
    const dispatch = useAppDispatch()

    const setMyPacksOnClickHandler = () => {
        dispatch(setMyPacksAC('6226057a0373a3000426a62d'))
    }
    const setAllPacksOnClickHandler = () => {
        dispatch(setMyPacksAC(''))
    }

    return (
        <div>
                <Button variant={myPackId ==='' ? 'outlined' : 'contained'} onClick={setMyPacksOnClickHandler}>My</Button>
                <Button variant={myPackId ==='' ? 'contained' : 'outlined'} onClick={setAllPacksOnClickHandler}>All</Button>
        </div>
    );
};
