rock.namespace('app.engine');

/**
 * Show scene engine
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
app.engine.ShowSceneSceneEngine = function (graphicsEngine, repository) {
    rock.super_(this, [graphicsEngine, repository]);

    this.FOV = 60;
    this.ZNEAR = 1;
    this.ZFAR = 10000; // 3d units

    this.CAMERA_POSITION_Y = 15;

    this.UI_CAMERA_VARIATION = 7;

    this.cameraNode = null;
    this.skydomeModelNode = null;
    this.teapotModelNode = null;
    this.stormtrooperModelNode = null;
    this.C3POModelNode = null;
    this.R2D2ModelNode = null;
    this.DarthSidiousModelNode = null;

    this.lastMousePositionX = null;
    this.lastMousePositionY = null;

    this.enabledMotion = false;

    this.cameraAngleX = 180;
    this.cameraAngleY = 90;

    this.cameraPositionX = 0;
    this.cameraPositionY = this.CAMERA_POSITION_Y;
    this.cameraPositionZ = 50;

    this.cameraPosition =  new rock.geometry.Point3(0, 0, 0); //values will be updated before drawing...
    this.cameraLookAt =  new rock.geometry.Point3(0, 0, 0);
    this.cameraUpVector =  new rock.geometry.Point3(0, 1, 0);

    // all times are milliseconds
    this.firstTime = null;
    this.lastTime = null;
    this.currentTime = null;
    this.timeVariation = -1;

    this.TEAPOT_PERIOD = 4000; // milliseconds
    this.initialTeapotPosition = new rock.geometry.Point3(0, 12, 0);
    this.MAX_DISPLACEMENT = 30;// 3d units

    this.VELOCITY = 0.1; // 3d units / milliseconds (WTF!!!)
    this.isMovingForward = false;
    this.isMovingBackward = false;
    this.isMovingLeft = false;
    this.isMovingRight = false;

    this.MAX_Y = 50;
    this.GROUND_BARRIER_SIZE = 550;

    this.collisionDetector = null;

    // To avoid memory allocations
    this.cross1_ma = new rock.geometry.Vector3(0, 0, 0);
    this.cross2_ma = new rock.geometry.Vector3(0, 1, 0);
    this.crossResult_ma = new rock.geometry.Vector3(0, 0, 0);

    this.expectedCameraPosition_ma = new rock.geometry.Point3(0, this.CAMERA_POSITION_Y, 0);

    this.prepareExternalUI();
};

rock.extends_(app.engine.ShowSceneSceneEngine, rock.scene.engine.SceneEngine);

app.engine.ShowSceneSceneEngine.prototype.loadScene = function () {
    var scene = this.world;
    scene.setBackgroundColor(new rock.graphics.Color(165, 208, 231));

    this.createLighting();
    this.createCamera();
    this.createWorldObjects();

    this.initPhysics();
};

app.engine.ShowSceneSceneEngine.prototype.createLighting = function () {
    var scene = this.world;
    var directionalLight = new rock.game.graphics.lighting.DirectionalLight();
    directionalLight.setPosition(1, 1, 1);
    directionalLight.setAmbient(255, 255, 255);
    directionalLight.setDiffuse(255, 255, 255);
    directionalLight.setSpecular(255, 255, 255);
    directionalLight.setIsPositionInCameraSpace(false);

    var directionalLighting = new rock.game.graphics.scene.DirectionalLighting();
    directionalLighting.addLight(directionalLight);
    var lightingNode = scene.createLightingNode(directionalLighting);
    scene.setLightingNode(lightingNode);
};

app.engine.ShowSceneSceneEngine.prototype.createCamera = function () {
    var scene = this.world;
    var aspectRatio = this.window.getWindowSystem().getAspectRatio();
    var camera = new rock.game.graphics.scene.Camera(
        this.cameraPosition,
        this.cameraLookAt,
        this.cameraUpVector, this.FOV, aspectRatio, this.ZNEAR, this.ZFAR);

    var cameraNode = scene.createCameraNode(camera);
    scene.setCameraNode(cameraNode);
    this.cameraNode = cameraNode;
};

app.engine.ShowSceneSceneEngine.prototype.createWorldObjects = function () {
    var scene = this.world;
    var application = this.window.getApplication();
    var repository =  application.getRepository();

    var groundRawModel = repository.getJSONModel(app.constants.RES_ID_MODEL_GROUND);
    var groundModel = rock.game.graphics.model.JSONModelUtils.createPhongModelGroup(groundRawModel);
    var groundModelNode = scene.createModelNode(groundModel);
    scene.addModelNode(groundModelNode);

    var skydomeRawModel = application.getRepository().getJSONModel(app.constants.RES_ID_MODEL_SKYDOME);
    var skydomeModel = rock.game.graphics.model.JSONModelUtils.createTextureModelGroup(skydomeRawModel, repository);
    var skydomeModelNode = scene.createModelNode(skydomeModel);
    scene.addModelNode(skydomeModelNode);
    this.skydomeModelNode = skydomeModelNode;

    var teapotRawModel = application.getRepository().getJSONModel(app.constants.RES_ID_MODEL_TEAPOT);
    var teapotModel = rock.game.graphics.model.JSONModelUtils.createPhongModelGroup(teapotRawModel);
    var teapotModelNode = scene.createModelNode(teapotModel);
    var initialTeapotPosition = this.initialTeapotPosition;
    teapotModelNode.setPosition(new rock.geometry.Point3(initialTeapotPosition.getX(),
        initialTeapotPosition.getY(), initialTeapotPosition.getZ()));
    scene.addModelNode(teapotModelNode);
    this.teapotModelNode = teapotModelNode;

    var teapotTitleRawModel = application.getRepository().getJSONModel(app.constants.RES_ID_MODEL_TEAPOT_TITLE);
    var teapotTitleModel = rock.game.graphics.model.JSONModelUtils.createTextureModelGroup(teapotTitleRawModel, repository);
    var teapotTitleModelNode = scene.createModelNode(teapotTitleModel);
    teapotTitleModelNode.setScaleX(10);
    teapotTitleModelNode.setScaleY(10);
    teapotTitleModelNode.setScaleZ(10);
    teapotTitleModelNode.setTranslation(-50, 45, -100);
    scene.addModelNode(teapotTitleModelNode);

    var starwarsTitleRawModel = application.getRepository().getJSONModel(app.constants.RES_ID_MODEL_STARWARS_TITLE);
    var starwarsTitleModel = rock.game.graphics.model.JSONModelUtils.createTextureModelGroup(starwarsTitleRawModel, repository);
    var starwarsTitleModelNode = scene.createModelNode(starwarsTitleModel);
    starwarsTitleModelNode.setApplyAffineTransformationsFromModelCenter(true);
    starwarsTitleModelNode.setRotationY(65);
    starwarsTitleModelNode.setScaleX(5);
    starwarsTitleModelNode.setScaleY(5);
    starwarsTitleModelNode.setScaleZ(5);
    starwarsTitleModelNode.setTranslation(-390, 30, -290);
    scene.addModelNode(starwarsTitleModelNode);

    var DarthSidiousModelNode = this.createStarWarsModel(app.constants.RES_ID_MODEL_DARTHSIDIOUS);
    DarthSidiousModelNode.setTranslation(-330, 0, -290);
    DarthSidiousModelNode.setRotationY(0);
    scene.addModelNode(DarthSidiousModelNode);
    this.DarthSidiousModelNode = DarthSidiousModelNode;

    var stormtrooperModelNode = this.createStarWarsModel(app.constants.RES_ID_MODEL_STORMTROOPER);
    stormtrooperModelNode.setTranslation(-350, 0, -280);
    stormtrooperModelNode.setRotationY(45);
    scene.addModelNode(stormtrooperModelNode);
    this.stormtrooperModelNode = stormtrooperModelNode;

    var R2D2ModelNode = this.createStarWarsModel(app.constants.RES_ID_MODEL_R2D2);
    R2D2ModelNode.setTranslation(-360, 0, -260);
    R2D2ModelNode.setRotationY(70);
    scene.addModelNode(R2D2ModelNode);
    this.R2D2ModelNode = R2D2ModelNode;

    var C3POModelNode = this.createStarWarsModel(app.constants.RES_ID_MODEL_C3PO);
    C3POModelNode.setTranslation(-360, 0, -240);
    C3POModelNode.setRotationY(105);
    scene.addModelNode(C3POModelNode);
    this.C3POModelNode = C3POModelNode;

};

app.engine.ShowSceneSceneEngine.prototype.createStarWarsModel = function (idModelResource) {
    var scene = this.world;
    var application = this.window.getApplication();
    var repository =  application.getRepository();
    var rawModel = application.getRepository().getJSONModel(idModelResource);
    var model = rock.game.graphics.model.JSONModelUtils.createPhongTextureModelGroup(rawModel, repository);
    var modelNode = scene.createModelNode(model);
    var SCALE = 5;
    modelNode.setScaleX(SCALE);
    modelNode.setScaleY(SCALE);
    modelNode.setScaleZ(SCALE);
    return modelNode;
};

app.engine.ShowSceneSceneEngine.prototype.initPhysics = function () {
    var collisionDetector = new rock.game.physics.CollisionDetector();

    // Add barriers
    var MAX_Y = this.MAX_Y;
    var teapotBarrier = this.createBarrier(this.teapotModelNode);
    collisionDetector.addBarrier(teapotBarrier);

    var DarthSidiousModelNode = this.createBarrier(this.DarthSidiousModelNode);
    collisionDetector.addBarrier(DarthSidiousModelNode);

    var stormtrooperBarrier = this.createBarrier(this.stormtrooperModelNode);
    collisionDetector.addBarrier(stormtrooperBarrier);

    var R2D2ModelNode = this.createBarrier(this.R2D2ModelNode);
    collisionDetector.addBarrier(R2D2ModelNode);

    var C3POModelNode = this.createBarrier(this.C3POModelNode);
    collisionDetector.addBarrier(C3POModelNode);

    // Valley borders
    var GROUND_BARRIER_SIZE = this.GROUND_BARRIER_SIZE;
    var northGroundBarrierBBOX = new rock.geometry.BBOX(-GROUND_BARRIER_SIZE, GROUND_BARRIER_SIZE,
        0, MAX_Y, -2 * GROUND_BARRIER_SIZE, -GROUND_BARRIER_SIZE);
    var northGroundBarrier = new rock.game.physics.BBOXBarrier(northGroundBarrierBBOX);
    collisionDetector.addBarrier(northGroundBarrier);

    var southGroundBarrierBBOX = new rock.geometry.BBOX(-GROUND_BARRIER_SIZE, GROUND_BARRIER_SIZE,
        0, MAX_Y, GROUND_BARRIER_SIZE, 2 * GROUND_BARRIER_SIZE);
    var southGroundBarrier = new rock.game.physics.BBOXBarrier(southGroundBarrierBBOX);
    collisionDetector.addBarrier(southGroundBarrier);

    var westGroundBarrierBBOX = new rock.geometry.BBOX(-2 * GROUND_BARRIER_SIZE, -GROUND_BARRIER_SIZE,
        0, MAX_Y, -2 * GROUND_BARRIER_SIZE, 2 * GROUND_BARRIER_SIZE);
    var westGroundBarrier = new rock.game.physics.BBOXBarrier(westGroundBarrierBBOX);
    collisionDetector.addBarrier(westGroundBarrier);

    var eastGroundBarrierBBOX = new rock.geometry.BBOX(GROUND_BARRIER_SIZE, 2 * GROUND_BARRIER_SIZE,
        0, MAX_Y, -2 * GROUND_BARRIER_SIZE, 2 * GROUND_BARRIER_SIZE);
    var eastGroundBarrier = new rock.game.physics.BBOXBarrier(eastGroundBarrierBBOX);
    collisionDetector.addBarrier(eastGroundBarrier);

    this.collisionDetector = collisionDetector;
};

app.engine.ShowSceneSceneEngine.prototype.createBarrier = function (node) {
    var barrierBBOX = node.getBBOX();
    var MARGIN = 5;
    barrierBBOX = new rock.geometry.BBOX(
        barrierBBOX.getXMin() - MARGIN, barrierBBOX.getXMax() + MARGIN,
        barrierBBOX.getYMin() - MARGIN, barrierBBOX.getYMax() + MARGIN,
        barrierBBOX.getZMin() - MARGIN, barrierBBOX.getZMax() + MARGIN
    );
    return new rock.game.physics.BBOXBarrier(barrierBBOX);
};

app.engine.ShowSceneSceneEngine.prototype.runLogic = function () {
    this.updateTime();
    this.updateWorld();

    return rock.super_method(this, app.engine.ShowSceneSceneEngine, 'runLogic');
};

app.engine.ShowSceneSceneEngine.prototype.updateTime = function () {
    // Update the lastTime. The value will be the old currentTime
    this.lastTime = this.currentTime;

    var currentTime = new Date().getTime();
    if (this.lastTime == null) {
        this.lastTime = currentTime;
        this.firstTime = currentTime;
    }

    this.timeVariation = currentTime - this.lastTime;
    this.currentTime = currentTime;
};

app.engine.ShowSceneSceneEngine.prototype.updateWorld = function () {
    this.computeCameraMovement();
    this.updateCamera();
    this.updateSkydome();
    this.updateTeapot();
};

app.engine.ShowSceneSceneEngine.prototype.computeCameraMovement = function () {
    if (this.isMovingForward) {
        // forward
        this.moveForward();
    }

    if (this.isMovingBackward) {
        // backward
        this.moveBackward();
    }

    if (this.isMovingLeft) {
        // left
        this.moveLeft();
    }

    if (this.isMovingRight) {
        // right
        this.moveRight();
    }
};

app.engine.ShowSceneSceneEngine.prototype.updateCamera = function () {
    this.adjustCameraAngle();

    var camera = this.cameraNode.getCamera();
    var cameraAngleX = this.cameraAngleX;
    var cameraAngleY = this.cameraAngleY;
    var position = camera.getPosition();
    var lookAt = camera.getLookAt();

    // Update position
    position.setX(this.cameraPositionX);
    position.setY(this.cameraPositionY);
    position.setZ(this.cameraPositionZ);

    // Update lookAt
    var phi = rock.util.GeometryUtils.degToRad(cameraAngleX);
    var theta = rock.util.GeometryUtils.degToRad(cameraAngleY);

    var xRot = Math.sin(theta) * Math.sin(phi);
    var yRot = Math.cos(theta);
    var zRot = Math.sin(theta) * Math.cos(phi);

    lookAt.setX(position.getX() - xRot);
    lookAt.setY(position.getY() + yRot);
    lookAt.setZ(position.getZ() + zRot);
};

app.engine.ShowSceneSceneEngine.prototype.adjustCameraAngle = function () {
    var cameraAngleX = this.cameraAngleX;
    var cameraAngleY = this.cameraAngleY;

    if (cameraAngleX > 360) {
        cameraAngleX = cameraAngleX % 360;
    } else if (cameraAngleX < 0) {
        while (cameraAngleX < 0) {
            cameraAngleX = cameraAngleX + 360;
        }
    }

    if (cameraAngleY > 179 ) {
        cameraAngleY = 179;
    } else if (cameraAngleY < 1) {
        cameraAngleY = 1;
    }

    this.cameraAngleX = cameraAngleX;
    this.cameraAngleY = cameraAngleY;
};

app.engine.ShowSceneSceneEngine.prototype.updateSkydome = function () {
    var position = this.skydomeModelNode.getPosition();
    position.setX(this.cameraPositionX);
    position.setZ(this.cameraPositionZ);
};

app.engine.ShowSceneSceneEngine.prototype.updateTeapot = function () {
    var initialPosition = this.initialTeapotPosition;
    var teapotModelNode = this.teapotModelNode;
    var currentPosition = teapotModelNode.getPosition();
    var teapotPeriod = this.TEAPOT_PERIOD;
    var maxDisplacement = this.MAX_DISPLACEMENT;
    var variation = (this.currentTime - this.firstTime) % teapotPeriod;

    var displacement = variation * maxDisplacement / teapotPeriod;

    var halfDisplacement = maxDisplacement / 2;
    if (displacement < halfDisplacement) {
        currentPosition.setY(initialPosition.getY() + displacement);
    } else {
        displacement = displacement - halfDisplacement;
        currentPosition.setY(initialPosition.getY() + halfDisplacement  - displacement);
    }

    var rotation = variation * 360 / teapotPeriod;
    teapotModelNode.setRotationY(rotation);
};

app.engine.ShowSceneSceneEngine.prototype.onMouseMove = function (event) {
    var mousePositionX = event.x;
    var mousePositionY = event.y;
    if (this.lastMousePositionX == null) {
        this.lastMousePositionX = mousePositionX;
        this.lastMousePositionY = mousePositionY;
    }

    if (this.enabledMotion) {
        this.calculateMouseVariation(mousePositionX, mousePositionY, this.lastMousePositionX, this.lastMousePositionY);
    }

    this.lastMousePositionX = mousePositionX;
    this.lastMousePositionY = mousePositionY;
};

app.engine.ShowSceneSceneEngine.prototype.calculateMouseVariation = function (mousePositionX, mousePositionY,
                                                                              lastMousePositionX, lastMousePositionY) {
    var ADJUSTMENT = 0.2;
    var currentVariationX = mousePositionX - lastMousePositionX;
    var currentVariationY = mousePositionY - lastMousePositionY;

    this.cameraAngleX = this.cameraAngleX + (currentVariationX * ADJUSTMENT);
    this.cameraAngleY = this.cameraAngleY + (currentVariationY * ADJUSTMENT);
};

app.engine.ShowSceneSceneEngine.prototype.onKeyDown = function (event) {
    var keyCode = event.getKey();
    this.updateMovementOnKeyEvent(keyCode, true);
};

app.engine.ShowSceneSceneEngine.prototype.onKeyUp = function (event) {
    var keyCode = event.getKey();
    this.updateMovementOnKeyEvent(keyCode, false);
};

app.engine.ShowSceneSceneEngine.prototype.updateMovementOnKeyEvent = function (keyCode, isMoving) {
    if (keyCode == 87 || keyCode == 38) {
        // forward
        this.setMovingForward(isMoving);
    } if (keyCode == 83 || keyCode == 40) {
        // backward
        this.setMovingBackward(isMoving);
    } else if (keyCode == 65 || keyCode == 37) {
        // left
        this.setMovingLeft(isMoving);
    } else if (keyCode == 68 || keyCode == 39) {
        // right
        this.setMovingRight(isMoving);
    }
};

app.engine.ShowSceneSceneEngine.prototype.setMovingForward = function (isMoving) {
    this.isMovingForward = isMoving;
};

app.engine.ShowSceneSceneEngine.prototype.setMovingBackward = function (isMoving) {
    this.isMovingBackward = isMoving;
};

app.engine.ShowSceneSceneEngine.prototype.setMovingLeft = function (isMoving) {
    this.isMovingLeft = isMoving;
};

app.engine.ShowSceneSceneEngine.prototype.setMovingRight = function (isMoving) {
    this.isMovingRight = isMoving;
};

app.engine.ShowSceneSceneEngine.prototype.moveForward = function () {
    var phi = rock.util.GeometryUtils.degToRad(this.cameraAngleX);
    var x = -Math.sin(phi);
    var z = Math.cos(phi);
    this.calculateCameraPosition(x, z);
};

app.engine.ShowSceneSceneEngine.prototype.moveBackward = function () {
    var phi = rock.util.GeometryUtils.degToRad(this.cameraAngleX);
    var x = Math.sin(phi);
    var z = -Math.cos(phi);
    this.calculateCameraPosition(x, z);
};

app.engine.ShowSceneSceneEngine.prototype.moveLeft = function () {
    this.updateCrossVector();
    var cross1 = this.cross1_ma;
    var cross2 = this.cross2_ma;
    var crossResult = this.crossResult_ma;

    rock.util.GeometryUtils.crossProduct(cross2, cross1, crossResult);
    this.calculateCameraPosition(crossResult.getX(), crossResult.getZ());
};

app.engine.ShowSceneSceneEngine.prototype.moveRight = function () {
    this.updateCrossVector();
    var cross1 = this.cross1_ma;
    var cross2 = this.cross2_ma;
    var crossResult = this.crossResult_ma;

    rock.util.GeometryUtils.crossProduct(cross1, cross2, crossResult);
    this.calculateCameraPosition(crossResult.getX(), crossResult.getZ());
};

app.engine.ShowSceneSceneEngine.prototype.calculateCameraPosition = function(x, z) {
    var timeVariation = this.timeVariation;
    var velocity = this.VELOCITY;
    var distance = timeVariation * velocity;

    var expectedCameraPositionX = this.cameraPositionX + distance * x;
    var expectedCameraPositionZ = this.cameraPositionZ + distance * z;

    // This implementation is not 100% correct. I mean, this only check if the expected position is
    // valid, but what it should really check is whether the line from last camera position to expected position
    // cross some barrier or not... If not you could 'skip' some barrier
    if (this.isValidCameraPosition(expectedCameraPositionX, expectedCameraPositionZ)) {
        this.cameraPositionX = expectedCameraPositionX;
        this.cameraPositionZ = expectedCameraPositionZ;
    }
};

app.engine.ShowSceneSceneEngine.prototype.isValidCameraPosition = function (expectedCameraPositionX, expectedCameraPositionZ) {
    var expectedCameraPosition =  this.expectedCameraPosition_ma;
    expectedCameraPosition.setX(expectedCameraPositionX);
    expectedCameraPosition.setZ(expectedCameraPositionZ);
    return !this.collisionDetector.intersectWithPoint(expectedCameraPosition);
};

app.engine.ShowSceneSceneEngine.prototype.updateCrossVector = function () {
    var phi = rock.util.GeometryUtils.degToRad(this.cameraAngleX);
    var x = -Math.sin(phi);
    var z = Math.cos(phi);

    var cross1 = this.cross1_ma;
    cross1.setX(x);
    cross1.setY(0);
    cross1.setZ(z);
};

app.engine.ShowSceneSceneEngine.prototype.onMouseDown = function (event) {
    if (event.getButton() === rock.constants.ROCK_EVENT_MOUSE_BUTTON_WHEEL) {
        this.enableMotion(true);
    }
};

app.engine.ShowSceneSceneEngine.prototype.onMouseUp = function (event) {
    if (event.getButton() === rock.constants.ROCK_EVENT_MOUSE_BUTTON_WHEEL) {
        this.enableMotion(false)
    }
};

app.engine.ShowSceneSceneEngine.prototype.onMouseLeave = function (event) {
    this.enableMotion(false)
};

app.engine.ShowSceneSceneEngine.prototype.onWindowActivate = function (event) {
    this.window.start();
};

app.engine.ShowSceneSceneEngine.prototype.onWindowDeactivate = function (event) {
    this.window.stop();
};

app.engine.ShowSceneSceneEngine.prototype.enableMotion = function (enable) {
    this.enabledMotion = enable;
};

app.engine.ShowSceneSceneEngine.prototype.moveCameraLeft = function () {
    this.cameraAngleX -= this.UI_CAMERA_VARIATION;
};

app.engine.ShowSceneSceneEngine.prototype.moveCameraRight = function () {
    this.cameraAngleX += this.UI_CAMERA_VARIATION;
};

app.engine.ShowSceneSceneEngine.prototype.moveCameraUp = function () {
    this.cameraAngleY -= this.UI_CAMERA_VARIATION;
};

app.engine.ShowSceneSceneEngine.prototype.moveCameraDown = function () {
    this.cameraAngleY += this.UI_CAMERA_VARIATION;
};

app.engine.ShowSceneSceneEngine.prototype.prepareExternalUI = function () {
    this.prepareCameraAngleExternalUI();
    this.prepareCameraPositionExternalUI();
};

app.engine.ShowSceneSceneEngine.prototype.prepareCameraAngleExternalUI = function () {
    var buttonMoveCameraLeftShowScene = rock.util.DOMUtils.getElementById('buttonMoveCameraLeftShowScene');
    rock.util.DOMUtils.addEventListener(buttonMoveCameraLeftShowScene, rock.constants.HTML_DOM_EVENT_CLICK,
        rock.createEventHandler(this, this.moveCameraLeft));

    var buttonMoveCameraRightShowScene = rock.util.DOMUtils.getElementById('buttonMoveCameraRightShowScene');
    rock.util.DOMUtils.addEventListener(buttonMoveCameraRightShowScene, rock.constants.HTML_DOM_EVENT_CLICK,
        rock.createEventHandler(this, this.moveCameraRight));

    var buttonMoveCameraUpShowScene = rock.util.DOMUtils.getElementById('buttonMoveCameraUpShowScene');
    rock.util.DOMUtils.addEventListener(buttonMoveCameraUpShowScene, rock.constants.HTML_DOM_EVENT_CLICK,
        rock.createEventHandler(this, this.moveCameraUp));

    var buttonMoveCameraDownShowScene = rock.util.DOMUtils.getElementById('buttonMoveCameraDownShowScene');
    rock.util.DOMUtils.addEventListener(buttonMoveCameraDownShowScene, rock.constants.HTML_DOM_EVENT_CLICK,
        rock.createEventHandler(this, this.moveCameraDown));
};

app.engine.ShowSceneSceneEngine.prototype.onButtonMovePositionLeftShowScene = function (event, isMoving) {
    this.setMovingLeft(isMoving);
};

app.engine.ShowSceneSceneEngine.prototype.onButtonMovePositionRightShowScene = function (event, isMoving) {
    this.setMovingRight(isMoving);
};

app.engine.ShowSceneSceneEngine.prototype.onButtonMovePositionForwardShowScene = function (event, isMoving) {
    this.setMovingForward(isMoving);
};

app.engine.ShowSceneSceneEngine.prototype.onButtonMovePositionBackwardShowScene = function (event, isMoving) {
    this.setMovingBackward(isMoving);
};

app.engine.ShowSceneSceneEngine.prototype.prepareCameraPositionExternalUI = function () {
    var buttonMovePositionLeftShowScene = rock.util.DOMUtils.getElementById('buttonMovePositionLeftShowScene');
    rock.util.DOMUtils.addEventListener(buttonMovePositionLeftShowScene, rock.constants.HTML_DOM_EVENT_MOUSE_DOWN,
        rock.createEventHandler(this, this.onButtonMovePositionLeftShowScene, [true]));
    rock.util.DOMUtils.addEventListener(buttonMovePositionLeftShowScene, rock.constants.HTML_DOM_EVENT_MOUSE_UP,
        rock.createEventHandler(this, this.onButtonMovePositionLeftShowScene, [false]));
    rock.util.DOMUtils.addEventListener(buttonMovePositionLeftShowScene, rock.constants.HTML_DOM_EVENT_MOUSE_LEAVE,
        rock.createEventHandler(this, this.onButtonMovePositionLeftShowScene, [false]));

    var buttonMovePositionRightShowScene = rock.util.DOMUtils.getElementById('buttonMovePositionRightShowScene');
    rock.util.DOMUtils.addEventListener(buttonMovePositionRightShowScene, rock.constants.HTML_DOM_EVENT_MOUSE_DOWN,
        rock.createEventHandler(this, this.onButtonMovePositionRightShowScene, [true]));
    rock.util.DOMUtils.addEventListener(buttonMovePositionRightShowScene, rock.constants.HTML_DOM_EVENT_MOUSE_UP,
        rock.createEventHandler(this, this.onButtonMovePositionRightShowScene, [false]));
    rock.util.DOMUtils.addEventListener(buttonMovePositionRightShowScene, rock.constants.HTML_DOM_EVENT_MOUSE_LEAVE,
        rock.createEventHandler(this, this.onButtonMovePositionRightShowScene, [false]));

    var buttonMovePositionForwardShowScene = rock.util.DOMUtils.getElementById('buttonMovePositionForwardShowScene');
    rock.util.DOMUtils.addEventListener(buttonMovePositionForwardShowScene, rock.constants.HTML_DOM_EVENT_MOUSE_DOWN,
        rock.createEventHandler(this, this.onButtonMovePositionForwardShowScene, [true]));
    rock.util.DOMUtils.addEventListener(buttonMovePositionForwardShowScene, rock.constants.HTML_DOM_EVENT_MOUSE_UP,
        rock.createEventHandler(this, this.onButtonMovePositionForwardShowScene, [false]));
    rock.util.DOMUtils.addEventListener(buttonMovePositionForwardShowScene, rock.constants.HTML_DOM_EVENT_MOUSE_LEAVE,
        rock.createEventHandler(this, this.onButtonMovePositionForwardShowScene, [false]));

    var buttonMovePositionBackwardShowScene = rock.util.DOMUtils.getElementById('buttonMovePositionBackwardShowScene');
    rock.util.DOMUtils.addEventListener(buttonMovePositionBackwardShowScene, rock.constants.HTML_DOM_EVENT_MOUSE_DOWN,
        rock.createEventHandler(this, this.onButtonMovePositionBackwardShowScene, [true]));
    rock.util.DOMUtils.addEventListener(buttonMovePositionBackwardShowScene, rock.constants.HTML_DOM_EVENT_MOUSE_UP,
        rock.createEventHandler(this, this.onButtonMovePositionBackwardShowScene, [false]));
    rock.util.DOMUtils.addEventListener(buttonMovePositionBackwardShowScene, rock.constants.HTML_DOM_EVENT_MOUSE_LEAVE,
        rock.createEventHandler(this, this.onButtonMovePositionBackwardShowScene, [false]));
};