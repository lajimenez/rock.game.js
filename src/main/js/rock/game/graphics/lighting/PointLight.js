rock.namespace('rock.game.graphics.lighting');

/**
 * Represents a point light
 *
 * @constructor
 * @extends rock.game.graphics.lighting.AttenuationLight
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.lighting.PointLight = function () {
    rock.super_(this);
};

rock.extends_(rock.game.graphics.lighting.PointLight, rock.game.graphics.lighting.AttenuationLight);