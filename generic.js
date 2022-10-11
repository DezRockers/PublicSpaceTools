// define some generic javascript functions
const pi = 3.1415926535897932384626433832795;

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

// add some quaternion related functions
// first multiply 2 quaternions
function QuaternionMultiplication(q1, q2)
{
	// declare the resultant quaternion where q[0] is the scalar element
	var q = new Array();

	q[0] = q1[0]*q2[0] - q1[1]*q2[1] - q1[2]*q2[2] - q1[3]*q2[3];
	q[1] = q1[0]*q2[1] + q1[1]*q2[0] + q1[2]*q2[3] - q1[3]*q2[2];
	q[2] = q1[0]*q2[2] - q1[1]*q2[3] + q1[2]*q2[0] + q1[3]*q2[1];
	q[3] = q1[0]*q2[3] + q1[1]*q2[2] - q1[2]*q2[1] + q1[3]*q2[0];

	return q;
}

// return a homogeneous vector (i.e. a quaternion) from a vector
// the weight is the first element
function HomogeneousVector(v)
{
	var q = new Array();
	q[0] = 1;
	q[1] = v[0];
	q[2] = v[1];
	q[3] = v[2];
	return q;
}

// return a vector from a homogeneous vector
function Vectorise(h)
{
	var v = new Array(0,0,0);
	if (h[0] != 0)
	{
		v[0] = h[1]/h[0];
		v[1] = h[2]/h[0];
		v[2] = h[3]/h[0];
	}
	return v;
}

// invert a quaternion
function InvertQuaternion(q)
{
	var qout = new Array();
	qout[0] = q[0];
	qout[1] = -q[1];
	qout[2] = -q[2];
	qout[3] = -q[3];
	return qout;
}

// rotate a vector by a quaternion
// p' = qpq^-1
function QuaternionVectorRotation(q,v)
{
	// first homegenise vector v
	var p = HomogeneousVector(v);
	var qinv = InvertQuaternion(q);
	var pout = QuaternionMultiplication(q, QuaternionMultiplication(p,qinv));
	var vout = Vectorise(pout);
	return vout;	
}

// function to create a new m x n matrix
function Matrix(m,n)
{
    var mat = new Array(m);
    var i = 0;

    for (i = 0; i < m; i++)
    {
        mat[i] = new Array(n);
    }

    return mat;
}

// rotate a vector ny a matrix
function MatrixVectorRotation(M,v)
{
	var vout = new Array(0 ,0, 0);
	for (i = 0; i < 3; i++)
	{
		for (j = 0; j < 3; j++)
		{
			vout[i] = vout[i] + M[i][j]*v[j];
		}
	}
	return vout;
}

// get the quaternion rotation angle in degrees
function QuaternionRotationAngleDeg(q)
{
	var angleRad = 2.0 * Math.acos(q[0]);
	return RadiansToDegrees(angleRad);
}

// get the quaternion rotation axis r
function QuaternionRotationAxis(q)
{
	var angleRad = 2.0 * Math.acos(q[0]);
	var r = new Array(0,0,0);
	if (angleRad != 0)
	{
		sinAngle_over_2 = Math.sin(angleRad/2.0);
		r[0] = q[1]/sinAngle_over_2;
		r[1] = q[2]/sinAngle_over_2;
		r[2] = q[3]/sinAngle_over_2;
	}
	return r;
}

// function to derive a rotation matrix about a particular axis by the specified angle in degrees
// Axis 1 = X-axis
// Axis 2 = Y-axis
// Axis 3 = Z-axis
// input angle is in degrees
function RotationMatrixAboutAxis(axis, angleDegs)
{
	var angleRads = DegreesToRadians(angleDegs);
	var cosangle = Math.cos(angleRads);
	var sinangle = Math.sin(angleRads);

	var mat = Matrix(3,3);
	switch (axis)
	{
		case 1:
			mat[0][0] = 1.0;
			mat[0][1] = 0.0;
			mat[0][2] = 0.0;
			mat[1][0] = 0.0;
			mat[1][1] = cosangle;
			mat[1][2] = -sinangle;
			mat[2][0] = 0.0;
			mat[2][1] = sinangle;
			mat[2][2] = cosangle;
			break;
		case 2:
			mat[0][0] = cosangle;
			mat[0][1] = 0.0;
			mat[0][2] = sinangle;
			mat[1][0] = 0.0;
			mat[1][1] = 1.0;
			mat[1][2] = 0.0;
			mat[2][0] = -sinangle;
			mat[2][1] = 0.0;
			mat[2][2] = cosangle;
			break;
		case 3:
			mat[0][0] = cosangle;
			mat[0][1] = -sinangle;
			mat[0][2] = 0.0;
			mat[1][0] = sinangle;
			mat[1][1] = cosangle;
			mat[1][2] = 0.0;
			mat[2][0] = 0.0;
			mat[2][1] = 0.0;
			mat[2][2] = 1.0;
			break;
		default:
			mat[0][0] = 1.0;
			mat[0][1] = 0.0;
			mat[0][2] = 0.0;
			mat[1][0] = 0.0;
			mat[1][1] = 1.0;
			mat[1][2] = 0.0;
			mat[2][0] = 0.0;
			mat[2][1] = 0.0;
			mat[2][2] = 1.0;
			break;
	}
	return mat;
}

// function to derive the matrix that represents an axis rotation
function AxisRotation(axis, angleDegs)
{
	var angleRads = DegreesToRadians(angleDegs);
	var cosangle = Math.cos(angleRads);
	var sinangle = Math.sin(angleRads);

	var mat = Matrix(3,3);
	switch (axis)
	{
		case 1:
			mat[0][0] = 1.0;
			mat[0][1] = 0.0;
			mat[0][2] = 0.0;
			mat[1][0] = 0.0;
			mat[1][1] = cosangle;
			mat[1][2] = sinangle;
			mat[2][0] = 0.0;
			mat[2][1] = -sinangle;
			mat[2][2] = cosangle;
			break;
		case 2:
			mat[0][0] = cosangle;
			mat[0][1] = 0.0;
			mat[0][2] = -sinangle;
			mat[1][0] = 0.0;
			mat[1][1] = 1.0;
			mat[1][2] = 0.0;
			mat[2][0] = sinangle;
			mat[2][1] = 0.0;
			mat[2][2] = cosangle;
			break;
		case 3:
			mat[0][0] = cosangle;
			mat[0][1] = sinangle;
			mat[0][2] = 0.0;
			mat[1][0] = -sinangle;
			mat[1][1] = cosangle;
			mat[1][2] = 0.0;
			mat[2][0] = 0.0;
			mat[2][1] = 0.0;
			mat[2][2] = 1.0;
			break;
		default:
			mat[0][0] = 1.0;
			mat[0][1] = 0.0;
			mat[0][2] = 0.0;
			mat[1][0] = 0.0;
			mat[1][1] = 1.0;
			mat[1][2] = 0.0;
			mat[2][0] = 0.0;
			mat[2][1] = 0.0;
			mat[2][2] = 1.0;
			break;
	}
	return mat;
}
