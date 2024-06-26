import * as THREE from 'three';
import {entity} from './entity.js';


export const third_person_camera = (() => {
  
  class ThirdPersonCamera extends entity.Component {
    static CLASS_NAME = 'ThirdPersonCamera';

    get NAME() {
      return ThirdPersonCamera.CLASS_NAME;
    }

    constructor(params) {
      super();

      this._params = params;
      this._camera = params.camera;

      this._currentPosition = new THREE.Vector3();
      this._currentLookat = new THREE.Vector3();
    }

    _CalculateIdealOffset() {
      const idealOffset = new THREE.Vector3(-0, 10, -15);
      idealOffset.applyQuaternion(this._params.target._rotation);
      idealOffset.add(this._params.target._position);
      return idealOffset;
    }

    _CalculateIdealLookat() {
      const idealLookat = new THREE.Vector3(0, 5, 20);
      idealLookat.applyQuaternion(this._params.target._rotation);
      idealLookat.add(this._params.target._position);
      return idealLookat;
    }

    Update(timeElapsed) {
      const idealOffset = this._CalculateIdealOffset();
      const idealLookat = this._CalculateIdealLookat();

      // const t = 0.05;
      // const t = 4.0 * timeElapsed;
      const t = 1.0 - Math.pow(0.01, timeElapsed);

      this._currentPosition.lerp(idealOffset, t);
      this._currentLookat.lerp(idealLookat, t);

      this._camera.position.copy(this._currentPosition);
      this._camera.lookAt(this._currentLookat);
    }
  }

  return {
    ThirdPersonCamera: ThirdPersonCamera
  };

})();