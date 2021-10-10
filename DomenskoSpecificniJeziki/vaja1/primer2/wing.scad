module wings(
    planeLength=30,
    wingsLength=9,
    wingsHeight=3,
    wingsDepth=1,
    wingsColor="white",
    frontVsRearWingLengthRatio=1.5,
    colorOpacity=1,
    sphereRadius=1) {
        // Wing 1
        translate([-4,0, planeLength*0.1])
        rotate([0,-45, 0])
            color(wingsColor, colorOpacity)
            scale([wingsLength, wingsDepth, wingsHeight])
            sphere(sphereRadius);

        // Wing 2
        translate([4,0, planeLength*0.1])
        rotate([0,45, 0])
            color(wingsColor, colorOpacity)
            scale([wingsLength, wingsDepth, wingsHeight])
            sphere(sphereRadius);


        // Wing 3
        translate([-9,0, planeLength*0.55])
        rotate([0,-45, 0])
            color(wingsColor, colorOpacity)
            scale([wingsLength*frontVsRearWingLengthRatio, wingsDepth, wingsHeight])
            sphere(sphereRadius);

        // Wing 4
        translate([+9,0, planeLength*0.55])
        rotate([0, 45, 0])
            color(wingsColor, colorOpacity)
            scale([wingsLength*frontVsRearWingLengthRatio, wingsDepth, wingsHeight])
            sphere(sphereRadius);
}
