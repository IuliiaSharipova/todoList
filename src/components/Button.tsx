import React from 'react';
import {FilterValuesType} from '../App';

type ButtonPropsType = {
    name: string
    callBack:()=>void
    classes:string
}

export const Button = (props: ButtonPropsType) => {
    const onClickHandler = () => {
        props.callBack()
    }

    return (
        <button className={props.classes} onClick={props.callBack}>{props.name}</button>
    );
};

