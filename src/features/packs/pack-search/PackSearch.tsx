import React, {ChangeEvent, useState} from 'react';
import {useDispatch} from "react-redux";
import TextField from "@mui/material/TextField";
import {setPackNameForSearchAC} from "../packs-reducer";
import {Box} from "@mui/material";
import { useDebounce } from 'use-debounce';

export const PackSearch = () => {
    const dispatch = useDispatch()
    const [name, setName] = useState('');
    const [value] = useDebounce(name, 2000);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
        dispatch(setPackNameForSearchAC(value))
    };

    return (
        <Box component="form"
             sx={{'& > :not(style)': {m: 1, width: '25ch'},}}
             noValidate
             autoComplete="off">
            <TextField
                id="outlined-name"
                label="Provide your text"
                value={name}
                onChange={handleChange}
            />
        </Box>
    )
}