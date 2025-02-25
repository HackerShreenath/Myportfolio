import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('rendererContainer', { static: true }) rendererContainer!: ElementRef;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  private model!: THREE.Object3D | undefined;

  constructor() {}

  ngAfterViewInit(): void {
    this.initThreeJS();
    this.loadModel();
    this.animate();
    window.addEventListener('resize', this.onWindowResize, false);
  }

  private initThreeJS(): void {
    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x90EE90    ); // White Background

    // Camera
    const aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 100);
    this.camera.position.set(0, 2, 5);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

    // Lights
    const light = new THREE.AmbientLight(0xffffff, 1);
    this.scene.add(light);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(2, 2, 2);
    this.scene.add(directionalLight);

    // Orbit Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
  }

  private loadModel(): void {
    const loader = new GLTFLoader();
    console.log('Loading model...');
  
    loader.load(
      '/assets/models/stark.glb',
      (gltf) => {
        console.log('Model loaded successfully:', gltf);
        this.model = gltf.scene;
        this.scene.add(this.model);
      },
      (xhr) => {
        console.log(`Model loading: ${(xhr.loaded / xhr.total) * 100}% completed`);
      },
      (error) => {
        console.error('Error loading model:', error);
      }
    );
  }
  

  private animate = (): void => {
    requestAnimationFrame(this.animate);

    // if (this.model) {
    //   this.model.rotation.y += 0.01; // Rotate model continuously
    // }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };

  private onWindowResize = (): void => {
    const aspect = window.innerWidth / window.innerHeight;
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };
}

