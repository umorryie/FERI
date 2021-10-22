module wings(
    planeLength=30,
    wingsLength=9,
    wingsHeight=3,
    wingsDepth=1,
    wingsColor="white",
    frontVsRearWingLengthRatio=1.5,
    colorOpacity=1,
    sphereRadius=1,
    translateZ=0,
    translateX=4) {
        // Wing 1
        translate([-translateX,0, translateZ])
        rotate([0,-45, 0])
            color(wingsColor, colorOpacity)
            scale([wingsLength, wingsDepth, wingsHeight])
            sphere(sphereRadius);

        // Wing 2
        translate([translateX,0, translateZ])
        rotate([0,45, 0])
            color(wingsColor, colorOpacity)
            scale([wingsLength, wingsDepth, wingsHeight])
            sphere(sphereRadius);
}
