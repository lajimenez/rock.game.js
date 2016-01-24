rock.namespace('rock.game.graphics.model.material');

/**
 * Represents a material for using in the phong reflection model. Textures are used for set colors.
 *
 * @constructor
 * @extends rock.game.graphics.model.material.PhongMaterial
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.model.material.PhongTextureMaterial = function () {
    rock.super_(this);
    this.ambientTexture = null;
    this.diffuseTexture = null;
    this.specularTexture = null;
};

rock.extends_(rock.game.graphics.model.material.PhongTextureMaterial, rock.game.graphics.model.material.PhongMaterial);

rock.game.graphics.model.material.PhongTextureMaterial.prototype.loadFromJSON = function (JSON, repository) {
    rock.super_method(this, rock.game.graphics.model.material.PhongTextureMaterial, 'loadFromJSON', arguments);
    var JSONPhongTexture = JSON.phongTexture;
    var image;
    if (!rock.util.JsUtils.isNullOrUndefined(JSONPhongTexture.ambient)) {
        image = repository.getTextureImage(JSONPhongTexture.ambient);
        this.ambientTexture = new rock.game.graphics.model.material.Texture(image);
    }

    if (!rock.util.JsUtils.isNullOrUndefined(JSONPhongTexture.diffuse)) {
        image = repository.getTextureImage(JSONPhongTexture.diffuse);
        this.diffuseTexture = new rock.game.graphics.model.material.Texture(image);
    }

    if (!rock.util.JsUtils.isNullOrUndefined(JSONPhongTexture.specular)) {
        image = repository.getTextureImage(JSONPhongTexture.specular);
        this.specularTexture = new rock.game.graphics.model.material.Texture(image);
    }
};

/**
 * Get the ambientTexture
 */
rock.game.graphics.model.material.PhongTextureMaterial.prototype.getAmbientTexture = function() {
    return this.ambientTexture;
};

/**
 * Set the ambientTexture
 *
 * @param ambientTexture the value
 */
rock.game.graphics.model.material.PhongTextureMaterial.prototype.setAmbientTexture = function(ambientTexture) {
    this.ambientTexture = ambientTexture;
};

/**
 * Get the diffuseTexture
 */
rock.game.graphics.model.material.PhongTextureMaterial.prototype.getDiffuseTexture = function() {
    return this.diffuseTexture;
};

/**
 * Set the diffuseTexture
 *
 * @param diffuseTexture the value
 */
rock.game.graphics.model.material.PhongTextureMaterial.prototype.setDiffuseTexture = function(diffuseTexture) {
    this.diffuseTexture = diffuseTexture;
};

/**
 * Get the specularTexture
 */
rock.game.graphics.model.material.PhongTextureMaterial.prototype.getSpecularTexture = function() {
    return this.specularTexture;
};

/**
 * Set the specularTexture
 *
 * @param specularTexture the value
 */
rock.game.graphics.model.material.PhongTextureMaterial.prototype.setSpecularTexture = function(specularTexture) {
    this.specularTexture = specularTexture;
};