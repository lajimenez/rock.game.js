rock.namespace('rock.game.graphics.model');

/**
 * Base class for models
 *
 * @constructor
 * @abstract
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.model.BaseModel = function(type) {
    this.type = type;
};

/**
 * Get the bounded box of the model.
 *
 * @returns {rock.geometry.BBOX}
 * @function
 */
rock.game.graphics.model.BaseModel.prototype.getBBOX = rock.abstract_;

rock.game.graphics.model.BaseModel.prototype.getCenter = function() {
    return this.getBBOX().getCenter();
};

/**
 * Get the type
 */
rock.game.graphics.model.BaseModel.prototype.getType = function() {
    return this.type;
};