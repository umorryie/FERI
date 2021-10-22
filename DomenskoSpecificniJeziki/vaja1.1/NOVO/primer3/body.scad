module airplaneBody(bodyLength=30,
    airplaneRadius=3,
    centerBoolean=false,
    bodyColor="white",
    colorOpacity=1) {
        // Airplane's body
        color(bodyColor,colorOpacity)
        cylinder(h=bodyLength,
        r=airplaneRadius,
        center=centerBoolean);

        // Ends of airplane
        color(bodyColor,colorOpacity)
            scale([1,1,2])
            sphere(airplaneRadius);

        // Start of airplane
        rotate([90,-90,0])
        translate([bodyLength,0,0])
            color(bodyColor,colorOpacity)
            scale([2,1,1])
            sphere(airplaneRadius);
}
