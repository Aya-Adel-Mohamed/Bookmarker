//Selecting all the elements
var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var BookmarkSiteList;

if(localStorage.getItem("list") != null){
    BookmarkSiteList= JSON.parse(localStorage.getItem("list"));
    console.log(BookmarkSiteList);
    displayBookmark(BookmarkSiteList);
  }
  else{
    BookmarkSiteList=[];
}
// Add Bookmark (create object)
function addBookmark(){
    var nameValue = siteName.value;
    var urlValue =siteUrl.value;
    // Add https if not found
    if (!urlValue== null || !urlValue == "") {
      if(!urlValue.includes('https://') && !urlValue.includes('http://')){
        urlValue = `https://${urlValue}`
    }
    }

if(validateBookmarkName(nameValue) && validateBookmarkUrl(urlValue)){
    var bookmark ={
      name: nameValue,
      url: urlValue,
    }
    clearForm();
    BookmarkSiteList.push(bookmark); //push every new bookmark in an array
    setToLocalStorage();
    displayBookmark(BookmarkSiteList);
    console.log(BookmarkSiteList);
}else{
    if (!validateBookmarkName(nameValue)) {
        errorNameInput("this name already exist");
    }
  
    if (!validateBookmarkUrl(urlValue)) {
        errorUrlInput("this url already exist");
    }
    if (nameValue == null || nameValue == "") {
        errorNameInput("Name is required");
    }
    if (urlValue== null || urlValue == "") {
        errorUrlInput("Url Field is required");
    }
}
}

// Display Bookmark
function displayBookmark(list){
    var cartona =``; //create empty variable to be as a container
    for(var i=0; i < list.length; i++){
        cartona +=`<div class="d-flex flex-row my-4 bg-color-gradient bookmark-list">
        <h2 class="fw-bold text-black">${list[i].name}</h2>
        <a class="btn-color-blue btn-properties text-decoration-none me-2" href="${list[i].url}" target="_blank">visit</a>
        <button class="btn-color-red btn-properties" onclick="deleteBookmark(${i})">Delete</button></div>`;
  }
  document.getElementById('bookmarkList').innerHTML=cartona;
}

// clearForm (clear all inputs with empty value)
function clearForm(){
    siteName.value='';
    siteUrl.value='';
}

// delete Bookmark 
//(get index of deleted item as parameter then splice after that call display bookmark & update local storage)
function deleteBookmark(index){
    BookmarkSiteList.splice(index,1);
    displayBookmark(BookmarkSiteList);
    setToLocalStorage();
}

// Local storage
function setToLocalStorage(){
    localStorage.setItem("list",JSON.stringify(BookmarkSiteList));
}
// ValidationBookmark Name & Url
function validateBookmarkName(nameValue){
    var regex = /^[A-Za-z]{1,}$/;
    if(regex.test(nameValue)){
        for (var i = 0; i < BookmarkSiteList.length; i++) {
            if (BookmarkSiteList[i].name === siteName.value){
            document.getElementById('name-Required').classList.remove("d-none");
            return false
            }
        }
        document.getElementById('name-Required').classList.add("d-none");
        return true}
    else{
        document.getElementById('name-Required').classList.remove("d-none");
        return false
    }
}
function validateBookmarkUrl(urlValue){
    var regex =  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    if(regex.test(urlValue)){
        for (var i = 0; i < BookmarkSiteList.length; i++) {
            if (BookmarkSiteList[i].url === siteUrl.value){
            document.getElementById('url-Required').classList.remove("d-none");
            return false
            }
        }
        document.getElementById('url-Required').classList.add("d-none");
        return true}
    else{
        document.getElementById('url-Required').classList.remove("d-none");
        return false
    }
}

// Error message Input
function errorNameInput(errorMessage) {
    var errorNameInput = document.getElementById('name-Required');
    errorNameInput.innerText = errorMessage;
}

function errorUrlInput(errorMessage) {
    var errorUrlInput = document.getElementById('url-Required');
    errorUrlInput.innerText = errorMessage;
}
