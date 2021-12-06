import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form'
import { APIBranch } from '../API';
import { useInfo } from '../context/info'


const Header = ()=>{
  let { branch, setBranch } = useInfo();
  const [branchData,setBranchData] =React.useState([]);
  // eslint-disable-next-line no-unused-vars
  const [selectedBranch,setSelectedBranch] = React.useState(branch);
  let handleBranch = (e)=> setBranch(e.target.value)

  React.useEffect(()=>{
    let fetchAll = async()=>{
      try{
        let result = await APIBranch.get();
        setBranchData(result.data.data[0])
      }catch(e){
        console.log(e)
      }
    }

    setSelectedBranch(branch)
    fetchAll();
  },[branch])

  return(
    <Navbar bg="dark"  variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">DSS Project</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/facturas">Facturas</Nav.Link>
            <NavDropdown title="Mantenimiento" id="basic-nav-dropdown">
              <NavDropdown.Item href="/tiendas">Tiendas</NavDropdown.Item>
              <NavDropdown.Item href="/marcas">Marcas</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Categoría</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Precios</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Productos</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Acerca de</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
              <Navbar.Text>{'Tienda:    '} </Navbar.Text>
              <Form.Select size='sm' name="branch" value={branch} onChange={(e)=>{handleBranch(e)}} >
              <option> -Seleccione- </option>
                  {branchData.map((val,i)=><option key={i} value={val.id}>{val.name}</option>)}
              </Form.Select>
              </Nav>
    </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}


export default Header;