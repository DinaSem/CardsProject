import React from 'react';
import {useAppDispatch} from "../../../../components/hooks";
import {
    setCurrentPageAC,
    setMinMaxValueAC,
    setMyPacksAC,
    setPackNameForSearchAC,
} from "../../packs-reducer";
import FilterAltOffOutlinedIcon from "@mui/icons-material/FilterAltOffOutlined";


export const ResetFilter = () => {
    const dispatch = useAppDispatch()

    const onClickHandler = () => {
        dispatch(setMinMaxValueAC(0,100))
        dispatch(setPackNameForSearchAC(''))
        dispatch(setMyPacksAC(''))
        // dispatch(setPacksTC({}))
        dispatch(setCurrentPageAC(1))
    }
    return (
        <div onClick={onClickHandler} style={{cursor: 'pointer'}}><FilterAltOffOutlinedIcon/></div>
    );
};