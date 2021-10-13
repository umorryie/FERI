module powerEngine(cylinderHeight=5,
    cylinderRadius=1.2,
    powerEngineColor="white",
    colorOpacity=1) {
        color(powerEngineColor, colorOpacity)
            cylinder(h=cylinderHeight, r=cylinderRadius);
        translate([0, 0, -0.1])
        color("red", colorOpacity)
            cylinder(h=cylinderHeight*0.2, r=cylinderRadius*1.1);
}