module wings(
    planeLength=30,
    planeRadius=4,
    wingsLength=30,
    wingsHeight=3,
    wingsDepth=1,
    wingsColor="red",
    colorOpacity=1,
    sphereRadius=1) {
        // Front wings
        translate([0,planeRadius*0.7, planeLength])
        rotate([0,0, 0])
            color(wingsColor, colorOpacity)
            scale([wingsLength, wingsDepth, wingsHeight])
            sphere(sphereRadius);
        translate([0,-planeRadius*0.7, planeLength])
        rotate([0,0, 0])
            color(wingsColor, colorOpacity)
            scale([wingsLength, wingsDepth, wingsHeight])
            sphere(sphereRadius);
}
