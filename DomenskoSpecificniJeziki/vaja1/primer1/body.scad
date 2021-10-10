module airplaneBody(bodyLength=30,
    airPlaneRearRadius=1.3,
    airplaneFrontRadius=4,
    centerBoolean=false,
    bodyColor="grey",
    colorOpacity=1) {
        // Airplane's body
        color(bodyColor,colorOpacity)
        cylinder(h=bodyLength,
        r2=airplaneFrontRadius,
        r1=airPlaneRearRadius,
        center=centerBoolean);

        // Ends of airplane
        color(bodyColor,colorOpacity)
            sphere(airPlaneRearRadius);
        rotate([90,-90,0])
        translate([bodyLength,0,0])
            color(bodyColor,colorOpacity)
            sphere(airplaneFrontRadius);
}
