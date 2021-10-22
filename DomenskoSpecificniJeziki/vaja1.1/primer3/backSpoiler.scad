module backSpoiler(
    planeLength=30,
    wingsLength=9,
    wingsHeight=3,
    wingsDepth=1,
    wingsColor="red",
    frontVsRearWingLengthRatio=1.5,
    colorOpacity=1,
    sphereRadius=1) {
        translate([0,-3, 3])
            rotate([0,-90,90])
            color(wingsColor, colorOpacity)
            scale([4, wingsDepth, 2])
            sphere(sphereRadius);
}
