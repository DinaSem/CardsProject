import React, {SelectHTMLAttributes, DetailedHTMLProps, ChangeEvent} from 'react'

type DefaultSelectPropsType = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

type SuperSelectPropsType = DefaultSelectPropsType & {
    options?: any[]
    onChangeOption?: (option: any) => void
}

const SuperSelect: React.FC<SuperSelectPropsType> = (
    {
        options,
        onChange, onChangeOption,
        ...restProps
    }
) => {
    // const mappedOptions: any[] = []; // map options with key
    const mappedOptions: any[] = options ? options.map((o, i) => ( // map options with key

            <option key={o + '-' + i}
                value={o.value}>
                {o}
            </option>

    )) : []

    const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange // если есть пропс onChange
        && onChange(e) // то передать ему е (поскольку onChange не обязателен)

        onChangeOption && onChangeOption(e.currentTarget.value)

        // onChange, onChangeOption
    }

    return (
        <select onChange={onChangeCallback} {...restProps}>
            {mappedOptions}
        </select>
    )
}

export default SuperSelect
