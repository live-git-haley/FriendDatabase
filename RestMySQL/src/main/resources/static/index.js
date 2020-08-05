function initialize(){

    getFriends("/api/friends");
    //renderModol("createStudent");
}

function getFriends(url){
    var xhttpList = new XMLHttpRequest();
    xhttpList.onreadystatechange = function(){

        if(this.readyState == 4 && this.status == 200){
            renderFriend(this.responseText);
        }
    };
    xhttpList.open("GET", url, true);
    xhttpList.send();
    console.log("Friend list received");
}


function renderFriend(data){

    var json = JSON.parse(data);
    let index2 = 1;
    var counter = 1;

   for(var index = 0; index < json.length; index++){
    var imgName = json[index].firstName.toLowerCase();
    var path  = "img/"+ imgName +".jpeg";
    var element  = "index"+ index2;
    if(index % 4 == 0){
    	cardHtml = '<div class = "widen" width = 1000px >' + cardHtml + '</div>';
    }
    
    var cardHtml = '  <h2> '+ json[index].firstName + '</h2>'
        + '<div class="card bg-primary" id = "dogs" style="width:400px">'
        + '<img class="card-img-top" src= "img/'+ imgName +'.jpeg" alt="'+ path +'" style="width:100%">'
        + '<div class="card-body">'
        + '<h4 class="card-title">' + json[index].firstName + ' ' + json[index].lastName + '</h4>'
        + '<p class="card-text"> DUMMY TEXT GOES HERE </p>'
        + renderModol("info") 
        
        +'<a href="#" class="btn btn-warning">DELETE</a>'
        + '<br> ' + element 
        + '<br> </div>'
        + '</div>';
    
    document.getElementById("friends").insertAdjacentHTML('beforeend',cardHtml);
    
    index2++;
    test = index2;
   
    }
}

function getFriendLocations(url){
    var xhttpList = new XMLHttpRequest();
    xhttpList.onreadystatechange = function(){

        if(this.readyState == 4 && this.status == 200){
            renderFriend(this.responseText);
        }
    };
    xhttpList.open("GET", url, true);
    xhttpList.send();
    console.log("Friend locations recieved");
}


function renderModol(modalPurpose, id, data){
	
    var element  = "index"+ id;
    console.log("This is the element");

    console.log(element);
    
    var modalHtml = ' <div class="modal fade" id="' + element + '"> '
    + ' <div class="modal-dialog modal-xl"> '
    + ' <div class="modal-content"> '

    + '<div class="modal-header">'
    + '<h4 class="modal-title">' + element + '</h4>'
    + '<button type="button" class="close" data-dismiss="modal">"' + element + '"</button>'
    + '</div>'

    + '<div class="modal-body">'
   // + data.info 
    + '</div>'
   
    + '<div class="modal-footer">'
    + '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>'
    + '</div>'

    + '</div>'
    + '</div>'
    + '</div>'
    + '</div>';
     

   document.getElementById("modals").insertAdjacentHTML('beforeend',modalHtml);

}

function deleteFriend(id){
    var link = "/api/delete/friend/" + id;
    var ok = confirm("Are you sure you want to delete this dog?\n Press 'ok' to continue, or cancel to avoid.");
    if(ok == true){
        var xhttp = new XMLHttpRequest();
        xhttp.open("DELETE", link, true);

        xhttp.onreadystatechange = function(){
            if(this.readyState==4 && this.status ==  200){

            }
        };

        xhttp.send(null);
    }
}