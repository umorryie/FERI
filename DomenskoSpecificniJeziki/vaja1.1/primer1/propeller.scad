module propellerCube(centerBoolean=true,
    propellerCubeColor="black",
    colorOpacity=1,
    sizeX=13,
    sizeY=1,
    sizeZ=0.2) {
        color(propellerCubeColor,colorOpacity)
        cube([sizeX, sizeY, sizeZ],
        center=centerBoolean);
}

module propeller(propellerRadius=6.7,
    propellerDepth=0.4,
    propellerColor="grey",
    colorOpacity=0.6) {
        color(propellerColor, colorOpacity)
        cylinder(h=propellerDepth, r=propellerRadius);
}

module propellerSphere(propellerSphereRadius=0.8,
    propellerSphereColor="grey",
    colorOpacity=1,
    scaleX=3,
    scaleY=1,
    scaleZ=1) {
        scale([scaleX, scaleY, scaleZ])
        color(propellerSphereColor, colorOpacity)
        sphere(propellerSphereRadius);
}

module propellerConnector(centerBoolean=0.8,
    propellerConnectorColor="black",
    colorOpacity=0.65,
    scaleX=3,
    scaleY=1,
    scaleZ=1,
    propellerConnectorHeight=35,
    propellerConnectorRadius=1) {
        color(propellerConnectorColor, colorOpacity)
        cylinder(h=propellerConnectorHeight,
        r=propellerConnectorRadius,
        center=centerBoolean);
}