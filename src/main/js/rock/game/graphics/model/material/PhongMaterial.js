rock.namespace('rock.game.graphics.model.material');

/**
 * Represents a material for using in the phong reflection model.
 *
 * @constructor
 * @extends rock.game.graphics.model.material.Material
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.model.material.PhongMaterial = function () {
    rock.super_(this);
    // {Array.4}
    this.ambient = new rock.graphics.Color(0, 0, 0);
    this.diffuse = new rock.graphics.Color(0, 0, 0);
    this.specular = new rock.graphics.Color(0, 0, 0);
    this.shininess = 1;
    this.alpha = 1;
};

rock.extends_(rock.game.graphics.model.material.PhongMaterial, rock.game.graphics.model.material.Material);

rock.game.graphics.model.material.PhongMaterial.prototype.loadFromJSON = function (JSON) {
    var JSONPhongColor = JSON.phongColor;
    var ambient = JSONPhongColor.ambient;
    var diffuse = JSONPhongColor.diffuse;
    var specular = JSONPhongColor.specular;
    var shininess = JSONPhongColor.shininess;
    var alpha = JSONPhongColor.alpha;
    this.setAmbient(ambient[0] * 255, ambient[1] * 255, ambient[2] * 255);
    this.setDiffuse(diffuse[0] * 255, diffuse[1] * 255, diffuse[2] * 255);
    this.setSpecular(specular[0] * 255, specular[1] * 255, specular[2] * 255);
    this.setShininess(shininess);
    this.setAlpha(alpha);
};

rock.game.graphics.model.material.PhongMaterial.prototype.setAmbient = function (r, g, b) {
    this.ambient.setRed(r);
    this.ambient.setGreen(g);
    this.ambient.setBlue(b);
};

rock.game.graphics.model.material.PhongMaterial.prototype.getAmbient = function () {
    return this.ambient;
};

rock.game.graphics.model.material.PhongMaterial.prototype.setDiffuse = function (r, g, b) {
    this.diffuse.setRed(r);
    this.diffuse.setGreen(g);
    this.diffuse.setBlue(b);
};

rock.game.graphics.model.material.PhongMaterial.prototype.getDiffuse = function () {
    return this.diffuse;
};

rock.game.graphics.model.material.PhongMaterial.prototype.setSpecular = function (r, g, b) {
    this.specular.setRed(r);
    this.specular.setGreen(g);
    this.specular.setBlue(b);
};

rock.game.graphics.model.material.PhongMaterial.prototype.getSpecular = function () {
    return this.specular;
};

/**
 * Get the shininess
 *
 * @returns the value
 */
rock.game.graphics.model.material.PhongMaterial.prototype.getShininess = function () {
    return this.shininess;
};

/**
 * Set the shininess
 *
 * @param shininess
 *            the value to set
 */
rock.game.graphics.model.material.PhongMaterial.prototype.setShininess = function (shininess) {
    this.shininess = shininess;
};

/**
 * Get the alpha
 */
rock.game.graphics.model.material.PhongMaterial.prototype.getAlpha = function() {
    return this.alpha;
};

/**
 * Set the alpha
 *
 * @param alpha the value
 */
rock.game.graphics.model.material.PhongMaterial.prototype.setAlpha = function(alpha) {
    this.alpha = alpha;
};

/**
 * Clone the material
 *
 * @returns {rock.game.graphics.model.material.PhongMaterial}
 */
rock.game.graphics.model.material.PhongMaterial.prototype.clone = function () {
    var clone = new rock.game.graphics.model.material.PhongMaterial();
    var ambient = this.ambient;
    var diffuse = this.diffuse;
    var specular = this.ambient;

    clone.setAmbient(ambient.getRed(), ambient.getGreen(), ambient.getBlue());
    clone.setDiffuse(diffuse.getRed(), diffuse.getGreen(), diffuse.getBlue());
    clone.setSpecular(specular.getRed(), specular.getGreen(), specular.getBlue());
    clone.setShininess(this.getShininess());

    return clone;
};