rock.namespace('rock.game.graphics.model.material');

/**
 * Represents a material
 *
 * @constructor
 * @abstract
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.model.material.Material = function () {

};

/**
 * Load the material from JSON
 *
 * @param JSON
 *      the JSON
 * @param {rock.game.Repository} [repository]
 *      the repository
 * @function
 */
rock.game.graphics.model.material.Material.prototype.loadFromJSON = rock.abstract_;