import React, {useEffect, useState} from 'react';
import {Box, Slider} from "@mui/material";
import {setMinMaxValueAC} from "../packs-reducer";
import {useAppDispatch} from "../../../components/hooks";
import { useDebounce } from 'use-debounce';

    // function valuetext(value: number) {
    //     return `${value}°C`;
    // }

    export const DoubleSlider = () => {
        const [value, setValue] = useState<number[]>([0, 100]);
        const dispatch = useAppDispatch()
        const [debounceValue] = useDebounce(value, 2000);

        const handleChange = (event: Event, newValue: number | number[]) => {
            setValue(newValue as number[]);
        };
        useEffect(() => {
            if (debounceValue) {
                dispatch(setMinMaxValueAC(+debounceValue[0],+debounceValue[1]))
            }
        }, [debounceValue])
// console.log(+debounceValue[0],+debounceValue[1])
        return (
            <Box sx={{ width: 155 }}>
                <Slider
                    // getAriaLabel={() => 'Temperature range'}
                    value={value}
                    onChange={handleChange}
                    //getAriaValueText={valuetext}
                    valueLabelDisplay="on"
                />
            </Box>
        );
    }