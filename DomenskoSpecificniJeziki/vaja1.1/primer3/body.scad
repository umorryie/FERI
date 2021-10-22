module airplaneBody(bodyLength=30,
    airPlaneRearRadius=1.3,
    airplaneFrontRadius=4,
    centerBoolean=false,
    bodyColor="red",
    cabinColor="black",
    headLength=4,
    cubeRadius=10,
    colorOpacity=1) {
        // Airplane's body
        color(bodyColor,colorOpacity)
        cylinder(h=bodyLength,
        r2=airplaneFrontRadius,
        r1=airPlaneRearRadius,
        center=centerBoolean);
        
        translate([0,0,bodyLength])
        color(bodyColor,colorOpacity)
        cylinder(h=headLength,
        r=airplaneFrontRadius,,
        center=centerBoolean);

        // Ends of airplane
        color(bodyColor,colorOpacity)
            sphere(airPlaneRearRadius);
        rotate([90,-90,0])
        translate([bodyLength + headLength,0,0])
            color(bodyColor,colorOpacity)
            sphere(airplaneFrontRadius);
        
        // cabin 
        difference(){
            rotate([0,-90,0])
                translate([bodyLength + headLength+0.2,0,0])
                color(cabinColor,colorOpacity)
                sphere(airplaneFrontRadius);
            rotate([0,-90,0])
                translate([bodyLength + headLength+airplaneFrontRadius/2,-airplaneFrontRadius,0])
                    cube(cubeRadius, center=true);
        }
}
