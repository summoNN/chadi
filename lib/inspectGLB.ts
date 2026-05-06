/**
 * GLB NODE INSPECTOR
 * Run this in the browser console after the page loads
 * to see all mesh names in your hero.glb file.
 *
 * Usage: paste this in DevTools console
 */

// Method 1: Via R3F scene (if scene is accessible)
function inspectGLBNodes() {
  // This uses the Three.js global if available via R3F
  const canvases = document.querySelectorAll("canvas");
  console.log("Found", canvases.length, "canvas element(s)");
  console.log(
    "To inspect the GLB nodes, look at the Network tab for hero.glb and use the gltf-transform CLI:"
  );
  console.log("  npx gltf-transform inspect public/hero.glb");
  console.log("");
  console.log(
    "Or run this in the browser after the scene loads:"
  );
  console.log(`
    // Get the R3F fiber root
    import { useGLTF } from '@react-three/drei'
    const { nodes } = useGLTF('/hero.glb')
    console.log('Nodes:', Object.keys(nodes))
  `);
}

inspectGLBNodes();

/**
 * MESH NAME MAPPING
 * Once you know your mesh names, update TV_CONFIG in components/TVModel.tsx
 *
 * Current fallback logic:
 * - Name contains "CHADI" → scrolls to #about
 * - Name contains "VIDEASTZ" or "MOTION" → scrolls to #projects
 * - Name contains "LOGO", "TV3", "TV_3" → scrolls to #home
 * - Otherwise: assigns by order (first 3 meshes found)
 *
 * To add a new mapping, update getConfigForMesh() in TVModel.tsx:
 *
 * function getConfigForMesh(name: string) {
 *   const upper = name.toUpperCase();
 *   if (upper.includes("YOUR_MESH_NAME")) return TV_CONFIG.CHADI;
 *   ...
 * }
 */
