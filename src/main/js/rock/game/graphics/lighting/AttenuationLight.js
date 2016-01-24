rock.namespace('rock.game.graphics.lighting');

/**
 * Represents a point light
 *
 * @constructor
 * @extends rock.game.graphics.lighting.Light
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.lighting.AttenuationLight = function () {
    rock.super_(this);

    this.constantAttenuation = 0;
    this.linearAttenuation = 0;
    this.exponentialAttenuation = 0;
};

rock.extends_(rock.game.graphics.lighting.AttenuationLight, rock.game.graphics.lighting.Light);

/**
 * Get the constantAttenuation
 */
rock.game.graphics.lighting.AttenuationLight.prototype.getConstantAttenuation = function() {
    return this.constantAttenuation;
};

/**
 * Set the constantAttenuation
 *
 * @param constantAttenuation the value
 */
rock.game.graphics.lighting.AttenuationLight.prototype.setConstantAttenuation = function(constantAttenuation) {
    this.constantAttenuation = constantAttenuation;
};

/**
 * Get the linearAttenuation
 */
rock.game.graphics.lighting.AttenuationLight.prototype.getLinearAttenuation = function() {
    return this.linearAttenuation;
};

/**
 * Set the linearAttenuation
 *
 * @param linearAttenuation the value
 */
rock.game.graphics.lighting.AttenuationLight.prototype.setLinearAttenuation = function(linearAttenuation) {
    this.linearAttenuation = linearAttenuation;
};

/**
 * Get the exponentialAttenuation
 */
rock.game.graphics.lighting.AttenuationLight.prototype.getExponentialAttenuation = function() {
    return this.exponentialAttenuation;
};

/**
 * Set the exponentialAttenuation
 *
 * @param exponentialAttenuation the value
 */
rock.game.graphics.lighting.AttenuationLight.prototype.setExponentialAttenuation = function(exponentialAttenuation) {
    this.exponentialAttenuation = exponentialAttenuation;
};