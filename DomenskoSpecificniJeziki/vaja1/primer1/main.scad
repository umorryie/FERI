// Smooth facets
// Robovi krogel, valjev zglajeni
$fn=100;

airplaneFrontRadius=4;
planeLength=30;

cabineTranslationLength=planeLength/7*4;
wingTranslationLength=planeLength/7*5;
winLength=planeLength*1.2;
cabineTranslation=airplaneFrontRadius/2;
airPlaneRearRadius=airplaneFrontRadius/3;
colorCode="gray";
colorOpacity=1;

// Ends of airplane
color(colorCode,colorOpacity)
    sphere(airPlaneRearRadius);
translate([planeLength,0,0])
    color(colorCode,colorOpacity)
    sphere(airplaneFrontRadius);

// Pilots cabine
translate([cabineTranslationLength,0,cabineTranslation])
    color("red",colorOpacity)
    scale([2,1,1])
    sphere(2);

// Airplane's wing
translate([2,0,0]) 
    color("black",1)
    rotate([90,0,0])
    scale([3,0.5,1])
    cylinder(h=20, r=0.4,
    center=true);
translate([wingTranslationLength,0,0]) 
    color("black",colorOpacity)
    rotate([90,0,0])
    scale([3,0.5,1])
    cylinder(h=winLength, r=1,
    center=true);
    
// Airplane's body
rotate([90,0,90])
    color(colorCode,colorOpacity)
    cylinder(h=planeLength,
    r2=airplaneFrontRadius,
    r1=airPlaneRearRadius,
    center=false);
    
// Propeller
rotate([90,45,90])
    color(colorCode,colorOpacity)
    translate([0,0,35])
    cube([13, 1, 0.2],
    center=true);
rotate([90,-45,90])
    color(colorCode,colorOpacity)
    translate([0,0,35])
    cube([13, 1, 0.2],
    center=true);
rotate([90,0,90])
    color("black",0.65)
    cylinder(h=35,
    r=1,
    center=false);
translate([34,0,0])
    scale([3,1,1])
    color("grey")
    sphere(0.8);
translate([35,0,0])
    rotate([0,90,0])
    color("grey",0.6)
    cylinder(h=0.4, r=6.7);

// Back spoiler
rotate([0,-30,0])
    translate([2,0,1])
    color("black",1)
    scale([3,0.5,1])
    cylinder(h=5, r=0.45,
    center=true);    