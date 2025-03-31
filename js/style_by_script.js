gsap.to("#logo", { rotation: 360, repeat: -1, duration: 2, ease: "linear" })
const li = document.querySelectorAll("li");
li.forEach(element => {
    element.addEventListener("mouseenter", () => {
        gsap.to(element, { y: +10, repeat: 1, yoyo: true, duration: 0.5, ease: "bounce" });//האלמנט יקפוץ פעמיים
    })
});
const animationOnCard = (_element)=>{
    // const my_card = document.querySelector(".myCard");
    if (_element) {
        // gsap.set(_element, { transformStyle: "preserve-3d" });
        _element.addEventListener('mouseenter', () => {
            console.log("card hover");
            gsap.to(_element, { 
                rotationY: 45,
                duration: 2,
                ease: "power2.inOut"
            });
        })
    }
    else console.log("my card is not ex");

}

export{animationOnCard}