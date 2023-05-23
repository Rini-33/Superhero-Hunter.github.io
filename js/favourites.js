var canvas = document.getElementById("canvas");
//To print on Console
console.log(localStorage.length);

//Traversing on local storage
for(let i=0;i<localStorage.length;i++)
{
    if(localStorage.key(i) == 'id'){
        continue;
    }
    // Get data from local storage in form of JSON
    let myStorage = JSON.parse(localStorage.getItem(localStorage.key(i)));

    // Print the JSon Data on the Console 
    console.log(myStorage);

    //  Create a Canvas template for Showing results
    var templateCanvas = canvas.content.cloneNode(true);
    
    //Adding all the datas of favourite character
    templateCanvas.getElementById("img-cont").innerHTML = `<img src=${myStorage.thumbnail.path}/portrait_xlarge.jpg alt="marvel-img" />`
            templateCanvas.getElementById("name").innerHTML = '<b>Name: </b> ' + myStorage.name;
            templateCanvas.getElementById("id").innerHTML = '<b>Hero ID: </b> ' + myStorage.id ;
            templateCanvas.getElementById("comic").innerHTML = '<b>Comic Available: </b>'+ myStorage.comics.available ;
            templateCanvas.getElementById("series").innerHTML = '<b>Series Available: </b>'+ myStorage.series.available ;
            templateCanvas.getElementById("stories").innerHTML = '<b>Stories Available: </b>'+ myStorage.stories.available ;
            //About Page is redirected on clicking "View More"
    templateCanvas.getElementById("learn-more").addEventListener('click',function(){
        localStorage.setItem('id',myStorage.id);
        window.location.assign('./about.html');
    });

    //Functionality of Remove 
    templateCanvas.getElementById("fav").addEventListener('click',function (){
        myStorage.innerHTML = null;
        localStorage.removeItem(localStorage.key(i));
        window.location.assign('./favourites.html');

    });

//Appending to the list
    document.getElementById("superhero-list").appendChild(templateCanvas);
}


