varying vec2 vUv;
varying vec3 vPos;
varying float vFogDist;
varying float vFogRim;

void main() {
  vec4 modelPos = modelMatrix * vec4(position, 1.0);

  gl_Position = projectionMatrix * viewMatrix * modelPos;

  vUv = uv;
  vPos = modelPos.xyz;
  vFogDist = distance(modelPos.xyz, cameraPosition);
  vFogRim = length(modelPos.xz);
}