
function login() {

    const  email = $('#email').val();
    const  password = $('#password').val();
    const  utype = $('#utype').val();
    const url = 'https://localhost:3000/api/v1';
    
	$.post(url + "/auth/login", { email:email, password: password, utype: utype },
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
            $("#utype").val("");
            
            if(utype === 'user' ){
                $(location).attr('href','./user.html');
            } else {
                window.location.href = "./admin.html";
            }

            /// Save Token ///
            // Check browser support
            if (typeof(Storage) !== "undefined") {
                // Store at sessionStorage or localStorage
                localStorage.setItem("userToken", token);
                // Save data to sessionStorage
                sessionStorage.setItem('userToken', token);
                console.log("\n\rToken after login is: " + localStorage.getItem("userToken")); 
            } else {
                console.log("\n\rSorry, your browser does not support Web Storage...\n\r");
            }

        });
        

}


// Logout
function logout() {
    window.location.href = "./index.html";
    //$(location).attr('href','./index.html');
      /// Destroy Token ///
    if (typeof(Storage) !== "undefined") {
    // Remove saved data from sessionStorage
    localStorage.removeItem('userToken');
    //sessionStorage.removeItem('userToken');

    // Remove all saved data from sessionStorage
    sessionStorage.clear();

    console.log("\n\rToken after logout is: " + localStorage.getItem("userToken"));        
    } else {
    console.log("\n\rSorry, your browser does not support Web Storage...\n\r");
    }
}


   // Register New User
   const signup = () => { 

    const firstName = $('#firstName').val();
    if (firstName == "") {
        $('.feedback').html("firstName must be filled out");
        $('.feedback').css({"background-color": "red", "font-weight": "bold"});  
        return false;
    }
    const lastName = $("#lastName").val();
    if (lastName == "") {
        $('.feedback').html("lastName must be filled out");
        $('.feedback').css({"background-color": "red", "font-weight": "bold"}); 
        return false;
    }
    const phone = $("#phone").val();
    if (phone == "") {
        $('.feedback').html("phone must be selected");
        $('.feedback').css({"background-color": "red", "font-weight": "bold"}); 
        return false;
    } 
    
    const address = $("#address").val();
    if (address == "") {
        $('.feedback').html("address must be selected");
        $('.feedback').css({"background-color": "red", "font-weight": "bold"}); 
        return false;
    } 

    const email = $("#email").val();
    if (email == "") {
        $('.feedback').html("email must be selected");
        $('.feedback').css({"background-color": "red", "font-weight": "bold"}); 
        return false;
    } 

    const password = $("#password").val();
    if (password == "") {
        $('.feedback').html("password must be selected");
        $('.feedback').css({"background-color": "red", "font-weight": "bold"}); 
        return false;
    } 

    const password2 = $("#password2").val();
    if (password2 == "") {
        $('.feedback').html("password2 must be selected");
        $('.feedback').css({"background-color": "red", "font-weight": "bold"}); 
        return false;
    } 
    
              

    // const requestId = RequestsTable.length; // new id but Auto Incr in DB
    const newRequest ={ "user": null, 
                        "firstName": firstName, 
                        "lastName": lastName, 
                        "phone": phone, 
                        "address": address, 
                        "email": email, 
                        "password": password, 
                        "password2": password2
                    };
    //RequestsTable.unshift(newRequest);
    console.log(JSON.stringify(newRequest));
// Add record
$.post(url + "/auth/signup", { newRequest },
    function (data, status) {
        console.log(JSON.stringify(data));
        let feedback = "<div class='alert alert-success  alert-sm'>";
        feedback += "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>";
        feedback += " New Record Added" ;
        feedback += "</div>";
        
        $('.feedback').html(feedback);

        // clear fields from the popup
        $("#firstName").val("");
        $("#lastName").val("");
        $("#phone").val("");
        $("#address").val("");
        $("#email").val("");
        $("#password").val("");
        $("#password2").val("");

        $(location).attr('href','./user.html');
        // window.location.href = "./index.html";
        /// Save Token ///
        // Check browser support
        if (typeof(Storage) !== "undefined") {
            // Store at sessionStorage or localStorage
            localStorage.setItem("userToken", token);
            // Save data to sessionStorage
            sessionStorage.setItem('userToken', token);
            console.log("\n\rToken after login is: " + localStorage.getItem("userToken")); 
        } else {
            console.log("\n\rSorry, your browser does not support Web Storage...\n\r");
        }

    });
    
     return false;
}