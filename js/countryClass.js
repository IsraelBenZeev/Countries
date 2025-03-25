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
        // const main = document.querySelector("main");
        // const container = document.querySelector(".myContainer");
        const loading = document.querySelector("#loading");

        const card = document.createElement("div");
        const body = document.createElement("div");
        body.className = "body_class"
        const cards = document.querySelector(".cards");
        // const cards = document.createElement("div");
        card.classList = "myCard"
        cards.classList = "cards"
        const flag = document.createElement("img");
        flag.classList = "flag"
        flag.src = this.flag.png;
        const name = document.createElement("div");
        name.textContent = this.name;
        body.append(flag, name)
        card.append(body);
        cards.appendChild(card)
        card.addEventListener('click', () => {
            console.log("entered");
            this.renderPop();
        })
        if (loading) loading.classList = "hide";

    }
    creatMapWithPoints(a, b){
        var map = L.map('map').setView([a, b], 7);

        // שימוש באריחים של גוגל מפות
        var googleLayer = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
          subdomains: ['mt0', 'mt1', 'mt2', 'mt3'], // שרתים של גוגל
          attribution: 'Map data © Google'
        });
      
        googleLayer.addTo(map);
    }
    renderPop() {



        // const main = document.querySelector("main");
        const arrLan = Object.keys(this.languages);
        let languagesStr = "";
        arrLan.forEach((key, index) => {
            languagesStr += this.languages[key];
            if (index < arrLan.length - 1) {
                languagesStr += ", ";
            }
        });

        const container = document.querySelector(".myContainer");
        const card = document.createElement("div");
        const left = document.createElement("div");
        left.classList = "left"
        const right = document.createElement("div");
        right.classList = "right"
        const cards = document.querySelector(".cards");
        // const cards = document.createElement("div");
        card.classList = "myCard"
        cards.classList = "cards"
        cards.innerHTML = ""
        const information = document.createElement("div");
        const flag = document.createElement("img");
        information.innerHTML = `
        <span id="name_id">${this.name}</span><br>
        <i class="fa fa-users" aria-hidden="true"></i> pop: ${this.pop.toLocaleString()}<br>
        <i class="fa fa-globe" aria-hidden="true"></i> region: ${this.region}<br>
        <i class="fa fa-language" aria-hidden="true"></i> langueges: ${languagesStr}<br>
        <i class="fa fa-database" aria-hidden="true"></i> coin: ${this.coin}<br>
        <i class="fa fa-university" aria-hidden="true"></i> capital: ${this.capital}
        `
        flag.src = this.flag.png;
        const back = document.createElement("button");
        back.classList = "btn btn-dark";
        back.textContent = "back";
        back.addEventListener('click', () => {
            console.log("back entered");
            renderInStart();

        })
        // right.innerHTML = "hyhyredrjhmjhkjrnhoiujgownguobgiphwbihvbugbvugbriyug"
        // right.innerHTML = 
        right.innerHTML = `
            <div id="containerMap"><a href=${this.link_map}><div id="map" style="width: 100%; height: 500px;"></div></a></div>
        `
        setTimeout(() => this.creatMapWithPoints(this.points[0], this.points[1]), 0);


        container.appendChild(cards);
        left.append(flag, information, back);
        card.append(left, right)
        cards.appendChild(card)

    }
}
export default Country;