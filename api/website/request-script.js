// Add Record
function addRequest() {
	// get values
	const requestSubject= document.getElementById("#requestSubject").val() ;
	const requestDescription= document.getElementById("#requestDescription").val() ;
	const requestPriority= document.getElementById("#requestPriority").val() ;
	
	let logic = 1 , output = "" ;
	const required = ['requestSubject', 'requestDescription', 'requestPriority' ];
	for (let i= 0; i < required.length; i++) {
		let fieldVal = document.getElementById('#'+ required[i]).val();
		if( typeof fieldVal == undefined || fieldVal.length == 0 ){
			logic *= 0 ;
			output += required[i] + " is required \n " ;
		}
	}
	
	if(output.length > 1 ){
			alert(output);
	}else{
		document.getElementById("output").innerHTML = "Record Added successfully";
	}
	
	
}

