rock.namespace('rock.game.physics');

/**
 * Represents a barrier
 *
 * @constructor
 * @abstract
 *
 * @author Luis Alberto Jiménez
 */
rock.game.physics.Barrier = function () {

};

/**
 * Check if the point intersects the barrier
 *
 * @param {rock.geometry.Point3} point
 *
 * @return {Boolean} if there is intersection
 *
 * @function
 */
rock.game.physics.Barrier.prototype.intersectWithPoint = rock.abstract_;