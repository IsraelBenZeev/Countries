import { renderInStart } from "./app.js";
class Country {
    constructor(_name, _pop, _region, languages, _coin, _capital, _flag) {
        this.name = _name;
        this.pop = _pop;
        this.region = _region;
        this.languages = languages;
        this.coin = _coin;
        this.capital = _capital;
        this.flag = _flag;
    }
    render() {
        // const main = document.querySelector("main");
        // const container = document.querySelector(".myContainer");

        const card = document.createElement("div");
        const cards = document.querySelector(".cards");
        // const cards = document.createElement("div");
        card.classList = "myCard"
        cards.classList = "cards"
        const flag = document.createElement("img");
        flag.classList = "flag"
        flag.src = this.flag.png;
        const name = document.createElement("div");
        name.textContent = this.name;
        card.append(flag, name);
        cards.appendChild(card)
        card.addEventListener('click', () => {
            console.log("entered");
            this.renderPop();
        })

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
        back.classList = "btn btn-secondary";
        back.textContent = "back";
        back.addEventListener('click', () => {
            console.log("back entered");
            renderInStart();

        })

        container.appendChild(cards);
        card.append(flag, information, back);
        cards.appendChild(card)

    }
}
export default Country;