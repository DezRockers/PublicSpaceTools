// define some generic javascript functions

// add white space between every 2 chars of a string
function AddSpaces()
{
	var str = document.getElementById("inputString").value;

	// first remove any white space
	str = str.replace(/\s/g, '');

	// at this point the string should be an even number of chars long or else there is a problem

	if ((str.length % 2) != 0)
	{
		alert("String length " + str.length + " is not an even number of characters and so does not represent a string of octets. Try again.");
		return;
	}

	// then add space every 2 characters
	var result = str.replace(/.{1,2}(?=(.{2})+$)/g, '$& ');
	document.getElementById("inputString").value = result;
}

