include <body.scad>
include <backSpoiler.scad>
include <wing.scad>
include <wingCircle.scad>
include <legs.scad>

$fn=100;

// Body
rotate([90,0,0])
    airplaneBody();
    
// Wings
rotate([90, 0, 0])
    wings();

// Wing circles
rotate([90,0,0])
    wingCircle(
    translateX=-26);
rotate([90,0,0])
    wingCircle(translateX=-8);
rotate([90,0,0])
    wingCircle();
rotate([90,0,0])
    wingCircle(translateX=8);
    
// Back spoiler
backSpoiler();

// Legs
rotate([0,90,0])
    translate([0,-27,3])
    legs(cubeX=5);
rotate([0,90,0])
    translate([0,-27,-3])
    legs(cubeX=5);
rotate([0,90,0])
    translate([0,-7,1])
    legs(cubeX=4);
rotate([0,90,0])
    translate([0,-7,-1])
    legs(cubeX=4);