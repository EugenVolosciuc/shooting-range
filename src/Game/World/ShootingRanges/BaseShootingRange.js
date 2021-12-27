import * as THREE from "three";

import { SHOOTING_RANGE_PLAYER_ZONE_DEPTH } from "../../../constants";

export default class BaseShootingRange {
  constructor(roomSize, levelGroup, lightsMode) {
    this.roomSize = roomSize;
    this.levelGroup = levelGroup;
    this.lightsMode = lightsMode;

    this.setRoom();
    this.setLights();
  }

  setRoom() {
    const roomMaterial = new THREE.MeshStandardMaterial({ color: "darkgray" });

    const frontBackWallsGeometry = new THREE.PlaneGeometry(
      this.roomSize.width,
      this.roomSize.height
    );
    const leftRightWallsGeometry = new THREE.PlaneGeometry(
      this.roomSize.depth,
      this.roomSize.height
    );
    const floorRoofGeometry = new THREE.PlaneGeometry(
      this.roomSize.width,
      this.roomSize.depth
    );

    const roomZPos = -(
      this.roomSize.depth * 0.5 -
      SHOOTING_RANGE_PLAYER_ZONE_DEPTH
    );

    // Floor
    this.floor = new THREE.Mesh(floorRoofGeometry, roomMaterial);
    this.floor.position.z = roomZPos;
    this.floor.rotation.x = -Math.PI * 0.5;
    this.floor.receiveShadow = true;

    // Roof
    this.roof = new THREE.Mesh(floorRoofGeometry, roomMaterial);
    this.roof.position.set(0, this.roomSize.height, roomZPos);
    this.roof.rotation.x = Math.PI * 0.5;
    this.roof.receiveShadow = true;

    // Walls
    this.frontWall = new THREE.Mesh(frontBackWallsGeometry, roomMaterial);
    this.frontWall.position.set(
      0,
      this.roomSize.height * 0.5,
      roomZPos * 2 - SHOOTING_RANGE_PLAYER_ZONE_DEPTH
    );
    this.frontWall.receiveShadow = true;

    this.backWall = new THREE.Mesh(frontBackWallsGeometry, roomMaterial);
    this.backWall.position.set(
      0,
      this.roomSize.height * 0.5,
      SHOOTING_RANGE_PLAYER_ZONE_DEPTH
    );
    this.backWall.rotation.y = Math.PI;
    this.backWall.receiveShadow = true;

    this.leftWall = new THREE.Mesh(leftRightWallsGeometry, roomMaterial);
    this.leftWall.position.set(
      -(this.roomSize.width * 0.5),
      this.roomSize.height * 0.5,
      roomZPos
    );
    this.leftWall.rotation.y = Math.PI * 0.5;
    this.leftWall.receiveShadow = true;

    this.rightWall = new THREE.Mesh(leftRightWallsGeometry, roomMaterial);
    this.rightWall.position.set(
      this.roomSize.width * 0.5,
      this.roomSize.height * 0.5,
      roomZPos
    );
    this.rightWall.rotation.y = -(Math.PI * 0.5);
    this.rightWall.receiveShadow = true;

    this.levelGroup.add(
      this.roof,
      this.leftWall,
      this.rightWall,
      this.frontWall,
      this.backWall,
      this.floor
    );
  }

  setLights() {
    this.ambientLight = new THREE.AmbientLight("#ffffff", 0.5);
    // Point light
    this.roofLight1 = new THREE.PointLight("#ede698", 1.5, 0, 2);
    this.roofLight1.position.set(
      0,
      this.roomSize.height - 0.15,
      -(this.roomSize.depth * 0.15)
    );
    this.roofLight1.castShadow = true;

    this.roofLight2 = new THREE.PointLight("#ede698", 1.5, 0, 2);
    this.roofLight2.position.set(
      0,
      this.roomSize.height - 0.15,
      -(this.roomSize.depth * 0.45)
    );
    this.roofLight2.castShadow = true;

    this.levelGroup.add(this.ambientLight, this.roofLight1, this.roofLight2);
  }
}
