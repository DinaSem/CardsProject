import React, {useEffect} from 'react';
import {useAppDispatch} from "../../../../components/hooks";
import {getAllPacksTC, setMinMaxValueAC, setMyPacksAC, setPackNameForSearchAC, setPacksTC} from "../../packs-reducer";
import FilterAltOffOutlinedIcon from "@mui/icons-material/FilterAltOffOutlined";


export const ResetFilter = () => {
    const dispatch = useAppDispatch()

    const onClickHandler = () => {
        dispatch(setMinMaxValueAC(0,100))
        dispatch(setPackNameForSearchAC(''))

        dispatch(setMyPacksAC(''))
        dispatch(setPacksTC(
            {
                pageCount: 10,
            }
        ))
    }

    return (
        <div onClick={onClickHandler} style={{cursor: 'pointer'}}><FilterAltOffOutlinedIcon/></div>
    );
};

export default ResetFilter;