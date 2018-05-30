
function login() {

    const  email = $('#email').val();
    const  password = $('#password').val();
    const root = 'http://localhost:3000/api/v1';
    
	$.post(root + "/auth/login", { email:email, password: password },
		function (data, status) {
            console.log(data);
            const token = data.token;
			let feedback = "<div class='alert alert-success  alert-sm'>";
			feedback += " Login Successful " ;
			feedback += "</div>";
			
			$('.feedback').html(feedback);

			// clear fields from the popup
			$("#email").val("");
			$("#password").val("");

        });
        
    /// Save Token ///
    // Check browser support
    if (typeof(Storage) !== "undefined") {
        // Store at sessionStorage or localStorage
        localStorage.setItem("userToken", token);
        // Retrieve
        //token = localStorage.getItem("userToken");
    } else {
    console.log("\n\rSorry, your browser does not support Web Storage...\n\r");
    }
}

   // Register New User
   function signup() { 

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
    const newRequest ={ "user": userId, 
                        "subject": requestSubject, 
                        "description": requestDescription, 
                        "status": "Pending", 
                        "priority": requestPriority, 
                        "createdOn": today() 
                    };
    //RequestsTable.unshift(newRequest);
    console.log(JSON.stringify(newRequest));
// Add record
$.post(root + "/auth/signup", { newRequest },
    function (data, status) {
        console.log(data.message);
        let feedback = "<div class='alert alert-success  alert-sm'>";
        feedback += "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>";
        feedback += " New Record Added" ;
        feedback += "</div>";
        
        $('.feedback').html(feedback);

        // clear fields from the popup
        $("#requestSubject").val("");
        $("#requestDescription").val("");
        $("#requestPriority").val("");

    });
    
     request_user(userId);
}