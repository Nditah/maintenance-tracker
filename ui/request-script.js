function today() {
    return new Date().toJSON().slice(0, 10);
}

var UsersTable = [
	{ "id": 1, "type": "admin", "email": "admin@andela.com", "password": "pass", "firstName": "Scott", "lastName": "Tiger", "phone": "123-456-777", "address": "Upper Str.", "createdOn": "2018-05-09" },
	{ "id": 2, "type": "user", "email": "user@andela.com", "password": "pass", "firstName": "Scott", "lastName": "Tiger", "phone": "123-456-777", "address": "Upper Str.", "createdOn": "2018-05-10" },
	{ "id": 3, "type": "user", "email": "sam@andela.com", "password": "pass", "firstName": "Samweld", "lastName": "Nditah", "phone": "123-456-777", "address": "Epic Tower", "createdOn": "2018-05-12" }
];

var	RequestsTable = [
		{ "id": 1, "user": 1, "subject": "Webpay", "description": "Typescript Wrapper", "status": "Pending", "priority": "Low", "createdOn": "2018-05-12" },
		{ "id": 2, "user": 2, "subject": "Erlang Server", "description": "Chat Messenger", "status": "Pending", "priority": "High", "createdOn": "2018-05-02" },
		{ "id": 3, "user": 3, "subject": "Django", "description": "Python framework", "status": "Approved", "priority": "Normal", "createdOn": "2018-05-11" },
		{ "id": 4, "user": 1, "subject": "Java", "description": "Spring JEE", "status": "Approved", "priority": "Low", "createdOn": "2018-05-12" },
		{ "id": 5, "user": 2, "subject": "Rest API", "description": "GraphQL Integration", "status": "Rejected", "priority": "Low", "createdOn": "2018-05-12" },
		{ "id": 6, "user": 3, "subject": "Rust", "description": "Go Rust Speed Test", "status": "Rejected", "priority": "High", "createdOn": "2018-05-14" },
		{ "id": 7, "user": 1, "subject": "Andela", "description": "EPIC All the Way", "status": "Resolved", "priority": "Low", "createdOn": "2018-05-17" },
		{ "id": 8, "user": 3, "subject": "Samweld", "description": "3Dcoder Top 1%", "status": "Resolved", "priority": "High", "createdOn": "2018-05-21" }
	];

// Read the request and populate table
function readRequest() {
	$('#tblRequest tr').not(':first').not(':last').remove();
	let tblRequest = '';
	for(let i = 0; i < RequestsTable.length; i++) {
		tblRequest += '<tr><td>' + (i+1).toString() + '</td>' +
						'<td>' + RequestsTable[i].id + '</td>' +
						'<td>' + RequestsTable[i].createdOn + '</td>' + 
						'<td><a class="request" href="#" onClick="getRequestDetails(' + RequestsTable[i].id + ');">' 
						+ RequestsTable[i].subject + '</a></td>' +
						'<td><button class="status-'+ RequestsTable[i].status.toLowerCase() 
						+ '" onClick="getRequestDetails(' + RequestsTable[i].id + ');">' 
						+ RequestsTable[i].status + '</button></td>' +
					'</tr>';
		}					
	$('#tblRequest tr').first().after(tblRequest);
}

// Get the details of a particular Request
function getRequestDetails(request_Id) {
	const id = parseInt(request_Id);
		if (id <= RequestsTable.length + 1) {
			for (let i = 0; i < RequestsTable.length; i++) {
				if (RequestsTable[i].id == id) {
					// return RequestsTable[i];
					console.log(RequestsTable[i]);
					$('#requestSubject').val(RequestsTable[i].subject);
					$('#requestDescription').val(RequestsTable[i].description);
					$('#requestPriority').val(RequestsTable[i].priority);
					//$('#requestUser').val(RequestsTable[i].user);
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
		
		const requestId = RequestsTable.length;
		const newRequest ={ "id": requestId, 
							"user": 2, 
							"subject": requestSubject, 
							"description": requestDescription, 
							"status": "Pending", 
							"priority": requestPriority, 
							"createdOn": today() 
						};
		RequestsTable.unshift(newRequest);
	 	readRequest();
	}