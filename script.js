document.getElementById("add").addEventListener("submit", addElem);

document.addEventListener("click", removeElem);
document.addEventListener("click", editElem);
document.addEventListener("click", cancelEdit);
document.addEventListener("click", okEdit);

document.querySelector(".Sort").addEventListener("change", sort);

class SortManager {
    static sortTypes = {"NumAsc": 1, "NumDes": 2, "AlphAsc": 3, "AlphDes": 4};
    static sortType = SortManager.sortTypes.NumAsc;

    static sortComparator(a, b){
        switch (SortManager.sortType) {
            case SortManager.sortTypes.NumAsc: 
                return SortManager.#comparator(a.getAttribute("data-index"), b.getAttribute("data-index"));
            case SortManager.sortTypes.NumDes:
                return SortManager.#comparator(b.getAttribute("data-index"), a.getAttribute("data-index"));
            case SortManager.sortTypes.AlphAsc:
                return SortManager.#comparator(a.childNodes[1].textContent, b.childNodes[1].textContent);
            case SortManager.sortTypes.AlphDes:
                return SortManager.#comparator(b.childNodes[1].textContent, a.childNodes[1].textContent);
            default: break;
        }
    }

    static #comparator(a, b) {
        if(a > b) {
            return 1;
        }
        else if(a < b) {
            return -1;
        }
        return 0;
    }
}

function sort(event) {
    let inpRadio = event.target;
    switch (inpRadio.id) {
        case "NuAsc":
            SortManager.sortType = SortManager.sortTypes.NumAsc;
            break;
        case "NuDes":
            SortManager.sortType = SortManager.sortTypes.NumDes;
            break;
        case "AlphAsc":
            SortManager.sortType = SortManager.sortTypes.AlphAsc;
            break;
        case "AlphDes":
            SortManager.sortType = SortManager.sortTypes.AlphDes;
            break;
        default: break;
    }

    let ulist = document.querySelector(".list-group-item-info");
    let list = document.querySelectorAll(".list-group-item-info li");

    let newList = [...list].sort(SortManager.sortComparator);

    ulist.innerHTML = '';

    for (let li of newList) {
        ulist.appendChild(li);
    }
}

function addElem(event) {
    event.preventDefault();

    let inp = document.querySelector(".form-text-lg");
    let trimInput = inp.value.trim();

    inp.value = "";

    if (trimInput == "") {
        alert("Invalid input data");
        return false;
    }

    let ulist = document.querySelector(".list-group-item-info");
    let list = [...document.querySelectorAll(".list-group-item-info li")];
    let li = document.createElement("li");

    let buttonDelete = document.createElement("button");
    buttonDelete.innerHTML = "X";
    buttonDelete.className = "btn btn-danger";
    buttonDelete.setAttribute("data-action", "Delete");

    let buttonEdit = document.createElement("button");
    buttonEdit.innerHTML = "Редактировать";
    buttonEdit.className = "btn btn-primary";
    buttonEdit.setAttribute("data-action", "Edit");

    li.className = "Elem";
    li.appendChild(document.createTextNode(String(ulist.getElementsByTagName("li").length + 1) + ' - '));
    li.appendChild(document.createTextNode(trimInput));
    li.appendChild(buttonEdit);
    li.appendChild(buttonDelete);
    li.setAttribute("data-index", String(ulist.getElementsByTagName("li").length + 1));

    let i = 0;
    for (; i < list.length; i++) {
        if (SortManager.sortComparator(list[i], li) >= 0) {
            break;
        }
    }
    list.splice(i, 0, li);

    ulist.innerHTML = '';
    for (let i of list) {
        ulist.appendChild(i);
    }

    document.querySelector(".list-status").innerText = "Список: ";
}

function removeElem(event) {
    let deleteBtn = event.target.closest(".btn-danger");

    if (!deleteBtn || deleteBtn.getAttribute("data-action") != "Delete") {
        return;
    }

    if (deleteBtn.parentElement.parentElement.childNodes.length == 1) {
        document.querySelector(".list-status").innerText = "Список пуст";
    }

    let deletedIndex = deleteBtn.parentElement.getAttribute("data-index");
    let ulist = deleteBtn.parentElement.parentElement;

    deleteBtn.parentElement.remove();

    let list = [...document.querySelectorAll(".list-group-item-info li")];

    ulist.innerHTML = '';

    for (let i = 0; i < list.length; i++) {
        if(list[i].getAttribute("data-index") > deletedIndex) {
            list[i].setAttribute("data-index", list[i].getAttribute("data-index") - 1);
            list[i].childNodes[0].textContent = String(list[i].getAttribute("data-index")) + ' - ';
        }
        ulist.appendChild(list[i]);
    }


}

function editElem(event) {
    let editBtn = event.target.closest(".btn-primary");

    if (!editBtn || editBtn.getAttribute("data-action") != "Edit") {
        return;
    }

    let currListElem = editBtn.parentElement;

    let buttonOK = document.createElement("button");
    buttonOK.innerHTML = "OK";
    buttonOK.className = "btn btn-success";
    buttonOK.setAttribute("data-action", "OK");

    currListElem.replaceChild(buttonOK, currListElem.childNodes[2]);

    let buttonCancel = document.createElement("button");
    buttonCancel.innerHTML = "Отмена";
    buttonCancel.className = "btn btn-danger";
    buttonCancel.setAttribute("data-action", "Cancel");

    currListElem.replaceChild(buttonCancel, currListElem.childNodes[3]);

    let input = document.createElement("input");
    input.type = "text";
    input.className = "form-text-sm";
    input.value = currListElem.childNodes[1].textContent;
    input.placeholder = currListElem.childNodes[1].textContent;

    currListElem.replaceChild(input, currListElem.childNodes[1]);
}

function cancelEdit(event) {
    let cancelBtn = event.target.closest(".btn-danger");

    if (!cancelBtn || cancelBtn.getAttribute("data-action") != "Cancel") {
        return;
    }

    let currListElem = cancelBtn.parentElement;

    exitEdit(currListElem, currListElem.childNodes[1].placeholder);
}

function okEdit(event) {
    let okBtn = event.target.closest(".btn-success");

    if (!okBtn || okBtn.getAttribute("data-action") != "OK") {
        return;
    }

    let currListElem = okBtn.parentElement;
    let ulist = currListElem.parentElement;

    okBtn.parentElement.remove();

    exitEdit(currListElem, currListElem.childNodes[1].value);

    let list = [...document.querySelectorAll(".list-group-item-info li")];

    let i = 0;
    for (; i < list.length; i++) {
        if (SortManager.sortComparator(list[i], currListElem) >= 0) {
            break;
        }
    }
    list.splice(i, 0, currListElem);

    ulist.innerHTML = '';
    for (let i of list) {
        ulist.appendChild(i);
    }
}

function exitEdit(currListElem, newText) {
    let buttonDelete = document.createElement("button");
    buttonDelete.innerHTML = "X";
    buttonDelete.className = "btn btn-danger";
    buttonDelete.setAttribute("data-action", "Delete");

    currListElem.replaceChild(buttonDelete, currListElem.childNodes[3]);

    let buttonEdit = document.createElement("button");
    buttonEdit.innerHTML = "Редактировать";
    buttonEdit.className = "btn btn-primary";
    buttonEdit.setAttribute("data-action", "Edit");

    currListElem.replaceChild(buttonEdit, currListElem.childNodes[2]);
    currListElem.replaceChild(document.createTextNode(newText), currListElem.childNodes[1]);
}