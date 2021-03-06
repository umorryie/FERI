module cabin(bodyLength=30,
    airplaneRadius=3,
    centerBoolean=false,
    cabinColor="blue",
    colorOpacity=1) {
        // Start of airplane
        rotate([90,-90,0])
        translate([bodyLength*1.005,0,0])
            color(cabinColor,colorOpacity)
            scale([2,1,0.4])
            sphere(airplaneRadius);
}
