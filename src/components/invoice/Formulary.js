import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { APIBranch, APIClient,APIInvoice,APISeller} from '../../API';


const Formulary = ({method,values,buttonName,buttonVariant})=>{
  const [show,setShow] = React.useState(false);
  const [branch,setBranch] = React.useState('');
  const [client,setClient] = React.useState('');
  const [seller,setSeller] = React.useState('');
  const [date,setDate] = React.useState('');
  const [total,setTotal] = React.useState(0);
  const [branchData,setBranchData] = React.useState([]);
  const [clientData,setClientData] = React.useState([]);
  const [sellerData,setSellerData] = React.useState([]);





    React.useEffect(()=>{
        let fetchAll = async()=>{
            try {
                let branch = await APIBranch.get()
                setBranchData(branch.data.data[0])
                
                let client = await APIClient.get()
                setClientData(client.data.data[0])
                
                let seller = await APISeller.get()
                setSellerData(seller.data.data[0])
            } catch (error) {
                console.log(error)
            }
        }

        let changeMethod = ()=>{
            if (method==="EDIT"){
                setBranch(values.branch)
                setClient(values.client)
                setSeller(values.seller)
                setDate(values.date)
                setTotal(values.total)
            }
        }


        fetchAll()
        changeMethod()
                // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

 let handleSubmit = async()=>{
   
    try{
        let data = {
            branch,
            client,
            date,
            seller,
            total,
            subtotal:0,
            isv:0,
            discount:0,
            isprinted:0,
            createdat:date,
        }
      
    if(method ==='EDIT'){
          await APIInvoice.put(data,values.id);
    }else{
          await APIInvoice.post(data);
    }
    
        setShow(false);
        setBranch(0)
        setDate('')
        setClient(0)
        setSeller(0)
    }catch(e){
        console.log(e)
    }
 }

  let handleShow = ()=>setShow(true);
  let handleHide = ()=>setShow(false);
  let handleBranch = (e)=>setBranch(e.target.value);
  let handleClient = (e)=>setClient(e.target.value);
  let handleSeller = (e)=>setSeller(e.target.value);
  let handleDate = (e)=>setDate(e.target.value);
  let handleTotal = (e)=>setTotal(e.target.value);
  
  return( 
        <>
          <Button variant={buttonVariant} onClick={handleShow}> {buttonName} </Button>
          <Modal animation={false} show={show} onHide={handleHide} size='lg'>
          <Modal.Header closeButton><Modal.Title>Nueva Factura</Modal.Title></Modal.Header>
          <Modal.Body>
          <Form>
            <Container fluid>
            <Row> 
                <Col>
                <Form.Group>
                    <Form.Label>Tienda</Form.Label>
                    <Form.Select name="branch" value={branch} onChange={(e)=>handleBranch(e)} >
                        <option> -Seleccione- </option>
                        {branchData.map((val,i)=><option key={i} value={val.id}>{val.name}</option>)}
                    </Form.Select>
                </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>Fecha</Form.Label>
                        <Form.Control type="date" data-date-format="YYYY/MM/DD" name="date" onChange={e=>handleDate(e)} value={date}/>
                    </Form.Group>
                </Col>
                
                    <Form.Group>
                        <Form.Label>Cliente</Form.Label>
                        <Form.Select  name="client" value={client} onChange={(e)=>handleClient(e)} >
                        <option> -Seleccione- </option>
                            {clientData.map((val,i)=><option key={i} value={val.id}>{val.name}</option>)}
                        </Form.Select>
                    </Form.Group>
                <Col>
                    <Form.Group>
                        <Form.Label>Vendedor</Form.Label>
                        <Form.Select  name="seller" value={seller} onChange={(e)=>handleSeller(e)} >
                        <option> -Seleccione- </option>
                            {sellerData.map((val,i)=><option key={i} value={val.id}>{val.name}</option>)}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                    <Form.Label>Total</Form.Label>
                    <Form.Control readOnly name="total" onChange={e=>handleTotal(e)} value={total}/>
                    </Form.Group>
                </Col>
            </Row>
            </Container>
            </Form>
          </Modal.Body>
          <Modal.Footer><Button onClick={(e)=>handleSubmit()}>ENVIAR</Button></Modal.Footer>
          </Modal>
        </>
  )
}

export default Formulary;