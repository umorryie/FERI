module legs(
    cubeX=3,
    cubeY=0.5,
    cubeZ=0.5,
    legColor="black",
    colorOpacity=1,
    legCircleRadius=1
    ){
    // Leg
        color(legColor, colorOpacity)
            cube([cubeX, cubeY, cubeZ], center=false);
        translate([cubeX,cubeY/2,0])
            color(legColor, colorOpacity)
            circle(legCircleRadius);
}