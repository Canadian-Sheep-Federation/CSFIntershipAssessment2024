console.log('Client-side code running');

//add listener to button to get random cat image
const randBtn = document.getElementById('randBtn');

const randBreed = document.getElementById("randBreed");
const randUrl = document.getElementById("randUrl");
const randWiki = document.getElementById("randWiki");
const randId = document.getElementById("randId");
const randImg = document.getElementById("randImg");

const saveBreed = document.getElementById("saveBreed");
const saveUrl = document.getElementById("saveUrl");
const saveWiki = document.getElementById("saveWiki");
const saveId = document.getElementById("saveId");

const saveBtn = document.getElementById("saveBtn");
const deleteBtn = document.getElementById("deleteBtn");

const searchId = document.getElementById("searchId");
const searchBtn = document.getElementById("searchBtn");
const searchImg = document.getElementById("searchImg");

const divCatCollect = document.getElementById("catcollect");

function copyabove() {
  saveBreed.value = randBreed.value;
  saveUrl.value = randUrl.value;
  saveWiki.value = randWiki.value;
  saveId.value = randId.value;
}

//creates the html display sections of each cat json entry and appends it
function catCollectionImages(json) {
  var length = Object.keys(json).length
  //clear out the catcollect div
  divCatCollect.innerHTML = "";
  for(let i = 0; i < length; i++) {
    //var newDiv = document.createElement("div"); //make a new container4 for every 4 elements
    if((i+1)%4 == 1) {
      var newDiv = document.createElement("div") //make a new container4 for every 4 elements
      newDiv.className = "container4";
    }

    data = json[i];
    console.log(data);
    var newCat = document.createElement("div"); //create a new container for every cat entry
    var textBreed = document.createElement("b");
    var textId = document.createElement("i");
    var textWiki = document.createElement("a");
    var imgCat = document.createElement("img");

    var minicontainer = document.createElement("div");
    minicontainer.className = "minicontainer";

    newCat.className = "container1";

    imgCat.src = data["url"]
    imgCat.className = "collectionImg";
    textBreed.innerHTML = data["breed"];
    textId.innerHTML = data["id"];
    textWiki.innerHTML = "Wikipedia";
    textWiki.href = data["wikipedia_url"];
    
    //append to minicontainer so can text-center
    minicontainer.append(imgCat);
    minicontainer.append(textBreed);
    minicontainer.append(textWiki);
    minicontainer.append(textId);
    
    //append minicontainer to newcat
    newCat.append(minicontainer);

    //append newcat to newdiv
    newDiv.append(newCat);



    if((i+1)%4 == 0) {
      divCatCollect.append(newDiv);
    }
  }

  //append the last if it does not perfectly fit
  if(length%4 != 0) {
    divCatCollect.append(newDiv);
  }
}

//sends a request to the server to get all cat information saved and use catCollectionImages()
//to display them all
function getCatCollection() {
  fetch('/getcats', {method: 'GET'})
  .then(response=>response.json())
  .then(function(response) {
    if(response.ok) {
      console.log("recieved response to get all cats");
      console.log(response.data);
      catCollectionImages(response.data);
      return;
    }
    throw new Error("request failed.");
  })
  .catch(function(error) {
    console.log(error);
  });
}

//sends a request to the server to request information of a random cat
function setRandomCatBtn() {
  //click the search buton
  randBtn.addEventListener('click', function(e) {
    console.log('button was clicked');

    //notify server that button was clicked
    //get back json data from server
    //assign json data to the relevant textboxes
    fetch('/clickedrandom', {method: 'POST'})
    .then(response=>response.json())
    .then(function(response) {
      if(response.ok) {
        console.log("random button was recorded");
        console.log(response.data);
        var json = response.data[0];
        //console.log(json['breeds']['0']['name']);
        //console.log(json['url']);
        //console.log(json['breeds']['0']['wikipedia_url']);
        randBreed.value = json['breeds']['0']['name'];
        randUrl.value = json["url"];
        randWiki.value = json['breeds']['0']['wikipedia_url'];
        randId.value = json["id"];
        randImg.src = json["url"];

        return;
      }
    throw new Error("request failed.");
    }).catch(function(error) {
      console.log(error);
    });
  });
}

//sends a request to the server to save the selected cat information
function setSaveCatBtn() {
  //click the save buton
  saveBtn.addEventListener('click', function(e) {
    console.log('button was clicked');
    var data = {
      breed: saveBreed.value,
      url: saveUrl.value,
      wikipedia_url: saveWiki.value,
      id: saveId.value
    };

    //notify server that button was clicked
    fetch('/clickedsave', {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(res => {
      return res.text();
    }).then(result => {
      console.log(result);
      if(result == "false") {
        alert("Cat with duplicate ID already saved");
      }
      getCatCollection();
    }).catch(err=>{
      console.log(err);
    });
  });
}

//sends a request to the server to delete all cats and reload the cats on the page
function setDeleteCatBtn() {
  deleteBtn.addEventListener('click', function(e) {
    console.log('button was clicked');

    //notify server that button was clicked
    fetch('/deletecats', {method: 'POST'})
    .then(function(res) {
      //console.log(res);
      if(res.ok) {
        console.log("delete button was recorded");
        getCatCollection();
        return;
      }
    throw new Error("request failed.");
    }).catch(function(error) {
      console.log(error);
    });
  });
}

function setSearchCatBtn() {
  //click the save buton
  searchBtn.addEventListener('click', function(e) {
    console.log('search button was clicked');
    var data = {
      id: searchId.value
    };

    //notify server that button was clicked
    fetch('/clickedsearch', {
      method: 'GET',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(res => {
      return res.text();
    }).then(result => {
      var json = JSON.parse(result);
      console.log(json);
      console.log(json["data"][0]["url"]);
      searchImg.src = json["data"][0]["url"];
    }).catch(err=>{
      console.log(err);
    });
  });
}

function setGetSearchCatBtn() {
  //click the save buton
  searchBtn.addEventListener('click', function(e) {
    console.log('search button was clicked');
    var data = {
      id: searchId.value
    };
    var params = new URLSearchParams({
      id: searchId.value
    }).toString();
    //notify server that button was clicked
    fetch('/clickedsearch/search?' + params,{
      method: 'GET',
      headers: {
        "Content-type": "application/json"
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      var url = data["data"][0]["url"];
      searchImg.src = url;
    })
    .catch(err=>{
      console.log(err);
    });
  });
}

getCatCollection();

setRandomCatBtn();
setSaveCatBtn();
setDeleteCatBtn();

setGetSearchCatBtn();

