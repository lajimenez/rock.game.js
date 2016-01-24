rock.namespace('rock.game.physics');

/**
 * Represents a BBOX barrier
 *
 * @param {rock.geometry.BBOX} bbox
 *
 * @constructor
 * @abstract
 * @extends {rock.game.physics.Barrier}
 *
 * @author Luis Alberto Jiménez
 */
rock.game.physics.BBOXBarrier = function (bbox) {
    this.bbox = bbox;
};

rock.extends_(rock.game.physics.BBOXBarrier, rock.game.physics.Barrier);

/**
 * @see rock.game.physics.Barrier#intersectWithPoint
 * @override
 */
rock.game.physics.BBOXBarrier.prototype.intersectWithPoint = function (point) {
    var bbox = this.bbox;
    return bbox.intersectWithPoint(point);
};

/**
 * Get the bbox
 */
rock.game.physics.BBOXBarrier.prototype.getBBOX = function() {
    return this.bbox;
};

/**
 * Set the bbox
 *
 * @param bbox the value
 */
rock.game.physics.BBOXBarrier.prototype.setBBOX = function(bbox) {
    this.bbox = bbox;
};