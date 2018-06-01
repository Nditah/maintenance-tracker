function today() {
    return new Date().toJSON().slice(0, 10);
}

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

var UsersTable = [
	{ "id": 1, "type": "admin", "email": "admin@andela.com", "password": "pass", "firstName": "Scott", "lastName": "Tiger", "phone": "123-456-777", "address": "Upper Str.", "createdOn": "2018-05-09" },
	{ "id": 2, "type": "user", "email": "user@andela.com", "password": "pass", "firstName": "Scott", "lastName": "Tiger", "phone": "123-456-777", "address": "Upper Str.", "createdOn": "2018-05-10" },
	{ "id": 3, "type": "user", "email": "sam@andela.com", "password": "pass", "firstName": "Samweld", "lastName": "Nditah", "phone": "123-456-777", "address": "Epic Tower", "createdOn": "2018-05-12" }
];

var	RequestsTable = [
		{ "id": 1, "userid": 1, "rsubject": "Webpay", "rdescription": "Typescript Wrapper", "rstatus": "Pending", "rpriority": "Low", "rcreatedOn": "2018-05-12" },
		{ "id": 2, "userid": 2, "rsubject": "Erlang Server", "rdescription": "Chat Messenger", "rstatus": "Pending", "rpriority": "High", "rcreatedOn": "2018-05-02" },
		{ "id": 3, "userid": 3, "rsubject": "Django", "rdescription": "Python framework", "rstatus": "Approve", "rpriority": "Normal", "rcreatedOn": "2018-05-11" },
		{ "id": 4, "userid": 1, "rsubject": "Java", "rdescription": "Spring JEE", "rstatus": "Approve", "rpriority": "Low", "rcreatedOn": "2018-05-12" },
		{ "id": 5, "userid": 2, "rsubject": "Rest API", "rdescription": "GraphQL Integration", "rstatus": "Disapprove", "rpriority": "Low", "rcreatedOn": "2018-05-12" },
		{ "id": 6, "userid": 3, "rsubject": "Rust", "rdescription": "Go Rust Speed Test", "rstatus": "Disapprove", "rpriority": "High", "rcreatedOn": "2018-05-14" },
		{ "id": 7, "userid": 1, "rsubject": "Andela", "rdescription": "EPIC All the Way", "rstatus": "Resolve", "rpriority": "Low", "rcreatedOn": "2018-05-17" },
		{ "id": 8, "userid": 3, "rsubject": "Samweld", "rdescription": "3Dcoder Top 1%", "rstatus": "Resolve", "rpriority": "High", "rcreatedOn": "2018-05-21" }
	];
	
const url = 'http://localhost:4000/api/v1'; // offline server
//const url = 'https://maintenance-tracker.herokuapp.com/api/v1'


// 3. Fetch all the requests of a logged in user
function readRequest() {
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
			tblRequest += '<tr><td>' + RequestsTable[i].id + '</td>' +
			'<td>' + RequestsTable[i].userid + '</td>' +
			'<td>' + RequestsTable[i].rcreatedon + '</td>' + 
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
	$('#hiddenId').val(id);
		if (id <= RequestsTable.length + 1) {
			for (let i = 0; i < RequestsTable.length; i++) {
				if (RequestsTable[i].id == id) {
					// return RequestsTable[i];
					console.log(RequestsTable[i]);
					$('#requestSubject').html(RequestsTable[i].rsubject);
					$('#requestDescription').html(RequestsTable[i].rdescription);
					$('#requestPriority').html(RequestsTable[i].rpriority);
					$('#requestUser').html(RequestsTable[i].userid);
					$('#requestDate').html(RequestsTable[i].rcreatedon);
					$('#requestStatus').html(RequestsTable[i].rstatus);
					 return 1; //break; 
				}
			}
		}
		else {
			// throw "Invalid Request ID";
		}
		return -1;
}

 
// Add Record
function updateRequest() { 

	const id = $('#hiddenId').val();
	const requestStatus = $('#requestStatus').val();
	const newStatus = $('#newStatus').val();
	
	if (requestStatus === "resolve" || requestStatus === "disapprove" ) {
		$('.feedback').html(`Request cannot be updated since it has status "${requestStatus}! `);
		$('.feedback').css({"background-color": "red", "font-weight": "bold"});  
		return false;
	}

	let url1 = "";
	if(newStatus == 'approve' ) url1 = `/requests/${id}/approve`;
	if(newStatus == 'disapprove' ) url1 = `/requests/${id}/disapprove`;
	if(newStatus == 'resolve' ) url1 = `/requests/${id}/resolve`;

// Add record
$.put(url + url1, {},
	function (data, status) {
		console.log(JSON.stringify(data));
		let feedback = "<div class='alert alert-success  alert-sm'>";
		feedback += "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>";
		feedback += data.data.message ;
		feedback += "</div>";
		
		$('.feedback').html(feedback);

		// clear fields from the popup
		$('#requestSubject').html("");
		$('#requestDescription').html("");
		$('#requestPriority').html("");
		$('#requestUser').html("");
		$('#requestDate').html("");
		$('#requestStatus').html("");
		request_user(userId);
	});
}	

console.log("Loading from admin.js")