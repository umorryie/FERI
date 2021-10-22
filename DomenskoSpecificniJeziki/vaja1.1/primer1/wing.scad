
module wing(wingLength=20,
    wingRadius=0.4,
    centerBoolean=true,
    wingColor="black",
    colorOpacity=1,
    scaleX=3,
    scaleY=0.5,
    scaleZ=1) {
        color(wingColor,colorOpacity)
        scale([scaleX,scaleY,scaleZ])
        cylinder(h=wingLength,
        r=wingRadius,
        center=centerBoolean);
}
