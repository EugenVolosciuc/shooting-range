import * as THREE from "three";

import Game from "../..";
import { SHOOTING_RANGE_PLAYER_ZONE_DEPTH } from "../../../constants";

export default class ShootingBooth1 {
  constructor(roomSize, levelGroup) {
    this.game = new Game();
    this.debug = this.game.debug;
    this.renderer = this.game.renderer;
    this.resources = this.game.resources;
    this.group = new THREE.Group();
    this.roomSize = roomSize;
    this.levelGroup = levelGroup;

    this.setTextures();
    this.setBooth();
  }

  setTextures() {
    this.textures = {
      wood: {},
      bricks: {},
    };

    this.textures.bricks.color = this.resources.items.bricksColorTexture;
    this.textures.bricks.color.encoding = THREE.sRGBEncoding;
    this.textures.bricks.color.minFilter = THREE.NearestFilter;
    this.textures.bricks.color.magFilter = THREE.NearestFilter;
    this.textures.bricks.color.anisotropy = this.renderer.maxAnisotropy;

    this.textures.bricks.normal = this.resources.items.bricksNormalTexture;

    this.textures.bricks.ambientOcclusion =
      this.resources.items.bricksAmbientOcclusionTexture;
    this.textures.bricks.ambientOcclusion.encoding = THREE.sRGBEncoding;

    this.textures.bricks.roughness =
      this.resources.items.bricksRoughnessTexture;

    this.textures.wood.color = this.resources.items.wood1ColorTexture;
    this.textures.wood.color.encoding = THREE.sRGBEncoding;

    this.textures.wood.normal = this.resources.items.wood1NormalTexture;

    this.textures.wood.ambientOcclusion =
      this.resources.items.wood1AmbientOcclusionTexture;

    this.textures.wood.roughness = this.resources.items.wood1RoughnessTexture;
  }

  setBooth() {
    const leftRightWallWidth = 1;
    const lowerWallWidth = 1.5;
    const lowerWallHeight = 1;
    const counterDepth = 0.4;
    const counterHeight = 0.1;

    const leftRightWallGeometry = new THREE.PlaneGeometry(
      leftRightWallWidth,
      this.roomSize.height
    );
    leftRightWallGeometry.setAttribute(
      "uv2",
      new THREE.Float32BufferAttribute(
        leftRightWallGeometry.attributes.uv.array,
        2
      )
    );

    const lowerWallGeometry = new THREE.PlaneGeometry(
      lowerWallWidth,
      lowerWallHeight
    );

    const counterGeometry = new THREE.BoxGeometry(
      lowerWallWidth,
      counterHeight,
      counterDepth,
      60,
      60
    );
    counterGeometry.setAttribute(
      "uv2",
      new THREE.Float32BufferAttribute(counterGeometry.attributes.uv.array, 2)
    );

    const bricksMaterial = new THREE.MeshStandardMaterial({
      map: this.textures.bricks.color,
      normalMap: this.textures.bricks.normal,
      aoMap: this.textures.bricks.ambientOcclusion,
      aoMapIntensity: 0.8,
      roughnessMap: this.textures.bricks.roughness,
    });

    console.log("this.textures.wood.roughness", this.textures.wood.roughness);

    const woodMaterial = new THREE.MeshStandardMaterial({
      map: this.textures.wood.color,
      normalMap: this.textures.wood.normal,
      aoMap: this.textures.wood.ambientOcclusion,
      aoMapIntensity: 0.8,
      roughnessMap: this.textures.wood.roughness,
    });

    this.leftWall = new THREE.Mesh(leftRightWallGeometry, bricksMaterial);
    this.leftWall.position.set(
      -lowerWallWidth * 0.5,
      this.roomSize.height * 0.5,
      -leftRightWallWidth * 0.25
    );
    this.leftWall.rotation.y = Math.PI * 0.5;
    this.leftWall.castShadow = true;
    this.leftWall.receiveShadow = true;

    this.rightWall = new THREE.Mesh(leftRightWallGeometry, bricksMaterial);
    this.rightWall.position.set(
      lowerWallWidth * 0.5,
      this.roomSize.height * 0.5,
      -(leftRightWallWidth * 0.25)
    );
    this.rightWall.rotation.y = -(Math.PI * 0.5);
    this.rightWall.castShadow = true;
    this.rightWall.receiveShadow = true;

    this.lowerWall = new THREE.Mesh(lowerWallGeometry, bricksMaterial);
    this.lowerWall.position.set(
      0,
      lowerWallHeight * 0.5,
      -leftRightWallWidth * 0.75
    );
    this.lowerWall.castShadow = true;
    this.lowerWall.receiveShadow = true;

    this.counter = new THREE.Mesh(counterGeometry, woodMaterial);
    this.counter.position.set(
      0,
      lowerWallHeight,
      -(leftRightWallWidth * 0.75 - counterDepth * 0.5)
    );
    this.counter.castShadow = true;
    this.counter.receiveShadow = true;

    this.group.add(this.leftWall, this.rightWall, this.lowerWall, this.counter);
    this.levelGroup.add(this.group);
  }
}
