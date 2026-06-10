// Motion Smear Effect
precision highp float;

varying vec2 vTexCoord;

uniform sampler2D uTexture;
uniform sampler2D uPreviousFrame;
uniform float uIntensity;
uniform float uMotionAmount;

void main() {
  vec4 currentFrame = texture2D(uTexture, vTexCoord);
  vec4 previousFrame = texture2D(uPreviousFrame, vTexCoord);
  
  // Blend current frame with previous frame based on intensity
  float blendFactor = uIntensity * uMotionAmount;
  vec4 result = mix(currentFrame, previousFrame, blendFactor);
  
  gl_FragColor = result;
}
