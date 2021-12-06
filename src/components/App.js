import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Invoice from './invoice'
import InvoiceDetail from './invoiceDetail'
const Hola=()=>(<h1>hola</h1>)
const Holas=()=>(<h1>holas</h1>)

function App() {
  return (
    <Container>

      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Invoice/>}/>
        <Route exact path="/factura/:invoice" element={<InvoiceDetail/>}/>
        <Route exact path="/facturas" element={<Hola/>}/>
        <Route exact path="/marcas" element={<Holas/>}/>

      </Routes>
      </BrowserRouter>

    </Container>
  );
}

export default App;
