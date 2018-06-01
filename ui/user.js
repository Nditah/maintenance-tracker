// extending jquery
jQuery.each( [ "put", "delete" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
	  if ( jQuery.isFunction( data ) ) {
		type = type || callback;
		callback = data;
		data = undefined;
	  }
  
	  return jQuery.ajax({
		url: url,
		type: method,
		dataType: type,
		data: data,
		success: callback
	  });
	};
});


const url = 'http://localhost:4000/api/v1'; // offline server
//const url = 'https://maintenance-tracker.herokuapp.com/api/v1'

function today() {
    return new Date().toJSON().slice(0, 10);
}

var UsersTable = [
	{ "id": 1, "type": "admin", "email": "admin@andela.com", "password": "pass", "firstName": "Scott", "lastName": "Tiger", "phone": "123-456-777", "address": "Upper Str.", "createdOn": "2018-05-09" },
	{ "id": 2, "type": "user", "email": "user@andela.com", "password": "pass", "firstName": "Scott", "lastName": "Tiger", "phone": "123-456-777", "address": "Upper Str.", "createdOn": "2018-05-10" },
	{ "id": 3, "type": "user", "email": "sam@andela.com", "password": "pass", "firstName": "Samweld", "lastName": "Nditah", "phone": "123-456-777", "address": "Epic Tower", "createdOn": "2018-05-12" }
];

var	RequestsTable = [
		{ "id": 1, "user": 1, "rsubject": "Webpay", "rdescription": "Typescript Wrapper", "rstatus": "Pending", "rpriority": "Low", "rcreatedOn": "2018-05-12" },
		{ "id": 2, "user": 2, "rsubject": "Erlang Server", "rdescription": "Chat Messenger", "rstatus": "Pending", "rpriority": "High", "rcreatedOn": "2018-05-02" },
		{ "id": 3, "user": 3, "rsubject": "Django", "rdescription": "Python framework", "rstatus": "Approve", "rpriority": "Normal", "rcreatedOn": "2018-05-11" },
		{ "id": 4, "user": 1, "rsubject": "Java", "rdescription": "Spring JEE", "rstatus": "Approve", "rpriority": "Low", "rcreatedOn": "2018-05-12" },
		{ "id": 5, "user": 2, "rsubject": "Rest API", "rdescription": "GraphQL Integration", "rstatus": "Disapprove", "rpriority": "Low", "rcreatedOn": "2018-05-12" },
		{ "id": 6, "user": 3, "rsubject": "Rust", "rdescription": "Go Rust Speed Test", "rstatus": "Disapprove", "rpriority": "High", "rcreatedOn": "2018-05-14" },
		{ "id": 7, "user": 1, "rsubject": "Andela", "rdescription": "EPIC All the Way", "rstatus": "Resolve", "rpriority": "Low", "rcreatedOn": "2018-05-17" },
		{ "id": 8, "user": 3, "rsubject": "Samweld", "rdescription": "3Dcoder Top 1%", "rstatus": "Resolve", "rpriority": "High", "rcreatedOn": "2018-05-21" }
	];

 

// 3. Fetch all the requests of a logged in user
function request_user(userId) {
	let token = "";
	if(localStorage.getItem("userToken")){
		// Get saved data from localStorage
		token = localStorage.getItem("userToken");
		// Get saved data from sessionStorage
		//token = sessionStorage.getItem('userToken');
	}
	

	$.ajax({
		url: url + '/requests',
		method: 'GET',
		dataType: 'json',
		data: {},
		success: function(data){
		  console.log('succes: '+ JSON.stringify(data));
		  RequestsTable = data.data;
		  $('#tblRequest tr').not(':first').not(':last').remove();
		  let tblRequest = '';
		  for(let i = 0; i < RequestsTable.length; i++) {
			  tblRequest += '<tr><td>' + (i+1).toString() + '</td>' +
							  '<td>' + RequestsTable[i].id + '</td>' +
							  '<td>' + RequestsTable[i].rcreatedon.slice(0, 10) + '</td>' + 
							  '<td><a class="request" href="#" onClick="getRequestDetails(' + RequestsTable[i].id + ');">' 
							  + RequestsTable[i].rsubject + '</a></td>' +
							  '<td><button class="status-'+ RequestsTable[i].rstatus.toLowerCase() 
							  + '" onClick="getRequestDetails(' + RequestsTable[i].id + ');">' 
							  + RequestsTable[i].rstatus + '</button></td>' +
						  '</tr>';
			  }					
		  $('#tblRequest tr').first().after(tblRequest);
		}
	  });

}


// Get the details of a particular Request
function getRequestDetails(request_Id) {
	const id = parseInt(request_Id);
	$('#requestId').val(id);
		if (id <= RequestsTable.length + 1) {
			for (let i = 0; i < RequestsTable.length; i++) {
				if (RequestsTable[i].id == id) {
					// return RequestsTable[i];
					console.log(RequestsTable[i]);
					$('#requestStatus').val(RequestsTable[i].rstatus);
					$('#requestSubject').val(RequestsTable[i].rsubject);
					$('#requestDescription').val(RequestsTable[i].rdescription);
					$('#requestPriority').val(RequestsTable[i].rpriority);
					$('#userId').val(RequestsTable[i].id);
					 break; 
				}
			}
		}
		else {
			// throw "Invalid Request ID";
		}
		return -1;
}

// Add Record
function createRequest() { 
	//document.getElementById("requestForm")
	//.addEventListener('submit', function(event){event.preventDefault();});
	const userId = 2;

	let  requestSubject = $('#requestSubject').val();
	if (requestSubject == "") {
		$('.feedback').html("Request Subject must be filled out");
		$('.feedback').css({"background-color": "red", "font-weight": "bold"});  
		return false;
	}
	let  requestDescription = $("#requestDescription").val();
	if (requestDescription == "") {
		$('.feedback').html("Request Description must be filled out");
		$('.feedback').css({"background-color": "red", "font-weight": "bold"}); 
		return false;
	}
	let  requestPriority = $("#requestPriority").val();
	if (requestPriority == "") {
		$('.feedback').html("Request Priority must be selected");
		$('.feedback').css({"background-color": "red", "font-weight": "bold"}); 
		return false;
	}  
	
	// const requestId = RequestsTable.length; // new id but Auto Incr in DB
	const newRequest ={ "userId": userId, 
						"subject": requestSubject, 
						"description": requestDescription, 
						"priority": requestPriority 
					}
	//RequestsTable.unshift(newRequest);
	console.log(JSON.stringify(newRequest));
// Add record
$.post(url + "/users/requests", newRequest,
	function (data, status) {
		console.log(JSON.stringify(data));
		let feedback = "<div class='alert alert-success  alert-sm'>";
		feedback += "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>";
		feedback += data.data.message ;
		feedback += "</div>";
		
		$('.feedback').html(feedback);

		// clear fields from the popup
		$("#requestSubject").val("");
		$("#requestDescription").val("");
		$("#requestPriority").val("");

		request_user(userId);
	});
}	
	 	
// Add Record
function updateRequest() { 

	const userId = $('#userId').val();
	const id = $('#requestId').val();
	const requestStatus = $('#requestStatus').val();
	
	if (requestStatus != "pending") {
		$('.feedback').html(`Request cannot be updated since it has status "${requestStatus}! `);
		$('.feedback').css({"background-color": "red", "font-weight": "bold"});  
		return false;
	}

	let  requestSubject = $('#requestSubject').val();
	if (requestSubject == "") {
		$('.feedback').html("Request Subject must be filled out");
		$('.feedback').css({"background-color": "red", "font-weight": "bold"});  
		return false;
	}
	let  requestDescription = $("#requestDescription").val();
	if (requestDescription == "") {
		$('.feedback').html("Request Description must be filled out");
		$('.feedback').css({"background-color": "red", "font-weight": "bold"}); 
		return false;
	}
	let  requestPriority = $("#requestPriority").val();
	if (requestPriority == "") {
		$('.feedback').html("Request Priority must be selected");
		$('.feedback').css({"background-color": "red", "font-weight": "bold"}); 
		return false;
	}  
	
	// const requestId = RequestsTable.length; // new id but Auto Incr in DB
	const newRequest ={ "userId": userId, 
						"subject": requestSubject, 
						"description": requestDescription, 
						"priority": requestPriority 
					}
	//RequestsTable.unshift(newRequest);
	console.log(JSON.stringify(newRequest));
// Add record
$.put(url + "/users/requests/" + id, newRequest,
	function (data, status) {
		console.log(JSON.stringify(data));
		let feedback = "<div class='alert alert-success  alert-sm'>";
		feedback += "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>";
		feedback += data.data.message ;
		feedback += "</div>";
		
		$('.feedback').html(feedback);

		// clear fields from the popup
		$("#requestSubject").val("");
		$("#requestDescription").val("");
		$("#requestPriority").val("");

		request_user(userId);
	});
}	

	console.log("Loading from request.js")