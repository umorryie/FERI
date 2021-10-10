include <body.scad>
include <backSpoiler.scad>
include <wing.scad>
include <powerSupplier.scad>
include <cabin.scad>

$fn=100;

// Body
rotate([90,0,0])
    airplaneBody();
    
// Wings
rotate([90, 0, 0])
    wings();

// Power supplier engine
rotate([0, 90, 90])
    translate([1.8 ,8,-21])
    powerEngine();
rotate([0, 90, 90])
    translate([1.8 ,-8,-21])
    powerEngine();
    
// Back spoiler
    backSpoiler();

// Cabin
rotate([90, 0, 0])
    cabin();