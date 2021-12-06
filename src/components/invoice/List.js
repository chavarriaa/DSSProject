import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import Formulary from './Formulary'
import { Link } from 'react-router-dom'
import moment from 'moment';
const FormatDate = (date,format='DD MMM YY hh:mm A')=>  moment(date).utc().locale('es-mx').format(format).toUpperCase()


const List = ({data}) =>{

  return(
    data.map((val,idx)=>(
    <tr key={idx}>
      <td>{val.id}</td>
      <td>{val.branchName}</td>
      <td>{val.clientName}</td>
      <td>{FormatDate(val.date)}</td>
      <td>{val.sellerName}</td>
      <td>{val.total}</td>
      <td>
        <ButtonGroup aria-label="Basic example">
          <Button as={Link} to={`factura/${val.id}`} >Detalle</Button>
          <Formulary values={val} method="EDIT" buttonName='Editar' buttonVariant='warning'/>
          <Button variant="danger">Anular</Button>

        </ButtonGroup>
      </td>
    </tr>
    ))
  )
}


export default List;