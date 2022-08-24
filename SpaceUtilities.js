orbital elements
<html>
<head>
<script type="text/javascript">

// the following JavaScript functions are taken from my document DDDAPP1.doc
// which is downloaded by the link AOCS Math Models

var pi = 3.1415926535897932384626433832795;
var mu = 398600.4418;	// km3/s2

// function to display Keplerian elements
function DisplayKeplerian()
{
var a=document.getElementById("a").value;
var e=document.getElementById("e").value;
var i=document.getElementById("i").value;
var Omega=document.getElementById("Omega").value;
var w=document.getElementById("w").value;
var f=document.getElementById("f").value;
var txt = "a = " + a + " km\n";
txt = txt + "e = " + e + "\n";
txt = txt + "i = " + i + " degrees\n";
txt = txt + "Omega = " + Omega + " degrees\n";
txt = txt + "w = " + w + " degrees\n";
txt = txt + "f = " + f + " degrees\n";
alert(txt);
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

// function to compute R
function ComputeR()
{
var a=document.getElementById("a").value;
var e=document.getElementById("e").value;
var i=DegreesToRadians(document.getElementById("i").value);
var Omega=DegreesToRadians(document.getElementById("Omega").value);
var w=DegreesToRadians(document.getElementById("w").value);
var f=DegreesToRadians(document.getElementById("f").value);
var R = a*(1-e*e)/(1+e*Math.cos(f));
return R;
}

// function to display the range in km
function DisplayR()
{
alert(ComputeR());
}

// function to compute X
function ComputeX()
{
var a=document.getElementById("a").value;
var e=document.getElementById("e").value;
var i=DegreesToRadians(document.getElementById("i").value);
var Omega=DegreesToRadians(document.getElementById("Omega").value);
var w=DegreesToRadians(document.getElementById("w").value);
var f=DegreesToRadians(document.getElementById("f").value);
var R = ComputeR();
var X = R*(Math.cos(w+f)*Math.cos(Omega)-Math.sin(w+f)*Math.cos(i)*Math.sin(Omega));
document.getElementById("x").value = X;
return X;
}

// function to compute Y
function ComputeY()
{
var a=document.getElementById("a").value;
var e=document.getElementById("e").value;
var i=DegreesToRadians(document.getElementById("i").value);
var Omega=DegreesToRadians(document.getElementById("Omega").value);
var w=DegreesToRadians(document.getElementById("w").value);
var f=DegreesToRadians(document.getElementById("f").value);
var R = ComputeR();
var Y = R*(Math.cos(w+f)*Math.sin(Omega)+Math.sin(w+f)*Math.cos(i)*Math.cos(Omega));
document.getElementById("y").value = Y;
return Y;
}

// function to compute Z
function ComputeZ()
{
var a=document.getElementById("a").value;
var e=document.getElementById("e").value;
var i=DegreesToRadians(document.getElementById("i").value);
var Omega=DegreesToRadians(document.getElementById("Omega").value);
var w=DegreesToRadians(document.getElementById("w").value);
var f=DegreesToRadians(document.getElementById("f").value);
var R = ComputeR();
var Z = R*(Math.sin(w+f)*Math.sin(i));
document.getElementById("z").value = Z;
return Z;
}

// function to display X, Y ,Z
function DisplayXYZ()
{
var X = ComputeX();
var Y = ComputeY();
var Z = ComputeZ();
var txt = "X = " + X + " km\n";
txt = txt + "Y = " + Y + " km\n";
txt = txt + "Z = " + Z + " km\n";
alert(txt);
}


// function to compute A
function ComputeA()
{
var a=document.getElementById("a").value;
var e=document.getElementById("e").value;
var i=DegreesToRadians(document.getElementById("i").value);
var Omega=DegreesToRadians(document.getElementById("Omega").value);
var w=DegreesToRadians(document.getElementById("w").value);
var f=DegreesToRadians(document.getElementById("f").value);
var A = -Math.sin(w+f)*Math.cos(Omega) - Math.cos(w+f)*Math.cos(i)*Math.sin(Omega);
return A;
}

// function to compute B
function ComputeB()
{
var a=document.getElementById("a").value;
var e=document.getElementById("e").value;
var i=DegreesToRadians(document.getElementById("i").value);
var Omega=DegreesToRadians(document.getElementById("Omega").value);
var w=DegreesToRadians(document.getElementById("w").value);
var f=DegreesToRadians(document.getElementById("f").value);
var B = -Math.sin(w+f)*Math.sin(Omega) + Math.cos(w+f)*Math.cos(i)*Math.cos(Omega);
return B;
}

// function to compute C
function ComputeC()
{
var a=document.getElementById("a").value;
var e=document.getElementById("e").value;
var i=DegreesToRadians(document.getElementById("i").value);
var Omega=DegreesToRadians(document.getElementById("Omega").value);
var w=DegreesToRadians(document.getElementById("w").value);
var f=DegreesToRadians(document.getElementById("f").value);
var C = Math.cos(w+f)*Math.sin(i);
return C;
}

// function to compute the vecloity magnitude in km/s
function VelocityMagnitude()
{
var a=document.getElementById("a").value;
var e=document.getElementById("e").value;
var i=DegreesToRadians(document.getElementById("i").value);
var Omega=DegreesToRadians(document.getElementById("Omega").value);
var w=DegreesToRadians(document.getElementById("w").value);
var f=DegreesToRadians(document.getElementById("f").value);
var V = Math.sqrt((mu/a)*(1+e*e+2*e*Math.cos(f))/(1-e*e));
return V;
}

// function to normalise a vector
function Normalise(V)
{
	var N = new Array(0, 0, 0);
	var R = Math.sqrt(DotProduct(V,V));
	if (R != 0)
	{
		N[0] = V[0]/R;
		N[1] = V[1]/R;
		N[2] = V[2]/R;
	}
	return N;
}

// function to compute velocity components
function ComputeVelocity()
{
var a=document.getElementById("a").value;
var e=document.getElementById("e").value;
var i=DegreesToRadians(document.getElementById("i").value);
var Omega=DegreesToRadians(document.getElementById("Omega").value);
var w=DegreesToRadians(document.getElementById("w").value);
var f=DegreesToRadians(document.getElementById("f").value);
var esinf = e*Math.sin(f);
var ecosfplus1 = 1 + e*Math.cos(f);
var V = new Array();
V[0] = esinf*ComputeX()/ComputeR()+ecosfplus1*ComputeA();
V[1] = esinf*ComputeY()/ComputeR()+ecosfplus1*ComputeB();
V[2] = esinf*ComputeZ()/ComputeR()+ecosfplus1*ComputeC();
V = Normalise(V);
V[0] = V[0]*VelocityMagnitude();
V[1] = V[1]*VelocityMagnitude();
V[2] = V[2]*VelocityMagnitude();

return V;

}

// function to display velocity components
function DisplayVelocity()
{
var V = new Array();
V = ComputeVelocity();
document.getElementById("xdot").value = V[0];
document.getElementById("ydot").value = V[1];
document.getElementById("zdot").value = V[2];
}

function ClearElements()
{
document.getElementById("keplerian").reset();
}

function ClearCartesians()
{
document.getElementById("cartesian").reset();
}

// function to compute the Cartesain coordinates given the Keplerian elements
function ComputeCartesians()
{
	var a=document.getElementById("a").value;
	if (a < 6378) 
	{
		alert("a is less than 6378km, the radius of the Earth. Try again");
		return;
	} 
	var e=document.getElementById("e").value;
	if ((e < 0) || (e >= 1)) 
	{
		alert("e is not between 0 and 1. Try again");
		return;
	} 
	var i=document.getElementById("i").value;
	if ((i < 0) || (i > 180)) 
	{
		alert("i is not between 0 and 180. Try again");
		return;
	} 
	var X = ComputeX();
	var Y = ComputeY();
	var Z = ComputeZ();
	DisplayVelocity();
}

// function to compute the Keplerian elements given the Cartesain coordinates 
function ComputeKeplerians()
{
	var a = ComputeSemiMajorAxis();
	var e = ComputeEccentricity();
	var i = ComputeInclination();
	var Omega = 0;
	if (i != 0)
	{
		Omega = ComputeOmega();
	}
	var w = ComputeArgumentOfPerigee();
	var f = ComputeTrueAnomaly();

	var txt = "a = " + a + " km\n";
	txt = txt + "e = " + e + "\n";
	txt = txt + "i = " + i + " degrees\n";
	txt = txt + "Omega = " + Omega + " degrees\n";
	txt = txt + "w = " + w + " degrees\n";
	txt = txt + "f = " + f + " degrees\n";
	alert(txt);
}

// function to compute Omega in degrees
function ComputeOmega()
{
	var R = new Array();
	var V = new Array();
	R[0] = document.getElementById("x").value;
	R[1] = document.getElementById("y").value;
	R[2] = document.getElementById("z").value;
	V[0] = document.getElementById("xdot").value;
	V[1] = document.getElementById("ydot").value;
	V[2] = document.getElementById("zdot").value;
	var h = CrossProduct(R,V);
	var Omega = Math.atan2(h[0],-h[1]);
	Omega = RadiansToDegrees(Omega);
	return Omega;
}

function CrossProduct(V1, V2)
{
	var V = new Array();

	// cross product
	V[0] = V1[1]*V2[2] - V1[2]*V2[1];
	V[1] = - V1[0]*V2[2] + V1[2]*V2[0];
	V[2] = V1[0]*V2[1] - V1[1]*V2[0];

	return V;
}

function DotProduct(V1, V2)
{
	var R;

	// dot product
	R = V1[0]*V2[0] + V1[1]*V2[1] + V1[2]*V2[2];

	return R;
}

function VectorMagnitude(V)
{
	var R = Math.sqrt(DotProduct(V, V));

	return R;
}

// function to compute the semi-major axis
function ComputeSemiMajorAxis()
{
	var R = new Array();
	var V = new Array();
	R[0] = document.getElementById("x").value;
	R[1] = document.getElementById("y").value;
	R[2] = document.getElementById("z").value;
	V[0] = document.getElementById("xdot").value;
	V[1] = document.getElementById("ydot").value;
	V[2] = document.getElementById("zdot").value;
	var Rmag = VectorMagnitude(R);
	var Vmag = VectorMagnitude(V);
	var a = Rmag / (2 - Vmag*Vmag*Rmag/mu);
	return a;
}

// function to compute the eccentricity
function ComputeEccentricity()
{
	var R = new Array();
	var V = new Array();
	R[0] = document.getElementById("x").value;
	R[1] = document.getElementById("y").value;
	R[2] = document.getElementById("z").value;
	V[0] = document.getElementById("xdot").value;
	V[1] = document.getElementById("ydot").value;
	V[2] = document.getElementById("zdot").value;
	var h = VectorMagnitude(CrossProduct(R,V));
	var s= DotProduct(R,V)*h/(VectorMagnitude(R)*mu);
	var c = h*h/(VectorMagnitude(R)*mu) - 1;
	var e = Math.sqrt(s*s + c*c);
	return e;
}

// function to compute the true anomaly in degrees
function ComputeTrueAnomaly()
{
	var R = new Array();
	var V = new Array();
	R[0] = document.getElementById("x").value;
	R[1] = document.getElementById("y").value;
	R[2] = document.getElementById("z").value;
	V[0] = document.getElementById("xdot").value;
	V[1] = document.getElementById("ydot").value;
	V[2] = document.getElementById("zdot").value;
	var h = VectorMagnitude(CrossProduct(R,V));
	var s= DotProduct(R,V)*h/(VectorMagnitude(R)*mu);
	var c = h*h/(VectorMagnitude(R)*mu) - 1;
	var f = Math.atan2(s, c);
	f = RadiansToDegrees(f);
	return f;
}

// function to compute the argument of perigee in degrees
function ComputeArgumentOfPerigee()
{
	var i = DegreesToRadians(ComputeInclination());
	var Omega = DegreesToRadians(ComputeOmega());
	var R = new Array();
	R[0] = document.getElementById("x").value;
	R[1] = document.getElementById("y").value;
	R[2] = document.getElementById("z").value;
	var wpf = 0;
	if (i != 0) wpf = Math.atan2((R[2]/Math.sin(i)), (R[0]*Math.cos(Omega)+R[1]*Math.sin(Omega)));
	wpf = RadiansToDegrees(wpf);
	var f = ComputeTrueAnomaly();
	var w = wpf - f;
	return w;
}

// function to compute the inclination
function ComputeInclination()
{
	var h = new Array();
	var R = new Array();
	var V = new Array();
	R[0] = document.getElementById("x").value;
	R[1] = document.getElementById("y").value;
	R[2] = document.getElementById("z").value;
	V[0] = document.getElementById("xdot").value;
	V[1] = document.getElementById("ydot").value;
	V[2] = document.getElementById("zdot").value;
	h = CrossProduct(R,V);
	var i = Math.atan(Math.sqrt(h[0]*h[0]+h[1]*h[1])/h[2]);
	i = RadiansToDegrees(i);
	if (i < 0) i = i + 180;
	if (i > 180) i = i - 180;
	return i;
}


</script>
</head>
<body>

<table border="1">
  <col valign="top" />
  <col valign="top" />
<tr id="tr1">
<td>
<H4>Convert Keplerian Elements to Cartesian Coordinates</H4>

<form id = "keplerian">
Keplerian Elements<br />
<input type="text" id="a" />a in km<br />
<input type="text" id="e" />e<br />
<input type="text" id="i" />i in degrees<br />
<input type="text" id="Omega" />Omega in degrees<br />
<input type="text" id="w" />w in degrees<br />
<input type="text" id="f" />f in degrees<br />
</form>

<button type="button" onclick="ComputeCartesians()">Convert Keplerian Values</button><br />
<button type="button" onclick="DisplayR()">Display Range in km</button><br />
<button type="button" onclick="ClearElements()">Clear elements</button><br />
</td>

<td>
<H4>Convert Cartesian Coordinates to Keplerian Elements</H4>

<form id = "cartesian">
Cartesian Coordinates <br />
<input type="text" id="x" />x in km<br />
<input type="text" id="y" />y in km<br />
<input type="text" id="z" />z in km<br />
<input type="text" id="xdot" />xdot in km/s<br />
<input type="text" id="ydot" />ydot in km/s<br />
<input type="text" id="zdot" />zdot in km/s<br />
</form>

<button type="button" onclick="ComputeKeplerians()">Convert Cartesian Values</button><br />
<button type="button" onclick="ClearCartesians()">Clear cartesian coordinates</button><br />

</td>
</tr>
</table>

</body>
</html> 

Vectors

<!DOCTYPE html PUBLIC "-//IETF//DTD HTML 2.0//EN">
<html>
<head>
<script type="text/javascript">

function VectorMagnitude(V)
{
	return Math.sqrt(DotProduct(V, V));
}

function Normalise(V)
{
	var R = VectorMagnitude(V);
	if (R != 0)
	{
		V[0] = V[0] / R;	
		V[1] = V[1] / R;	
		V[2] = V[2] / R;
	}
	return V;	
}

function Denormalise(R,V)
{
	V[0] = R * V[0];
	V[1] = R * V[1];
	V[2] = R * V[2];
	return V;
}

function NormaliseV1()
{
	var V1 = new Array();
	V1[0] = document.getElementById("x1").value;
	V1[1] = document.getElementById("y1").value;
	V1[2] = document.getElementById("z1").value;
	var R = VectorMagnitude(V1);
	V1 = Normalise(V1);
	document.getElementById("x1").value = V1[0];
	document.getElementById("y1").value = V1[1];
	document.getElementById("z1").value = V1[2];
	document.getElementById("magnitude1").value = R;
}

function NormaliseV2()
{
	var V2 = new Array();
	V2[0] = document.getElementById("x2").value;
	V2[1] = document.getElementById("y2").value;
	V2[2] = document.getElementById("z2").value;
	var R = VectorMagnitude(V2);
	V2 = Normalise(V2);
	document.getElementById("x2").value = V2[0];
	document.getElementById("y2").value = V2[1];
	document.getElementById("z2").value = V2[2];
	document.getElementById("magnitude2").value = R;
}

function NormaliseV()
{
	var V = new Array();
	V[0] = document.getElementById("x").value;
	V[1] = document.getElementById("y").value;
	V[2] = document.getElementById("z").value;
	var R = VectorMagnitude(V);
	V = Normalise(V);
	document.getElementById("x").value = V[0];
	document.getElementById("y").value = V[1];
	document.getElementById("z").value = V[2];
	document.getElementById("magnitude").value = R;
}

function DenormaliseV1()
{
	var V1 = new Array();
	V1[0] = document.getElementById("x1").value;
	V1[1] = document.getElementById("y1").value;
	V1[2] = document.getElementById("z1").value;
	var R = document.getElementById("magnitude1").value;
	V1 = Denormalise(R, V1);
	document.getElementById("x1").value = V1[0];
	document.getElementById("y1").value = V1[1];
	document.getElementById("z1").value = V1[2];
	document.getElementById("magnitude1").value = 0;
}

function DenormaliseV2()
{
	var V2 = new Array();
	V2[0] = document.getElementById("x2").value;
	V2[1] = document.getElementById("y2").value;
	V2[2] = document.getElementById("z2").value;
	var R = document.getElementById("magnitude2").value;
	V2 = Denormalise(R, V2);
	document.getElementById("x2").value = V2[0];
	document.getElementById("y2").value = V2[1];
	document.getElementById("z2").value = V2[2];
	document.getElementById("magnitude2").value = 0;
}

function DenormaliseV()
{
	var V = new Array();
	V[0] = document.getElementById("x").value;
	V[1] = document.getElementById("y").value;
	V[2] = document.getElementById("z").value;
	var R = document.getElementById("magnitude").value;
	V = Denormalise(R, V);
	document.getElementById("x").value = V[0];
	document.getElementById("y").value = V[1];
	document.getElementById("z").value = V[2];
	document.getElementById("magnitude").value = 0;
}

function CrossProduct(V1, V2)
{
	var V = new Array();

	// cross product
	V[0] = V1[1]*V2[2] - V1[2]*V2[1];
	V[1] = - V1[0]*V2[2] + V1[2]*V2[0];
	V[2] = V1[0]*V2[1] - V1[1]*V2[0];

	return V;
}

function DotProduct(V1, V2)
{
	return V1[0]*V2[0] + V1[1]*V2[1] + V1[2]*V2[2];
}

function DisplayCrossProduct()
{
	document.getElementById("OutputVector").reset();
	var V1 = new Array();
	var V2 = new Array();

	V1[0] = document.getElementById("x1").value;
	V1[1] = document.getElementById("y1").value;
	V1[2] = document.getElementById("z1").value;

	V2[0] = document.getElementById("x2").value;
	V2[1] = document.getElementById("y2").value;
	V2[2] = document.getElementById("z2").value;

	var V = CrossProduct(V1, V2);
	document.getElementById("x").value = V[0];
	document.getElementById("y").value = V[1];
	document.getElementById("z").value = V[2];
}

function DisplayDotProduct()
{
	document.getElementById("OutputVector").reset();
	var V1 = new Array();
	var V2 = new Array();

	V1[0] = document.getElementById("x1").value;
	V1[1] = document.getElementById("y1").value;
	V1[2] = document.getElementById("z1").value;

	V2[0] = document.getElementById("x2").value;
	V2[1] = document.getElementById("y2").value;
	V2[2] = document.getElementById("z2").value;

	var R = DotProduct(V1, V2);
	document.getElementById("magnitude").value = R;
}

function ClearVectors()
{
document.getElementById("vector1").reset();
document.getElementById("vector2").reset();
document.getElementById("OutputVector").reset();
}

</script>
</head>

<body>
<H4>Vector Products</H4>
<table border="1">
  <col valign="top" />
  <col valign="top" />
  <col valign="top" />
<tr id="tr1">

<td>
<form id = "vector1">
Vector 1<br />
<input type="text" id="x1" />x1<br />
<input type="text" id="y1" />y1<br />
<input type="text" id="z1" />z1<br />
<input type="text" id="magnitude1" /><u><b>|v1|</b></u><br />
</form>
<button type="button" onclick="NormaliseV1()">Normalise V1</button><br />
<button type="button" onclick="DenormaliseV1()">Denormalise V1</button><br />
</td>

<td>
<form id = "vector2">
Vector 2<br />
<input type="text" id="x2" />x2<br />
<input type="text" id="y2" />y2<br />
<input type="text" id="z2" />z2<br />
<input type="text" id="magnitude2" /><u><b>|v2|</b></u><br />
</form>
<button type="button" onclick="NormaliseV2()">Normalise V2</button><br />
<button type="button" onclick="DenormaliseV2()">Denormalise V2</button><br />
</td>

<td>
<form id = "OutputVector">
Output Vector<br />
<input type="text" id="x" />x<br />
<input type="text" id="y" />y<br />
<input type="text" id="z" />z<br />
<input type="text" id="magnitude" /><u><b>|v|</b></u><br />
</form>
<button type="button" onclick="NormaliseV()">Normalise V</button><br />
<button type="button" onclick="DenormaliseV()">Denormalise V</button><br />
<button type="button" onclick="DisplayCrossProduct()">Vector Cross Product</button><br />
<button type="button" onclick="DisplayDotProduct()">Scalar Dot Product</button><br />
<button type="button" onclick="ClearVectors()">Clear vectors</button><br />
</td>

</tr>

</table>

</body>
</html>

Quaternions
<!DOCTYPE html PUBLIC "-//IETF//DTD HTML 2.0//EN">
<html>
<head>
<script type="text/javascript">

var pi = 3.1415926535897932384626433832795;

function Compute()
{
	var q = new Array();

	// JavaScript does not support 2-D arrays
	// but it does support arrays of arrays
	// so let's create them
	q[0] = document.getElementById("q0").value;
	q[1] = document.getElementById("q1").value;
	q[2] = document.getElementById("q2").value;
	q[3] = document.getElementById("q3").value;

	document.getElementById("q0_out").value = q[0];
	document.getElementById("q1_out").value = q[1];
	document.getElementById("q2_out").value = q[2];
	document.getElementById("q3_out").value = q[3];
}

function NormalizeQuaternion(q)
{
	var norm = Math.sqrt(q[0]*q[0] + q[1]*q[1] + q[2]*q[2] + q[3]*q[3]);
	if (norm != 0)
	{
		q[0] = q[0]/norm;
		q[1] = q[1]/norm;
		q[2] = q[2]/norm;
		q[3] = q[3]/norm;
	}
	return q;
}

function NormalizeVector(v)
{
	var norm = Math.sqrt(v[0]*v[0] + v[1]*v[1] + v[2]*v[2]);
	if (norm != 0)
	{
		v[0] = v[0]/norm;
		v[1] = v[1]/norm;
		v[2] = v[2]/norm;
	}
	return v;
}

function CrossProduct(V1, V2)
{
	var V = new Array();

	// cross product
	V[0] = V1[1]*V2[2] - V1[2]*V2[1];
	V[1] = - V1[0]*V2[2] + V1[2]*V2[0];
	V[2] = V1[0]*V2[1] - V1[1]*V2[0];

	return V;
}

function QuaternionProduct(q1,q2)
{
	// JavaScript does not support 2-D arrays
	// but it does support arrays of arrays
	// so let's create them
	var Q = new Array();
	Q[0] = new Array();
	Q[1] = new Array();
	Q[2] = new Array();
	Q[3] = new Array();

	Q[0][0] = q1[0];
	Q[0][1] = -q1[1];
	Q[0][2] = -q1[2];
	Q[0][3] = -q1[3];
	Q[1][0] = q1[1];
	Q[1][1] = q1[0];
	Q[1][2] = -q1[3];
	Q[1][3] = q1[2];
	Q[2][0] = q1[2];
	Q[2][1] = q1[3];
	Q[2][2] = q1[0];
	Q[2][3] = -q1[1];
	Q[3][0] = q1[3];
	Q[3][1] = -q1[2];
	Q[3][2] = q1[1];
	Q[3][3] = q1[0];

	var q = new Array();
	for (i = 0; i < 4; i++)
	{
		q[i] = 0;
		for (j = 0; j < 4; j++)
		{
			q[i] = q[i] + Q[i][j]*q2[j];
		}
	}
	return q;
}

function MultiplyQuaternions()
{
	var q1 = new Array();
	var q2 = new Array();
	var q = new Array();

	q1[0] = Math.round(document.getElementById("q0_1").value*1000000000)/1000000000;
	q1[1] = Math.round(document.getElementById("q1_1").value*1000000000)/1000000000;
	q1[2] = Math.round(document.getElementById("q2_1").value*1000000000)/1000000000;
	q1[3] = Math.round(document.getElementById("q3_1").value*1000000000)/1000000000;

	// JavaScript does not support 2-D arrays
	// but it does support arrays of arrays
	// so let's create them
	var M1 = new Array();
	M1[0] = new Array();
	M1[1] = new Array();
	M1[2] = new Array();

	// convert quaternion to attitude matrix
	M1 = MatrixFromQuaternion(q1);
	document.getElementById("a11_1").value = Math.round(M1[0][0]*1000000000)/1000000000;
	document.getElementById("a12_1").value = Math.round(M1[0][1]*1000000000)/1000000000;
	document.getElementById("a13_1").value = Math.round(M1[0][2]*1000000000)/1000000000;
	document.getElementById("a21_1").value = Math.round(M1[1][0]*1000000000)/1000000000;
	document.getElementById("a22_1").value = Math.round(M1[1][1]*1000000000)/1000000000;
	document.getElementById("a23_1").value = Math.round(M1[1][2]*1000000000)/1000000000;
	document.getElementById("a31_1").value = Math.round(M1[2][0]*1000000000)/1000000000;
	document.getElementById("a32_1").value = Math.round(M1[2][1]*1000000000)/1000000000;
	document.getElementById("a33_1").value = Math.round(M1[2][2]*1000000000)/1000000000;

	q2[0] = Math.round(document.getElementById("q0_2").value*1000000000)/1000000000;
	q2[1] = Math.round(document.getElementById("q1_2").value*1000000000)/1000000000;
	q2[2] = Math.round(document.getElementById("q2_2").value*1000000000)/1000000000;
	q2[3] = Math.round(document.getElementById("q3_2").value*1000000000)/1000000000;

	// JavaScript does not support 2-D arrays
	// but it does support arrays of arrays
	// so let's create them
	var M2 = new Array();
	M2[0] = new Array();
	M2[1] = new Array();
	M2[2] = new Array();

	// convert quaternion to attitude matrix
	M2 = MatrixFromQuaternion(q2);
	document.getElementById("a11_2").value = Math.round(M2[0][0]*1000000000)/1000000000;
	document.getElementById("a12_2").value = Math.round(M2[0][1]*1000000000)/1000000000;
	document.getElementById("a13_2").value = Math.round(M2[0][2]*1000000000)/1000000000;
	document.getElementById("a21_2").value = Math.round(M2[1][0]*1000000000)/1000000000;
	document.getElementById("a22_2").value = Math.round(M2[1][1]*1000000000)/1000000000;
	document.getElementById("a23_2").value = Math.round(M2[1][2]*1000000000)/1000000000;
	document.getElementById("a31_2").value = Math.round(M2[2][0]*1000000000)/1000000000;
	document.getElementById("a32_2").value = Math.round(M2[2][1]*1000000000)/1000000000;
	document.getElementById("a33_2").value = Math.round(M2[2][2]*1000000000)/1000000000;

	q = QuaternionProduct(q2, q1);

	document.getElementById("q0_result").value = Math.round(q[0]*1000000000)/1000000000;
	document.getElementById("q1_result").value = Math.round(q[1]*1000000000)/1000000000;
	document.getElementById("q2_result").value = Math.round(q[2]*1000000000)/1000000000;
	document.getElementById("q3_result").value = Math.round(q[3]*1000000000)/1000000000;
	
	// JavaScript does not support 2-D arrays
	// but it does support arrays of arrays
	// so let's create them
	var M = new Array();
	M[0] = new Array();
	M[1] = new Array();
	M[2] = new Array();

	// convert quaternion to attitude matrix
	M = MatrixFromQuaternion(q);
	document.getElementById("a11_result").value = Math.round(M[0][0]*1000000000)/1000000000;
	document.getElementById("a12_result").value = Math.round(M[0][1]*1000000000)/1000000000;
	document.getElementById("a13_result").value = Math.round(M[0][2]*1000000000)/1000000000;
	document.getElementById("a21_result").value = Math.round(M[1][0]*1000000000)/1000000000;
	document.getElementById("a22_result").value = Math.round(M[1][1]*1000000000)/1000000000;
	document.getElementById("a23_result").value = Math.round(M[1][2]*1000000000)/1000000000;
	document.getElementById("a31_result").value = Math.round(M[2][0]*1000000000)/1000000000;
	document.getElementById("a32_result").value = Math.round(M[2][1]*1000000000)/1000000000;
	document.getElementById("a33_result").value = Math.round(M[2][2]*1000000000)/1000000000;

}

function MatrixProduct(M1, M2)
{
	// JavaScript does not support 2-D arrays
	// but it does support arrays of arrays
	// so let's create them
	var M = new Array();
	M[0] = new Array();
	M[1] = new Array();
	M[2] = new Array();

	for (i = 0; i < 3; i++)
	{
		for (j = 0 ; j < 3; j++)
		{
			M[i][j] = M1[i][0]*M2[0][j] + M1[i][1]*M2[1][j] + M1[i][2]*M2[2][j];
		}
	}
	return M;
}

function MultiplyMatrices()
{
	// JavaScript does not support 2-D arrays
	// but it does support arrays of arrays
	// so let's create them
	var M1 = new Array();
	M1[0] = new Array();
	M1[1] = new Array();
	M1[2] = new Array();
	var M2 = new Array();
	M2[0] = new Array();
	M2[1] = new Array();
	M2[2] = new Array();
	var M = new Array();
	M[0] = new Array();
	M[1] = new Array();
	M[2] = new Array();

	M1[0][0] = document.getElementById("a11_1").value;
	M1[0][1] = document.getElementById("a12_1").value;
	M1[0][2] = document.getElementById("a13_1").value;
	M1[1][0] = document.getElementById("a21_1").value;
	M1[1][1] = document.getElementById("a22_1").value;
	M1[1][2] = document.getElementById("a23_1").value;
	M1[2][0] = document.getElementById("a31_1").value;
	M1[2][1] = document.getElementById("a32_1").value;
	M1[2][2] = document.getElementById("a33_1").value;

	M2[0][0] = document.getElementById("a11_2").value;
	M2[0][1] = document.getElementById("a12_2").value;
	M2[0][2] = document.getElementById("a13_2").value;
	M2[1][0] = document.getElementById("a21_2").value;
	M2[1][1] = document.getElementById("a22_2").value;
	M2[1][2] = document.getElementById("a23_2").value;
	M2[2][0] = document.getElementById("a31_2").value;
	M2[2][1] = document.getElementById("a32_2").value;
	M2[2][2] = document.getElementById("a33_2").value;

	M = MatrixProduct(M1, M2);

	document.getElementById("a11_result").value = Math.round(M[0][0]*1000000000)/1000000000;
	document.getElementById("a12_result").value = Math.round(M[0][1]*1000000000)/1000000000;
	document.getElementById("a13_result").value = Math.round(M[0][2]*1000000000)/1000000000;
	document.getElementById("a21_result").value = Math.round(M[1][0]*1000000000)/1000000000;
	document.getElementById("a22_result").value = Math.round(M[1][1]*1000000000)/1000000000;
	document.getElementById("a23_result").value = Math.round(M[1][2]*1000000000)/1000000000;
	document.getElementById("a31_result").value = Math.round(M[2][0]*1000000000)/1000000000;
	document.getElementById("a32_result").value = Math.round(M[2][1]*1000000000)/1000000000;
	document.getElementById("a33_result").value = Math.round(M[2][2]*1000000000)/1000000000;
	
}

function DotProduct(V1, V2)
{
	return V1[0]*V2[0] + V1[1]*V2[1] + V1[2]*V2[2];
}


function Determinant(M)
{
	var D = 1;
	D = M[0][0]*(M[1][1]*M[2][2]-M[1][2]*M[2][1]) - 
		M[0][1]*(M[1][0]*M[2][2]-M[1][2]*M[2][0]) +
		M[0][2]*(M[1][0]*M[2][1]-M[2][0]*M[1][1]);

	return D;
}

function NormalizeMatrix(M)
{
	var X = new Array(M[0][0],M[0][1],M[0][2]);
	var Y = new Array(M[1][0],M[1][1],M[1][2]);
	var Z = new Array(M[2][0],M[2][1],M[2][2]);

	// normalize Z
	Z = NormalizeVector(Z);

	// X is cross product of Y and Z
	X = CrossProduct(Y, Z);

	// normalize X
	X = NormalizeVector(X);

	// Y is cross product of Z and X
	Y = CrossProduct(Z, X);

	M[0] = X;
	M[1] = Y;
	M[2] = Z;

	return M;
}


function NormalizeInputMatrix()
{
	// JavaScript does not support 2-D arrays
	// but it does support arrays of arrays
	// so let's create them
	var M = new Array();
	M[0] = new Array();
	M[1] = new Array();
	M[2] = new Array();
	M[0][0] = document.getElementById("a11").value;
	M[0][1] = document.getElementById("a12").value;
	M[0][2] = document.getElementById("a13").value;
	M[1][0] = document.getElementById("a21").value;
	M[1][1] = document.getElementById("a22").value;
	M[1][2] = document.getElementById("a23").value;
	M[2][0] = document.getElementById("a31").value;
	M[2][1] = document.getElementById("a32").value;
	M[2][2] = document.getElementById("a33").value;
	M = NormalizeMatrix(M);
	document.getElementById("a11").value = Math.round(M[0][0]*1000000000)/1000000000;
	document.getElementById("a12").value = Math.round(M[0][1]*1000000000)/1000000000;
	document.getElementById("a13").value = Math.round(M[0][2]*1000000000)/1000000000;
	document.getElementById("a21").value = Math.round(M[1][0]*1000000000)/1000000000;
	document.getElementById("a22").value = Math.round(M[1][1]*1000000000)/1000000000;
	document.getElementById("a23").value = Math.round(M[1][2]*1000000000)/1000000000;
	document.getElementById("a31").value = Math.round(M[2][0]*1000000000)/1000000000;
	document.getElementById("a32").value = Math.round(M[2][1]*1000000000)/1000000000;
	document.getElementById("a33").value = Math.round(M[2][2]*1000000000)/1000000000;
}

function ComputeMatrix()
{
	var q = new Array();

	// JavaScript does not support 2-D arrays
	// but it does support arrays of arrays
	// so let's create them
	var M = new Array();
	M[0] = new Array();
	M[1] = new Array();
	M[2] = new Array();
	q[0] = document.getElementById("q0").value;
	q[1] = document.getElementById("q1").value;
	q[2] = document.getElementById("q2").value;
	q[3] = document.getElementById("q3").value;

	// convert quaternion to attitude matrix
	M = MatrixFromQuaternion(q);
	document.getElementById("a11").value = Math.round(M[0][0]*1000000000)/1000000000;
	document.getElementById("a12").value = Math.round(M[0][1]*1000000000)/1000000000;
	document.getElementById("a13").value = Math.round(M[0][2]*1000000000)/1000000000;
	document.getElementById("a21").value = Math.round(M[1][0]*1000000000)/1000000000;
	document.getElementById("a22").value = Math.round(M[1][1]*1000000000)/1000000000;
	document.getElementById("a23").value = Math.round(M[1][2]*1000000000)/1000000000;
	document.getElementById("a31").value = Math.round(M[2][0]*1000000000)/1000000000;
	document.getElementById("a32").value = Math.round(M[2][1]*1000000000)/1000000000;
	document.getElementById("a33").value = Math.round(M[2][2]*1000000000)/1000000000;

	// convert attitude matrix to 3-1-3 Euler angles in radians
	var E = new Array();
	E = EulerAnglesFromMatrix(M);

	// convert angles in radians to degrees for output to text boxes
	document.getElementById("phi").value = Math.round(RadiansToDegrees(E[0])*1000000000)/1000000000;
	document.getElementById("theta").value = Math.round(RadiansToDegrees(E[1])*1000000000)/1000000000;
	document.getElementById("psi").value = Math.round(RadiansToDegrees(E[2])*1000000000)/1000000000;

	// convert 3-1-3 Euler angles in radians to quaternion for completeness and circular testing
	q = QuaternionFromEulerAngles(E);
	document.getElementById("q0_out").value = Math.round(q[0]*1000000000)/1000000000;
	document.getElementById("q1_out").value = Math.round(q[1]*1000000000)/1000000000;
	document.getElementById("q2_out").value = Math.round(q[2]*1000000000)/1000000000;
	document.getElementById("q3_out").value = Math.round(q[3]*1000000000)/1000000000;
}

function ComputeEulerAngles()
{
	var q = new Array();

	// JavaScript does not support 2-D arrays
	// but it does support arrays of arrays
	// so let's create them
	var M = new Array();
	M[0] = new Array();
	M[1] = new Array();
	M[2] = new Array();
	M[0][0] = Math.round(document.getElementById("a11").value*1000000000)/1000000000;
	M[0][1] = Math.round(document.getElementById("a12").value*1000000000)/1000000000;
	M[0][2] = Math.round(document.getElementById("a13").value*1000000000)/1000000000;
	M[1][0] = Math.round(document.getElementById("a21").value*1000000000)/1000000000;
	M[1][1] = Math.round(document.getElementById("a22").value*1000000000)/1000000000;
	M[1][2] = Math.round(document.getElementById("a23").value*1000000000)/1000000000;
	M[2][0] = Math.round(document.getElementById("a31").value*1000000000)/1000000000;
	M[2][1] = Math.round(document.getElementById("a32").value*1000000000)/1000000000;
	M[2][2] = Math.round(document.getElementById("a33").value*1000000000)/1000000000;

	// convert attitude matrix to 3-1-3 Euler angles in radians
	var E = new Array();
	E = EulerAnglesFromMatrix(M);

	// convert angles in radians to degrees for output to text boxes
	document.getElementById("phi").value = Math.round(RadiansToDegrees(E[0])*1000000000)/1000000000;
	document.getElementById("theta").value = Math.round(RadiansToDegrees(E[1])*1000000000)/1000000000;
	document.getElementById("psi").value = Math.round(RadiansToDegrees(E[2])*1000000000)/1000000000;

	// convert 3-1-3 Euler angles in radians to quaternion for completeness and circular testing
	q = QuaternionFromEulerAngles(E);
	document.getElementById("q0_out").value = Math.round(q[0]*1000000000)/1000000000;
	document.getElementById("q1_out").value = Math.round(q[1]*1000000000)/1000000000;
	document.getElementById("q2_out").value = Math.round(q[2]*1000000000)/1000000000;
	document.getElementById("q3_out").value = Math.round(q[3]*1000000000)/1000000000;

	document.getElementById("quaternionIn").reset();
}

function ComputeQuaternion()
{

	// get Euler angles in radians
	var E = new Array();
	E[0] = DegreesToRadians(document.getElementById("phi").value);
	E[1] = DegreesToRadians(document.getElementById("theta").value);
	E[2] = DegreesToRadians(document.getElementById("psi").value);

	// convert 3-1-3 Euler angles in radians to quaternion for completeness and circular testing
	var q = new Array();
	q = QuaternionFromEulerAngles(E);
	document.getElementById("q0_out").value = Math.round(q[0]*1000000000)/1000000000;
	document.getElementById("q1_out").value = Math.round(q[1]*1000000000)/1000000000;
	document.getElementById("q2_out").value = Math.round(q[2]*1000000000)/1000000000;
	document.getElementById("q3_out").value = Math.round(q[3]*1000000000)/1000000000;

	document.getElementById("quaternionIn").reset();

	// JavaScript does not support 2-D arrays
	// but it does support arrays of arrays
	// so let's create them
	var M = new Array();
	M[0] = new Array();
	M[1] = new Array();
	M[2] = new Array();

	// convert quaternion to attitude matrix
	M = MatrixFromQuaternion(q);
	document.getElementById("a11").value = Math.round(M[0][0]*1000000000)/1000000000;
	document.getElementById("a12").value = Math.round(M[0][1]*1000000000)/1000000000;
	document.getElementById("a13").value = Math.round(M[0][2]*1000000000)/1000000000;
	document.getElementById("a21").value = Math.round(M[1][0]*1000000000)/1000000000;
	document.getElementById("a22").value = Math.round(M[1][1]*1000000000)/1000000000;
	document.getElementById("a23").value = Math.round(M[1][2]*1000000000)/1000000000;
	document.getElementById("a31").value = Math.round(M[2][0]*1000000000)/1000000000;
	document.getElementById("a32").value = Math.round(M[2][1]*1000000000)/1000000000;
	document.getElementById("a33").value = Math.round(M[2][2]*1000000000)/1000000000;

}



function MatrixFromQuaternion(q)
{
	var M = new Array();
	M[0] = new Array();
	M[1] = new Array();
	M[2] = new Array();

	// ensure q is normalized
	q = NormalizeQuaternion(q);

	M[0][0] = 2*(q[1]*q[1] + q[0]*q[0]) - 1;
	M[0][1] = 2*(q[1]*q[2] + q[3]*q[0]);
	M[0][2] = 2*(q[1]*q[3] - q[2]*q[0]);
	M[1][0] = 2*(q[1]*q[2] - q[3]*q[0]);
	M[1][1] = 2*(q[2]*q[2] + q[0]*q[0]) - 1;
	M[1][2] = 2*(q[2]*q[3] + q[1]*q[0]);
	M[2][0] = 2*(q[1]*q[3] + q[2]*q[0]);
	M[2][1] = 2*(q[2]*q[3] - q[1]*q[0]);
	M[2][2] = 2*(q[3]*q[3] + q[0]*q[0]) - 1;

	for (i = 0; i < 3; i++)
	{
		for (j = 0; j < 3; j++)
		{
			M[i][j] = Math.round(M[i][j]*1000000000)/1000000000;
		}
	}
	return M;	
}

function EulerAnglesFromMatrix(M)
{
	var E = new Array();

	// there are singularities when M[2][2] = +/-1
	// so these need to be handled with a special case
	if (M[2][2] == 1)
	{
		E[0] = 0;
		E[1] = 0;
		E[2] = Math.atan2((M[0][1] - M[1][0]), (M[0][0] + M[1][1]));
	}
	else if (M[2][2] == -1)
	{
		E[0] = 0;
		E[1] = DegreesToRadians(180);
		E[2] = Math.atan2(-(M[0][1] + M[1][0]), (M[0][0] - M[1][1]));
	}
	else
	{
		E[0] = Math.atan2(M[2][0],-M[2][1]);
		E[1] = Math.acos(M[2][2]);
		E[2] = Math.atan2(M[0][2],M[1][2]);
	}
	return E;
}

function QuaternionFromEulerAngles(E)
{
	var q = new Array();
	var phi = E[0];
	var theta = E[1];
	var psi = E[2];
	q[0] = Math.cos(theta/2)*Math.cos((phi+psi)/2);
	q[1] = Math.sin(theta/2)*Math.cos((phi-psi)/2);
	q[2] = Math.sin(theta/2)*Math.sin((phi-psi)/2);
	q[3] = Math.cos(theta/2)*Math.sin((phi+psi)/2);

	return q;
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


function ClearAll()
{
document.getElementById("quaternionIn").reset();
document.getElementById("quaternionOut").reset();
document.getElementById("rotationMatrix").reset();
document.getElementById("eulerAngles").reset();
}

function ClearAllTable2()
{
document.getElementById("quaternion1").reset();
document.getElementById("quaternion2").reset();
document.getElementById("quaternionResult").reset();
document.getElementById("matrix1").reset();
document.getElementById("matrix2").reset();
document.getElementById("matrixResult").reset();
}

</script>
</head>

<body>
<H4>Quaternion Conversions</H4>
<table border="1">
  <col valign="top" />
  <col valign="top" />
  <col valign="top" />
  <col valign="top" />
<tr id="tr1">

<td>
<form id = "quaternionIn">
Quaternion In<br />
<input type="text" id="q0" size=21/>q0 (scalar)<br />
<input type="text" id="q1" size=21/>q1<br />
<input type="text" id="q2" size=21/>q2<br />
<input type="text" id="q3" size=21/>q3<br />
</form>
<button type="button" onclick="ComputeMatrix()">Compute All</button><br />
<button type="button" onclick="ClearAll()">Clear All</button><br />
</td>

<td>
<form id = "rotationMatrix">
Rotation Matrix<br />
<input type="text" id="a11" maxLength=10 size=7  />
<input type="text" id="a12" maxLength=10 size=7  />
<input type="text" id="a13" maxLength=10 size=7  /><br />
<input type="text" id="a21" maxLength=10 size=7  />
<input type="text" id="a22" maxLength=10 size=7  />
<input type="text" id="a23" maxLength=10 size=7  /><br />
<input type="text" id="a31" maxLength=10 size=7  />
<input type="text" id="a32" maxLength=10 size=7  />
<input type="text" id="a33" maxLength=10 size=7  />
</form>
<br /><button type="button" onclick="ComputeEulerAngles()">Compute All</button><br />
<button type="button" onclick="NormalizeInputMatrix()">Normalize Matrix</button><br />
</td>

<td>
<form id = "eulerAngles">
3-1-3 Euler Angles<br />
<input type="text" id="phi" size=21/>phi (degs)<br />
<input type="text" id="theta" size=21/>theta (degs)<br />
<input type="text" id="psi" size=21/>psi (degs)<br />
</form>
<br /><button type="button" onclick="ComputeQuaternion()">Compute All</button><br />
</td>

<td>
<form id = "quaternionOut">
Quaternion Out (Normalized)<br />
<input type="text" id="q0_out" size=21/>q0 (scalar)<br />
<input type="text" id="q1_out" size=21/>q1<br />
<input type="text" id="q2_out" size=21/>q2<br />
<input type="text" id="q3_out" size=21/>q3<br />
</form>
</td>

</tr>

</table>

<H4>Quaternion/Matrix Multiplication</H4>
<table border="1">
  <col valign="top" />
  <col valign="top" />
  <col valign="top" />
<tr id="tr2">

<td>
<form id = "quaternion1">
Quaternion 1<br />
<input type="text" id="q0_1" size=21/>q0 (scalar)<br />
<input type="text" id="q1_1" size=21/>q1<br />
<input type="text" id="q2_1" size=21/>q2<br />
<input type="text" id="q3_1" size=21/>q3<br />
</form>
</td>

<td>
<form id = "quaternion2">
Quaternion 2<br />
<input type="text" id="q0_2" size=21/>q0 (scalar)<br />
<input type="text" id="q1_2" size=21/>q1<br />
<input type="text" id="q2_2" size=21/>q2<br />
<input type="text" id="q3_2" size=21/>q3<br />
</form>
</td>

<td>
<form id = "quaternionResult">
Quaternion Result = q2 x q1<br />
<input type="text" id="q0_result" size=21/>q0 (scalar)<br />
<input type="text" id="q1_result" size=21/>q1<br />
<input type="text" id="q2_result" size=21/>q2<br />
<input type="text" id="q3_result" size=21/>q3<br />
</form>
<button type="button" onclick="MultiplyQuaternions()">Multiply Quaternions</button><br />
</td>

</tr>

<tr id="tr3">

<td>
<form id = "matrix1">
Matrix 1<br />
<input type="text" id="a11_1" maxLength=10 size=7  />
<input type="text" id="a12_1" maxLength=10 size=7  />
<input type="text" id="a13_1" maxLength=10 size=7  /><br />
<input type="text" id="a21_1" maxLength=10 size=7  />
<input type="text" id="a22_1" maxLength=10 size=7  />
<input type="text" id="a23_1" maxLength=10 size=7  /><br />
<input type="text" id="a31_1" maxLength=10 size=7  />
<input type="text" id="a32_1" maxLength=10 size=7  />
<input type="text" id="a33_1" maxLength=10 size=7  />
</form>
</td>

<td>
<form id = "matrix2">
Matrix 2<br />
<input type="text" id="a11_2" maxLength=10 size=7  />
<input type="text" id="a12_2" maxLength=10 size=7  />
<input type="text" id="a13_2" maxLength=10 size=7  /><br />
<input type="text" id="a21_2" maxLength=10 size=7  />
<input type="text" id="a22_2" maxLength=10 size=7  />
<input type="text" id="a23_2" maxLength=10 size=7  /><br />
<input type="text" id="a31_2" maxLength=10 size=7  />
<input type="text" id="a32_2" maxLength=10 size=7  />
<input type="text" id="a33_2" maxLength=10 size=7  />
</form>
</td>

<td>
<form id = "matrixResult">
Matrix Result= M1 x M2<br />
<input type="text" id="a11_result" maxLength=10 size=7  />
<input type="text" id="a12_result" maxLength=10 size=7  />
<input type="text" id="a13_result" maxLength=10 size=7  /><br />
<input type="text" id="a21_result" maxLength=10 size=7  />
<input type="text" id="a22_result" maxLength=10 size=7  />
<input type="text" id="a23_result" maxLength=10 size=7  /><br />
<input type="text" id="a31_result" maxLength=10 size=7  />
<input type="text" id="a32_result" maxLength=10 size=7  />
<input type="text" id="a33_result" maxLength=10 size=7  />
</form>
<button type="button" onclick="MultiplyMatrices()">Multiply Matrices</button><br />
</td>

</tr>

</table>

</body>
</html>
CRC
<!DOCTYPE html PUBLIC "-//IETF//DTD HTML 2.0//EN">
<html>
<head>
<script type="text/javascript">

// set the initialisation state to all ones
function AllOnes()
{
	document.getElementById("r1").value=1;
	document.getElementById("r2").value=1;
	document.getElementById("r3").value=1;
	document.getElementById("r4").value=1;
	document.getElementById("r5").value=1;
	document.getElementById("r6").value=1;
	document.getElementById("r7").value=1;
	document.getElementById("r8").value=1;
	document.getElementById("r9").value=1;
	document.getElementById("r10").value=1;
	document.getElementById("r11").value=1;
	document.getElementById("r12").value=1;
	document.getElementById("r13").value=1;
	document.getElementById("r14").value=1;
	document.getElementById("r15").value=1;
	document.getElementById("r16").value=1;
}

// set the initialisation state to all zeroes
function AllZeroes()
{
	document.getElementById("r1").value=0;
	document.getElementById("r2").value=0;
	document.getElementById("r3").value=0;
	document.getElementById("r4").value=0;
	document.getElementById("r5").value=0;
	document.getElementById("r6").value=0;
	document.getElementById("r7").value=0;
	document.getElementById("r8").value=0;
	document.getElementById("r9").value=0;
	document.getElementById("r10").value=0;
	document.getElementById("r11").value=0;
	document.getElementById("r12").value=0;
	document.getElementById("r13").value=0;
	document.getElementById("r14").value=0;
	document.getElementById("r15").value=0;
	document.getElementById("r16").value=0;
}

function DisplayCrc()
{	
	var str = document.getElementById("inputString").value;
	str = trim(str);
	var bytes = new Array();
	var txt = "";
	bytes = str.split(" ");
	for (i = 0; i < bytes.length; i++)
	{
		txt = txt + bytes[i] + "\n";
	}
	//alert(txt);
	
	// check that length of each element is 2 characters (for a byte)
	for (i = 0; i < bytes.length; i++)
	{
		if (bytes[i].length != 2)
		{
			alert("element " + i + " = " + bytes[i] + " needs length 2");
		}
		// convert each 2 character string to hexadecimal integer
		bytes[i] = parseInt(bytes[i],16)
	}
	var crc = CalculateCrc(bytes);
	var msb = (crc >> 8) & 0xff;
	var lsb = crc & 0xff;
	//alert ("CRC = 0x" + msb.toString(16) + " 0x" + lsb.toString(16));
	document.getElementById("crc").value = msb.toString(16) + " " + lsb.toString(16);
}

// remove multiple, leading or trailing spaces
function trim(s) {
	s = s.replace(/(^\s*)|(\s*$)/gi,"");
	s = s.replace(/[ ]{2,}/gi," ");
	s = s.replace(/\n /,"\n");
	return s;
}

// Calculates the CRC based on the passed in bytes
function CalculateCrc(bytes)
{
	var r = new Array(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);
	r[0] = document.getElementById("r1").value;
	r[1] = document.getElementById("r2").value;
	r[2] = document.getElementById("r3").value;
	r[3] = document.getElementById("r4").value;
	r[4] = document.getElementById("r5").value;
	r[5] = document.getElementById("r6").value;
	r[6] = document.getElementById("r7").value;
	r[7] = document.getElementById("r8").value;
	r[8] = document.getElementById("r9").value;
	r[9] = document.getElementById("r10").value;
	r[10] = document.getElementById("r11").value;
	r[11] = document.getElementById("r12").value;
	r[12] = document.getElementById("r13").value;
	r[13] = document.getElementById("r14").value;
	r[14] = document.getElementById("r15").value;
	r[15] = document.getElementById("r16").value;
	var x = new Array(0 , 0, 0, 0, 0 , 0, 0, 0);
	var m = new Array(0 , 0, 0, 0, 0 , 0, 0, 0);
	var len = bytes.length;
	var msb;
	var lsb;
        for (i = 0; i < len; i++ )
        {
		m[7] = ((bytes[i] & 0x00000001));
                m[6] = ((bytes[i] & 0x00000002) >> 1);
                m[5] = ((bytes[i] & 0x00000004) >> 2);
                m[4] = ((bytes[i] & 0x00000008) >> 3);
                m[3] = ((bytes[i] & 0x00000010) >> 4);
                m[2] = ((bytes[i] & 0x00000020) >> 5);
                m[1] = ((bytes[i] & 0x00000040) >> 6);
                m[0] = ((bytes[i] & 0x00000080) >> 7);

                x[0] = (r[0] ^ m[0]);
                x[1] = (r[1] ^ m[1]);
                x[2] = (r[2] ^ m[2]);
                x[3] = (r[3] ^ m[3]);
                x[4] = (r[4] ^ m[4]);
                x[5] = (r[5] ^ m[5]);
                x[6] = (r[6] ^ m[6]);
                x[7] = (r[7] ^ m[7]);

                r[0] = ((r[8] ^ x[4]) ^ x[0]);
                r[1] = ((r[9] ^ x[5]) ^ x[1]);
                r[2] = ((r[10] ^ x[6]) ^ x[2]);
                r[3] = (((r[11] ^ x[0]) ^ x[7]) ^ x[3]);
                r[4] = (r[12] ^ x[1]);
                r[5] = (r[13] ^ x[2]);
                r[6] = (r[14] ^ x[3]);
                r[7] = ((r[15] ^ x[4]) ^ x[0]);
                r[8] = ((x[0] ^ x[5]) ^ x[1]);
                r[9] = ((x[1] ^ x[6]) ^ x[2]);
                r[10] = ((x[2] ^ x[7]) ^ x[3]);
                r[11] = (x[3]);
                r[12] = (x[4] ^ x[0]);
                r[13] = (x[5] ^ x[1]);
                r[14] = (x[6] ^ x[2]);
                r[15] = (x[7] ^ x[3]);
	}
	msb = (r[ 0] << 7) + (r[ 1] << 6) + (r[ 2] << 5) + (r[ 3] << 4)
                           + (r[ 4] << 3) + (r[ 5] << 2) + (r[ 6] << 1) +  r[ 7];

        lsb = (r[ 8] << 7) + (r[ 9] << 6) + (r[10] << 5) + (r[11] << 4)
                           + (r[12] << 3) + (r[13] << 2) + (r[14] << 1) +  r[15];
	var word = (msb << 8) + lsb;
	return word;
}

function ClearString()
{
	document.getElementById("getString").reset();
}

</script>
</head>

<body>
<p>
This function computes the 16 bit <a href="http://en.wikipedia.org/wiki/Cyclic_redundancy_check">CRC</a> for a string of hexadecimal bytes based on the specified initialisation state and generator polynomial x<sup>16</sup>+x<sup>12</sup>+x<sup>5</sup>+1.
</p>

<table>
<tr id="tr1">
Initialisation state<br />
<td>
<form id = "initState1">
<input type="text" id="r1" maxLength=1 size=1  />
</form>
</td>
<td>
<form id = "initState2">
<input type="text" id="r2" maxLength=1 size=1 />
</form>
</td>
<td>
<form id = "initState3">
<input type="text" id="r3" maxLength=1 size=1 />
</form>
</td>
<td>
<form id = "initState4">
<input type="text" id="r4" maxLength=1 size=1 />
</form>
</td>
<td>
<form id = "initState5">
<input type="text" id="r5" maxLength=1 size=1 />
</form>
</td>
<td>
<form id = "initState6">
<input type="text" id="r6" maxLength=1 size=1 />
</form>
</td>
<td>
<form id = "initState7">
<input type="text" id="r7" maxLength=1 size=1 />
</form>
</td>
<td>
<form id = "initState8">
<input type="text" id="r8" maxLength=1 size=1 />
</form>
</td>
<td>
<form id = "initState9">
<input type="text" id="r9" maxLength=1 size=1 />
</form>
</td>
<td>
<form id = "initState10">
<input type="text" id="r10" maxLength=1 size=1 />
</form>
</td>
<td>
<form id = "initState11">
<input type="text" id="r11" maxLength=1 size=1 />
</form>
</td>
<td>
<form id = "initState12">
<input type="text" id="r12" maxLength=1 size=1 />
</form>
</td>
<td>
<form id = "initState13">
<input type="text" id="r13" maxLength=1 size=1 />
</form>
</td>
<td>
<form id = "initState14">
<input type="text" id="r14" maxLength=1 size=1 />
</form>
</td>
<td>
<form id = "initState15">
<input type="text" id="r15" maxLength=1 size=1 />
</form>
</td>
<td>
<form id = "initState16">
<input type="text" id="r16" maxLength=1 size=1 />
</form>
</td>

</tr>
</table>

<script type="text/javascript">
AllOnes();
</script>

<button type="button" onclick="AllOnes()">Set Init State to all ones</button><br />
<button type="button" onclick="AllZeroes()">Set Init State to all zeroes</button><br />

<form id = "getString">
Input string of space delimited hexadecimal bytes e.g. A1 B2 C3 D4 E5 F6 07 18<br />
<input type="text" id="inputString" maxLength=4500 size=1500/><br />
Computed CRC<br />
<input type="text" id="crc"/>
</form>

<button type="button" onclick="DisplayCrc()">Calculate CRC</button><br />
<button type="button" onclick="ClearString()">Clear String</button><br />

</body>
</html>
Srecord Checksum
<!DOCTYPE html PUBLIC "-//IETF//DTD HTML 2.0//EN">
<html>
<head>
<script type="text/javascript">

function DisplayChecksum()
{	
	var str = document.getElementById("inputString").value;
	str = trim(str);
	// replace any non hexadecimal characters (excluding the leading S) with empty character ''
	str = str.replace(/[^0123456789ABCDEFS]/gi,'');
	if ((str.length%2) != 0)
	{
		alert("S record is not an even number of characters");
		ClearChecksum()
		return;
	}
	var bytes = new Array();
	for (i = 0; i < str.length/2; i++)
	{
		bytes[i] = str.substr(2*i,2);
	}
	if (bytes[0].substr(0,1) != "S")
	{
		alert("S record does not begin with an S");
		ClearChecksum()
		return;
	}	
	
	// check that length of each element is 2 characters (for a byte)
	for (i = 0; i < bytes.length; i++)
	{
		if (bytes[i].length != 2)
		{
			alert("element " + i + " = " + bytes[i] + " needs length 2");
		}
		// convert each 2 character string to hexadecimal integer
		bytes[i] = parseInt(bytes[i],16)
	}
	var checksum = CalculateChecksum(bytes);
	document.getElementById("checksum").value = checksum.toString(16);
}

// remove multiple, leading or trailing spaces
function trim(s) {
	s = s.replace(/(^\s*)|(\s*$)/gi,"");
	s = s.replace(/[ ]{2,}/gi," ");
	s = s.replace(/\n /,"\n");
	return s;
}

// Calculates the S record checksum based on the passed in bytes
function CalculateChecksum(bytes)
{
	var checksum = 0 ;
	for (i = 1; i < bytes.length; i++)
	{
		checksum = checksum + bytes[i];
	}
	checksum = checksum & 0xff;
	checksum = (~checksum) & 0xff;
	return checksum;
}

function ClearString()
{
	document.getElementById("getString").reset();
}

function ClearChecksum()
{
	document.getElementById("checksum").value = "";
}

</script>
</head>

<body>
<p>
This function computes the 8 bit S record checksum (in hex format) for the input string.
</p>

<form id = "getString">
Input S record<br />
<input type="text" id="inputString" maxLength=375 size=125/><br />
Computed Checksum<br />
<input type="text" id="checksum"/>
</form>

<button type="button" onclick="DisplayChecksum()">Calculate Checksum</button><br />
<button type="button" onclick="ClearString()">Clear String</button><br />

</body>
</html>