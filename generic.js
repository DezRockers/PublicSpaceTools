// define some generic javascript functions
var pi = 3.1415926535897932384626433832795;

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

// remove multiple, leading or trailing spaces
function trim(s) {
	s = s.replace(/(^\s*)|(\s*$)/gi,"");
	s = s.replace(/[ ]{2,}/gi," ");
	s = s.replace(/\n /,"\n");
	return s;
}

// function to convert degrees to radians
function DegreesToRadians(x)
{
	return x * pi / 180;
}

// function to convert radians to degrees
function RadiansToDegrees(x)
{
	return x * 180 / pi;
}


// A global variable should be defined to hold the URL for the file to be downloaded
// This is good practice as if many links are being generated or the link is being regularly updated, you don't want to be creating new variables every time, wasting memory
var textFileUrl = null;
// Function for generating a text file URL containing given text
function generateTextFileUrl(txt) {
    let fileData = new Blob([txt], {type: 'text/plain'});
    // If a file has been previously generated, revoke the existing URL
    if (textFileUrl !== null) {
        window.URL.revokeObjectURL(textFileUrl);
    }
    textFileUrl = window.URL.createObjectURL(fileData);
    // Returns a reference to the global variable holding the URL
    // Again, this is better than generating and returning the URL itself from the function as it will eat memory if the file contents are large or regularly changing
    return textFileUrl;
};

function DownloadFile(link, txt)
{
	let target = document.getElementById(link);
	target.style.visibility = "visible";
	target.addEventListener("click", (evt) => Download(link, txt, evt));
}

function Download(link, txt, evt)
{
	document.getElementById(link).href = generateTextFileUrl(txt);
}
