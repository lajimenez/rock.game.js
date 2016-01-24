rock.namespace('rock.game.graphics.engine.renderer.webgl');

/**
 * Model renderer for using with WebGL.
 * This is the class that you should implement when creating a new renderer.
 *
 * @param {String} lightingType
 *         the lighting type
 * @param {String} modelType
 *         the model type
 * @param {rock.graphics.engine.webgl.WebGLContext} glContext
 *         the WebGL context
 * @param {Number} drawingMode
 *         gl drawing model
 * @param {String} vertexShaderSrc
 *         source for the vertex shader
 * @param {String} fragmentShaderSrc
 *         source for the fragment shader
 * @param {rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting.LightingSetter} lightingSetter
 *          lighting setter
 * @param {rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.ModelSetter} modelSetter
 *          model setter
 * @param {Boolean} [provisioningBuffers]
 *          if true, caching will also create buffers
 * @param {Boolean} [provisioningTextures]
 *          if true, caching will also create textures
 *
 * @constructor
 * @extends rock.game.graphics.engine.renderer.ModelRenderer
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.renderer.webgl.ModelRenderer = function (lightingType, modelType,
                                                                   glContext, drawingMode,
                                                                   vertexShaderSrc, fragmentShaderSrc,
                                                                   lightingSetter, modelSetter,
                                                                   provisioningBuffers, provisioningTextures) {
    rock.super_(this, [lightingType, modelType]);
    this.glContext = glContext;

    this.matricesSetter =
        new rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.MatricesSetter(glContext.getHTMLContext());
    this.lightingSetter = lightingSetter;
    this.modelSetter = modelSetter;

    this.matricesSettable = new rock.game.graphics.engine.renderer.webgl.programsetter.settable.MatricesSettable();
    this.lightingSettable = new rock.game.graphics.engine.renderer.webgl.programsetter.settable.LightingSettable();
    this.modelSettable = new rock.game.graphics.engine.renderer.webgl.programsetter.settable.ModelSettable();

    this.drawingMode = drawingMode;

    var attributes = this.getAttributeNames();
    var uniforms = this.getUniformNames();
    var textures = this.getTextureNames();
    this.program = new rock.graphics.engine.renderer.webgl.program.CacheProgram(
        glContext, vertexShaderSrc, fragmentShaderSrc, attributes, uniforms, textures,
        provisioningBuffers, provisioningTextures);

    // this properties are to avoid memory allocation
    this.modelViewMatrix_ma = new rock.geometry.Matrix4();
    this.normalMatrix_ma = new rock.geometry.Matrix4();
};

rock.extends_(rock.game.graphics.engine.renderer.webgl.ModelRenderer, rock.game.graphics.engine.renderer.ModelRenderer);

rock.game.graphics.engine.renderer.webgl.ModelRenderer.MAX_VERTICES = 65535;

rock.game.graphics.engine.renderer.webgl.ModelRenderer.prototype.getAttributeNames = function () {
    var attributeNames = [];
    attributeNames = attributeNames.concat(this.matricesSetter.getAttributeNames());
    attributeNames = attributeNames.concat(this.lightingSetter.getAttributeNames());
    attributeNames = attributeNames.concat(this.modelSetter.getAttributeNames());
    return attributeNames;
};

rock.game.graphics.engine.renderer.webgl.ModelRenderer.prototype.getUniformNames = function () {
    var uniformNames = [];
    uniformNames = uniformNames.concat(this.matricesSetter.getUniformNames());
    uniformNames = uniformNames.concat(this.lightingSetter.getUniformNames());
    uniformNames = uniformNames.concat(this.modelSetter.getUniformNames());
    return uniformNames;
};

rock.game.graphics.engine.renderer.webgl.ModelRenderer.prototype.getTextureNames = function () {
    var textureNames = [];
    textureNames = textureNames.concat(this.matricesSetter.getTextureNames());
    textureNames = textureNames.concat(this.lightingSetter.getTextureNames());
    textureNames = textureNames.concat(this.modelSetter.getTextureNames());
    return textureNames;
};

/**
 * @see rock.game.graphics.engine.renderer.ModelRenderer#render
 * @override
 */
rock.game.graphics.engine.renderer.webgl.ModelRenderer.prototype.render = function (lighting, camera, renderable) {
    var gl = this.glContext.getHTMLContext();
    var program = this.program;

    program.useProgram();

    this.setCommonProgramValues(lighting, camera, renderable);

    program.enableAttributes();

    var model = renderable.getModel();
    var modelAdapter = renderable.getModelAdapter();
    this.setProgramValuesModel(model, modelAdapter);

    gl.drawElements(this.drawingMode, model.getMeshCount(), gl.UNSIGNED_SHORT, 0);

    program.disableAttributes();

    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
};

rock.game.graphics.engine.renderer.webgl.ModelRenderer.prototype.setCommonProgramValues = function (lighting, camera, renderable) {
    this.setProgramValuesMatrices(renderable, camera);
    this.setProgramValuesLighting(lighting, camera);
};

rock.game.graphics.engine.renderer.webgl.ModelRenderer.prototype.setProgramValuesMatrices = function (renderable, camera) {
    var matricesSettable = this.matricesSettable;
    var viewMatrix = camera.getLookAtViewMatrix();
    var projectionMatrix = camera.getPerspectiveProjectionMatrix();
    var modelMatrix = renderable.getModelMatrix();

    var modelViewMatrix = this.modelViewMatrix_ma;
    var normalMatrix = this.normalMatrix_ma;

    modelViewMatrix.initFromMatrix(viewMatrix);
    modelViewMatrix.multiply(modelMatrix);

    normalMatrix.initFromMatrix(modelViewMatrix);
    normalMatrix.invert();
    normalMatrix.transpose();
    normalMatrix.removeTranslation();

    matricesSettable.setModelViewMatrix(modelViewMatrix);
    matricesSettable.setProjectionMatrix(projectionMatrix);
    matricesSettable.setNormalMatrix(normalMatrix);

    this.matricesSetter.setValues(this.program, matricesSettable);
};

rock.game.graphics.engine.renderer.webgl.ModelRenderer.prototype.setProgramValuesLighting = function (lighting, camera) {
    var lightingSettable = this.lightingSettable;
    lightingSettable.setLighting(lighting);
    lightingSettable.setCamera(camera);
    this.lightingSetter.setValues(this.program, lightingSettable);
};

rock.game.graphics.engine.renderer.webgl.ModelRenderer.prototype.setProgramValuesModel = function (model, modelAdapter) {
    var modelSettable = this.modelSettable;
    modelSettable.setModel(model);
    modelSettable.setAdapter(modelAdapter);
    this.modelSetter.setValues(this.program, modelSettable);
};
