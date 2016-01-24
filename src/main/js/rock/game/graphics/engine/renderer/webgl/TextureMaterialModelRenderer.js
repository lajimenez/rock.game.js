rock.namespace('rock.game.graphics.engine.renderer.webgl');

/**
 * Renderer for {@link rock.game.graphics.model.TextureModel} with no lighting
 *
 * @param {rock.graphics.engine.webgl.WebGLContext} glContext
 *         the WebGL context
 *
 * @constructor
 * @extends rock.game.graphics.engine.renderer.webgl.ModelRenderer
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.renderer.webgl.TextureMaterialModelRenderer = function (glContext) {
    var lightingType = rock.game.constants.NO_LIGHTING_NEEDED_TYPE;
    var modelType = rock.game.constants.TEXTURE_MODEL_TYPE;
    var gl = glContext.getHTMLContext();
    var drawingMode = gl.TRIANGLES;
    var vertexShaderSrc = rock.game.graphics.engine.renderer.webgl.GLSL.TEXTURE_VERTEX_SHADER;
    var fragmentShaderSrc = rock.game.graphics.engine.renderer.webgl.TextureMaterialModelRenderer.fragmentShaderSrc;

    var lightingSetter =
        new rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting.NoLightingSetter(glContext);
    var meshModelSetter =
        new rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.TextureModelSetter(glContext);

    var superParams = [lightingType, modelType, glContext, drawingMode,
        vertexShaderSrc, fragmentShaderSrc,
        lightingSetter, meshModelSetter];

    rock.super_(this, superParams);
};

rock.extends_(rock.game.graphics.engine.renderer.webgl.TextureMaterialModelRenderer,
    rock.game.graphics.engine.renderer.webgl.ModelRenderer);


rock.game.graphics.engine.renderer.webgl.TextureMaterialModelRenderer.fragmentShaderSrc = ''
    + rock.game.graphics.engine.renderer.webgl.GLSL_PRECISION.ROCK_PRECISION
    + ' uniform sampler2D u_texture;                          \n'
    + ' varying vec2 v_texCoord;                              \n'

    + ' void main() {                                         \n'
    + '     gl_FragColor = texture2D(u_texture, v_texCoord);  \n'
    + ' }                                                     \n';