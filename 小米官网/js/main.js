
var arr,
form,
ids,
button,
readMe,
inputs;

function init(selector,_readMe) {
    readMe=_readMe;
    // "input:not([type=radio])"
    inputs= Array.from(document.querySelectorAll(selector));
    form = document.querySelector("form");
    button = document.querySelector("button[type=submit]");
    button.disabled = true;
    arr = new Array(inputs.length).fill(false);
    form.addEventListener("input", inputHandler);
    if(readMe){
        readMe.addEventListener("click",clickHandler);
    }
}

function clickHandler(e){
    buttonEnabled();
}

function inputHandler(e) {
    var index = inputs.indexOf(e.target);
    if (index < 0) return;
    if (ids) return;
    ids = setTimeout(function () {
        clearTimeout(ids);
        ids = 0;
        arr[index] = regTest(e.target.value, index);
        if (arr[index]) {
            removeClass(e.target.parentElement.parentElement, "has-error");
            addClass(e.target.parentElement.parentElement, "has-success");
        } else {
            removeClass(e.target.parentElement.parentElement, "has-success");
            addClass(e.target.parentElement.parentElement, "has-error");
        }
      
        buttonEnabled();
    }, 500);
}

function buttonEnabled(){
        button.disabled = true;
    if (arr.indexOf(false) < 0) {
        if(readMe && !readMe.checked) return;
        button.disabled = false;
        addClass(button,"btn-success")
    }
}

function regTest(text, index) {
    switch (index) {
        case 0:
            return /^\D\w{7,19}$/.test(text);
        case 1:
            return /^(?=\D+\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,16}$/.test(text);
        case 2:
            return /^.{1,8}$/.test(text);
        case 3:
            return /^\d{1,3}$/.test(text);
        case 4:
            return /^1\d{10}$/.test(text);
        case 5:
            return /^\w+@\w+\.com$/.test(text);

    }
}


function addClass(elem, className) {
    var arr = elem.className.match(/\S+/g);
    var arr1 = className.match(/\S+/g);
    arr1.forEach(function (item) {
        if (arr.indexOf(item) === -1) arr.push(item);
    });
    elem.className = arr.join(" ");
}

// 删除class样式
function removeClass(elem, className) {
    var arr = elem.className.match(/\S+/g);
    var arr1 = className.match(/\S+/g);
    // 从一个数组中删除与另一个数组中相同的元素
    arr = arr.filter(function (item) {
        return arr1.indexOf(item) === -1;
    });
    elem.className = arr.join(" ");
} 