const toDoForm = document.querySelector(".js-toDoForm"), 
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

//todo를 삭제: localstorage, html에서 지워야함(2가지 일)
function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li); //html에서 지움

    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id); 
        //toDo.id는 숫자이고, li.id가 문자여서 li.id(string)를 숫자로 바꿔줘야함. parseInt
    }); 
    //filter는 array의 각 요소에 대해 함수를 실행한 뒤, true인 요소들만 모아서 다시 array를 만든다. 
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    
    delBtn.innerText = "X";
    delBtn.addEventListener("click",deleteToDo);

    span.innerText = text;

    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;

    toDoList.appendChild(li);
    toDosObj = {
        text: text,
        id: newId
    };
    toDos.push(toDosObj);
    saveToDos(toDos);
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos); //localstorage 정보를 object 로 바꿔줌
        parsedToDos.forEach(function (toDo) {
            paintToDo(toDo.text);
        });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}

init();