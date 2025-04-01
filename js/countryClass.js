// import { renderInStart } from "./app.js";
import { doApi, getUrlByCode, restartCards, createLoading, deleteTotal } from "./app.js";
import { requestWether, getUrlByCity } from "./weather.js";
// import { animationOnCardInHover } from "./style_by_script.js";
class Country {
    constructor(_name, _pop, _region, languages, _coin, _capital, _flag, _points, _link_map, _borders) {
        this.name = _name;
        this.pop = _pop;
        this.region = _region;
        this.languages = languages;
        this.coin = _coin;
        this.capital = _capital;
        this.flag = _flag;
        this.points = _points;
        this.link_map = _link_map;
        this.borders = _borders;
    }
    bordersToStr(_borders) {
        return _borders.map(item => `
            <button id="close_enter_another_countri" type="button" class="btn btn-secondary" data-bs-dismiss="modal">${item}</button>
            `
        ).join("");
    }
    render() {
        console.log("enter to render");
        this.creatModalWithtMoreInfo()
        const loading = document.querySelector("#loading");
        const card = document.createElement("div");
        const bodyCard = document.createElement("div");
        bodyCard.className = "body_card"
        const cards = document.querySelector(".cards");
        card.classList = "myCard"
        cards.classList = "cards"
        const flag = document.createElement("img");
        flag.classList = "flag"
        flag.src = this.flag.png;
        const name = document.createElement("div");
        name.classList = "name_title"
        name.textContent = this.name;
        card.append(bodyCard);
        const buttonOpenModal = document.createElement("div");
        buttonOpenModal.innerHTML = `<button id="button_more_info" type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#popCard">More info</button>`
        bodyCard.append(flag, name, buttonOpenModal)
        cards.append(card)
        card.addEventListener('click', () => {
            this.updateDataEndrender(this.name, this.flag, this.pop, this.region, this.languages, this.coin, this.capital, this.points, this.link_map, this.borders)

        })
        if (loading) loading.classList = "hide";
        // setTimeout(()=>{animationOnCardInHover(card)},0)
    }

    hideLoadingOnMap() {
        console.log("entered");
        const iframe = document.querySelector("#map_iframe_id");
        const loadingDiv = document.querySelector("#loading_map_div");
        iframe.onload = function () {
            loadingDiv.style.display = "none";
            iframe.style.display = "block";
        };
    }
    async updateDataEndrender(_name, _flag, _pop, _region, _languages, _coin, _capital, _points, _link_map, _borders) {
        const weatherData = await requestWether(getUrlByCity(_name));
        document.querySelector("#name_id").textContent = _name;
        document.querySelector("#pop_content").innerHTML = `
        <div id="left">
        <div><img id="flag" src="${_flag.png}" class="d-block"></img></div>
        
        <div id="info"><i class="fa fa-users"></i> pop: ${_pop.toLocaleString()}</div>
        <div id="info"><i class="fa fa-globe"></i> region: ${_region}</div>
        <div id="info"><i class="fa fa-language"></i> languages: ${Object.values(_languages).join(", ")}</div>
        <div id="info"><i class="fa fa-database"></i> coin: ${_coin}</div>
        <div id="info"><i class="fa fa-university"></i> capital: ${_capital}</div>
        <div id="info" class="temp"><i class="fa fa-thermometer-empty" aria-hidden="true"></i>temp: ${weatherData.temp} <p id="show_more">show more</p></div>
        <div id="info" class="borders"><i class="fa fa-map" aria-hidden="true"></i> ${this.bordersToStr(_borders)}</div>
        </div>
        <div id="right">
        <div id="loading_map_div"><div id="loading" class="loader loader_on_map"></div></div>
        <iframe id="map_iframe_id" src="https://maps.google.com/maps?q=${_points[0]},${_points[1]}&z=6&output=embed"
        frameborder="0"></iframe>
        <p><a id="link_map" href="${_link_map}" target="_blank">click here for open with googl map
        </a><img id="icon_google_map" src="./files/icon_google_map.png" alt="icon_google_map"></p>
        </div>
        
    `;
        setTimeout(() => {this.show_more_wether(weatherData);}, 0)
        this.listinerCodeEndRender()
    }

    show_more_wether(weatherData) {
        const show_more = document.querySelector("#show_more");
        const left = document.querySelector("#left");
        const temp_div = document.querySelector(".temp");
        show_more.addEventListener('click', () => {
            temp_div.innerHTML = `
            <div id="info"><i class="fa fa-thermometer-empty" aria-hidden="true" "></i>temp: ${weatherData.temp}<img id="iconWeather" src="https://openweathermap.org/img/wn/${weatherData.icon}@2x.png" id="info"></div>
            <div id="info"><img class="icon" src="./files/feels_like.png" alt="feels like icon"> feels like: ${weatherData.fells_like}</div>
            <div id="info"> <img class="icon" src="./files/description.png" alt="description icon"> description: ${weatherData.description}</div>
            <div id="info"><img class="icon" src="./files/speed.png" alt="speed icon"> speed: ${weatherData.speed}</div>
            `
            temp_div.style.overflow = "auto";
            temp_div.style.minHeight = "100px";
            temp_div.scrollTop = 0;
            temp_div.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            console.log("weatherData.fells_like: " + weatherData.fells_like);
        })
    }

    listinerCodeEndRender(){
        const cards = document.querySelector(".cards");
        const borders = document.querySelector(".borders");
        borders.addEventListener('click', (e) => {
            e.preventDefault();
            console.log("clicked");
            console.log("event: " + e.target.textContent.trim());
            restartCards();
            createLoading(cards)
            deleteTotal()
            doApi(getUrlByCode(e.target.textContent.trim()));
        })
        this.hideLoadingOnMap()
    }

    creatModalWithtMoreInfo() {
        console.log(" entered to creatModalWithtMoreInfo");

        // const arrLan = Object.keys(this.languages);
        const modal = document.createElement("div");
        let languagesStr = "";
        // <div class="modal-xl modal fade" id="popCard" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        modal.innerHTML = `
    <div class="modal-xl modal fade" id="popCard" tabindex="-1" aria-labelledby="exampleModalLabel">
        <div class="modal-dialog">
            <div class="modal-content">
                <div id="title" class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel"><span id="name_id">${this.name}</span></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div id="pop_content" class="modal-body">
                 
                </div>
                <div id="footer_pop_id" class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">close</button>
                </div>
            </div>
        </div>
    </div>
    `
        document.body.appendChild(modal)
    }
}
export default Country;