module textCylinder(	text=""
						,r=30
						,h=2		
						,size=10	
						,rotate=[0,0,0]
						,font=undef		
						,spacing=undef
						,language=undef
						,script=undef
						,valign=undef
						,halign="center" 
						,direction=undef,
                        textColor="red"
						) { 
	s=0.1; s2=s*2;	
	l=3;			
	tall=( rotate!=[0,0,0] || direction=="btt" || direction=="ttb" );
	_h= (	tall 			
			? (size*len(text)*l) 
			: size*l ); 
	_r=(r+h)*l;
	difference() {
		rotate([90,rotate[1],rotate[2]])
			linear_extrude(height=r+h,convexity=5)
				text(text,size,halign="center"
						,font=font
						,spacing=spacing
						,language=language
						,script=script
						,valign=valign
						,direction=direction
				);
		translate([0,0,size/2]) {
			cylinder(r=r,h=_h,center=true);
			difference() {
				cylinder(r=_r,h=_h+s,center=true);
            color(textColor,1)
				cylinder(r=r+h,h=_h+s2,center=true);
			} 
		}
	}
} 

module description(desc, size, inscriptionColor, translateX=20) {
        translate([-translateX, 0,0])
        rotate([0,90,0])
			textCylinder(desc,r=(2.01),h=1,size=size,
							,rotate=[0,-90,-60]
							,direction="ltr"
							,valign="bottom", textColor=inscriptionColor);
}