uniform float uWind;
uniform float uTime;

varying vec2 vUv;
varying vec3 vPos;
varying float vFogDist;
varying float vFogRim;
varying float vFogNoise;

#pragma glslify: snoise4 = require(glsl-noise/simplex/4d)

void main() {
  vec3 pos = position;

  vec4 modelPos = modelMatrix * vec4(pos, 1.0);

  gl_Position = projectionMatrix * viewMatrix * modelPos;

  vUv = uv;
  vPos = modelPos.xyz;
  vFogDist = distance(modelPos.xyz, cameraPosition);
  vFogRim = length(modelPos.xz);
  vFogNoise = clamp(snoise4(vec4(modelPos.xyz * 0.1, uTime * 0.1)), 0.0, 1.0) * 5.0;
}