import 'whatwg-fetch';
class HttpService {
    getProducts = () =>{
        var promise = new Promise((resolve,reject) =>{
           fetch('http://localhost:3004/product')
            .then(response => {
                resolve(response.json()); 
        }).catch(err => {console.log("error", err)}) 
        });
      return promise;  
    }
}

export default HttpService;

