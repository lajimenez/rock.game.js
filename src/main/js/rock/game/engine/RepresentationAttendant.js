rock.namespace('rock.game.engine');

/**
 * This class is responsible to manage representation. This class knows what representation need each world object
 * and also is able to get all representations from the world. This is the main class when working with representations.
 *
 * @param {rock.game.graphics.engine.RenderEngine} renderEngine
 *
 * @param {rock.game.Repository} repository
 *
 * @constructor
 *
 * @author Luis Alberto Jiménez
 */
rock.game.engine.RepresentationAttendant = function (renderEngine, repository) {
    this.renderEngine = renderEngine;
    this.repository = repository;
};

/**
 * Create a representation for a world object
 *
 * @param {rock.game.universe.Object} object
 *
 * @abstract
 * @function
 */
rock.game.engine.RepresentationAttendant.prototype.createRepresentation = rock.abstract_;

/**
 * Extract representations for the world objects
 *
 * @param {rock.game.universe.World} world
 *
 * @abstract
 * @function
 */
rock.game.engine.RepresentationAttendant.prototype.getRepresentations = rock.abstract_;

/**
 * Get the renderEngine
 */
rock.game.engine.RepresentationAttendant.prototype.getRenderEngine = function() {
    return this.renderEngine;
};

/**
 * Get the repository
 */
rock.game.engine.RepresentationAttendant.prototype.getRepository = function() {
    return this.repository;
};