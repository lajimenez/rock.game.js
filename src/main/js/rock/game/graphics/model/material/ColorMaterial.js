rock.namespace('rock.game.graphics.model.material');

/**
 * Represents a material that has a color.
 *
 * @constructor
 * @extends rock.game.graphics.model.material.Material
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.model.material.ColorMaterial = function () {
    rock.super_(this);

    this.color = null;
};

rock.extends_(rock.game.graphics.model.material.ColorMaterial, rock.game.graphics.model.material.Material);

rock.game.graphics.model.material.ColorMaterial.prototype.loadFromJSON = function (JSON) {
    var JSONColor = JSON.color;
    var alpha = null;

    if (JSONColor.length == 4) {
        alpha = JSONColor[3];
    }

    this.color = new rock.graphics.Color(JSONColor[0], JSONColor[1], JSONColor[2], alpha);
};

/**
 * Get the color
 */
rock.game.graphics.model.material.ColorMaterial.prototype.getColor = function() {
    return this.color;
};

/**
 * Set the color
 *
 * @param color the value
 */
rock.game.graphics.model.material.ColorMaterial.prototype.setColor = function(color) {
    this.color = color;
};