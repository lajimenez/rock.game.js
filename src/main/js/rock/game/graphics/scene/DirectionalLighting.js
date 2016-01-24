rock.namespace('rock.game.graphics.scene');

/**
 * Lighting model composed by {@link rock.game.graphics.lighting.DirectionalLight}.
 *
 * @constructor
 * @extends rock.game.graphics.scene.LightArrayLighting
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.scene.DirectionalLighting = function (maxLights) {
    rock.super_(this, [maxLights, rock.game.constants.DIRECTIONAL_LIGHTING_TYPE]);
};

rock.extends_(rock.game.graphics.scene.DirectionalLighting, rock.game.graphics.scene.LightArrayLighting);
