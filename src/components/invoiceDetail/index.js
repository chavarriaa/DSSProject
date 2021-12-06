import React from "react";
import Entries from './Entries';

import Formulary from "./Formulary";
import { useParams } from 'react-router-dom';


const Invoice = ()=>{
    let {invoice} = useParams();
    return(
        <>
        <h1>Detalle de factura # {invoice} </h1>
        <Formulary buttonName="Agregar Item" buttonVariant="success"/>
        <Entries/>
        </>
    )
}
export default Invoice;