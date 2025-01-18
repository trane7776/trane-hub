import { StylesConfig } from 'react-select';

const darkSelectStyles: StylesConfig = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: '#333',
        borderColor: '#555',
        color: '#fff',
        boxShadow: state.isFocused ? 'none' : provided.boxShadow,
        '&:hover': {
            borderColor: '#555',
        },
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: '#333',
        color: '#fff',
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#555' : '#333',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#444',
        },
    }),
    singleValue: (provided) => ({
        ...provided,
        color: '#fff',
    }),
    multiValue: (provided) => ({
        ...provided,
        backgroundColor: '#555',
        color: '#fff',
    }),
    multiValueLabel: (provided) => ({
        ...provided,
        color: '#fff',
    }),
    multiValueRemove: (provided) => ({
        ...provided,
        color: '#fff',
        '&:hover': {
            backgroundColor: '#444',
            color: '#fff',
        },
    }),
    placeholder: (provided) => ({
        ...provided,
        color: '#aaa',
    }),
};

export default darkSelectStyles;
