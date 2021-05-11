
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {  useToasts } from 'react-toast-notifications'
import { useDispatch } from "react-redux";

import {
    hideToast
} from "../../redux/reducersActions/toast/toastAction";

const Toast = (props) => {
    const toast = useSelector(state => state.toastReducer)
    const dispatch = useDispatch();
    const { addToast } = useToasts()
    useEffect(() => {
        if(toast && toast.message && toast.appearance ) addToast(toast.message, 
            { 
                placement: 'bottom-right',
                autoDismiss: true, 
                autoDismissTimeout:3000, 
                appearance: toast.appearance, 
                onDismiss: ()=> dispatch(hideToast())
            })
    },[toast.message]);
    return <div>{props.children}</div> 
};
export default Toast;
