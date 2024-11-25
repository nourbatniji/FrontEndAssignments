var siteNameInput = document.getElementById("siteName")
var siteUrlInput = document.getElementById("siteUrl")
var alertName = document.getElementById("alertName")
var alertUrl = document.getElementById("alertUrl")

if (localStorage.getItem("list") == null) {
    var sitesList = [];
}
else {
    sitesList = JSON.parse(localStorage.getItem("list"))
    displaySites();
}

function addSite() {
    if (validName() == true && validUrl() == true) {
        var site = {
            siteName: siteNameInput.value,
            siteUrl: siteUrlInput.value
        }
        sitesList.push(site)
        localStorage.setItem("list", JSON.stringify(sitesList))
        displaySites();
        console.log(sitesList);
    }
    else{
        const modal = new bootstrap.Modal(document.getElementById('errorModal'));
        modal.show();
    }
}
function displaySites() {
    var sites = ""
    for (var i = 0; i < sitesList.length; i++) {
        sites +=
            `  <tr>
          <th scope="row">`+ i + `</th>
          <td>`+ sitesList[i].siteName + `</td>
                        <td><a href="`+ sitesList[i].siteUrl + `" target="_blank"><button type="button" class="btn visit text-white fw-medium"><i class="fa-solid fa-eye"></i>  Visit</button></a></td>                        
                        <td><button onclick = "deleteSite(`+ i + `)"  type="button" class="btn delete text-white fw-medium"><i class="fa-solid fa-trash-can"></i>  Delete</button></td>
      </tr>`
    }
    document.getElementById("tableBody").innerHTML = sites

}

function deleteSite(x) {
    sitesList.splice(x, 1)
    localStorage.setItem("list", JSON.stringify(sitesList))
    displaySites()
}

function validName() {
    var NameRegex = /^[A-Za-z]{3,}[0-9]{0,6}$/
    if (NameRegex.test(siteNameInput.value) == true) {
        alertName.classList.add("d-none")
        siteNameInput.classList.add("is-valid")
        siteNameInput.classList.remove("is-invalid")
        return true
    } else {
        alertName.classList.remove("d-none")
        siteNameInput.classList.add("is-invalid")
        siteNameInput.classList.remove("is-valid")
        return false
    }
}
function validUrl() {
    var UrlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/.*)?$/i;
    if (UrlRegex.test(siteUrlInput.value) == true) {
        alertUrl.classList.add("d-none")
        siteUrlInput.classList.add("is-valid")
        siteUrlInput.classList.remove("is-invalid")
        return true
    } else {
        alertUrl.classList.remove("d-none")
        siteUrlInput.classList.add("is-invalid")
        siteUrlInput.classList.remove("is-valid")
        return false
    }
}
siteNameInput.addEventListener("keyup", validName)
siteUrlInput.addEventListener("keyup", validUrl)


