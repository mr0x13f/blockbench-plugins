// Vertex shader that will replace the one used on textures
// Based on texture.js @ 64
// Edited to add skinning
// Also changed the antialising bleed fix to an ifdef
// Note that we use MAX_BONES_JP instead of THREE.js's normal MAX_BONES
// because it's forcefully inserting a stupid value like 1024
// and we can't change that.

attribute float highlight;

uniform bool SHADE;
uniform int LIGHTSIDE;

#ifdef USE_SKINNING
uniform mat4 boneMatrices[ MAX_BONES_JP ];
#endif

#ifdef ANTIALIAS_BLEED_FIX
centroid varying vec2 vUv;
#else
varying vec2 vUv;
#endif

varying float light;
varying float lift;

float AMBIENT = 0.5;
float XFAC = -0.15;
float ZFAC = 0.05;

void main()
{
    mat4 skinnedModelViewMatrix = modelViewMatrix;

#ifdef USE_SKINNING
    skinnedModelViewMatrix = viewMatrix * (
        skinWeight.x * boneMatrices[int(skinIndex.x)] +
        skinWeight.y * boneMatrices[int(skinIndex.y)] +
        skinWeight.z * boneMatrices[int(skinIndex.z)] +
        skinWeight.w * boneMatrices[int(skinIndex.w)] );
#endif

    if (SHADE) {

        vec3 N = normalize( mat3(skinnedModelViewMatrix) * normal );

        if (LIGHTSIDE == 1) {
            float temp = N.y;
            N.y = N.z * -1.0;
            N.z = temp;
        }
        if (LIGHTSIDE == 2) {
            float temp = N.y;
            N.y = N.x;
            N.x = temp;
        }
        if (LIGHTSIDE == 3) {
            N.y = N.y * -1.0;
        }
        if (LIGHTSIDE == 4) {
            float temp = N.y;
            N.y = N.z;
            N.z = temp;
        }
        if (LIGHTSIDE == 5) {
            float temp = N.y;
            N.y = N.x * -1.0;
            N.x = temp;
        }

        float yLight = (1.0+N.y) * 0.5;
        light = yLight * (1.0-AMBIENT) + N.x*N.x * XFAC + N.z*N.z * ZFAC + AMBIENT;

    } else {

        light = 1.0;

    }

    if (highlight == 2.0) {
        lift = 0.22;
    } else if (highlight == 1.0) {
        lift = 0.1;
    } else {
        lift = 0.0;
    }
    
    vUv = uv;
    vec4 mvPosition = skinnedModelViewMatrix * vec4( position, 1.0 );
    gl_Position = projectionMatrix * mvPosition;
}
