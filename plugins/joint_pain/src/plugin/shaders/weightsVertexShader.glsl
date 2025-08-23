attribute float highlight;
attribute vec3 jp_weight_color;

uniform bool SHADE;

varying float light;
varying float lift;
varying vec3 vjp_weight_color;

float AMBIENT = 0.1;
float XFAC = -0.05;
float ZFAC = 0.05;

void main()
{

    if (SHADE) {
        vec3 N = normalize( vec3( modelViewMatrix * vec4(normal, 0.0) ) );
        light = (0.2 + abs(N.z) * 0.8) * (1.0-AMBIENT) + N.x*N.x * XFAC + N.y*N.y * ZFAC + AMBIENT;
    } else {
        light = 1.0;
    }

    if (highlight == 2.0) {
        lift = 0.3;
    } else if (highlight == 1.0) {
        lift = 0.12;
    } else {
        lift = 0.0;
    }
    
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    gl_Position = projectionMatrix * mvPosition;
    
    vjp_weight_color = jp_weight_color;
}
