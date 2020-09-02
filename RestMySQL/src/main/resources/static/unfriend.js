
    function addTable() {
        getManyFriends("/api/friends");
        var myTableDiv = document.getElementById("myTable");
        var allFriends = JSON.parse(localStorage.getItem("allFriends"));

      
        var table = document.createElement('TABLE');
        table.border = '1';
      
        var tableBody = document.createElement('TBODY');
        table.appendChild(tableBody);
      
        for (var i = 0; i < allFriends.length; i++) {
          var tr = document.createElement('TR');
          tableBody.appendChild(tr);
            console.log()
          for (var j = 0; j < 2; j++) {
            var td = document.createElement('TD');
            td.width = '75';
            if(j == 1){
            td.appendChild(document.createTextNode(allFriends[i].firstName));
            //tr.appendChild(td);
            }
            td.appendChild(document.createTextNode(allFriends[i].id));
            tr.appendChild(td);
          }
        }
        myTableDiv.appendChild(table);
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
      
      function deleteFriend(id){
    	    var allFriends = JSON.parse(localStorage.getItem("allFriends"));
    	    var table =  document.createElement("table");
    	    table.classList.add("table");
    	    

    	    

    	    var id = document.getElementById("id").value;
    	    var link = "/api/delete/friend/" + id;
    	    var ok = confirm("Are you sure you want to delete this dog?\n Press 'ok' to continue, or cancel to avoid.");
    	    if(ok == true){
    	        var xhttp = new XMLHttpRequest();
    	        xhttp.open("DELETE", link, true);

    	        xhttp.onreadystatechange = function(){
    	            if(this.readyState==4 && this.status ==  200){
    	            	console.log("DELETED THE FRIEND>>>");
    	            }
    	        };

    	        xhttp.send(null);
    	    }
    	}
