module cabin(cabinRadius=2,
    cabinColor="black",
    colorOpacity=1,
    scaleX=2,
    scaleY=1,
    scaleZ=1) {
        color(cabinColor,colorOpacity)
        scale([scaleX, scaleY, scaleZ])
        sphere(cabinRadius);
}
