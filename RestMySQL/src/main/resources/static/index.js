function initialize(){
    getManyFriends("/api/friends");
    friendCards();
}

function getManyFriends(url){
    var xhttpList = new XMLHttpRequest();
    xhttpList.open("GET", url, true);

    xhttpList.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            localStorage.setItem("allFriends", xhttpList.responseText);
        }
    };
    xhttpList.send();
    console.log("Friend list Stored.");

}

function getOneFriend(url){

    var xhttpFriend = new XMLHttpRequest();
    xhttpFriend.open("GET", url, false);

    xhttpFriend.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){

            console.log("Loaded into friend url")
            sessionStorage.setItem("friend", this.responseText);
        }
        

    };
    xhttpFriend.send();

}

function friendCards(){
    var friend= document.getElementById("friends");
    
    var allFriends = JSON.parse(localStorage.getItem("allFriends"));
    console.log(allFriends[3].firstName);
    console.log(allFriends[4].firstName);
    console.log(allFriends[5].firstName);
    console.log(allFriends[6].firstName);

    console.log(allFriends.length);

    for(var index = 0; index < allFriends.length; index++){
       let element = allFriends[index];
    	console.log("Got into for loop");
            var url = "/api/friends/" + element.id;
        	console.log(url);

            getOneFriend(url);
            //Creating the card
            var card = document.createElement("div");
            card.id = index;
            card.classList.add("card");
            card.classList.add("rounded");
           // card.classList.add("bg-primary");
            card.classList.add("col-5");
            card.style.margin = "0.50rem";
            

            //Make the card components
            var cardHead = document.createElement("div");
            cardHead.classList.add("card-header");
            cardHead.innerHTML = element.firstName;

            //load in individual pokemon
            var thisFriend = JSON.parse(sessionStorage.getItem("friend"));
            console.log(thisFriend);
            console.log(element.imgUrl);

            //image
            var cardImg = document.createElement("img");
            cardImg.classList.add("card-img-top");
            cardImg.classList.add("card-body");
        	cardImg.src = element.imgUrl;
            cardImg.alt = "Friend Image";
            cardImg.style.object = "cover";
            cardImg.style.maxHeight = "450px";
            cardImg.style.width = "150px";

            cardImg.style.align = "center";

            //card text
            var cardTxt = document.createElement("p");
            cardTxt.classList.add("card-text");
            cardTxt.innerHTML = element.info;

            //Modal
//            var modal = document.createElement("div");
//            modal.classList.add("modal-fade");
//            modal.id = "myModal";
//            modal.role = "dialog";
//            modal.classList.add("modal-dialog");
//            modal.classList.add("modal-content");
//            modal.classList.add("modal-header");
//            modal.classList.add("modal-body");
//            modal.classList.add("modal-footer");
//            
//            modal.innerHTML = element.dogname;
//

            //button

            var button = document.createElement("button");
            button.classList.add("btn-primary");
            button.innerHTML = "Info";
            button.id = "myBtn";
            button.dataset.target = "#myModal"
            button.dataset.toggle = "modal"
           //button.onclick(makeModol("info", element.id,element));

            //makeModol("info", element.id,element);

            //Footer
            var cardFtr = document.createElement("div");
            cardFtr.classList.add("card-footer");

    

            //Write the card /finalize to the DOM
            card.appendChild(cardHead);
            card.appendChild(cardImg);
            card.appendChild(cardTxt);
            card.appendChild(cardFtr);
            card.appendChild(button);
          //  card.appendChild(modal);
            
            //Create card deck
            var cardDeck;
            if(index % 4 == 0){
                cardDeck = document.createElement("div");
                cardDeck.classList.add("card-deck");

            }
           
            cardDeck.appendChild(card);
            
            friend.appendChild(cardDeck);
            
            //renderModol("info", element.id, element);
            sessionStorage.removeItem("friend");

}
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

function createFriend() {
	
	console.log(document.getElementById("dogname").value);
        var sendData = {
            "id": document.getElementById("id").value,
            "firstName": document.getElementById("firstname").value,
            "lastName": document.getElementById("lastname").value,
            "location": document.getElementById("location").value,
            "info": document.getElementById("info").value,
            "imgUrl": document.getElementById("imgurl").value,
            "dogname": document.getElementById("dogname").value,
            "breed": document.getElementById("breed").value,
            "dogUrl": document.getElementById("dogurl").value,

        }
        console.log(sendData);
        //var ok = confirm("Ready to send?");
        
       // if (ok == true) {
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "/api/add/friend", true);
            xhttp.setRequestHeader('Content-Type', 'application/json');
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    console.log("Update success");     
                    console.log("Student created!");
                }
            };
            xhttp.send(JSON.stringify(sendData));
            window.confirm("You added the friend successfully")
            
     //   }
    }
    
    function makeModol(modalPurpose, id, data){
	
        var element  = "index"+ id;
        console.log("This is the element");
    
        console.log(element);
        
        var modalHtml = ' <div class="modal fade" id="myModal" role="dialog"> '
        + ' <div class="modal-dialog modal-xl"> '
        + ' <div class="modal-content"> '
    
        + '<div class="modal-header">'
        + '<h4 class="modal-title">"HELLO"</h4>'
        + '<button type="button" class="close" data-dismiss="modal">"hello"</button>'
        + '</div>'
    
        + '<div class="modal-body">'
        + data.dogname +
        + '</div>'
       
        + '<div class="modal-footer">'
        + '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>'
        + '</div>'
    
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>';

    
         
    
       document.getElementById("myModol").insertAdjacentHTML('beforeend',modalHtml);
    
    }

    $('#myModal').modal('show');