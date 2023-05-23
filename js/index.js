// Getting Id from HTML file & Searching the relevant query with HTTP request
document.getElementById("search-form").addEventListener('keyup' , function(){
    var url = getUrl();
    var xhrRequest = new XMLHttpRequest();
    xhrRequest.open('get',url,true);
    xhrRequest.send();    
    xhrRequest.onload = function(){
        var data = JSON.parse(xhrRequest.responseText);
        display(data);  
    }
});


// Getting URL from Marvel API
function getUrl(){
    var searchQuery = document.getElementById('search-string').value;
    // Printing Search Query in the console
    console.log(searchQuery);
    
    document.getElementById('querySection').innerHTML = 'You have searched for : '+ searchQuery;

//  If search query matches the results, then it will proceed with further exceution.
    if(!searchQuery){
        console.log('Name cannot be empty!');
        return "http://gateway.marvel.com/v1/public/comics?ts=1&apikey=1f09ad8ac38b1443ef2d202f75033d66&hash=b5432b0e15cfa099edf3be6199e214e3"
    }else{
        return `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${searchQuery}&apikey=1f09ad8ac38b1443ef2d202f75033d66&hash=b5432b0e15cfa099edf3be6199e214e3&ts=1`
    }
}

//  Get Canvas 
let canvas = document.getElementById('canvas');

// Get Search String
let searchHero = document.getElementById('search-string').value;

//Function to display the searched data
function display(data){
    var superHeroList = document.getElementById('superhero-list');
    superHeroList.innerHTML = "";
    var results = data.data.results;

//Printing the fetched results
    console.log(results);
    if(!results){
        //  if Search character matches the results then only it will forward to next step
        document.getElementById('search-character').value = "";
        window.alert("No super hero found!");
    }else{
        // Creating a For Loop because there will be n number of results for same query
        for(let result of results){
            var templateCanvas = canvas.content.cloneNode(true);

//Changing Inner HTML by getting all the elements from the respective ID's
            templateCanvas.getElementById("img-cont").innerHTML = `<img src=${result.thumbnail.path}/portrait_xlarge.jpg alt="marvel-img" />`
            templateCanvas.getElementById("name").innerHTML = '<b>Name: </b> ' + result.name;
            templateCanvas.getElementById("id").innerHTML = '<b>Hero ID: </b> ' + result.id ;
            templateCanvas.getElementById("comic").innerHTML = '<b>Comic Available: </b>'+ result.comics.available ;
            templateCanvas.getElementById("series").innerHTML = '<b>Series Available: </b>'+ result.series.available ;
            templateCanvas.getElementById("stories").innerHTML = '<b>Stories Available: </b>'+ result.stories.available ;

            //  Setting Event listenet for Learn  more button 
            templateCanvas.getElementById('learn-more').addEventListener('click', function(){
                localStorage.setItem('id', result.id);
                window.location.assign('./about.html');
            });

            //  Setting Event listenet for Fav  more button  
            templateCanvas.getElementById('fav').addEventListener('click', function(){
                var index = localStorage.length;
                var data = JSON.stringify(result);
                localStorage.setItem(result.id,data);
            });
            superHeroList.appendChild(templateCanvas);
        }
    }
};


//Function to display "Added to Favourites" Alert
function addFunction() {
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}