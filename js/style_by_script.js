// import gsap from "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";

// gsap.to("#logo", { rotation: 360, repeat: -1, duration: 2, ease: "linear" })
// gsap.registerPlugin(TextPlugin)

const li = document.querySelectorAll("li");
li.forEach(element => {
    element.addEventListener("mouseenter", () => {
        gsap.to(element, { y: +10, repeat: 1, yoyo: true, duration: 0.5, ease: "bounce" });//האלמנט יקפוץ פעמיים
    })
});


const animationOnCardInHover = (_element) => {
    // const my_card = document.querySelector(".myCard");
    if (_element) {
//         // הגדרת אנימציית הכניסה של הדיב
        _element.addEventListener('mouseenter', () => {
            console.log("card hover");
            gsap.set(_element, {
                transformStyle: "preserve-3d",
                perspective: 1000
            });
            gsap.to(_element, {
                rotationY: 45,
                duration: 1,
                ease: "power2.inOut"
            });
        })

        _element.addEventListener('mouseleave', () => {
            console.log("card unhover");
            gsap.to(_element, {
                rotationY: 0,
                duration: 1,
                ease: "power2.inOut",
                clearProps: "transform" // מנקה את ה-transform כדי להתחיל אנימציה חדשה
            });
        });
    }
    else console.log("my card is not exist");
}

export { animationOnCardInHover }