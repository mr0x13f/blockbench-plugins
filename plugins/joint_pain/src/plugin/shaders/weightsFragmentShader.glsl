// Fragment shader used for the Weights view mode
// identical to solid apart from using a vertex attribute for color

uniform bool SHADE;
uniform float BRIGHTNESS;

varying float light;
varying float lift;
varying vec3 vjp_weights_color;

void main(void) {

    gl_FragColor = vec4(lift + vjp_weights_color * light * BRIGHTNESS, 1.0);

    if (lift > 0.1) {
        gl_FragColor.b = gl_FragColor.b * 1.16;
        gl_FragColor.g = gl_FragColor.g * 1.04;
    }
    if (lift > 0.2) {
        gl_FragColor.r = gl_FragColor.r * 0.6;
        gl_FragColor.g = gl_FragColor.g * 0.7;
    }

}
