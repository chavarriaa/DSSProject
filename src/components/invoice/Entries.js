import React from 'react';
import Table from 'react-bootstrap/Table';
import List from './List';
import { APIInvoice } from '../../API';
import { useInfo } from '../../context/info'

const Entries = ()=> {
  const [data,setData] = React.useState([]);
  let { branch } = useInfo();


  React.useEffect(()=>{
    let fetchEntries = async()=>{
      try{
        let response = await APIInvoice.get(branch)
        setData(response.data.data[0])
      }catch(e){
       console.log(e)
      } 
  }
    fetchEntries()
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
    return (
    <>
    <Table  hover>
    <thead>
      <tr>
        <th>#</th>
        <th>Tienda</th>
        <th>Cliente</th>
        <th>Fecha</th>
        <th>Vendedor</th>
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
