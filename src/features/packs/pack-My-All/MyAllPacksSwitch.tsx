import React from 'react';
import {setMyPacksAC} from "../packs-reducer";
import {useAppDispatch} from "../../../components/hooks";
import {Button} from "@mui/material";

export const MyAllPacksSwitch = () => {
    const dispatch = useAppDispatch()

    const setMyPacksOnClickHandler = () => {
        dispatch(setMyPacksAC('6226057a0373a3000426a62d'))
    }
    const setAllPacksOnClickHandler = () => {
        dispatch(setMyPacksAC(''))
    }

    return (
        <div>
                <Button variant="outlined" onClick={setMyPacksOnClickHandler}>My</Button>
                <Button variant="contained" onClick={setAllPacksOnClickHandler}>All</Button>
        </div>
    );
};
