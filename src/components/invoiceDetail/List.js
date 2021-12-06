import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import FormCheck from "react-bootstrap/FormCheck";
import Formulary from './Formulary'
import {currency} from '../../lib/currency'
const List = ({data}) =>{

  return(
    data.map((val,idx)=>(
    <tr key={idx}>
      <td>{idx+1}</td>
      <td>{`${val.product} - ${val.productName}`}</td>
      <td>{val.qty}</td>
      <td><FormCheck type="switch" disabled checked={val.freetax} /></td>
      <td>{currency(val.price)}</td>
      <td>{currency(val.subtotal)}</td>
      <td>{currency(val.discount)}</td>
      <td>{currency(val.isv)}</td>
      <td>{currency(val.total)}</td>
      <td>
        <ButtonGroup aria-label="Basic example">
          <Formulary values={val} method="EDIT" buttonName='Editar' buttonVariant='warning'/>
          <Button variant="danger">Eliminar</Button>
        </ButtonGroup>
      </td>
    </tr>
    ))
  )
}


export default List;