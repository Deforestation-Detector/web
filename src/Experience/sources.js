import envMapPx from '../img/envMap/px.jpg';
import envMapNx from '../img/envMap/nx.jpg';
import envMapPy from '../img/envMap/py.jpg';
import envMapNy from '../img/envMap/ny.jpg';
import envMapPz from '../img/envMap/pz.jpg';
import envMapNz from '../img/envMap/nz.jpg';

import dirtAlbedo from '../img/floor/albedo.jpg';
import dirtNormal from '../img/floor/normal.jpg';

import foxModel from '../models/fox/Fox.gltf';

export default [
  {
    name: 'envMapTexture',
    type: 'cubeTexture',
    path: [envMapPx, envMapNx, envMapPy, envMapNy, envMapPz, envMapNz],
  },
  {
    name: 'dirtAlbedoMap',
    type: 'texture',
    path: dirtAlbedo,
  },
  {
    name: 'dirtNormalMap',
    type: 'texture',
    path: dirtNormal,
  },
  {
    name: 'foxModel',
    type: 'gltfModel',
    path: foxModel,
  },
];
