const getUrlByName = (_name)=>{
    return `https://restcountries.com/v3.1/name/${_name}`
}
const creatObj = (_item)=>{
}
const doApi = (_url)=>{
    fetch(_url)
    .then(response =>{
        if(! response.ok){
            throw new Error(`Error ${response.status}`);
        }
        return response.json()
        .then(data =>{
            console.log(`data ${JSON.stringify(data, null, 2)}`);
        })
        .catch(err =>{
            console.log(`error: ${err}`);
        })
    })
}
doApi(getUrlByName("israel"));