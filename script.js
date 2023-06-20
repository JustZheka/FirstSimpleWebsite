var btn = document.querySelector(".btn");

btn.addEventListener("click", (event) => AddElem())

function AddElem(){
    
    let inp = document.querySelector(".in");
    if(inp.value != ""){

        let ulist = document.querySelector(".ulist");

        let li = document.createElement("li");
        li.appendChild(document.createTextNode(inp.value));

        ulist.appendChild(li);

        inp.value = "";
        document.querySelector(".list-status").innerText = "Список: ";
    }
}
