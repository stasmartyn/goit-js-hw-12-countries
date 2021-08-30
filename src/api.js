const BASE_URL='https://restcountries.eu/rest/v2/name/';
function fetchCountri(countriName){
    return fetch(`${BASE_URL}${countriName}`).then(Response=>{
        return Response.json();
    })
}
export default{fetchCountri};


