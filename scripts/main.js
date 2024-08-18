let myImage = document.querySelector("img");

myImage.onclick = function () {
    let mySrc = myImage.getAttribute("src");
    if (mySrc === "images/xiaogou.jpg") {
        myImage.setAttribute("src", "images/gou.jpg");
    } else {
        myImage.setAttribute("src", "images/xiaogou.jpg");
    }
};


let myButton = document.querySelector("button");
let myHeading = document.querySelector("h1");

function setUserName() {
    let myName = prompt("请输入你的名字。");
    if(!myName){
        setUserName();
    }
    else{localStorage.setItem("name", myName);
    myHeading.textContent = "名字是：" + myName;}
}

if (!localStorage.getItem("name")) {
    setUserName();
} else {
    let storedName = localStorage.getItem("name");
    myHeading.textContent = "再次见面，" + storedName;
}


myButton.onclick = function () {
    setUserName();
};

