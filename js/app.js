import Country from './countryClass.js';
const restartCards = ()=>{
    const cards = document.querySelector(".cards");
    cards.innerHTML = "";
}
const getUrlByName = (_name) => {
    return `https://restcountries.com/v3.1/name/${_name}`
}

export const renderInStart = ()=>{
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
const renderBySearch = ()=>{
    const search = document.querySelector("#search_id");
    search.addEventListener('input', ()=>{
        restartCards();
        console.log(search.value);
        doApi(getUrlByName(search.value))
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
                    // console.log(data[0].flags);
                    
                    creatObj(data[0])
                    // console.log(`data ${JSON.stringify(data, null, 2)}`);
                })
                // .catch(err => {
                //     console.log(`error: ${err}`);
                // })
        })
}

const listCountries = (_data)=>{
    let arr = [];
    _data.forEach(element => {
        arr.push(element.name.common)
    });
    console.log(arr);
    
    return arr;
}


const getUrlAll = () => {
    return `https://restcountries.com/v3.1/all`
}
let arrCountries = [];
const doApi2 = (_url)=>{
    fetch(_url).then(response =>{
        if(! response.ok){
            throw Error (`error ${response.status}`)
        }
        return response.json()
        .then(data =>{
            console.log(data);
           console.log( listCountries(data)[1]);
           
            
            // console.log("data: "+JSON.stringify(data, null, 2));
        })
        // .catch(err =>{
        //     console.log(`Error ${err}`);
        // })
    })
}

// doApi2(getUrlAll())
renderInStart();
renderBySearch();

// [
//     {
//         "name": {
//             "common": "Israel",
//             "official": "State of Israel",
//             "nativeName": {
//                 "ara": {
//                     "official": "دولة إسرائيل",
//                     "common": "إسرائيل"
//                 },
//                 "heb": {
//                     "official": "מדינת ישראל",
//                     "common": "ישראל"
//                 }
//             }
//         },
//         "tld": [
//             ".il"
//         ],
//         "cca2": "IL",
//         "ccn3": "376",
//         "cca3": "ISR",
//         "cioc": "ISR",
//         "independent": true,
//         "status": "officially-assigned",
//         "unMember": true,
//         "currencies": {
//             "ILS": {
//                 "name": "Israeli new shekel",
//                 "symbol": "₪"
//             }
//         },
//         "idd": {
//             "root": "+9",
//             "suffixes": [
//                 "72"
//             ]
//         },
//         "capital": [
//             "Jerusalem"
//         ],
//         "altSpellings": [
//             "IL",
//             "State of Israel",
//             "Medīnat Yisrā'el"
//         ],
//         "region": "Asia",
//         "subregion": "Western Asia",
//         "languages": {
//             "ara": "Arabic",
//             "heb": "Hebrew"
//         },
//         "latlng": [
//             31.47,
//             35.13
//         ],
//         "landlocked": false,
//         "borders": [
//             "EGY",
//             "JOR",
//             "LBN",
//             "PSE",
//             "SYR"
//         ],
//         "area": 20770,
//         "demonyms": {
//             "eng": {
//                 "f": "Israeli",
//                 "m": "Israeli"
//             },
//             "fra": {
//                 "f": "Israélienne",
//                 "m": "Israélien"
//             }
//         },
//         "flag": "🇮🇱",
//         "maps": {
//             "googleMaps": "https://goo.gl/maps/6UY1AH8XeafVwdC97",
//             "openStreetMaps": "https://www.openstreetmap.org/relation/1473946"
//         },
//         "population": 9216900,
//         "gini": {
//             "2016": 39
//         },
//         "fifa": "ISR",
//         "car": {
//             "signs": [
//                 "IL"
//             ],
//             "side": "right"
//         },
//         "timezones": [
//             "UTC+02:00"
//         ],
//         "continents": [
//             "Asia"
//         ],
//         "flags": {
//             "png": "https://flagcdn.com/w320/il.png",
//             "svg": "https://flagcdn.com/il.svg",
//             "alt": "The flag of Israel has a white field with a blue hexagram — the Magen David — centered between two equal horizontal blue bands situated near the top and bottom edges of the field."
//         },
//         "coatOfArms": {
//             "png": "https://mainfacts.com/media/images/coats_of_arms/il.png",
//             "svg": "https://mainfacts.com/media/images/coats_of_arms/il.svg"
//         },
//         "startOfWeek": "sunday",
//         "capitalInfo": {
//             "latlng": [
//                 31.77,
//                 35.23
//             ]
//         },
//         "postalCode": {
//             "format": "#####",
//             "regex": "^(\\d{5})$"
//         }
//     }
// ]