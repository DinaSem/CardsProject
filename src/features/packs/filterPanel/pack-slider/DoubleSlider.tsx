import React, {useEffect, useState} from 'react';
import {Box, Slider} from "@mui/material";
import {setMinMaxValueAC} from "../../packs-reducer";
import {useAppDispatch, useAppSelector} from "../../../../components/hooks";
import { useDebounce } from 'use-debounce';


    export const DoubleSlider = () => {
        const min = useAppSelector(state => state.packs.min)
        const max = useAppSelector(state => state.packs.max)
        const [value, setValue] = useState<number[]>([0, 100]);

        const dispatch = useAppDispatch()
        const [debounceValue] = useDebounce(value, 500);

        const handleChange = (event: Event, newValue: number | number[]) => {
            setValue(newValue as number[]);

        };
        useEffect(() => {
            if (debounceValue) {
                dispatch(setMinMaxValueAC(+debounceValue[0],+debounceValue[1]))
            }
        }, [debounceValue, dispatch])
// console.log(+debounceValue[0],+debounceValue[1])
        return (
            <Box sx={{ width: 155 }}>
                <Slider
                    value={[min,max]}
                    onChange={handleChange}
                    valueLabelDisplay="on"
                />
            </Box>
        );
    }