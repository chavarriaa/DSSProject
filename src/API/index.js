import axios from 'axios';
const API_SERVER = process.env.REACT_APP_API_SERVER;

export const APIInvoice = {
  get: async function(branch,id){
    try {
      let uri = `${API_SERVER}/branch/${branch}/invoice/`
      if (typeof id != 'undefined'){
        uri = `${uri}/${id}`
      }
      const result = await axios.get(uri); 
      return result;
    } catch (e) {
      throw e
    }
  },
  post: async function(branch,data){
    try{
      let uri = `${API_SERVER}/branch/${branch}/invoice`
      let result = await axios.post(uri,data)
      return result;
    }catch(e){
      console.log(e)
    }
  },
  put:async function(branch,data,id){
    try{
      let uri = `${API_SERVER}/branch/${branch}invoice/${id}`
      let result = await axios.put(uri,data)
      return result;
    }catch(e){
      console.log(e)
    }
  }
}
export const  APIInvoiceDetail = {
  get: async function(branch,invoice,id){
    try {
      let uri = `${API_SERVER}/branch/${branch}/invoice/${invoice}/detail`
      if (typeof id != 'undefined'){
        uri = `${uri}/${id}`
      }
      const result = await axios.get(uri); 
      return result;
    } catch (e) {
      throw e
    }
  },
  post: async function(branch,invoice,data){
    try {
      let uri = `${API_SERVER}/branch/${branch}/invoice/${invoice}/detail`

      const result = await axios.post(uri,data); 
      return result;
    } catch (e) {
      throw e
    }
  },
  put: async function(branch,invoice,data,id){
    try {
      let uri = `${API_SERVER}/branch/${branch}/invoice/${invoice}/detail/${id}`
      const result = await axios.put(uri,data); 
      return result;
    } catch (e) {
      throw e
    }
  },

}
export const APIBranch = {
  get: async function(id){
    try {
      let uri = `${API_SERVER}/branch`
      if (typeof id != 'undefined'){
        uri = `${uri}/${id}`
      }
      const result = await axios.get(uri); 
      return result;
    } catch (e) {
      throw e
    }
  }
} 
export const APIClient = {
  get: async function(id){
    try {
      let uri = `${API_SERVER}/client`
      if (typeof id != 'undefined'){
        uri = `${uri}/${id}`
      }
      const result = await axios.get(uri); 
      return result;
    } catch (e) {
      throw e
    }
  }
} 
export const APISeller = {
  get: async function(id){
    try {
      let uri = `${API_SERVER}/seller`
      if (typeof id != 'undefined'){
        uri = `${uri}/${id}`
      }
      const result = await axios.get(uri); 
      return result;
    } catch (e) {
      throw e
    }
  }
} 
export const APIProduct = {
  get: async function(id){
    try {
      let uri = `${API_SERVER}/product`
      if (typeof id != 'undefined'){
        uri = `${uri}/${id}`
      }
      const result = await axios.get(uri); 
      return result;
    } catch (e) {
      throw e
    }
  }
} 

export const APIPrice = {
  get: async function(branch,product){
    try {
      let uri = `${API_SERVER}/branch/${branch}/product/${product}/price`
      const result = await axios.get(uri); 
      return result;
    } catch (e) {
      throw e
    }
  }
} 