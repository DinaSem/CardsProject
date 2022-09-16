import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {setPackNameForSearchAC} from "../../packs-reducer";
import {Box} from "@mui/material";
import { useDebounce } from 'use-debounce';
import {useAppSelector} from "../../../../components/hooks";

export const PackSearch = () => {
    const dispatch = useDispatch()
    const packNameSearch = useAppSelector(state => state.packs.packNameSearch)
    const [name, setName] = useState('');
    const [debounceValue] = useDebounce(name, 300);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);

    };
    useEffect(() => {
        if (debounceValue) {
            dispatch(setPackNameForSearchAC(debounceValue))
        }
    }, [debounceValue, dispatch])

    return (
        <Box component="form"
             sx={{'& > :not(style)': {width: 300, },}}
             noValidate
             autoComplete="off">
            <input type="text" value={packNameSearch} placeholder={"Provide your text"} onChange={handleChange} style={{maxWidth: '413px',
                padding: '8px'}}/>
        </Box>
    )
}