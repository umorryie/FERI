include <body.scad>
include <backSpoiler.scad>
include <wing.scad>
include <wingCircle.scad>

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
