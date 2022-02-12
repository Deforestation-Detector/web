uniform float uWind;
uniform float uTime;

varying vec2 vUv;
varying vec3 vPos;
varying float vFogDist;

void main() {
  vec3 pos = position;

  vec4 modelPos = modelMatrix * vec4(pos, 1.0);

  gl_Position = projectionMatrix * viewMatrix * modelPos;

  vUv = uv;
  vPos = modelPos.xyz;
  vFogDist = distance(modelPos.xyz, cameraPosition);
}