rock.namespace('rock.game.graphics.engine.renderer.webgl');

/**
 * Renderer for {@link rock.game.graphics.model.PhongModel} with {@link rock.game.graphics.scene.DirectionalLighting}
 *
 * @param {rock.graphics.engine.webgl.WebGLContext} glContext
 *         the WebGL context
 *
 * @constructor
 * @extends rock.game.graphics.engine.renderer.webgl.ModelRenderer
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.renderer.webgl.DirectionalLightingPhongMaterialModelRenderer = function (glContext) {
    var lightingType= rock.game.constants.DIRECTIONAL_LIGHTING_TYPE;
    var modelType = rock.game.constants.PHONG_MODEL_TYPE;
    var gl = glContext.getHTMLContext();
    var drawingMode = gl.TRIANGLES;
    var vertexShaderSrc = rock.game.graphics.engine.renderer.webgl.GLSL.NORMAL_VERTEX_SHADER;
    var fragmentShaderSrc = rock.game.graphics.engine.renderer.webgl.DirectionalLightingPhongMaterialModelRenderer.fragmentShaderSrc;

    var maxLights = rock.game.graphics.engine.renderer.webgl.DirectionalLightingPhongMaterialModelRenderer.MAX_LIGHTS;
    var lightingSetter =
        new rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting.DirectionalLightingSetter(glContext, maxLights);
    var modelSetter =
        new rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.PhongModelSetter(glContext);

    var superParams = [lightingType, modelType, glContext, drawingMode,
        vertexShaderSrc, fragmentShaderSrc,
        lightingSetter, modelSetter];

    rock.super_(this, superParams);
};

rock.extends_(rock.game.graphics.engine.renderer.webgl.DirectionalLightingPhongMaterialModelRenderer,
    rock.game.graphics.engine.renderer.webgl.ModelRenderer);

rock.game.graphics.engine.renderer.webgl.DirectionalLightingPhongMaterialModelRenderer.MAX_LIGHTS = 10;

rock.game.graphics.engine.renderer.webgl.DirectionalLightingPhongMaterialModelRenderer.fragmentShaderSrc = ''
    + rock.game.graphics.engine.renderer.webgl.GLSL_PRECISION.ROCK_PRECISION

    + ' #define MAX_LIGHTS ' + rock.game.graphics.engine.renderer.webgl.DirectionalLightingPhongMaterialModelRenderer.MAX_LIGHTS + ' \n'

    + rock.game.graphics.engine.renderer.webgl.GLSL.STRUCT_MATERIAL

    + rock.game.graphics.engine.renderer.webgl.GLSL.STRUCT_LIGHT

    + rock.game.graphics.engine.renderer.webgl.GLSL.FUNCTION_CALCULATE_DIRECTIONAL_LIGHT_COLOR

    + ' uniform Light u_directionalLights[MAX_LIGHTS];                                      \n'
    + ' uniform int u_directionalLightsCount;                                               \n'
    + ' uniform Material u_material;                                                        \n'

    + ' varying vec4 v_modelViewVertex;                                                     \n'
    + ' varying vec3 v_normal;                                                              \n'

    + ' void main() {                                                                       \n'
    + '     vec3 normal = normalize(v_normal);                                              \n'
    + '     vec3 viewDirection = normalize(-v_modelViewVertex.xyz);                         \n'
    + '     vec3 lightColor = vec3(0);                                                      \n'

    + '     for (int i = 0; i < MAX_LIGHTS; i++) {                                          \n'
    + '         if (i < u_directionalLightsCount) {                                         \n'
    + '             lightColor += calculateDirectionalLightColor(u_directionalLights[i], u_material, normal, viewDirection);   \n'
    + '         }                                                                           \n'
    + '     }                                                                               \n'

    + '     gl_FragColor = vec4(lightColor, u_material.alpha);                              \n'
    + ' }                                                                                   \n';
