import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const NetworkVisualization3D = ({ nodes = [], links = [], selectedNode = null }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;
    
    // Clean up any existing scene
    if (rendererRef.current) {
      rendererRef.current.dispose();
    }
    if (sceneRef.current && mountRef.current.children[0]) {
      mountRef.current.removeChild(mountRef.current.children[0]);
    }

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color("#ffffff");
    // scene.background = new THREE.Color("#f8fafc");
    //background color

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    rendererRef.current = renderer;
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Create nodes
    const nodeObjects = [];
    const nodeCount = nodes.length || 50; // Use provided nodes or default to 50
    const geometry = new THREE.SphereGeometry(0.1, 32, 32);
    const material = new THREE.MeshPhongMaterial({ color: "#4f46e5" });
    const selectedMaterial = new THREE.MeshPhongMaterial({ color: "#ef4444" });

    // Position nodes in a more distributed manner
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 2 + Math.random();
      const height = Math.random() * 2 - 1;
      
      const node = new THREE.Mesh(
        geometry,
        selectedNode && nodes[i]?.id === selectedNode.id ? selectedMaterial : material
      );
      
      node.position.x = Math.cos(angle) * radius;
      node.position.y = height;
      node.position.z = Math.sin(angle) * radius;
      
      node.userData = nodes[i] || { id: `node-${i}` };
      nodeObjects.push(node);
      scene.add(node);
    }

    // Create edges between nodes
    const edgeMaterial = new THREE.LineBasicMaterial({ 
      color: "#6366f1",
      opacity: 0.3,
      transparent: true 
    });

    // Create more interesting connection patterns
    for (let i = 0; i < nodeObjects.length; i++) {
      // Connect to next 2-3 nodes
      for (let j = 1; j <= 2 + Math.floor(Math.random() * 2); j++) {
        const targetIndex = (i + j) % nodeObjects.length;
        const points = [
          nodeObjects[i].position,
          nodeObjects[targetIndex].position
        ];
        
        const edgeGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const edge = new THREE.Line(edgeGeometry, edgeMaterial);
        scene.add(edge);
      }
      
      // Add some random cross-connections
      if (Math.random() > 0.7) {
        const randomTarget = Math.floor(Math.random() * nodeObjects.length);
        const points = [
          nodeObjects[i].position,
          nodeObjects[randomTarget].position
        ];
        
        const edgeGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const edge = new THREE.Line(edgeGeometry, edgeMaterial);
        scene.add(edge);
      }
    }

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Animation
    function animate() {
      requestAnimationFrame(animate);
      controls.update();

      // Add subtle rotation to nodes
      nodeObjects.forEach(node => {
        node.rotation.x += 0.002;
        node.rotation.y += 0.002;
      });

      renderer.render(scene, camera);
    }
    animate();

    // Handle resize
    function handleResize() {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    }

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      selectedMaterial.dispose();
      if (mountRef.current?.children[0]) {
        mountRef.current.removeChild(mountRef.current.children[0]);
      }
    };
  }, [nodes, links, selectedNode]);

  return <div ref={mountRef} className="w-full h-full" />;
};

export default NetworkVisualization3D;