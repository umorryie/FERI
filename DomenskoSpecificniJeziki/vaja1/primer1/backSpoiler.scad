module backSpoiler(backSpoilerHeight=5,
    backSpoilerRadius=0.45,
    centerBoolean=true,
    backSpoilerColor="black",
    colorOpacity=1,
    scaleX=3,
    scaleY=0.5,
    scaleZ=1) {
        color(backSpoilerColor,colorOpacity)
        scale([scaleX, scaleY, scaleZ])
        cylinder(h=backSpoilerHeight, r=backSpoilerRadius,
        center=centerBoolean); 
}
