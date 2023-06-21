var frm = document.getElementById("add");

frm.addEventListener("submit", AddElem);

document.querySelector(".list-group-item-info").addEventListener("click", RemoveElem);
document.querySelector(".list-group-item-info").addEventListener("click", EditElem);
document.querySelector(".list-group-item-info").addEventListener("click", CancelEdit);
document.querySelector(".list-group-item-info").addEventListener("click", OkEdit);

function AddElem(event) {
    let inp = document.querySelector(".form-text-lg");
    let TrimInput = inp.value.trim();

    inp.value = "";

    if (TrimInput == "") {
        alert("Invalid input data");
        event.preventDefault();
        return false;
    }

    let ulist = document.querySelector(".list-group-item-info");
    let li = document.createElement("li");

    let buttonDelete = document.createElement("button");
    buttonDelete.innerHTML = "X";
    buttonDelete.className = "btn btn-danger";
    buttonDelete.id = "Delete";

    let buttonEdit = document.createElement("button");
    buttonEdit.innerHTML = "Редактировать";
    buttonEdit.className = "btn btn-primary";
    buttonEdit.id = "Edit";

    li.className = "Elem";
    li.appendChild(document.createTextNode(TrimInput));
    li.appendChild(buttonEdit);
    li.appendChild(buttonDelete);
    ulist.appendChild(li);

    document.querySelector(".list-status").innerText = "Список: ";

    event.preventDefault();
}

function RemoveElem(event) {
    deleteBtn = event.target;

    if (deleteBtn.id != "Delete") {
        return;
    }

    if (deleteBtn.parentElement.parentElement.childNodes.length == 1) {
        document.querySelector(".list-status").innerText = "Список пуст";
    }

    deleteBtn.parentElement.remove();
}

function EditElem(event) {
    editBtn = event.target;

    if (editBtn.id != "Edit") {
        return;
    }

    let currListElem = editBtn.parentElement;

    let buttonOK = document.createElement("button");
    buttonOK.innerHTML = "OK";
    buttonOK.className = "btn btn-success";
    buttonOK.id = "OK";

    currListElem.replaceChild(buttonOK, currListElem.childNodes[1]);

    let buttonCancel = document.createElement("button");
    buttonCancel.innerHTML = "Отмена";
    buttonCancel.className = "btn btn-danger";
    buttonCancel.id = "Cancel";

    currListElem.replaceChild(buttonCancel, currListElem.childNodes[2]);

    let input = document.createElement("input");
    input.type = "text";
    input.className = "form-text-sm";
    input.value = currListElem.childNodes[0].textContent;
    input.placeholder = currListElem.childNodes[0].textContent;

    currListElem.replaceChild(input, currListElem.childNodes[0]);
}

function CancelEdit(event) {
    cancelBtn = event.target;

    if (cancelBtn.id != "Cancel") {
        return;
    }

    let currListElem = cancelBtn.parentElement;

    ExitEdit(currListElem, currListElem.childNodes[0].placeholder);
}

function OkEdit(event) {
    OkBtn = event.target;

    if (OkBtn.id != "OK") {
        return;
    }

    let currListElem = OkBtn.parentElement;

    ExitEdit(currListElem, currListElem.childNodes[0].value);
}

function ExitEdit(currListElem, newText) {
    let buttonDelete = document.createElement("button");
    buttonDelete.innerHTML = "X";
    buttonDelete.className = "btn btn-danger";
    buttonDelete.id = "Delete";

    currListElem.replaceChild(buttonDelete, currListElem.childNodes[2]);

    let buttonEdit = document.createElement("button");
    buttonEdit.innerHTML = "Редактировать";
    buttonEdit.className = "btn btn-primary";
    buttonEdit.id = "Edit";

    currListElem.replaceChild(buttonEdit, currListElem.childNodes[1]);
    currListElem.replaceChild(document.createTextNode(newText), currListElem.childNodes[0]);
}