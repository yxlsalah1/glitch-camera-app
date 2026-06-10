// RGB Split Distortion Effect
precision highp float;

varying vec2 vTexCoord;

uniform sampler2D uTexture;
uniform float uIntensity;
uniform float uTime;

void main() {
  // Create offset based on intensity and time
  float offset = uIntensity * 0.02 * sin(uTime * 2.0);
  
  // Sample RGB channels with offset
  float r = texture2D(uTexture, vTexCoord + vec2(offset, 0.0)).r;
  float g = texture2D(uTexture, vTexCoord).g;
  float b = texture2D(uTexture, vTexCoord - vec2(offset, 0.0)).b;
  
  // Combine channels
  gl_FragColor = vec4(r, g, b, 1.0);
}
