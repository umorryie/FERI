
module door(desc, size, y_pos, inscriptionColor) {
        translate([0, -29,0])
        rotate([0,90,90])
		difference() {
                color("black")
                cylinder(r=3.05,h=3,center=true);
                  union(){
                translate([7,0,0])
                color("black")
                cube([10,20,20], center=true);
                translate([-7,0,0])
                color("black")
                cube([10,20,20], center=true);
                }
	}
}