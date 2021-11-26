import {
  CircleGeometry,
  Mesh,
  MeshStandardMaterial,
  RepeatWrapping,
  sRGBEncoding,
} from 'three';
import Experience from '..';

export default class Floor {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.setGeometry();
    this.setTextures();
    this.setMaterial();
    this.setMesh();

    return this;
  }

  setGeometry() {
    this.geometry = new CircleGeometry(5, 64);
  }

  setTextures() {
    this.textures = {
      albedo: this.resources.items['dirtAlbedoMap'],
      normal: this.resources.items['dirtNormalMap'],
    };

    this.textures.albedo.encoding = sRGBEncoding;
    this.textures.albedo.repeat.set(1.5, 1.5);
    this.textures.albedo.wrapS = RepeatWrapping;
    this.textures.albedo.wrapT = RepeatWrapping;

    this.textures.normal.repeat.set(1.5, 1.5);
    this.textures.normal.wrapS = RepeatWrapping;
    this.textures.normal.wrapT = RepeatWrapping;
  }

  setMaterial() {
    this.material = new MeshStandardMaterial({
      map: this.textures.albedo,
      normalMap: this.textures.normal,
    });
  }

  setMesh() {
    this.mesh = new Mesh(this.geometry, this.material);
    this.mesh.rotation.x = -Math.PI * 0.5;
    this.mesh.receiveShadow = true;
    this.scene.add(this.mesh);
  }
}
