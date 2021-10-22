module wingCircle(
    innerRadius=2,
    outerRadius=3,
    translateX=26,
    translateY=30,
    translateZ=0,
    wingCircleColor="black",
    colorOpacity=1,
    cubeY=0.3,
    cubeZ=0.3) {
        translate([translateX, translateZ, translateY])
            color(wingCircleColor, colorOpacity)
            difference(){
                circle(outerRadius);
                circle(innerRadius);
            }
        translate([translateX-innerRadius, translateZ, translateY])
            color(wingCircleColor, colorOpacity)
            cube([innerRadius*2, cubeY, cubeZ]);
        translate([translateX, translateZ-innerRadius, translateY])
            rotate([0,0,90])
            color(wingCircleColor, colorOpacity)
            cube([innerRadius*2, cubeY, cubeZ]);
}