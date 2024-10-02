const btn = document.querySelector("button");

const controller = new AbortController();

btn.addEventListener("click", () => {
    if (document.body.style.backgroundColor !== "black") { document.body.style.backgroundColor = "black"; }
    else {
        document.body.style.backgroundColor = "white";
    }
}, {
    signal: controller.signal
})

btn.addEventListener("dblclick", () => {
    controller.abort();
}, true)
