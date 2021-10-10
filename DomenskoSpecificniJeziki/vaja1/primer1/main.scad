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
    color(colorCode,colorOpacity)
    scale([2,1,1])
    sphere(2);

// Airplane's wing
translate([wingTranslationLength,0,0]) 
    color(colorCode,colorOpacity)
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
    cube([13, 1, 0.2], center=true);
rotate([90,-45,90])
    color(colorCode,colorOpacity)
    translate([0,0,35])
    cube([13, 1, 0.2], center=true);
rotate([90,0,90])
    color(colorCode,colorOpacity)
    cylinder(h=35,
    r=1,
    center=false);

