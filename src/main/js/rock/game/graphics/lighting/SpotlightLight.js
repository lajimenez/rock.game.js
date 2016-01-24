rock.namespace('rock.game.graphics.lighting');

/**
 * Represents a spotlight light
 *
 * @constructor
 * @extends rock.game.graphics.lighting.AttenuationLight
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.lighting.SpotlightLight = function () {
    rock.super_(this);

    this.coneAngle = null;
    this.coneDirection = null;
};

rock.extends_(rock.game.graphics.lighting.SpotlightLight, rock.game.graphics.lighting.AttenuationLight);

/**
 * Get the cone's angle
 */
rock.game.graphics.lighting.SpotlightLight.prototype.getConeAngle = function() {
    return this.coneAngle;
};

/**
 * Set the cone's angle
 *
 * @param coneAngle the value
 */
rock.game.graphics.lighting.SpotlightLight.prototype.setConeAngle = function(coneAngle) {
    this.coneAngle = coneAngle;
};

/**
 * Get the cone's direction
 */
rock.game.graphics.lighting.SpotlightLight.prototype.getConeDirection = function() {
    return this.coneDirection;
};

/**
 * Set the cone's direction
 *
 * @param x
 * @param y
 * @param z
 */
rock.game.graphics.lighting.SpotlightLight.prototype.setConeDirection = function(x, y, z) {
    var coneDirection = new rock.geometry.Vector3();
    coneDirection.setX(x);
    coneDirection.setY(y);
    coneDirection.setZ(z);
    this.coneDirection = coneDirection;
};