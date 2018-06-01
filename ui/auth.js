const validateString = (input) => {
    const param = input ;
    if(param === null || param === undefined || param.length < 2 ){
        $('.feedback').html(`Invalid input. Please enter the correct value`);
        $('.feedback').css({"background-color": "red", "font-weight": "bold"});
        
        return 0;
    } else {
        return 1;
    }
}

const validateNumber = (input) => {
    const validity = /^\+?(0|[1-9]\d*)$/.test(input);
    if(validity){
        return 1;
    }else{ 
        $('.feedback').html(`Invalid number ${input}. Please enter the correct value`);
		$('.feedback').css({"background-color": "red", "font-weight": "bold"});  
		return 0;
    } 
}

// Returns email if valid, else respond with error
const validateEmail = (input)  => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const validity= re.test(String(input).toLowerCase());
    if(validity){
        return 1;
    }else{
        $('.feedback').html(`Invalid email ${input}. Please enter the correct value`);
		$('.feedback').css({"background-color": "red", "font-weight": "bold"});  
		return 0;
    }    
}

const passwordMatch = (password, password2) => {
    if(password === password2){
        return 1;
    }else{
        $('.feedback').html(`Confirm password did not match. Please enter the correct value`);
		$('.feedback').css({"background-color": "red", "font-weight": "bold"});  
		return 0;
    }      
}

const url = 'http://localhost:3006/api/v1';

function login() {
    let logic = 1;
    const  email = $('#email').val();
    if(validateEmail(email) === 0){
        $('#email').focus();
        logic = 0;
    }
    const  password = document.getElementById("password").value;
    if(password.length < 3 ){
        $('#password').focus();
        logic = 0;
    }
    const  utype = $('#utype').val();
    logic *= validateString(utype);


    if(logic === 1 ) {
    console.log(email + " " + password + " "+ utype + " " );

    $('.feedback').html(`Processing your credentials ...`);
    $('.feedback').css({"background-color": "blue", "font-weight": "bold"}); 
    
	$.post(url + "/auth/login", { 
        email:email, 
        password: password,
        utype: utype },

		function (data, status) {
            console.log(JSON.stringify(data));
            const token = data.token;
            const userInfo = data.userInfo;
			let feedback = "<div class='alert alert-success  alert-sm'>";
			feedback += " Login Successful " ;
			feedback += "</div>";
			
			$('.feedback').html(feedback);

			// clear fields from the popup
			$("#email").val("");
            $("#password").val("");
            $("#utype").val("");
            
            $('.feedback').html(`Login was successful.`);
            $('.feedback').css({"background-color": "green", "font-weight": "bold"}); 

            if(utype === 'user' ){
                $(location).attr('href','./user.html');
            } else {
                window.location.href = "./admin.html";
            }

            /// Save Token ///
            // Check browser support
            if (typeof(Storage) !== "undefined") {
                // Store at sessionStorage or localStorage
                localStorage.setItem("token", token);
                // Save data to sessionStorage
                sessionStorage.setItem('userInfo', userInfo);
                console.log("\n\rToken after login is: " +  sessionStorage.getItem('token')); 
            } else {
                console.log("\n\rSorry, your browser does not support Web Storage...\n\r");
            }

        });
    }// if valid input end  

}


// Logout
const logout =() => {
    window.location.href = "./index.html";
    //$(location).attr('href','./index.html');
      /// Destroy Token ///
    if (typeof(Storage) !== "undefined") {
    // Remove saved data from sessionStorage
    localStorage.removeItem('userInfo');
    //sessionStorage.removeItem('token');

    // Remove all saved data from sessionStorage
    sessionStorage.clear();

    console.log("\n\rToken after logout is: " + sessionStorage.getItem("userToken"));        
    } else {
    console.log("\n\rSorry, your browser does not support Web Storage...\n\r");
    }
}


   // Register New User
   const signup = () => { 

    const firstName = validateString( $('#firstName'));
    const lastName = validateString( $("#lastName").val());
    const phone = validateString( $("#phone").val());
    const address = validateString( $("#address").val());
    const email = validateEmail( $("#email").val());
    const password = validateString( $("#password").val());
    const password2 = validateString( $("#password2").val());
    const matchPassword = passwordMatch(password, password2);


    // const requestId = RequestsTable.length; // new id but Auto Incr in DB
    const newRequest ={ "firstName": firstName, 
                        "lastName": lastName, 
                        "phone": phone, 
                        "address": address, 
                        "email": email, 
                        "password": password, 
                        "password2": password2
                    };
    //RequestsTable.unshift(newRequest);
    console.log(JSON.stringify(newRequest));
    
    if(firstName && lastName && phone && address && email && password && password2 && matchPassword) {

        $('.feedback').html(`Processing your registration ...`);
        $('.feedback').css({"background-color": "blue", "font-weight": "bold"}); 
        
    // Add record
    $.ajax({
        url: url + '/auth/signup',
        method: 'POST',
        dataType: 'json',
        data: {newRequest},
        success: function(data){

            console.log(JSON.stringify(data));
            const token = data.token;
            const userInfo = data.userInfo;

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

            $('.feedback').html(`Registration was successful`);
            $('.feedback').css({"background-color": "green", "font-weight": "bold"}); 

            $(location).attr('href','./user.html');
            // window.location.href = "./index.html";
            /// Save Token ///
            // Check browser support

            if (typeof(Storage) !== "undefined") {
                // Store at sessionStorage or localStorage
                localStorage.setItem("token", token);
                // Save data to sessionStorage
                sessionStorage.setItem('userInfo', userInfo);
                console.log("\n\rToken after login is: " +  sessionStorage.getItem('token')); 
            } else {
                console.log("\n\rSorry, your browser does not support Web Storage...\n\r");
            }

        }
        
    });

}// end if valid
     return false;

}