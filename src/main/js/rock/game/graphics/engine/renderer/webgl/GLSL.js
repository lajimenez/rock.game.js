rock.namespace('rock.game.graphics.engine.renderer.webgl');


rock.game.graphics.engine.renderer.webgl.GLSL_PRECISION = {
    MEDIUMP_FLOAT_PRECISION :  'precision mediump float; \n',

    HIGHP_FLOAT_PRECISION :  'precision highp float; \n'
};

rock.game.graphics.engine.renderer.webgl.GLSL_PRECISION.ROCK_PRECISION =
    rock.game.graphics.engine.renderer.webgl.GLSL_PRECISION.HIGHP_FLOAT_PRECISION;

/**
 * Repository for GLSL elements
 *
 * @constructor
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.renderer.webgl.GLSL = {
    VERTEX_SHADER :  ' '
    + rock.game.graphics.engine.renderer.webgl.GLSL_PRECISION.ROCK_PRECISION
    + ' attribute vec3 a_vertex;                                             \n'
    + ' uniform mat4 u_modelViewMatrix;                                      \n'
    + ' uniform mat4 u_projectionMatrix;                                     \n'
    + ' vec4 modelViewVertex;                                                \n'
    + ' void main() {                                                        \n'
    + '     modelViewVertex = u_modelViewMatrix * vec4(a_vertex, 1.0);       \n'
    + '     gl_Position = u_projectionMatrix * modelViewVertex;              \n'
    + ' }                                                                    \n',

    // we can skip the 'v_normal' normalization in case 'a_normal' is normalized
    NORMAL_VERTEX_SHADER :  ' '
    + rock.game.graphics.engine.renderer.webgl.GLSL_PRECISION.ROCK_PRECISION
    + ' attribute vec3 a_vertex;                                             \n'
    + ' attribute vec3 a_normal;                                             \n'
    + ' uniform mat4 u_modelViewMatrix;                                      \n'
    + ' uniform mat4 u_projectionMatrix;                                     \n'
    + ' uniform mat3 u_normalMatrix;                                         \n'
    + ' varying vec4 v_modelViewVertex;                                      \n'
    + ' varying vec3 v_normal;                                               \n'
    + ' void main() {                                                        \n'
    + '     v_modelViewVertex = u_modelViewMatrix * vec4(a_vertex, 1.0);     \n'
    + '     v_normal = normalize(u_normalMatrix * a_normal);                 \n'
    + '     gl_Position = u_projectionMatrix * v_modelViewVertex;            \n'
    + ' }                                                                    \n',

    TEXTURE_VERTEX_SHADER :  ' '
    + rock.game.graphics.engine.renderer.webgl.GLSL_PRECISION.ROCK_PRECISION
    + ' attribute vec3 a_vertex;                                             \n'
    + ' attribute vec2 a_texCoord;                                           \n'
    + ' uniform mat4 u_modelViewMatrix;                                      \n'
    + ' uniform mat4 u_projectionMatrix;                                     \n'
    + ' varying vec2 v_texCoord;                                             \n'
    + ' vec4 modelViewVertex;                                                \n'
    + ' void main() {                                                        \n'
    + '     modelViewVertex = u_modelViewMatrix * vec4(a_vertex, 1.0);       \n'
    + '     v_texCoord = a_texCoord;                                         \n'
    + '     gl_Position = u_projectionMatrix * modelViewVertex;              \n'
    + ' }                                                                    \n',

    TEXTURE_NORMAL_VERTEX_SHADER :  ' '
    + rock.game.graphics.engine.renderer.webgl.GLSL_PRECISION.ROCK_PRECISION
    + ' attribute vec3 a_vertex;                                                 \n'
    + ' attribute vec3 a_normal;                                                 \n'
    + ' attribute vec2 a_texCoord;                                               \n'
    + ' uniform mat4 u_modelViewMatrix;                                          \n'
    + ' uniform mat4 u_projectionMatrix;                                         \n'
    + ' uniform mat3 u_normalMatrix;                                             \n'
    + ' varying vec4 v_modelViewVertex;                                          \n'
    + ' varying vec3 v_normal;                                                   \n'
    + ' varying vec2 v_texCoord;                                                 \n'
    + ' void main() {                                                            \n'
    + '     v_modelViewVertex = u_modelViewMatrix * vec4(a_vertex, 1.0);         \n'
    + '     v_normal = normalize(u_normalMatrix * a_normal);                     \n'
    + '     v_texCoord = a_texCoord;                                             \n'
    + '     gl_Position = u_projectionMatrix * v_modelViewVertex;                \n'
    + ' }                                                                        \n',

    STRUCT_MATERIAL : ''
    + ' struct Material {                     \n'
    + '     vec3 ambient;                     \n'
    + '     vec3 diffuse;                     \n'
    + '     vec3 specular;                    \n'
    + '     float shininess;                  \n'
    + '     float alpha;                      \n'
    + ' };                                    \n',

    STRUCT_LIGHT : ''
    + ' struct Light {                    \n'
    + '     vec3 position;                \n'
    + '     vec3 ambient;                 \n'
    + '     vec3 diffuse;                 \n'
    + '     vec3 specular;                \n'
    + ' };                                \n',

    STRUCT_ATTENUATION_LIGHT : ''
    + ' struct AttenuationLight {         \n'
    + '     vec3 position;                \n'
    + '     vec3 ambient;                 \n'
    + '     vec3 diffuse;                 \n'
    + '     vec3 specular;                \n'
    + '     float constantAttenuation;    \n'
    + '     float linearAttenuation;      \n'
    + '     float exponentialAttenuation; \n'
    + ' };                                \n',

    // This struct must contain all properties of 'STRUCT_ATTENUATION_LIGHT'
    STRUCT_SPOTLIGHT_LIGHT : ''
    + ' struct SpotlightLight {           \n'
    + '     vec3 position;                \n'
    + '     vec3 ambient;                 \n'
    + '     vec3 diffuse;                 \n'
    + '     vec3 specular;                \n'
    + '     float constantAttenuation;    \n'
    + '     float linearAttenuation;      \n'
    + '     float exponentialAttenuation; \n'
    + '     float coneAngle;              \n'
    + '     vec3 coneDirection;           \n'
    + ' };                                \n',

    FUNCTION_CALCULATE_DIRECTIONAL_LIGHT_COLOR : ''
    + ' // Expect normalized normal                                                         \n'
    + ' vec3 calculateDirectionalLightColor(Light light, Material material, vec3 normal, vec3 viewDirection)  {  \n'
    + '     vec3 lightDirection = normalize(-light.position.xyz);                           \n'
    + '     vec3 lightReflection = normalize(reflect(lightDirection, normal));              \n'

    + '     // Calculate coefficients                                                       \n'
    + '     float diffuseCoefficient = max(0., dot(normal, -lightDirection));               \n'
    + '     float specularCoefficient = 0.;                                                 \n'
    + '     // There can\'t be specular light if there isn\'t diffuse light                 \n'
    + '     if (diffuseCoefficient > 0.) {                                                  \n'
    + '         float reflectionCoefficient = max(0., dot(viewDirection, lightReflection)); \n'
    + '         if (reflectionCoefficient > 0. && material.shininess > 0.) {                \n'
    + '             specularCoefficient = pow(reflectionCoefficient, material.shininess);   \n'
    + '         }                                                                           \n'
    + '     }                                                                               \n'

    + '     // Calculate colors                                                             \n'
    + '     vec3 ambientColor = material.ambient * light.ambient;                           \n'
    + '     vec3 diffuseColor = material.diffuse * light.diffuse * diffuseCoefficient;      \n'
    + '     vec3 specularColor = material.specular * light.specular * specularCoefficient;  \n'
    + '     return vec3(ambientColor + diffuseColor + specularColor);                       \n'
    + ' }                                                                                   \n',

    FUNCTION_CALCULATE_POINT_LIGHT_COLOR : ''
    + ' // Expect normalized normal                                                         \n'
    + ' vec3 calculatePointLightColor(AttenuationLight light, Material material, vec3 vertex, vec3 normal)  {  \n'
    + '     vec3 lightDirection = vertex - light.position.xyz ;                             \n'
    + '     vec3 viewDirection = normalize(-vertex);                                        \n'
    + '     float distance = length(lightDirection);                                        \n'
    + '     lightDirection = normalize(lightDirection);                                     \n'
    + '     vec3 lightReflection = normalize(reflect(lightDirection, normal));              \n'

    + '     // Calculate coefficients                                                       \n'
    + '     float diffuseCoefficient = max(0., dot(normal, -lightDirection));               \n'
    + '     float specularCoefficient = 0.;                                                 \n'
    + '     // There can\'t be specular light if there isn\'t diffuse light                 \n'
    + '     if (diffuseCoefficient > 0.) {                                                  \n'
    + '         float reflectionCoefficient = max(0., dot(viewDirection, lightReflection)); \n'
    + '         if (reflectionCoefficient > 0. && material.shininess > 0.) {                \n'
    + '             specularCoefficient = pow(reflectionCoefficient, material.shininess);   \n'
    + '         }                                                                           \n'
    + '     }                                                                               \n'

    + '     // Calculate colors                                                             \n'
    + '     vec3 ambientColor = material.ambient * light.ambient;                           \n'
    + '     vec3 diffuseColor = material.diffuse * light.diffuse * diffuseCoefficient;      \n'
    + '     vec3 specularColor = material.specular * light.specular * specularCoefficient;  \n'
    + '     vec3 color = (ambientColor + diffuseColor + specularColor);                     \n'

    + '     // Calculate attenuation                                                        \n'
    + '     float attenuation = light.constantAttenuation                                   \n'
    + '                         + light.linearAttenuation * distance                        \n'
    + '                         + light.exponentialAttenuation * distance * distance;       \n'
    + '     attenuation = max(0., attenuation);                                             \n'
    + '     return color / attenuation;                                                     \n'
    + ' }                                                                                   \n',

    FUNCTION_CALCULATE_SPOTLIGHT_LIGHT_COLOR : ''
    + ' // Expect normalized normal                                                         \n'
    + ' vec3 calculatePointLightColor(SpotlightLight light, Material material, vec3 vertex, vec3 normal)  {  \n'
    + '     vec3 lightDirection = vertex - light.position.xyz ;                             \n'
    + '     vec3 viewDirection = normalize(-vertex);                                        \n'
    + '     float distance = length(lightDirection);                                        \n'
    + '     lightDirection = normalize(lightDirection);                                     \n'
    + '     vec3 lightReflection = normalize(reflect(lightDirection, normal));              \n'

    + '     float diffuseCoefficient = 0.;                                                  \n'
    + '     float specularCoefficient = 0.;                                                 \n'

    + '     vec3 coneDirection = normalize(light.coneDirection);                            \n'
    + '     float currentConeAngle =  degrees(acos(dot(lightDirection, coneDirection)));    \n'
    + '     if (currentConeAngle < light.coneAngle) {                                       \n'
    + '         // Calculate coefficients                                                   \n'
    + '         diffuseCoefficient = max(0., dot(normal, -lightDirection));                 \n'
    + '         // There can\'t be specular light if there isn\'t diffuse light             \n'
    + '         if (diffuseCoefficient > 0.) {                                              \n'
    + '             float reflectionCoefficient = max(0., dot(viewDirection, lightReflection)); \n'
    + '             if (reflectionCoefficient > 0. && material.shininess > 0.) {                \n'
    + '                 specularCoefficient = pow(reflectionCoefficient, material.shininess);   \n'
    + '             }                                                                           \n'
    + '         }                                                                           \n'
    + '     }                                                                               \n'

    + '     // Calculate colors                                                             \n'
    + '     vec3 ambientColor = material.ambient * light.ambient;                           \n'
    + '     vec3 diffuseColor = material.diffuse * light.diffuse * diffuseCoefficient;      \n'
    + '     vec3 specularColor = material.specular * light.specular * specularCoefficient;  \n'
    + '     vec3 color = (ambientColor + diffuseColor + specularColor);                     \n'

    + '     // Calculate attenuation                                                        \n'
    + '     float attenuation = light.constantAttenuation                                   \n'
    + '                         + light.linearAttenuation * distance                        \n'
    + '                         + light.exponentialAttenuation * distance * distance;       \n'
    + '     attenuation = max(0., attenuation);                                             \n'
    + '     return color / attenuation;                                                     \n'
    + ' }                                                                                   \n'
};

// ' vec3 lightReflection = refect(...' line can be replaced by:
// ' vec3 lightReflection = lightDirection - normal * 2.0 * dot(normal, lightDirection);'