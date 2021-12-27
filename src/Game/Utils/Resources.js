import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { EVENTS } from "../../constants";

import EventEmitter from "./EventEmitter";

export default class Resources extends EventEmitter {
  constructor(sources) {
    super();

    this.sources = sources;

    this.items = {};
    this.toLoad = this.sources.length;
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.loaders = {};
    this.loaders.gltfLoader = new GLTFLoader();
    this.loaders.textureLoader = new THREE.TextureLoader();
  }

  startLoading() {
    // Load each source
    for (const source of this.sources) {
      switch (source.type) {
        case "gltfModel":
          this.loaders.gltfLoader.load(source.path, (file) => {
            this.sourceLoaded(source, file);
          });
          break;
        case "texture":
          this.loaders.textureLoader.load(source.path, (file) => {
            this.sourceLoaded(source, file);
          });
          break;
      }
    }

    // Doing this because the trigger above fires before the listener is set on the World class
    // if (!this.sources.length) {
    //   setTimeout(() => {
    //     this.trigger(EVENTS.READY);
    //   }, 1000);
    // }
  }

  sourceLoaded(source, file) {
    this.items[source.name] = file;
    this.loaded++;

    if (this.loaded === this.toLoad) {
      this.trigger(EVENTS.READY);
    }
  }
}
