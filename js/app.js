import Country from './countryClass.js';
const restartCards = () => {
    const cards = document.querySelector(".cards");
    cards.innerHTML = "";
}
const getUrlByName = (_name) => {
    return `https://restcountries.com/v3.1/name/${_name}`
}

export const renderInStart = () => {
    restartCards();
    const countries = ["israel", "france", "united states", "thailand"];
    countries.forEach(element => {
        doApi(getUrlByName(element));
    });
}
const creatObj = (_item) => {
    const coin = Object.keys(_item.currencies);
    const country = new Country(_item.name.common, _item.population, _item.region, _item.languages, coin, _item.capital[0], _item.flags)
    country.render();
}
const renderBySearch = (_arrCountries) => {
    const search = document.querySelector("#search_id");
    const select = document.querySelector("#select_id");
    search.addEventListener('input', () => {
        restartCards();
        console.log(search.value);
        if (search.value.length > 0) {
            const result = _arrCountries.find(country =>
                country.toLowerCase().startsWith(search.value.toLowerCase())
            );
            if (result) {
                // console.log("start with");
                doApi(getUrlByName(result));
            }
            else {
                const cards = document.querySelector(".cards");
                cards.innerHTML = "this countri is not found";
            }
        }
        else {
            if (select.value) doApi(getUrlByName(select.value));
            else renderInStart();
        }
    })
}
const renderBySelect = () => {
    const select = document.querySelector("#select_id");
    select.addEventListener('change', () => {
        restartCards();
        console.log(select.value);
        doApi(getUrlByName(select.value))
    })
}
const doApi = (_url) => {
    fetch(_url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error ${response.status}`);
            }
            return response.json()
                .then(data => {
                    
                    creatObj(data[0])
                })
                .catch(err => {
                    console.log(`error: ${err}`);
                })
        })
}

const listCountries = (_data) => {
    let arr = [];
    _data.forEach(element => {
        arr.push(element.name.common)
    });
    return arr;
}
const getUrlAllNames = () => {
    return `https://restcountries.com/v3.1/all?fields=name`
}

const mekeOptinInSelect = (_arr) => {
    const select = document.querySelector("#select_id");
    _arr.forEach(element => {
        select.innerHTML += `<option>${element}</option>`
    });
}
const doApi2 = (_url) => {
    fetch(_url).then(response => {
        if (!response.ok) {
            throw Error(`error ${response.status}`)
        }
        return response.json()
            .then(data => {
                const arrCountries = listCountries(data);
                mekeOptinInSelect(arrCountries)
                renderBySearch(arrCountries);
                renderBySelect();
            })
        .catch(err =>{
            console.log(`Error ${err}`);
        })
    })
}

doApi2(getUrlAllNames())
renderInStart();