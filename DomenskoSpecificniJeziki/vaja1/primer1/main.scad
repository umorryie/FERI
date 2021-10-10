include <body.scad>
include <backSpoiler.scad>
include <cabin.scad>
include <propeller.scad>
include <wing.scad>

// Smooth facets
// Robovi krogel, valjev zglajeni
$fn=100;

airplaneFrontRadius=4;
planeLength=30;

cabinTranslationLength=planeLength/7*4;
wingTranslationLength=planeLength/7*5;
cabinTranslation=airplaneFrontRadius/2;

// Pilots cabin
translate([cabinTranslationLength,0,cabinTranslation])
    cabin();

// Airplane's wing
translate([2,0,0]) 
    rotate([90,0,0])
    wing();
translate([wingTranslationLength,0,0])
    rotate([90,0,0])
    wing(scaleY=0.5,
        wingLength=36,
        wingRadius=1);
    
// Airplane's body
rotate([90,0,90])
    airplaneBody();

// Propeller
rotate([90,45,90])
    translate([0,0,35])
    propellerCube();
rotate([90,-45,90])
    translate([0,0,35])
    propellerCube();
rotate([90,0,90])
    propellerConnector();
translate([34,0,0])
    propellerSphere();
translate([35,0,0])
    rotate([0,90,0])
    propeller();

// Back spoiler
rotate([0,-30,0])
    translate([2,0,1])
    backSpoiler();   