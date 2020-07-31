function initialize(){

    getStudents("/api/students");
    //renderModol("createStudent");
}

function getStudents(url){
    var xhttpList = new XMLHttpRequest();
    xhttpList.onreadystatechange = function(){

        if(this.readyState == 4 && this.status == 200){
            renderStudent(this.responseText);
        }
    };
    xhttpList.open("GET", url, true);
    xhttpList.send();
    console.log("Student list received");
}
var test = 1;
function renderStudent(data){

    var json = JSON.parse(data);
    let index2 = 1;
    var counter = 1;
    

   for(var index = 0; index < json.length; index++){
    var imgName = json[index].firstName.toLowerCase();
    var modalPurpose = "index" + json[index].id;
    var path  = "img/"+ imgName +".jpeg";
    var cardHtml = '<h2>Our Dogs</h2>'
        + '<div class="card bg-primary" id = "' + json[index].id+'" style="width:400px">'
        + '<img class="card-img-top" src= "img/'+ imgName +'.jpeg" alt="'+ path +'" style="width:100%">'
        + '<div class="card-body">'
        + '<h4 class="card-title">' + json[index].firstName + ' ' + json[index].lastName + '</h4>'
        + '<p class="card-text">Some example text some example text. John Doe is an architect and engineer</p>'
        + '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#'+ modalPurpose +'">Info</button>'

        +'<button class = "btn btn-danger" onclick = "deleteStudent(' + json[index].id + ')">Delete</button>'
        + '<br> ' 
        + '<br> </div>'
        + '</div>';
    
    document.getElementById("students").insertAdjacentHTML('beforeend',cardHtml);
    renderModol(modalPurpose, json[index].id, json[index]);
    test = json[index].id;
    }
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
    + data.info 
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

function deleteStudent(id){
    var link = "/api/delete/student/" + id;
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