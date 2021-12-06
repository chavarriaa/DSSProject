import React from "react";
import Entries from './Entries';

import Formulary from "./Formulary";

const Invoice = ()=>{
    return(
        <>
        <h1>Facturas</h1>
        <Formulary buttonName="Crear" buttonVariant="success"/>
        <Entries/>
        </>
    )
}
export default Invoice;