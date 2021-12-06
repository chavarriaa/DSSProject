import React from 'react';
import Table from 'react-bootstrap/Table';
import List from './List';
import { APIInvoiceDetail } from '../../API';
import { useParams } from 'react-router-dom';
import { useInfo } from '../../context/info'

const Entries = ()=> {
  let { branch } = useInfo();
  const [data,setData] = React.useState([]);
  let {invoice} = useParams()

  React.useEffect(()=>{
    let fetchEntries = async()=>{
      try{
        let response = await APIInvoiceDetail.get(branch,invoice)
        setData(response.data.data[0])
    
      }catch(e){
    
        console.log(e)
      } 
    }


    fetchEntries()
  },[branch,invoice])

    return (
    <>
    <Table  hover>
    <thead>
      <tr>
        <th>#</th>
        <th>Producto</th>
        <th>Cant.</th>
        <th>ISV?</th>
        <th>Precio</th>
        <th>Subtotal</th>
        <th>Descuento</th>
        <th>ISV</th>
        <th>Total</th>
        <th>Opciones</th>
      </tr>
    </thead>
    <tbody>
        <List data={data}/>
    </tbody>
    </Table>
    </>
    )
}

export default Entries;
