
// components/TrouserVisualizer.tsx
'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
// Import OrbitControls properly
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface TrouserVisualizerProps {
  fabricType: string;
  trouserColor: string;
}

export default function TrouserVisualizer({ fabricType, trouserColor }: TrouserVisualizerProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!mountRef.current) return;
    
    // Keep a reference to cleanup items
    let renderer: THREE.WebGLRenderer;
    let controls: OrbitControls;
    let currentTrousers: THREE.Group;
    
    // Setup scene
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight || 500;
    
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8f9fa);
    
    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1, 5);
    
    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    scene.add(directionalLight);
    
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-5, 2, -2);
    scene.add(fillLight);
    
    // Controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 3;
    controls.maxDistance = 10;
    
    // Helper function to shade colors
    function shadeColor(color: string, percent: number): string {
      let R = parseInt(color.substring(1, 3), 16);
      let G = parseInt(color.substring(3, 5), 16);
      let B = parseInt(color.substring(5, 7), 16);
    
      R = Math.max(0, Math.min(255, R + (R * percent / 100)));
      G = Math.max(0, Math.min(255, G + (G * percent / 100)));
      B = Math.max(0, Math.min(255, B + (B * percent / 100)));
    
      return "#" + ((1 << 24) + (Math.floor(R) << 16) + (Math.floor(G) << 8) + Math.floor(B)).toString(16).slice(1);
    }
    
    // Create simulated texture from fabric type
    function createFabricTexture(type: string, color: string): THREE.Texture {
      const textureSize = 512;
      const canvas = document.createElement('canvas');
      canvas.width = textureSize;
      canvas.height = textureSize;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        console.error("Could not get 2D context for texture canvas");
        // Return a default texture in case of failure
        return new THREE.Texture();
      }
      
      // Fill with base color
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, textureSize, textureSize);
      
      // Add texture pattern based on fabric type
      if (type === 'denim') {
        // Simulate denim diagonal pattern
        ctx.strokeStyle = '#2a4580';
        ctx.lineWidth = 1;
        for (let i = -textureSize; i < textureSize * 2; i += 4) {
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(i + textureSize, textureSize);
          ctx.stroke();
        }
        
        // Add some noise
        for (let i = 0; i < 5000; i++) {
          const x = Math.random() * textureSize;
          const y = Math.random() * textureSize;
          ctx.fillStyle = Math.random() > 0.5 ? '#4a67a5' : '#2a4580';
          ctx.fillRect(x, y, 1, 1);
        }
      } else if (type === 'cotton') {
        // Simulate cotton weave
        for (let i = 0; i < textureSize; i += 4) {
          for (let j = 0; j < textureSize; j += 4) {
            if ((i + j) % 8 === 0) {
              ctx.fillStyle = shadeColor(color, -10);
              ctx.fillRect(i, j, 2, 2);
            }
          }
        }
      } else {
        // Simulate chino texture (smoother)
        for (let i = 0; i < 3000; i++) {
          const x = Math.random() * textureSize;
          const y = Math.random() * textureSize;
          ctx.fillStyle = shadeColor(color, Math.random() * 10 - 5);
          ctx.fillRect(x, y, 1, 1);
        }
      }
      
      // Convert canvas to texture
      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(5, 5);
      
      return texture;
    }
    
    // Build the trousers
    function createTrousers(type: string, color: string): THREE.Group {
      // Create texture based on fabric type
      const texture = createFabricTexture(type, color);
      
      // Material
      const trouserMaterial = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: type === 'denim' ? 0.8 : (type === 'cotton' ? 0.6 : 0.4),
        metalness: 0.1,
        side: THREE.DoubleSide
      });
      
      // Create trouser group
      const trouserGroup = new THREE.Group();
      
      // Waist
      const waistGeometry = new THREE.CylinderGeometry(1.0, 0.95, 0.5, 32, 1, true);
      const waist = new THREE.Mesh(waistGeometry, trouserMaterial);
      waist.position.y = 1.25;
      waist.castShadow = true;
      trouserGroup.add(waist);
      
      // Hip area (connects waist to legs)
      const hipGeometry = new THREE.CylinderGeometry(0.95, 1.2, 0.7, 32, 1, true);
      const hip = new THREE.Mesh(hipGeometry, trouserMaterial);
      hip.position.y = 0.65;
      hip.castShadow = true;
      trouserGroup.add(hip);
      
      // Create legs
      function createLeg(isLeft: boolean): THREE.Group {
        const legGroup = new THREE.Group();
        const xOffset = isLeft ? 0.4 : -0.4;
        
        // Thigh
        const thighGeometry = new THREE.CylinderGeometry(0.55, 0.45, 1.5, 16, 8, true);
        const thigh = new THREE.Mesh(thighGeometry, trouserMaterial);
        thigh.position.set(xOffset, -0.15, 0);
        // Add slight bend for realism
        thigh.rotation.z = isLeft ? -0.05 : 0.05;
        thigh.castShadow = true;
        legGroup.add(thigh);
        
        // Knee area
        const kneeGeometry = new THREE.CylinderGeometry(0.45, 0.4, 0.4, 16, 4, true);
        const knee = new THREE.Mesh(kneeGeometry, trouserMaterial);
        knee.position.set(xOffset * 1.1, -1.1, 0);
        knee.castShadow = true;
        legGroup.add(knee);
        
        // Calf
        const calfGeometry = new THREE.CylinderGeometry(0.4, 0.35, 1.5, 16, 8, true);
        const calf = new THREE.Mesh(calfGeometry, trouserMaterial);
        calf.position.set(xOffset * 1.2, -2.05, 0);
        // Add slight bend at knee
        if (type !== 'chino') {
          calf.rotation.z = isLeft ? 0.08 : -0.08;
        }
        calf.castShadow = true;
        legGroup.add(calf);
        
        return legGroup;
      }
      
      // Add left and right legs
      trouserGroup.add(createLeg(true));
      trouserGroup.add(createLeg(false));
      
      // Add details
      
      // Belt loops
      const beltLoopGeometry = new THREE.BoxGeometry(0.05, 0.25, 0.1);
      const beltLoopMaterial = new THREE.MeshStandardMaterial({
        color: shadeColor(color, -15),
        roughness: 0.8
      });
      
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const beltLoop = new THREE.Mesh(beltLoopGeometry, beltLoopMaterial);
        beltLoop.position.set(
          Math.sin(angle) * 0.95,
          1.4,
          Math.cos(angle) * 0.95
        );
        beltLoop.rotation.y = angle + Math.PI / 2;
        trouserGroup.add(beltLoop);
      }
      
      // Front pockets
      const pocketMaterial = new THREE.MeshStandardMaterial({
        color: shadeColor(color, -5),
        roughness: 0.7,
        side: THREE.DoubleSide
      });
      
      function createFrontPocket(isLeft: boolean): THREE.Group {
        const pocketGroup = new THREE.Group();
        const xOffset = isLeft ? 0.6 : -0.6;
        
        // Pocket opening
        const pocketOpeningShape = new THREE.Shape();
        pocketOpeningShape.moveTo(0, 0);
        pocketOpeningShape.lineTo(0.4, 0);
        pocketOpeningShape.lineTo(0.3, -0.5);
        pocketOpeningShape.lineTo(-0.1, -0.5);
        pocketOpeningShape.lineTo(0, 0);
        
        const pocketOpeningGeometry = new THREE.ShapeGeometry(pocketOpeningShape);
        const pocketOpening = new THREE.Mesh(pocketOpeningGeometry, pocketMaterial);
        pocketOpening.position.set(xOffset, 0.7, -0.7);
        pocketOpening.rotation.set(-Math.PI / 3, isLeft ? -0.2 : 0.2, isLeft ? 0.1 : -0.1);
        pocketGroup.add(pocketOpening);
        
        return pocketGroup;
      }
      
      // Add front pockets
      trouserGroup.add(createFrontPocket(true));
      trouserGroup.add(createFrontPocket(false));
      
      // Back pockets
      function createBackPocket(isLeft: boolean): THREE.Mesh {
        const xOffset = isLeft ? 0.5 : -0.5;
        
        const pocketShape = new THREE.Shape();
        pocketShape.moveTo(0, 0);
        pocketShape.lineTo(0.3, 0);
        pocketShape.lineTo(0.3, 0.25);
        pocketShape.lineTo(0, 0.25);
        pocketShape.lineTo(0, 0);
        
        const pocketGeometry = new THREE.ShapeGeometry(pocketShape);
        const pocket = new THREE.Mesh(pocketGeometry, pocketMaterial);
        pocket.position.set(xOffset, 0.5, 0.7);
        pocket.rotation.set(Math.PI / 3, 0, 0);
        
        return pocket;
      }
      
      // Add back pockets
      trouserGroup.add(createBackPocket(true));
      trouserGroup.add(createBackPocket(false));
      
      // Add stitching details using LineSegments instead of LineLoop
      const stitchMaterial = new THREE.LineBasicMaterial({ 
        color: shadeColor(color, 20)
      });
      
      // Waist stitching
      const waistStitchPoints = [];
      for (let i = 0; i < 33; i++) {
        const angle = (i / 32) * Math.PI * 2;
        waistStitchPoints.push(new THREE.Vector3(
          Math.sin(angle) * 1.0,
          0, 
          Math.cos(angle) * 1.0
        ));
      }
      
      const waistStitchGeometry = new THREE.BufferGeometry().setFromPoints(waistStitchPoints);
      const waistStitch = new THREE.LineLoop(waistStitchGeometry, stitchMaterial);
      waistStitch.position.y = 1.5;
      trouserGroup.add(waistStitch);
      
      // Bottom hem stitching for each leg
      for (let leg = 0; leg < 2; leg++) {
        const xOffset = leg === 0 ? 0.45 : -0.45;
        const hemStitchPoints = [];
        for (let i = 0; i < 17; i++) {
          const angle = (i / 16) * Math.PI * 2;
          hemStitchPoints.push(new THREE.Vector3(
            Math.sin(angle) * 0.35,
            0,
            Math.cos(angle) * 0.35
          ));
        }
        
        const hemStitchGeometry = new THREE.BufferGeometry().setFromPoints(hemStitchPoints);
        const hemStitch = new THREE.LineLoop(hemStitchGeometry, stitchMaterial);
        hemStitch.position.set(xOffset * 1.3, -2.8, 0);
        trouserGroup.add(hemStitch);
      }
      
      // Add some creases/wrinkles for realism
      if (type !== 'chino') {
        // Knee wrinkles
        for (let leg = 0; leg < 2; leg++) {
          const xOffset = leg === 0 ? 0.43 : -0.43;
          for (let i = 0; i < 3; i++) {
            const wrinkleGeometry = new THREE.TorusGeometry(0.38, 0.02, 8, 8, Math.PI * 0.3);
            const wrinkle = new THREE.Mesh(wrinkleGeometry, trouserMaterial);
            wrinkle.position.set(xOffset * 1.1, -1.1 - (i * 0.07), 0);
            wrinkle.rotation.set(Math.PI / 2, 0, leg === 0 ? Math.PI * 0.25 : -Math.PI * 0.25);
            trouserGroup.add(wrinkle);
          }
        }
      }
      
      return trouserGroup;
    }
    
    // Create floor
    const floorGeometry = new THREE.CircleGeometry(3, 32);
    const floorMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xeeeeee,
      roughness: 0.8,
      metalness: 0.2,
      side: THREE.DoubleSide
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2.85;
    floor.receiveShadow = true;
    scene.add(floor);
    
    // Create trousers
    currentTrousers = createTrousers(fabricType, trouserColor);
    scene.add(currentTrousers);
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    
    // Start animation
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight || 500;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of resources
      scene.remove(currentTrousers);
      if (currentTrousers) {
        currentTrousers.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            if (object.geometry) object.geometry.dispose();
            if (object.material) {
              if (Array.isArray(object.material)) {
                object.material.forEach(material => material.dispose());
              } else {
                object.material.dispose();
              }
            }
          }
        });
      }
    };
  }, [fabricType, trouserColor]); // Re-create when these props change
  
  return (
    <div ref={mountRef} style={{ width: '100%', height: '500px' }} />
  );
}