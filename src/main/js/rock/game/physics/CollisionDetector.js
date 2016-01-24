rock.namespace('rock.game.physics');

/**
 * Collision detector. You can use this for basic check related with collisions.
 *
 * @constructor
 *
 * @author Luis Alberto Jiménez
 */
rock.game.physics.CollisionDetector = function () {
    this.barriers = new rock.js.Array();
};

/**
 * Add a barrier
 *
 * @param {rock.game.physics.Barrier} barrier
 */
rock.game.physics.CollisionDetector.prototype.addBarrier = function (barrier) {
    this.barriers.addValue(barrier);
};

/**
 * Check if the point cause some collision
 *
 * @param {rock.geometry.Point3} point
 * @return {Boolean}
 */
rock.game.physics.CollisionDetector.prototype.intersectWithPoint = function (point) {
    var barriers = this.barriers;
    var length = barriers.getLength();
    var i, barrier;

    for (i = 0; i < length; i++) {
        barrier = barriers.getValue(i);
        if (barrier.intersectWithPoint(point)) {
            return true;
        }
    }

    return false;
};