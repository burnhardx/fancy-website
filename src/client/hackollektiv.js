const dom = require("./dom");
const AnimateGivenElementsIfVisible = require("./animateGivenElementsIfVisible");

document.addEventListener("DOMContentLoaded", evt=>{
    const animator = new AnimateGivenElementsIfVisible(dom('.animated'));
});