import React, {ChangeEvent, useEffect, useState} from 'react';
import {Box} from "@mui/material";
import { useDebounce } from 'use-debounce';
import {useAppDispatch, useAppSelector} from "../../../components/hooks";
import {setCardNameForSearchAC} from "../cards-reducer";


export const CardSearch = () => {
    const dispatch = useAppDispatch()
    const cardNameSearch = useAppSelector((state) => state.cards.cardNameSearch)
    const [name, setName] = useState('');
    const [debounceValue] = useDebounce(name, 300);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);

    };
    useEffect(() => {
        if (debounceValue){
            dispatch(setCardNameForSearchAC(debounceValue))
        }
    }, [dispatch, debounceValue])

    return (
        <Box component="form"
             sx={{'& > :not(style)': {width: '100%', },}}
             noValidate
             autoComplete="off" style={{left: '18%', width: '65%'}}>
            <input type="text" value={cardNameSearch} placeholder={"Provide your text"} onChange={handleChange} style={{maxWidth: '100%',
                padding: '8px 0'}}/>
        </Box>
    )
}