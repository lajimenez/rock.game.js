rock.namespace('rock.game.graphics.scene');

/**
 * Lighting model composed for multiple lights.
 *
 * @constructor
 * @extends rock.game.graphics.scene.Lighting
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.scene.LightArrayLighting = function (maxLights, type) {
    rock.super_(this, [type]);
    this.maxLights = rock.game.graphics.scene.LightArrayLighting.DEFAULT_MAX_LIGHTS;
    if (!rock.util.JsUtils.isNullOrUndefined(maxLights)) {
        this.maxLights = maxLights;
    }

    this.lights = new rock.js.Array();
};

rock.extends_(rock.game.graphics.scene.LightArrayLighting, rock.game.graphics.scene.Lighting);

rock.game.graphics.scene.LightArrayLighting.DEFAULT_MAX_LIGHTS = 10;

/**
 * Get the directional light at some position
 *
 * @param position
 *      the position of the light
 *
 * @return {rock.game.graphics.lighting.Light} the light
 */
rock.game.graphics.scene.LightArrayLighting.prototype.getLight = function(position) {
    return this.lights.getValue(position);
};

/**
 * Add a new directional light
 *
 * @param {rock.game.graphics.lighting.Light} light
 *          the light
 */
rock.game.graphics.scene.LightArrayLighting.prototype.addLight = function(light) {
    var lights = this.lights;
    if (lights.getLength() >= this.maxLights) {
        // TODO: throw exception here
        return;
    }
    this.lights.addValue(light);
};

/**
 * Remove the directional light
 *
 * @param {rock.game.graphics.lighting.Light} light
 *          the light
 */
rock.game.graphics.scene.LightArrayLighting.prototype.removeLight = function(light) {
    this.lights.removeValue(light);
};

/**
 * Clear all lights
 */
rock.game.graphics.scene.LightArrayLighting.prototype.clearLights = function () {
    this.lights.clear();
};

rock.game.graphics.scene.LightArrayLighting.prototype.getLightsCount = function () {
    return this.lights.getLength();
};