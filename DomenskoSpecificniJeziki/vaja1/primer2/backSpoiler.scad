module backSpoiler(
    planeLength=30,
    wingsLength=9,
    wingsHeight=3,
    wingsDepth=1,
    wingsColor="white",
    frontVsRearWingLengthRatio=1.5,
    colorOpacity=1,
    sphereRadius=1) {
        translate([0,3, 3])
            rotate([0,-30,90])
            color(wingsColor, colorOpacity)
            scale([4, wingsDepth, 2])
            sphere(sphereRadius);
}
