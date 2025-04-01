import Country from './countryClass.js';
// import { logoAnomation } from './style_by_script.js';
const cards = document.querySelector(".cards");
const createLoading = (_element) => {
    _element.innerHTML = `<div id="loading" class="loader"></div>`
}
const deleteTotal = ()=>{
    const total = document.querySelector("#total")
    if (total) total.innerHTML = ""
}
const restartCards = () => {
    const cards = document.querySelector(".cards");
    cards.innerHTML = "";
}
const getUrlByName = (_name) => {
    return `https://restcountries.com/v3.1/name/${_name}?fullText=true`
}
const getUrlByCode = (_code) => {
    return `https://restcountries.com/v3.1/alpha/${_code}`
}

const renderInStart = async (_arrCountries) => {
    restartCards();
    createLoading(cards)
    // const cards = document.querySelector(".cards");
    // createLoading(cards);
    // const countries = ["israel", "france", "United States", "thailand"];
    // countries.forEach(element => {
    //     requestApiByUrl(getUrlByName(element));
    // });

    function getLocation() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject("Geolocation is not supported by your browser");
                return;
            }
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(`${position.coords.latitude}, ${position.coords.longitude}, ${position.coords.accuracy}, ${position.timestamp}`);
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy,
                    timestamp: position.timestamp,
                });

            },
                (error) => {
                    reject(`Error getting location: ${error.message}`);
                }
            );
        });
    }

    async function getAddressFromCoords(latitude, longitude) {
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=en`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            //   console.log(JSON.stringify(data, null, 2));
            console.log(data.address.country);
            requestApiByUrl(getUrlByName(data.address.country));
            optionsForRender(data.address.country)
            showAllCountries(_arrCountries)

            return data.address.country;
        } catch (error) {
            console.error("Error fetching address:", error);
            return "Unknown location";
        }
    }
    const points = await getLocation();
    getAddressFromCoords(points.latitude, points.longitude);

}

const optionsForRender = (_location) => {
    cards.innerHTML += `
    <div id="options">
    <h3>Your location: ${_location}</h3>
    <button id="shoa_all" class="btn btn-light"">Show all countries</button>
    </div>
    `
}

const showAllCountries = (_aar_countries) => {
    const container = document.querySelector(".myContainer")
    const showAll = document.querySelector("#shoa_all");
    let i = 0;
    showAll.addEventListener('click', () => {
       _aar_countries.forEach(element => {
        createLoading(cards)
        requestApiByUrl(getUrlByName(element))
        i ++;
    });
    container.innerHTML += `<div id="total"><h4>total: ${i}</h4></div>`
    })

}

const renderCountriesInNavbar = () => {
    const countries = document.querySelectorAll(".countries_in_navbar");
    countries.forEach(element => {
        element.addEventListener('click', () => {
            restartCards();
            console.log(`entered ${element.textContent}`);
            requestApiByUrl(getUrlByCode(element.textContent))
        })
    });
}

const creatObj = (_item) => {
    const coin = Object.keys(_item.currencies);
    const country = new Country(_item.name.common, _item.population, _item.region, _item.languages, coin, _item.capital[0], _item.flags, _item.capitalInfo.latlng, _item.maps.googleMaps, _item.borders);
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
        deleteTotal();
        console.log(search.value);
        if (search.value.length > 0) {
            const results = _arrCountries.filter(country =>
                country.toLowerCase().startsWith(search.value.toLowerCase())
            );
            // console.log("results: "+JSON.stringify(results, null, 2));
            if (results.length > 0) {
                createLoading(cards);
                // cards.innerHTML = `<div id="loading" class="loader"></div>`
                setTimeout(() => renderListResults(results), 0);
                results.forEach(element => {
                    requestApiByUrl(getUrlByName(element));
                });
            }
            else {
                console.log("this countri is not found 😒");
                const notFound = document.createElement("img")
                cards.innerHTML = `
                <img id="not-found" src="./files/not_found.gif" alt="" w-100><br><p style="color: white;">this countri is not found 😒</p>;
           `
            }
        }
        else {
            select.value = ""
            if (select.value) requestApiByUrl(getUrlByName(select.value));
            else renderInStart();
        }
    })
}

const renderListResults = (_list) => {
    const results_countries = document.querySelector("#results_countries");
    _list.forEach(element => {
        results_countries.innerHTML += `<option value="${element}">`
    });
}

const renderBySelect = () => {
    const select = document.querySelector("#select_id");
    const cards = document.querySelector(".cards");
    select.addEventListener('change', () => {
        restartCards();
        deleteTotal()
        createLoading(cards);
        requestApiByUrl(getUrlByName(select.value))
    })
}

const requestApiByUrl = (_url) => {
    console.log("enter to doAPI");
    fetch(_url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error ${response.status}`);
            }
            return response.json()
                .then(data => {
                    // if (data[0].name.common.startsWith("Is") || data[0].name.common.startsWith("Isra")) {
                    //     console.log(JSON.stringify(data, null, 2));
                    // }

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
        if (element.unMember && !element.name.common.includes("Virgin Islands")) arr.push(element.name.common)
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
const doApi2 = async (_url) => {
    const response = await fetch(_url);
    if (!response.ok) {
        throw Error(`error ${response.status}`)
    }
    const data = await response.json()
    // .then(data => {
    const arrCountries = listCountries(data);
    arrCountries.sort();
    mekeOptinInSelect(arrCountries)
    renderBySearch(arrCountries);
    renderBySelect();

    return arrCountries;
    // })
    // .catch(err => {
    //     console.log(`Error ${err}`);
    // })
}


const changeColorNavbarWhenScroll = () => {

    const navbar = document.querySelector("#nav_id");
    const originalColor = "rgba(15, 23, 34, 0.264)";
    const scrolledColor = "rgba(15, 23, 34, 0.813)";
    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            navbar.style.backgroundColor = scrolledColor;
        } else {
            navbar.style.backgroundColor = originalColor;
        }
    })
}


renderCountriesInNavbar();
const arrCountries = await doApi2(getUrlAllNames())
// await console.log("Countries: " + arrCountries);
// showAllCountries(arrCountries);

renderInStart(arrCountries);
// doApi2(getUrlAllNames())
changeColorNavbarWhenScroll();

export { requestApiByUrl as doApi, getUrlByCode, restartCards, createLoading, deleteTotal };



