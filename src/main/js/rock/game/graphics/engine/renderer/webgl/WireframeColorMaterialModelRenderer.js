rock.namespace('rock.game.graphics.engine.renderer.webgl');

/**
 * Renderer for {@link rock.game.graphics.model.WireframeColorModel} with no lighting
 *
 * @param {rock.graphics.engine.webgl.WebGLContext} glContext
 *         the WebGL context
 *
 * @constructor
 * @extends rock.game.graphics.engine.renderer.webgl.ModelRenderer
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.renderer.webgl.WireframeColorMaterialModelRenderer = function (glContext) {
    var lightingType = rock.game.constants.NO_LIGHTING_NEEDED_TYPE;
    var modelType = rock.game.constants.COLOR_MODEL_TYPE;
    var gl = glContext.getHTMLContext();
    var drawingMode = gl.LINES;
    var vertexShaderSrc = rock.game.graphics.engine.renderer.webgl.GLSL.VERTEX_SHADER;
    var fragmentShaderSrc = rock.game.graphics.engine.renderer.webgl.WireframeColorMaterialModelRenderer.fragmentShaderSrc;

    var lightingSetter =
        new rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting.NoLightingSetter(glContext);
    var modelSetter =
        new rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.WireframeColorModelSetter(glContext);

    var superParams = [lightingType, modelType, glContext, drawingMode,
        vertexShaderSrc, fragmentShaderSrc,
        lightingSetter, modelSetter];

    rock.super_(this, superParams);
};

rock.extends_(rock.game.graphics.engine.renderer.webgl.WireframeColorMaterialModelRenderer,
    rock.game.graphics.engine.renderer.webgl.ModelRenderer);

rock.game.graphics.engine.renderer.webgl.WireframeColorMaterialModelRenderer.fragmentShaderSrc = ''
    + rock.game.graphics.engine.renderer.webgl.GLSL_PRECISION.ROCK_PRECISION
    + ' uniform vec3 u_color;                 \n'
    + ' void main() {                         \n'
    + '     gl_FragColor = vec4(u_color, 1);  \n'
    + ' }                                     \n';