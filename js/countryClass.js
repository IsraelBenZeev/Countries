import { renderInStart } from "./app.js";
class Country {
    constructor(_name, _pop, _region, languages, _coin, _capital, _flag, _points, _link_map) {
        this.name = _name;
        this.pop = _pop;
        this.region = _region;
        this.languages = languages;
        this.coin = _coin;
        this.capital = _capital;
        this.flag = _flag;
        this.points = _points;
        this.link_map = _link_map;
    }
    render() {
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
            this.updatePop(this.name, this.flag, this.pop, this.region, this.languages, this.coin, this.capital, this.points, this.link_map)

        })
        if (loading) loading.classList = "hide";
    }

    updatePop(_name, _flag, _pop, _region, _languages, _coin, _capital, _points, _link_map) {
        console.log("link map: " + _link_map);

        document.querySelector("#name_id").textContent = _name;
        document.querySelector("#pop_content").innerHTML = `
    <div id="left">
        <div><img id="flag" src="${_flag.png}" class="d-block"></img></div>
        <div id="info"><i class="fa fa-users"></i> pop: ${_pop.toLocaleString()}</div>
        <div id="info"><i class="fa fa-globe"></i> region: ${_region}</div>
        <div id="info"><i class="fa fa-language"></i> languages: ${Object.values(_languages).join(", ")}</div>
        <div id="info"><i class="fa fa-database"></i> coin: ${_coin}</div>
        <div id="info"><i class="fa fa-university"></i> capital: ${_capital}</div>
    </div>
    <div id="right">
        <iframe id="map_iframe_id" src="https://maps.google.com/maps?q=${_points[0]},${_points[1]}&z=6&output=embed"
            frameborder="0"></iframe>
        <p><a id="link_map" href="${_link_map}" target="_blank">click here for open with googl map
            </a><img id="icon_google_map" src="./files/icon_google_map.png" alt="icon_google_map"></p>
    </div>
            
    `;
    }

    creatModalWithtMoreInfo() {
        console.log(" entered to creatModalWithtMoreInfo");

        // const arrLan = Object.keys(this.languages);
        const modal = document.createElement("div");
        let languagesStr = "";
        modal.innerHTML = `
    <div class="modal-xl modal fade" id="popCard" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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