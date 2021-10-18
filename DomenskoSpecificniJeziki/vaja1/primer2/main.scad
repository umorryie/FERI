include <body.scad>
include <backSpoiler.scad>
include <wing.scad>
include <powerSupplier.scad>
include <cabin.scad>
include <legs.scad>
include <inscription.scad>

$fn=100;

planeSize="large";
planeBodyColor="white";
planeWingColor="white";
planeCabinColor="blue";
planeEngines="three";
numberOfWings="four";
windows="A lot";
doorNumber="four";
inscription="AIRBUS";
backSpoilerTilt="small";
legs="true";
inscriptionColor="blue";

planeLength=
(planeSize=="large")
    ? 50:
(planeSize=="medium")
    ? 40:
(planeSize=="small")
    ? 30:20;

spoilerTilt=
(backSpoilerTilt=="large")
    ? 20:
(backSpoilerTilt=="medium")
    ? 40:
(backSpoilerTilt=="small")
    ? 60:30;

if(numberOfWings=="two"){
    rotate([90, 0, 0])
        wings(
        wingsColor=planeWingColor,    
        translateZ=planeLength*0.6,
        translateX=planeLength*0.23,
        wingsLength=planeLength*0.4);
} else if(numberOfWings=="four"){
    rotate([90, 0, 0])
        wings(
        wingsColor=planeWingColor,
        translateZ=planeLength*0.1);
    rotate([90, 0, 0])
        wings(
        wingsColor=planeWingColor,
        translateZ=planeLength*0.55, translateX=planeLength*0.23,
        wingsLength=planeLength*0.4); 
    // Power supplier engine
    if(planeEngines=="one"){
        rotate([0, 90, 90])
            translate([1.8 ,planeLength*0.3,-planeLength*0.6])
            powerEngine();
        rotate([0, 90, 90])
            translate([1.8 ,-planeLength*0.3,-planeLength*0.6])
            powerEngine();
    } else if(planeEngines=="two"){
        rotate([0, 90, 90])
            translate([1.8 ,8,-planeLength*0.7])
            powerEngine();
        rotate([0, 90, 90])
            translate([1.8 ,-8,-planeLength*0.7])
            powerEngine();
        rotate([0, 90, 90])
            translate([1.8 ,planeLength*0.4,-planeLength*0.45])
            powerEngine();
        rotate([0, 90, 90])
            translate([1.8 ,-planeLength*0.4,-planeLength*0.45])
            powerEngine();
    }  else if(planeEngines=="three"){
        rotate([0, 90, 90])
            translate([1.8 ,8,-planeLength*0.7])
            powerEngine();
        rotate([0, 90, 90])
            translate([1.8 ,-8,-planeLength*0.7])
            powerEngine();
        rotate([0, 90, 90])
            translate([1.8 ,planeLength*0.4,-planeLength*0.45])
            powerEngine();
        rotate([0, 90, 90])
            translate([1.8 ,-planeLength*0.4,-planeLength*0.45])
            powerEngine();
        rotate([0, 90, 90])
            translate([1.8 ,planeLength*0.15,-planeLength*0.15])
            powerEngine();
        rotate([0, 90, 90])
            translate([1.8 ,-planeLength*0.15,-planeLength*0.15])
            powerEngine();
    } 
}

// Body
rotate([90,0,0])
    airplaneBody(
    bodyColor=planeBodyColor,
    bodyLength=planeLength);

// Cabin
rotate([90, 0, 0])
    cabin(
    cabinColor=planeCabinColor,
    bodyLength=planeLength);
    
// Back spoiler
    backSpoiler(tilt=spoilerTilt);

// Legs
if(legs=="true"){
    rotate([0,90,0])
        translate([0,-planeLength*0.6,1.5])
        legs(cubeX=5);
    rotate([0,90,0])
        translate([0,-planeLength*0.6,-1.5])
        legs(cubeX=5);
    rotate([0,90,0])
        translate([0,-planeLength*0.2,1])
        legs(cubeX=4);
    rotate([0,90,0])
        translate([0,-planeLength*0.2,-1])
        legs(cubeX=4);
}
    
// Inscription
rotate([90,0,90])
description(inscription, 5, 0.7, inscriptionColor);
 
     
    