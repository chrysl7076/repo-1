import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const PRIORITY_BADGE = {
  High:   'bg-red-900/60 text-red-300 border border-red-700/50',
  Medium: 'bg-yellow-900/60 text-yellow-300 border border-yellow-700/50',
  Low:    'bg-green-900/60 text-green-300 border border-green-700/50',
};

function sphereColor(gap) {
  if (gap < 0)  return 0x10b981; // emerald — strength
  if (gap >= 5) return 0xe11d48; // red — critical
  if (gap >= 2) return 0xeab308; // yellow — developing
  return 0x22c55e;                // green — ready
}

function sphereRadius(gap) {
  if (gap <= 0) return 0.5;
  return Math.max(0.6, Math.min(1.9, gap * 0.3 + 0.35));
}

function gapTier(gap) {
  if (gap < 0)  return { label: `Strength +${Math.abs(gap)}`, cls: 'text-emerald-400 bg-emerald-900/40 border border-emerald-700/40' };
  if (gap >= 5) return { label: 'Critical',   cls: 'text-red-400 bg-red-900/40 border border-red-700/40' };
  if (gap >= 2) return { label: 'Developing', cls: 'text-yellow-400 bg-yellow-900/40 border border-yellow-700/40' };
  return { label: 'Ready', cls: 'text-green-400 bg-green-900/40 border border-green-700/40' };
}

function getBasePosition(i, total) {
  const angle = (i / total) * Math.PI * 2;
  const r = 6.5;
  return new THREE.Vector3(
    r * Math.cos(angle),
    Math.sin(i * 1.7) * 2,
    r * Math.sin(angle),
  );
}

function makeTextSprite(text) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 80;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 512, 80);
  // subtle shadow for legibility
  ctx.shadowColor = 'rgba(0,0,0,0.9)';
  ctx.shadowBlur = 8;
  ctx.font = 'bold 26px Arial, sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.92)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 256, 40);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(5.5, 0.85, 1);
  return sprite;
}

function matchRec(skill, recommendations) {
  const words = skill.skill.toLowerCase()
    .split(/\s+/)
    .filter(w => w.length > 3 && !['with', 'from', 'this', 'that', 'they', 'real', 'time'].includes(w));
  const found = recommendations.find(r => {
    const hay = (r.title + ' ' + r.description).toLowerCase();
    return words.some(w => hay.includes(w));
  });
  return found ?? recommendations.find(r => r.priority === 'High') ?? recommendations[0];
}

export default function GalaxyView({ skills, recommendations }) {
  const mountRef    = useRef(null);
  const controlsRef = useRef(null);
  const recsRef     = useRef(recommendations);
  recsRef.current   = recommendations;

  const [popup, setPopup] = useState(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const W = container.clientWidth  || 800;
    const H = container.clientHeight || 520;

    // ── Scene ────────────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050514);
    scene.fog = new THREE.FogExp2(0x050514, 0.016);

    // ── Camera ───────────────────────────────────────────────────────────────
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 200);
    camera.position.set(0, 4, 18);

    // ── Renderer ─────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // ── Lights ───────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0x334466, 1.1));

    const sun = new THREE.DirectionalLight(0xffffff, 1.5);
    sun.position.set(10, 15, 10);
    scene.add(sun);

    const purpleGlow = new THREE.PointLight(0x7c3aed, 4, 45);
    purpleGlow.position.set(-3, 6, 8);
    scene.add(purpleGlow);

    const blueGlow = new THREE.PointLight(0x0ea5e9, 2.5, 35);
    blueGlow.position.set(9, -5, -5);
    scene.add(blueGlow);

    // ── Stars ─────────────────────────────────────────────────────────────────
    const starPos = new Float32Array(500 * 3);
    for (let i = 0; i < 500 * 3; i++) starPos[i] = (Math.random() - 0.5) * 140;
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.14, sizeAttenuation: true })));

    // ── Nebula clouds ─────────────────────────────────────────────────────────
    [0x7c3aed, 0x0ea5e9, 0x4f46e5].forEach((color, ci) => {
      const pos = new Float32Array(70 * 3);
      for (let i = 0; i < 70; i++) {
        pos[i * 3]     = (Math.random() - 0.5) * 28 + (ci - 1) * 9;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 28 - 12;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      scene.add(new THREE.Points(geo, new THREE.PointsMaterial({ color, size: 0.28, transparent: true, opacity: 0.35, sizeAttenuation: true })));
    });

    // ── Skill spheres ─────────────────────────────────────────────────────────
    const meshes       = [];
    const basePositions = [];

    skills.forEach((skill, i) => {
      const gap   = skill.required - skill.current;
      const pos   = getBasePosition(i, skills.length);
      const r     = sphereRadius(gap);
      const color = sphereColor(gap);
      basePositions.push(pos.clone());

      // Core sphere
      const mat = new THREE.MeshPhongMaterial({
        color,
        emissive: new THREE.Color(color).multiplyScalar(0.35),
        shininess: 130,
        specular: new THREE.Color(0xffffff).multiplyScalar(0.4),
      });
      const mesh = new THREE.Mesh(new THREE.SphereGeometry(r, 48, 48), mat);
      mesh.position.copy(pos);
      mesh.userData = { skill };
      scene.add(mesh);
      meshes.push(mesh);

      // Soft glow shell
      const glowMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.1,
        side: THREE.BackSide,
      });
      mesh.add(new THREE.Mesh(new THREE.SphereGeometry(r * 1.4, 32, 32), glowMat));

      // Text label
      const label = makeTextSprite(skill.skill);
      label.position.set(0, r + 1.05, 0);
      mesh.add(label);
    });

    // ── OrbitControls ────────────────────────────────────────────────────────
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping    = true;
    controls.dampingFactor    = 0.06;
    controls.autoRotate       = true;
    controls.autoRotateSpeed  = 0.8;
    controls.minDistance      = 5;
    controls.maxDistance      = 38;
    controlsRef.current = controls;

    // ── Raycaster ────────────────────────────────────────────────────────────
    const raycaster = new THREE.Raycaster();
    const mouse     = new THREE.Vector2();

    function onClick(e) {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
      mouse.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(meshes, false);
      if (hits.length > 0) {
        const { skill } = hits[0].object.userData;
        const rec = matchRec(skill, recsRef.current);
        controls.autoRotate = false;
        setPopup({ skill, rec });
      } else {
        controls.autoRotate = true;
        setPopup(null);
      }
    }
    renderer.domElement.addEventListener('click', onClick);

    // ── Animation loop ────────────────────────────────────────────────────────
    let raf;
    const clock = new THREE.Clock();
    function animate() {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      meshes.forEach((mesh, i) => {
        mesh.position.y = basePositions[i].y + Math.sin(t * 0.55 + i * 1.1) * 0.35;
        mesh.rotation.y += 0.003;
      });
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    // ── Resize ────────────────────────────────────────────────────────────────
    function onResize() {
      const w = container.clientWidth  || 800;
      const h = container.clientHeight || 520;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener('resize', onResize);

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('click', onClick);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      setPopup(null);
    };
  }, [skills]);

  const gap       = popup ? popup.skill.required - popup.skill.current : 0;
  const isStrength = popup && gap < 0;

  return (
    <div className="relative rounded-xl overflow-hidden" style={{ height: '520px' }}>
      {/* Three.js mount */}
      <div ref={mountRef} className="w-full h-full" style={{ cursor: 'grab' }} />

      {/* Corner hint */}
      <div className="absolute top-3 left-3 text-xs text-white/35 pointer-events-none select-none">
        Drag to rotate · Scroll to zoom · Click a sphere
      </div>

      {/* Legend */}
      <div className="absolute bottom-3 left-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/55 pointer-events-none select-none">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />Critical (gap ≥5)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block" />Developing (gap 2–4)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-green-400 inline-block" />Ready / Strength (&lt;2)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: '#10b981' }} />Strength (current &gt; required)
        </span>
      </div>

      {/* Popup */}
      {popup && (
        <div className="absolute top-3 right-3 w-72 bg-slate-900/96 border border-purple-500/40 rounded-2xl p-5 backdrop-blur-md shadow-2xl z-10">
          {/* Close */}
          <button
            className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs flex items-center justify-center transition-colors"
            onClick={() => {
              setPopup(null);
              if (controlsRef.current) controlsRef.current.autoRotate = true;
            }}
          >
            ✕
          </button>

          {/* Tier badge */}
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold mb-3 ${gapTier(gap).cls}`}>
            {gapTier(gap).label}
          </div>

          {/* Skill name */}
          <h3 className="font-bold text-white text-sm leading-snug mb-3 pr-4">
            {popup.skill.skill}
          </h3>

          {/* Score row */}
          <div className="flex gap-5 text-xs mb-3">
            <div>
              <p className="text-slate-500 mb-0.5">Required</p>
              <p className="text-white font-bold text-xl leading-none">
                {popup.skill.required}
                <span className="text-slate-500 text-xs font-normal">/10</span>
              </p>
            </div>
            <div>
              <p className="text-slate-500 mb-0.5">Current</p>
              <p className="text-white font-bold text-xl leading-none">
                {popup.skill.current}
                <span className="text-slate-500 text-xs font-normal">/10</span>
              </p>
            </div>
            <div>
              <p className="text-slate-500 mb-0.5">Gap</p>
              <p className={`font-bold text-xl leading-none ${gap > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                {gap > 0 ? `+${gap}` : gap}
              </p>
            </div>
          </div>

          {/* Insight */}
          <p className="text-slate-400 text-xs leading-relaxed mb-4 border-l-2 border-purple-500/40 pl-3">
            {popup.skill.insight}
          </p>

          {/* Training recommendation */}
          {isStrength ? (
            <div className="bg-emerald-900/25 border border-emerald-700/30 rounded-xl p-3 text-xs text-emerald-300">
              This is a current strength — no training required. Leverage it as a bridge to adjacent XR skills.
            </div>
          ) : popup.rec ? (
            <div className="bg-purple-900/30 border border-purple-500/25 rounded-xl p-3">
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-xs font-semibold text-purple-300">Training Recommendation</p>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${PRIORITY_BADGE[popup.rec.priority] ?? 'bg-slate-700 text-slate-300'}`}>
                  {popup.rec.priority}
                </span>
              </div>
              <p className="text-xs font-medium text-white mb-1">{popup.rec.title}</p>
              <p className="text-xs text-slate-400 leading-relaxed">{popup.rec.description}</p>
              <p className="text-purple-400 text-xs mt-2 font-medium">{popup.rec.duration}</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
