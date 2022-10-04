// now define some utility functions

// scale a 3D point
const ScalePoint = (scale, point) => 
{
	var p = {x:0, y:0, z:0};
	p.x = scale * point.x;
	p.y = scale * point.y;
	p.z = scale * point.z;
	return p;
}

// add 2 3D points
const AddPoints = (p1, p2) => 
{
	var point = {x:0, y:0, z:0};
	point.x = p1.x + p2.x;
	point.y = p1.y + p2.y;
	point.z = p1.z + p2.z;
	return point;
}

// normalise a 3D point
const NormalisePoint = (point) => 
{
	var p = {x:0, y:0, z:0};
	var r = Math.sqrt(point.x*point.x + point.y*point.y + point.z*point.z);
	if (r > 0)
	{
		p.x = point.x/r;
		p.y = point.y/r;
		p.z = point.z/r;
	}
	return p;
}

