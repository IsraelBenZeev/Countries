import Country from './countryClass.js';
const restartCards = () => {
    const cards = document.querySelector(".cards");
    cards.innerHTML = "";
}
const getUrlByName = (_name) => {
    return `https://restcountries.com/v3.1/name/${_name}?fullText=true`
}

export const renderInStart = () => {
    restartCards();
    const cards = document.querySelector(".cards");

    cards.innerHTML = `<div id="loading" class="loader"></div>`
    // <img id="loading" src="./files/loading.webp" alt="">
    const countries = ["israel", "france", "United States", "thailand"];
    countries.forEach(element => {
        doApi(getUrlByName(element));
    });
}
const creatObj = (_item) => {
    const coin = Object.keys(_item.currencies);
    const country = new Country(_item.name.common, _item.population, _item.region, _item.languages, coin, _item.capital[0], _item.flags, _item.capitalInfo.latlng, _item.maps.googleMaps);
    country.render();
}
const renderBySearch = (_arrCountries) => {
    const search = document.querySelector("#search_id");
    const select = document.querySelector("#select_id");
    const cards = document.querySelector(".cards");
    const results_countries = document.querySelector("#results_countries");
    
    search.addEventListener('input', () => {
        results_countries.innerHTML = ""
        restartCards();
        console.log(search.value);
        if (search.value.length > 0) {
            const results = _arrCountries.filter(country =>
                country.toLowerCase().startsWith(search.value.toLowerCase())
               
            );
            // console.log("results: "+JSON.stringify(results, null, 2));
            if (results.length > 0) {
                cards.innerHTML = `
                <div id="loading" class="loader"></div>
                `
                results.forEach(element => {
                    console.log("element: "+ element+", ");
                    results_countries.innerHTML += `
                    <option value="${element}">
                    `
                    doApi(getUrlByName(element));

                });
            }
            else {
                console.log("this countri is not found 😒");
                const notFound = document.createElement("img")
                // const cards = document.querySelector(".cards");
                cards.innerHTML = `
                <img id="not-found" src="./files/not_found.gif" alt="" w-100><br><p style="color: white;">this countri is not found 😒</p>;
           `
            }
        }
        else {
            select.value = ""
            if (select.value) doApi(getUrlByName(select.value));
            else renderInStart();
        }
    })
}
const renderListResults = (_list, _elment_for_render) =>{

    _list.forEach(element => {
        _elment_for_render.innerHTML += `<option value="${element}">`
    });
}
const renderBySelect = () => {
    const select = document.querySelector("#select_id");
    const cards = document.querySelector(".cards");
    select.addEventListener('change', () => {
        restartCards();
        cards.innerHTML = `
            <div id="loading" class="loader"></div>

        `
        // <img id="loading" src="./files/loading.webp" alt="">
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
                    // if(data[0].name.common.startsWith("United States Minor Outlying Islands") || data[0].name.common.startsWith("Isra")){
                    // if(data[0].name.common.startsWith("Bouvet") || data[0].name.common.startsWith("Isra")){
                    if(data[0].name.common.startsWith("United States") && ! data[0].name.common.includes("Minor Outlying Islands")){

                        // console.log(JSON.stringify(data, null, 2));
                    }
                    
                    creatObj(data[0])
                    // const cards = document.querySelector(".cards");
                    // cards.innerHTML = ""
                })
                // .catch(err => {
                //     console.log(`error: ${err}`);
                // })
        })
}

const listCountries = (_data) => {
    let arr = [];
    _data.forEach(element => {
        if(element.unMember && ! element.name.common.includes("Virgin Islands")) arr.push(element.name.common)
    });
    return arr;
}
const getUrlAllNames = () => {
    return `https://restcountries.com/v3.1/all?fields=name,unMember`
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
                // console.log("arr: "+arrCountries.filter(item => item === "United States"));
                
                arrCountries.sort();
                mekeOptinInSelect(arrCountries)
                renderBySearch(arrCountries);
                renderBySelect();
            })
            .catch(err => {
                console.log(`Error ${err}`);
            })
    })
}

doApi2(getUrlAllNames())
renderInStart();













// [
//     {
//       "name": {
//         "common": "Israel",
//         "official": "State of Israel",
//         "nativeName": {
//           "ara": {
//             "official": "دولة إسرائيل",
//             "common": "إسرائيل"
//           },
//           "heb": {
//             "official": "מדינת ישראל",
//             "common": "ישראל"
//           }
//         }
//       },
//       "tld": [
//         ".il"
//       ],
//       "cca2": "IL",
//       "ccn3": "376",
//       "cca3": "ISR",
//       "cioc": "ISR",
//       "independent": true,
//       "status": "officially-assigned",
//       "unMember": true,
//       "currencies": {
//         "ILS": {
//           "name": "Israeli new shekel",
//           "symbol": "₪"
//         }
//       },
//       "idd": {
//         "root": "+9",
//         "suffixes": [
//           "72"
//         ]
//       },
//       "capital": [
//         "Jerusalem"
//       ],
//       "altSpellings": [
//         "IL",
//         "State of Israel",
//         "Medīnat Yisrā'el"
//       ],
//       "region": "Asia",
//       "subregion": "Western Asia",
//       "languages": {
//         "ara": "Arabic",
//         "heb": "Hebrew"
//       },
//       "latlng": [
//         31.47,
//         35.13
//       ],
//       "landlocked": false,
//       "borders": [
//         "EGY",
//         "JOR",
//         "LBN",
//         "PSE",
//         "SYR"
//       ],
//       "area": 20770,
//       "demonyms": {
//         "eng": {
//           "f": "Israeli",
//           "m": "Israeli"
//         },
//         "fra": {
//           "f": "Israélienne",
//           "m": "Israélien"
//         }
//       },
//       "flag": "🇮🇱",
//       "maps": {
//         "googleMaps": "https://goo.gl/maps/6UY1AH8XeafVwdC97",
//         "openStreetMaps": "https://www.openstreetmap.org/relation/1473946"
//       },
//       "population": 9216900,
//       "gini": {
//         "2016": 39
//       },
//       "fifa": "ISR",
//       "car": {
//         "signs": [
//           "IL"
//         ],
//         "side": "right"
//       },
//       "timezones": [
//         "UTC+02:00"
//       ],
//       "continents": [
//         "Asia"
//       ],
//       "flags": {
//         "png": "https://flagcdn.com/w320/il.png",
//         "svg": "https://flagcdn.com/il.svg",
//         "alt": "The flag of Israel has a white field with a blue hexagram — the Magen David — centered between two equal horizontal blue bands situated near the top and bottom edges of the field."
//       },
//       "coatOfArms": {
//         "png": "https://mainfacts.com/media/images/coats_of_arms/il.png",
//         "svg": "https://mainfacts.com/media/images/coats_of_arms/il.svg"
//       },
//       "startOfWeek": "sunday",
//       "capitalInfo": {
//         "latlng": [
//           31.77,
//           35.23
//         ]
//       },
//       "postalCode": {
//         "format": "#####",
//         "regex": "^(\\d{5})$"
//       }
//     }
//   ]


// [
//     {
//       "name": {
//         "common": "Bouvet Island",
//         "official": "Bouvet Island",
//         "nativeName": {
//           "nor": {
//             "official": "Bouvetøya",
//             "common": "Bouvetøya"
//           }
//         }
//       },
//       "tld": [
//         ".bv"
//       ],
//       "cca2": "BV",
//       "ccn3": "074",
//       "cca3": "BVT",
//       "independent": false,
//       "status": "officially-assigned",
//       "unMember": false,
//       "idd": {
//         "root": "+4",
//         "suffixes": [
//           "7"
//         ]
//       },
//       "altSpellings": [
//         "BV",
//         "Bouvetøya",
//         "Bouvet-øya"
//       ],
//       "region": "Antarctic",
//       "languages": {
//         "nor": "Norwegian"
//       },
//       "latlng": [
//         54.4208,
//         3.3464
//       ],
//       "landlocked": false,
//       "area": 49,
//       "flag": "🇧🇻",
//       "maps": {
//         "googleMaps": "https://goo.gl/maps/7WRQAEKZb4uK36yi9",
//         "openStreetMaps": "https://www.openstreetmap.org/way/174996681"
//       },
//       "population": 0,
//       "car": {
//         "signs": [
//           ""
//         ],
//         "side": "right"
//       },
//       "timezones": [
//         "UTC+01:00"
//       ],
//       "continents": [
//         "Antarctica"
//       ],
//       "flags": {
//         "png": "https://flagcdn.com/w320/bv.png",
//         "svg": "https://flagcdn.com/bv.svg"
//       },
//       "coatOfArms": {},
//       "startOfWeek": "monday",
//       "capitalInfo": {}
//     }
//   ]