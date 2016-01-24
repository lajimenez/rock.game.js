rock.namespace('rock.game.graphics.lighting');

/**
 * Represents a directional light
 *
 * @constructor
 * @extends rock.game.graphics.lighting.Light
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.lighting.DirectionalLight = function () {
    rock.super_(this);
    this.isPositionAVector = true;
};

rock.extends_(rock.game.graphics.lighting.DirectionalLight, rock.game.graphics.lighting.Light);