rock.namespace('app.engine');

/**
 * Show model engine
 *
 * @param {rock.graphics.IGraphicsEngine} graphicsEngine
 *
 * @param {rock.game.Repository} repository
 *
 * @constructor
 * @extends rock.scene.engine.SceneEngine
 *
 * @author Luis Alberto Jiménez
 */
app.engine.ShowModelSceneEngine = function (graphicsEngine, repository) {
    rock.super_(this, [graphicsEngine, repository]);

    this.FOV = 60;
    this.WHEEL_ADJUSTMENT = .05;
    this.MIN_ZNEAR = 0.1;

    this.center = null;
    this.maxRange = -1;
    this.radius = -1;
    this.zNear = -1;
    this.zFar = -1;

    this.enabledMotion = false;

    this.lastMousePositionX = null;
    this.lastMousePositionY = null;
    this.variationX = 0;
    this.variationY = 90;
    this.variationWheel = 0;

    this.directionalLightingNode = null;
    this.pointLightingNode = null;
    this.spotlightLightingNode = null;
    this.cameraNode = null;
    this.modelNode = null;
    this.wireframeModelNode = null;
    this.normalsModelNode = null;
    this.bboxModelNode = null;

    this.currentLightingNode = null;
    this.currentModelNode = null;
    this.showingBBOX = false;
    this.showingNormals = false;
};

rock.extends_(app.engine.ShowModelSceneEngine, rock.scene.engine.SceneEngine);

app.engine.ShowModelSceneEngine.prototype.loadAndShowTextureModel = function (JSONModelList) {
    var repository = this.window.getApplication().getRepository();
    var model = rock.game.graphics.model.JSONModelUtils.createTextureModelGroup(JSONModelList, repository);
    this.initScene(model, JSONModelList);
};

app.engine.ShowModelSceneEngine.prototype.loadAndShowMaterialModel = function (JSONModelList) {
    var model = rock.game.graphics.model.JSONModelUtils.createPhongModelGroup(JSONModelList);
    this.initScene(model, JSONModelList);
};

app.engine.ShowModelSceneEngine.prototype.loadAndShowMaterialTextureModel = function (JSONModelList) {
    var repository = this.window.getApplication().getRepository();
    var model = rock.game.graphics.model.JSONModelUtils.createPhongTextureModelGroup(JSONModelList, repository);
    this.initScene(model, JSONModelList);
};

/**
 *
 * @private
 */
app.engine.ShowModelSceneEngine.prototype.initScene = function (model, JSONModelList) {
    var scene = this.world;
    this.modelNode = scene.createModelNode(model);

    var wireframeModel = rock.game.graphics.model.JSONModelUtils.createWireframeModelGroup(JSONModelList);
    this.wireframeModelNode = scene.createModelNode(wireframeModel);

    var normalsModel = rock.game.graphics.model.JSONModelUtils.createWireframeNormalsModelGroup(JSONModelList);
    this.changeColorToGroupModelColor(normalsModel, new rock.graphics.Color(0, 255, 0));
    this.normalsModelNode = scene.createModelNode(normalsModel);

    var bboxModel = rock.game.graphics.model.JSONModelUtils.createWireframeBBOXColorModel(model.getBBOX());
    bboxModel.getMaterial().setColor(new rock.graphics.Color(0, 0, 255));
    this.bboxModelNode = scene.createModelNode(bboxModel);

    var initialModelNode = this.modelNode;
    scene.addModelNode(initialModelNode);
    this.currentModelNode = initialModelNode;

    // Create and init camera
    this.initCameraValues();

    var camera = this.createCamera();
    var cameraNode = scene.createCameraNode(camera);
    scene.setCameraNode(cameraNode);
    this.cameraNode = cameraNode;

    this.updateCamera();

    // Create Lights
    var directionalLighting = this.createDirectionalLighting();
    this.directionalLightingNode = scene.createLightingNode(directionalLighting);

    var pointLighting = this.createPointLight();
    this.pointLightingNode = scene.createLightingNode(pointLighting);

    var spotlightLighting = this.createSpotLight();
    this.spotlightLightingNode = scene.createLightingNode(spotlightLighting);

    var initialLightingNode = this.directionalLightingNode;
    scene.setLightingNode(initialLightingNode);
    this.currentLightingNode = initialLightingNode;
};

/**
 *
 * @private
 */
app.engine.ShowModelSceneEngine.prototype.changeColorToGroupModelColor = function(groupColorModel, color) {
    var colorModels = groupColorModel.getModels();
    var i, colorModel, colorMaterial;
    for (i = 0; i < colorModels.length; i++) {
        colorModel = colorModels[i];
        colorMaterial = colorModel.getMaterial();
        colorMaterial.setColor(color);
    }
};

/**
 *
 * @private
 */
app.engine.ShowModelSceneEngine.prototype.createDirectionalLighting = function () {
    var directionalLight = new rock.game.graphics.lighting.DirectionalLight();
    directionalLight.setPosition(0, 0, 1); // (1, 1, 1)
    directionalLight.setAmbient(255, 255, 255);
    directionalLight.setDiffuse(255, 255, 255);
    directionalLight.setSpecular(255, 255, 255);

    var directionalLighting = new rock.game.graphics.scene.DirectionalLighting();
    directionalLighting.addLight(directionalLight);
    return directionalLighting;
};

app.engine.ShowModelSceneEngine.prototype.createPointLight = function () {
    var pointLight = new rock.game.graphics.lighting.PointLight();
    pointLight.setPosition(0, 0, 0);
    pointLight.setAmbient(255, 255, 255);
    pointLight.setDiffuse(255, 255, 255);
    pointLight.setSpecular(255, 255, 255);

    pointLight.setConstantAttenuation(1);
    pointLight.setLinearAttenuation(0); // 0.001
    pointLight.setExponentialAttenuation(0); // 0.0001

    var pointLighting = new rock.game.graphics.scene.PointLighting();
    pointLighting.addLight(pointLight);
    return pointLighting;
};

app.engine.ShowModelSceneEngine.prototype.createSpotLight = function () {
    var spotlightLight = new rock.game.graphics.lighting.SpotlightLight();
    spotlightLight.setPosition(0, 0, 0);
    spotlightLight.setAmbient(255, 255, 255);
    spotlightLight.setDiffuse(255, 255, 255);
    spotlightLight.setSpecular(255, 255, 255);

    spotlightLight.setConstantAttenuation(1);
    spotlightLight.setLinearAttenuation(0); // 0.001
    spotlightLight.setExponentialAttenuation(0); // 0.0001

    spotlightLight.setConeAngle(12);
    spotlightLight.setConeDirection(0, 0, -1);

    var spotlightLighting = new rock.game.graphics.scene.SpotlightLighting();
    spotlightLighting.addLight(spotlightLight);
    return spotlightLighting;
};

app.engine.ShowModelSceneEngine.prototype.createCamera = function () {
    var aspectRatio = this.window.getWindowSystem().getAspectRatio();
    return new rock.game.graphics.scene.Camera(
        new rock.geometry.Point3(0, 0, this.radius),
        this.center,
        new rock.geometry.Vector3(0, 1, 0), this.FOV, aspectRatio, this.zNear, this.zFar);
};

/**
 *
 * @private
 */
app.engine.ShowModelSceneEngine.prototype.getMinimalCameraFov = function () {
    var windowSystem = this.window.getWindowSystem();
    var width = windowSystem.getWidth();
    var height = windowSystem.getHeight();
    var fov = this.FOV;

    var distance = (height / 2 ) / Math.tan(rock.util.GeometryUtils.degToRad(fov / 2));

    var horizontalFov = 2 * rock.util.GeometryUtils.radToDeg(Math.atan((width / 2 ) / distance));

    if (fov < horizontalFov) {
        return fov;
    } else {
        return horizontalFov;
    }
};

/**
 * Supposing an object with center in origin (0, 0, 0), the initial camera position must be in the -z axis
 * looking at (0, 0, 0) and the up vector (0, 1, 0)
 *
 * @private
 */
app.engine.ShowModelSceneEngine.prototype.initCameraValues = function () {
    var model = this.modelNode.getRepresentation().getModel();
    this.center = model.getCenter();

    var BBOX = model.getBBOX();
    var diagonal = new rock.geometry.Vector3(BBOX.getXMax() - BBOX.getXMin(),
        BBOX.getYMax() - BBOX.getYMin(),
        BBOX.getZMax() - BBOX.getZMin());
    var maxRange = diagonal.module();

    var cameraAngle = this.getMinimalCameraFov();

    var midMaxRange = maxRange / 2;

    this.radius = midMaxRange / Math.tan(rock.util.GeometryUtils.degToRad(cameraAngle / 2));
    this.maxRange = maxRange;
};

/**
 *
 * @private
 */
app.engine.ShowModelSceneEngine.prototype.updateCamera = function () {
    var camera = this.cameraNode.getCamera();
    var radius = this.radius;
    var variationX = this.variationX;
    var variationY = this.variationY;
    var maxRange = this.maxRange;
    var lookAt = camera.getLookAt();
    var position = camera.getPosition();

    radius = radius + this.variationWheel;

    // Update position
    var phi = rock.util.GeometryUtils.degToRad(variationX);
    var theta = rock.util.GeometryUtils.degToRad(variationY);

    var xRot = radius * Math.sin(theta) * Math.sin(phi);
    var yRot = radius * Math.cos(theta);
    var zRot = radius * Math.sin(theta) * Math.cos(phi);

    position.setX(lookAt.getX() - xRot);
    position.setY(lookAt.getY() - yRot);
    position.setZ(lookAt.getZ() + zRot);

    // Update zNear & zFar
    var zNearFarMargin = maxRange / 2;
    var zNear = radius - zNearFarMargin;
    if (zNear < this.MIN_ZNEAR) {
        zNear = this.MIN_ZNEAR;
    }
    this.zNear = zNear;
    this.zFar = radius + zNearFarMargin;

    camera.setZNear(this.zNear);
    camera.setZFar(this.zFar);

};

app.engine.ShowModelSceneEngine.prototype.enableMotion = function (enable) {
    this.enabledMotion = enable;
};

app.engine.ShowModelSceneEngine.prototype.calculateVariation = function (mousePositionX, mousePositionY,
                                                                    lastMousePositionX, lastMousePositionY) {
    var ADJUSTMENT = 0.6;
    var currentVariationX = mousePositionX - lastMousePositionX;
    var currentVariationY = mousePositionY - lastMousePositionY;

    var variationX =  this.variationX + (currentVariationX * ADJUSTMENT);
    if (variationX > 360) {
        variationX = variationX % 360;
    } else if (variationX < 0) {
        variationX = variationX + 360;
    }

    var variationY =  this.variationY + (currentVariationY * ADJUSTMENT);
    if (variationY > 179 ) {
        variationY = 179;
    } else if (variationY < 1) {
        variationY = 1;
    }

    this.variationX = variationX;
    this.variationY = variationY;
};

app.engine.ShowModelSceneEngine.prototype.flipModel = function () {
    var scene = this.world;

    var currentModel = this.currentModelNode;
    scene.removeModelNode(currentModel);

    var newModel = null;
    var model = this.modelNode;
    var wireframeModel = this.wireframeModelNode;

    if (currentModel == model) {
        newModel = wireframeModel;
    } else {
        newModel = model;
    }

    scene.addModelNode(newModel);
    this.currentModelNode = newModel;
    this.drawModel();
};

app.engine.ShowModelSceneEngine.prototype.flipLighting = function () {
    var scene = this.world;
    var currentLightingNode = this.currentLightingNode;
    var directionalLightingNode = this.directionalLightingNode;
    var pointLightingNode = this.pointLightingNode;
    var spotlightLightingNode = this.spotlightLightingNode;

    var newLightingNode = null;
    if (currentLightingNode == directionalLightingNode) {
        newLightingNode = pointLightingNode;
    } else if (currentLightingNode == pointLightingNode){
        newLightingNode = spotlightLightingNode;
    } else {
        newLightingNode = directionalLightingNode;
    }

    scene.setLightingNode(newLightingNode);
    this.currentLightingNode = newLightingNode;
    this.drawModel();
};

app.engine.ShowModelSceneEngine.prototype.showBBOX = function () {
    var scene = this.world;
    var bboxModelNode = this.bboxModelNode;
    if (this.showingBBOX) {
        scene.removeModelNode(bboxModelNode);
    } else {
        scene.addModelNode(bboxModelNode);
    }

    this.showingBBOX = !this.showingBBOX;
    this.drawModel();
};

app.engine.ShowModelSceneEngine.prototype.showNormals = function () {
    var scene = this.world;
    var normalsModelNode = this.normalsModelNode;
    if (this.showingNormals) {
        scene.removeModelNode(normalsModelNode);
    } else {
        scene.addModelNode(normalsModelNode);
    }

    this.showingNormals = !this.showingNormals;
    this.drawModel();
};

app.engine.ShowModelSceneEngine.prototype.flipFreezeLighting = function () {
    var directionalLighting = this.directionalLightingNode.getLighting();
    var pointLighting = this.pointLightingNode.getLighting();
    var spotlightLighting = this.spotlightLightingNode.getLighting();

    this.flipFreezeLightingForLightArrayLighting(directionalLighting);
    this.flipFreezeLightingForLightArrayLighting(pointLighting);
    this.flipFreezeLightingForLightArrayLighting(spotlightLighting);

    this.drawModel();
};

app.engine.ShowModelSceneEngine.prototype.flipFreezeLightingForLightArrayLighting = function (lightArrayLighting) {
    var center = this.center;
    var radius = this.radius;
    var lightsCount = lightArrayLighting.getLightsCount();
    var i, light, newIsPositionInCameraSpace, isPositionAVector;
    for (i = 0; i < lightsCount; i++) {
        light = lightArrayLighting.getLight(i);
        isPositionAVector = light.getIsPositionAVector();
        newIsPositionInCameraSpace = !light.getIsPositionInCameraSpace();
        light.setIsPositionInCameraSpace(newIsPositionInCameraSpace);
        if (!isPositionAVector) {
            if (newIsPositionInCameraSpace) {
                light.setPosition(0, 0, 0);
            } else {
                light.setPosition(center.getX(), center.getY(), center.getZ() + radius);
            }
        }
    }
};

app.engine.ShowModelSceneEngine.prototype.drawModel = function () {
    this.updateCamera();
    this.window.redraw();
};


app.engine.ShowModelSceneEngine.prototype.onMouseDown = function (event) {
    if (event.getButton() === rock.constants.ROCK_EVENT_MOUSE_BUTTON_WHEEL) {
        this.enableMotion(true);
    }
};

app.engine.ShowModelSceneEngine.prototype.onMouseUp = function (event) {
    if (event.getButton() === rock.constants.ROCK_EVENT_MOUSE_BUTTON_WHEEL) {
        this.enableMotion(false)
    }
};

app.engine.ShowModelSceneEngine.prototype.onMouseWheel = function (event) {
    // It will be nice that the variation was progressive (bigger variation when radius is greater...)
    // The effect will be better...
    var radius = this.radius;
    var midMaxRange = this.maxRange / 2;

    var currentVariationWheel = radius * this.WHEEL_ADJUSTMENT;
    var wheelDelta = -event.getDelta();
    if ( wheelDelta > 0) {
        this.variationWheel += currentVariationWheel;
    } else {
        if (radius + this.variationWheel + currentVariationWheel > midMaxRange) {
            this.variationWheel -= currentVariationWheel;
        }
    }

    this.drawModel();
};

app.engine.ShowModelSceneEngine.prototype.onMouseMove = function (event) {
    var mousePositionX = event.x;
    var mousePositionY = event.y;
    if (this.lastMousePositionX == null) {
        this.lastMousePositionX = mousePositionX;
        this.lastMousePositionY = mousePositionY;
    }

    if (this.enabledMotion) {
        this.calculateVariation(mousePositionX, mousePositionY, this.lastMousePositionX, this.lastMousePositionY);
        this.drawModel();
    }

    this.lastMousePositionX = mousePositionX;
    this.lastMousePositionY = mousePositionY;
};

app.engine.ShowModelSceneEngine.prototype.onMouseLeave = function (event) {
    this.enableMotion(false)
};

app.engine.ShowModelSceneEngine.prototype.onKeyUp = function (event) {
    var keyCode = event.getKey();

    if (keyCode == 87) {
        this.flipModel();
    } else if (keyCode == 76) {
        this.flipLighting();
    } else if (keyCode == 66) {
        this.showBBOX();
    } else if (keyCode == 78) {
        this.showNormals();
    } else if (keyCode == 70) {
        this.flipFreezeLighting();
    }
};