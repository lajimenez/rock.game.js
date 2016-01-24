rock.namespace('rock.game.universe');

/**
 * This class represents an object in the world. A world is composed of multiple types of object.
 * Not all objects should be drawn, but if the object is going to be drawn, it must have a
 * {@link rock.game.graphics.scene.Representation}
 *
 * @param type
 * @param world
 *
 * @constructor
 * @abstract
 *
 * @author Luis Alberto Jiménez
 */
rock.game.universe.Object = function (type, world) {
    this.type = type;
    this.world = world;
    this.position = new rock.geometry.Point3(0, 0, 0);

    /**
     * Representation of the object. It can be null if the object doesn't have representation.
     *
     * @type rock.game.graphics.scene.Representation
     */
    this.representation = null;
};

/**
 * Get the type
 */
rock.game.universe.Object.prototype.getType = function() {
    return this.type;
};

/**
 * Get the world
 */
rock.game.universe.Object.prototype.getWorld = function() {
    return this.world;
};

/**
 * Get the position
 */
rock.game.universe.Object.prototype.getPosition = function() {
    return this.position;
};

/**
 * Set the position
 *
 * @param position the value
 */
rock.game.universe.Object.prototype.setPosition = function(position) {
    this.position = position;
};

/**
 * Get the representation
 */
rock.game.universe.Object.prototype.getRepresentation = function() {
    return this.representation;
};

/**
 * Set the representation
 *
 * @param representation the value
 */
rock.game.universe.Object.prototype.setRepresentation = function(representation) {
    this.representation = representation;
};