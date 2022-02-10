function getElemPos(elem) {
  return window.pageYOffset + elem.getBoundingClientRect().top;
}

function scroll(event) {
    let target = document.querySelectorAll(`.${event.currentTarget.classList[1]}`)[1];
    let elem_y = getElemPos(target);
    
    let start_y = window.pageYOffset;
    let target_y = document.body.scrollHeight - elem_y < window.innerHeight ? document.body.scrollHeight - window.innerHeight : elem_y;
    let diff = target_y - start_y;
    let easing = function (t) { return t < 0.5 ? 4*t**3 : 4*(t - 1)**3 + 1};
    let start;
    
    if (!diff) return;
        
    window.requestAnimationFrame(function step(timestamp) {
        if (!start) start = timestamp;
        let time = timestamp - start;
        let percent = Math.min(time / 2000, 1);
        percent = easing(percent);
        window.scrollTo(0, start_y + diff * percent);
        if (time < 2000) {
            window.requestAnimationFrame(step)
        }
    })
}

const main = () => {
    let stages = document.querySelectorAll(".stage")
    for(let a = 0; a < stages.length; a++) {
        stages[a].addEventListener("click", scroll)
    }
};
main();
