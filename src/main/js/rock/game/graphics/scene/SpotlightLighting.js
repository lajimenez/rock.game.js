rock.namespace('rock.game.graphics.scene');

/**
 * Lighting model composed by {@link rock.game.graphics.lighting.SpotlightLight}.
 *
 * @constructor
 * @extends rock.game.graphics.scene.LightArrayLighting
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.scene.SpotlightLighting = function (maxLights) {
    rock.super_(this, [maxLights, rock.game.constants.SPOTLIGHT_LIGHTING_TYPE]);
};

rock.extends_(rock.game.graphics.scene.SpotlightLighting, rock.game.graphics.scene.LightArrayLighting);
