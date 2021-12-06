import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { InfoContext } from './context/info';

//nimport reportWebVitals from './reportWebVitals';

let Main = ()=>{
  const [branch,setSelectedBranch] = React.useState(JSON.parse(localStorage.getItem('branch')) || [])
  const setBranch =(data)=>{
    localStorage.setItem('branch',JSON.stringify(data))
    setSelectedBranch(data)
  }
  let infoContextValue={branch,setBranch}
  return(
<React.StrictMode>
    <InfoContext.Provider value={infoContextValue}>
      <Header/>
      <App />
    </InfoContext.Provider>
  </React.StrictMode>
  );
}

ReactDOM.render(
  <Main/>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
