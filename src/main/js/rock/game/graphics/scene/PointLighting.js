rock.namespace('rock.game.graphics.scene');

/**
 * Lighting model composed by {@link rock.game.graphics.lighting.PointLight}.
 *
 * @constructor
 * @extends rock.game.graphics.scene.LightArrayLighting
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.scene.PointLighting = function (maxLights) {
    rock.super_(this, [maxLights, rock.game.constants.POINT_LIGHTING_TYPE]);
};

rock.extends_(rock.game.graphics.scene.PointLighting, rock.game.graphics.scene.LightArrayLighting);