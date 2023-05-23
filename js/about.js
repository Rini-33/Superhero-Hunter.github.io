// Getting Items from local storage
var resultId = localStorage.getItem('id');

fetch();


function fetch(){
    var Request = new XMLHttpRequest();
    // Fetching with API 
    var url = `https://gateway.marvel.com/v1/public/characters/${resultId}?apikey=1f09ad8ac38b1443ef2d202f75033d66&hash=b5432b0e15cfa099edf3be6199e214e3&ts=1`;
    Request.open('get',url,true);
    Request.send();
    Request.onload = function(){
        var response = JSON.parse(Request.response);

        // Print all the Resoponses in the formate of JSON
        console.log(response);

        //Changing Inner HTML by getting all the elements from the respective ID's
        document.getElementById("img-cont").innerHTML = `<img src=${response.data.results[0].thumbnail.path
        }/portrait_xlarge.jpg class="card-img-top" alt="..." id="marvel-img">`;
            document.getElementById("name").innerHTML = '<b>Name: </b> ' + response.data.results[0].name;
            document.getElementById("id").innerHTML = '<b>Hero ID: </b> ' + response.data.results[0].id ;
            document.getElementById("desc").innerHTML = '<b>Description: </b> ' + response.data.results[0].description ;
            document.getElementById("comic").innerHTML = '<b>Comic Available: </b>'+ response.data.results[0].comics.available ;
            document.getElementById("series").innerHTML = '<b>Series Available: </b>'+ response.data.results[0].series.available ;
            document.getElementById("stories").innerHTML = '<b>Stories Available: </b>'+ response.data.results[0].stories.available ;
            document.getElementById("count").innerHTML = '<b>Count: </b>'+ response.data.count ;
            document.getElementById("modified").innerHTML = '<b>Modified: </b>'+ response.data.results[0].modified;
            document.getElementById("status").innerHTML = '<b>Status: </b>'+ response.status;
            document.getElementById("total").innerHTML = '<b>Total: </b>'+ response.data.total;
            document.getElementById("limit").innerHTML = '<b>Limit: </b>'+ response.data.limit;
            document.getElementById("offset").innerHTML = '<b>Offset: </b>'+ response.data.offset;
            document.getElementById("code").innerHTML = '<b>Code: </b>'+ response.code;
            
    }
}