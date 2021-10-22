module backSpoiler(
    planeLength=30,
    wingsLength=9,
    wingsHeight=3,
    wingsDepth=1,
    spoilerColor="white",
    frontVsRearWingLengthRatio=1.5,
    colorOpacity=1,
    sphereRadius=1,
    tilt=30) {
        translate([0,3, 3])
            rotate([0,-tilt,90])
            color(spoilerColor, colorOpacity)
            scale([4, wingsDepth, 2])
            sphere(sphereRadius);
}
