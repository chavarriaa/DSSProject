import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { APIInvoiceDetail, APIProduct,APIPrice} from '../../API';
import { useParams } from 'react-router';
import { useInfo } from '../../context/info';
import{ currency} from '../../lib/currency'

const Formulary = ({method,values,buttonName,buttonVariant})=>{
  let { branch } = useInfo();
  const [show,setShow] = React.useState(false);
  const [id,setId] = React.useState('');
  const [invoice,setInvoice] = React.useState(useParams().invoice);
  const [product,setProduct] = React.useState('');
  const [qty,setQty] = React.useState(1);
  const [freetax,setFreetax] = React.useState(1);
  const [price,setPrice] = React.useState(0);
  const [subtotal,setSubtotal] = React.useState(0);
  const [discount,setDiscount] = React.useState(0);
  const [isv,setISV] = React.useState(0);
  const [total,setTotal] = React.useState(0);
  const [productData,setProductData] = React.useState([]);
  
    let getPrice = async(branch,product)=>{
        try{   
            const result = await APIPrice.get(branch,product)  
            setPrice(result.data.data[0].price)
        }catch(e){
            console.log(e)
        }
    }
    let handleSubmit = async ()=>{
            let data ={
            branch,
            invoice,
            product,
            qty,
            freetax,
            price,
            subtotal,
            discount,
            isv,
            total
            }

        try{
            if(method==="EDIT"){
                
                await APIInvoiceDetail.put(branch,invoice,data,id)
            }else{
                console.log(data)
                await APIInvoiceDetail.post(branch,invoice,data)
                setId(0)
                setProduct(0)
                setQty(1)
                setFreetax(1)
                setPrice(0)
                setSubtotal(0)
                setDiscount(0)
                setISV(0)
                setTotal(0)
            }

        }catch(e){
            console.log(e)
        }
            setShow(false)
    }



    React.useEffect(()=>{
        let fetchAll = async()=>{
            try {
                let product = await APIProduct.get()
                setProductData(product.data.data[0])
            } catch (error) {
                console.log(error)
            }
        }

        let changeMethod = ()=>{
            if (method==="EDIT"){
                setId(values.id)
                setInvoice(values.invoice)
                setProduct(values.product)
                setQty(values.qty)
                setFreetax(values.freetax)
                setPrice(values.price)
                setSubtotal(values.subtotal)
                setDiscount(values.discount)
                setISV(values.isv)
                setTotal(values.total)
            }
        }
        fetchAll()
        changeMethod()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    React.useEffect(()=>{
        let refreshValues=()=>{
            setSubtotal((price * qty) - discount);
            freetax?setISV(subtotal *.15 ):setISV(0);
            setTotal(subtotal * 1.15 );
        }
     refreshValues()
     // eslint-disable-next-line react-hooks/exhaustive-deps
    },[qty,price,discount,freetax,product]);

 let handleShow =()=>setShow(true);
 let handleHide= ()=>setShow(false);

  let handleProduct = (e)=>{
      setProduct(e.target.value)
      getPrice(branch,e.target.value)
    
    }
  let handleQty = (e)=> setQty(e.target.value);
  let handleFreeTax = (e)=> setFreetax(e.target.checked)
    let handleDiscount = (e)=>setDiscount(e.target.value)
  
  return( 
        <>
          <Button variant={buttonVariant} onClick={handleShow}> {buttonName} </Button>
          <Modal animation={false} show={show} onHide={handleHide} size='lg'>
          <Modal.Header closeButton><Modal.Title>Nuevo Item Factura # {invoice}</Modal.Title></Modal.Header>
          <Modal.Body>
          <Form>
            <Container fluid>
            <Col>
                <Row>
                    <Form.Group>
                        <Form.Label>Producto</Form.Label>
                        <Form.Select name="client" value={product} onChange={(e)=>handleProduct(e)} >
                        <option> -Seleccione- </option>
                            {productData.map((val,i)=><option key={i} value={val.id}>{val.name}</option>)}
                        </Form.Select>
                    </Form.Group>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Cantidad</Form.Label>
                            <Form.Control type="number" name="Cant"  min="1"  onChange={e=>handleQty(e)} value={qty} />
                        </Form.Group>
                    </Col>
                    <Col>   
                        <Form.Group>
                            <Form.Label>Precio</Form.Label>
                            <Form.Control type="text"  name="Precio" disable="true" value={currency(price)} readOnly/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Check type="switch" label="ISV" checked={freetax} onChange={(e)=>handleFreeTax(e)}  />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Descuento</Form.Label>
                            <Form.Control type="text" name="Descuento" onChange={e=>handleDiscount(e)} value={discount} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Subtotal</Form.Label>
                            <Form.Control type="text"  name="Subtotal"  value={currency(subtotal)} readOnly/>
                        </Form.Group>
                    </Col>
                    <Form.Group>
                        <Form.Label>ISV</Form.Label>
                        <Form.Control type="text" name="Total" value={currency(isv)} readOnly/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Total</Form.Label>
                        <Form.Control type="text" name="Total"  value={currency(total)} readOnly/>
                    </Form.Group>
                </Row>
                </Col>
            </Container>
            </Form>
          </Modal.Body>
          <Modal.Footer><Button onClick={(e)=>handleSubmit()}>ENVIAR</Button></Modal.Footer>
          </Modal>
        </>
  )
}

export default Formulary;