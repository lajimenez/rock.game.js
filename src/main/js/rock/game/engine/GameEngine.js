rock.namespace('rock.game.engine');

/**
 * Most important game class. This class is responsible to handle key/mouse events, run game logic and draw the game.
 *
 * @param {rock.game.graphics.engine.RenderEngine} renderEngine
 *
 * @param {rock.game.engine.RepresentationAttendant} representationAttendant
 *
 * @constructor
 * @abstract
 *
 * @author Luis Alberto Jiménez
 */
rock.game.engine.GameEngine = function (renderEngine, representationAttendant) {
    this.window = null;
    this.renderEngine = renderEngine;
    this.representationAttendant = representationAttendant;

    this.lighting = null;
    this.camera = null;
    this.world = null;
};

/**
 * Create a representation for a world object
 *
 * @param {rock.game.universe.Object} object
 *
 * @return {rock.game.graphics.scene.Representation}
 */
rock.game.engine.GameEngine.prototype.createRepresentation = function (object) {
    return this.representationAttendant.createRepresentation(object);
};

rock.game.engine.GameEngine.prototype.addListeners = function () {
    this.window.addEventListener(rock.constants.ROCK_EVENT_MOUSE_DOWN,
        rock.createEventHandler(this, this.onMouseDown));

    this.window.addEventListener(rock.constants.ROCK_EVENT_MOUSE_UP,
        rock.createEventHandler(this, this.onMouseUp));

    this.window.addEventListener(rock.constants.ROCK_EVENT_CLICK,
        rock.createEventHandler(this, this.onClick));

    this.window.addEventListener(rock.constants.ROCK_EVENT_DBLCLICK,
        rock.createEventHandler(this, this.onDlbClick));

    this.window.addEventListener(rock.constants.ROCK_EVENT_MOUSE_MOVE,
        rock.createEventHandler(this, this.onMouseMove));

    this.window.addEventListener(rock.constants.ROCK_EVENT_MOUSE_WHEEL,
        rock.createEventHandler(this, this.onMouseWheel));

    this.window.addEventListener(rock.constants.ROCK_EVENT_MOUSE_OVER,
        rock.createEventHandler(this, this.onMouseOver));

    this.window.addEventListener(rock.constants.ROCK_EVENT_MOUSE_LEAVE,
        rock.createEventHandler(this, this.onMouseLeave));

    this.window.addEventListener(rock.constants.ROCK_EVENT_KEY_DOWN,
        rock.createEventHandler(this, this.onKeyDown));

    this.window.addEventListener(rock.constants.ROCK_EVENT_KEY_UP,
        rock.createEventHandler(this, this.onKeyUp));

    this.window.addEventListener(rock.constants.ROCK_EVENT_KEY_PRESS,
        rock.createEventHandler(this, this.onKeyPress));

    this.window.addEventListener(rock.window.Window.WINDOW_ACTIVATED_EVENT,
        rock.createEventHandler(this, this.onWindowActivate));

    this.window.addEventListener(rock.window.Window.WINDOW_DEACTIVATED_EVENT,
        rock.createEventHandler(this, this.onWindowDeactivate));
};

rock.game.engine.GameEngine.prototype.onMouseDown = function () {};
rock.game.engine.GameEngine.prototype.onMouseUp = function () {};
rock.game.engine.GameEngine.prototype.onClick = function () {};
rock.game.engine.GameEngine.prototype.onDlbClick = function () {};
rock.game.engine.GameEngine.prototype.onMouseMove = function () {};
rock.game.engine.GameEngine.prototype.onMouseWheel = function () {};
rock.game.engine.GameEngine.prototype.onMouseOver = function () {};
rock.game.engine.GameEngine.prototype.onMouseLeave = function () {};
rock.game.engine.GameEngine.prototype.onKeyDown = function () {};
rock.game.engine.GameEngine.prototype.onKeyUp = function () {};
rock.game.engine.GameEngine.prototype.onKeyPress = function () {};
rock.game.engine.GameEngine.prototype.onWindowActivate = function () {};
rock.game.engine.GameEngine.prototype.onWindowDeactivate = function () {};

/**
 * Run game logic. It must return a game state object with all relevant events that have happened.
 *
 * @returns {rock.game.engine.GameState} the result of running logic
 *
 * @function
 */
rock.game.engine.GameEngine.prototype.runLogic = rock.abstract_;

/**
 * Called in the game loop.
 *
 * @return {rock.game.engine.GameState} the result of running logic
 */
rock.game.engine.GameEngine.prototype.update = function () {
    var logicExecutionResult = this.runLogic();
    this.render();
    return logicExecutionResult;
};

rock.game.engine.GameEngine.prototype.render = function () {
    var representations = this.representationAttendant.getRepresentations(this.world);
    this.renderEngine.render(this.lighting, this.camera, representations);
};

/**
 * Get the window
 */
rock.game.engine.GameEngine.prototype.getWindow = function() {
    return this.window;
};

/**
 * Set the window. All listeners will be updated to listen this window event.
 *
 * ATTENTION: currently there is no function to clear old listeners...
 *
 * @param window the value
 */
rock.game.engine.GameEngine.prototype.setWindow = function(window) {
    this.window = window;
    this.addListeners();
};

/**
 * Get the lighting
 */
rock.game.engine.GameEngine.prototype.getLighting = function() {
    return this.lighting;
};

/**
 * Set the lighting
 *
 * @param lighting the value
 */
rock.game.engine.GameEngine.prototype.setLighting = function(lighting) {
    this.lighting = lighting;
};

/**
 * Get the camera
 */
rock.game.engine.GameEngine.prototype.getCamera = function() {
    return this.camera;
};

/**
 * Set the camera
 *
 * @param camera the value
 */
rock.game.engine.GameEngine.prototype.setCamera = function(camera) {
    this.camera = camera;
};

/**
 * Get the world
 */
rock.game.engine.GameEngine.prototype.getWorld = function() {
    return this.world;
};

/**
 * Set the world
 *
 * @param world the value
 */
rock.game.engine.GameEngine.prototype.setWorld = function(world) {
    this.world = world;
};