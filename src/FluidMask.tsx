import * as React from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

/** ---------- Shaders ---------- **/
const vert = /* glsl */ `
  varying vec2 vUv;
  void main () {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

// ruído clássico + FBM p/ aspecto “tinta”
const frag = /* glsl */ `
  precision highp float;
  varying vec2 vUv;

  uniform sampler2D u_base;
  uniform sampler2D u_fire;

  uniform vec2  u_res;         // pixels
  uniform float u_time;        // segundos
  uniform vec2  u_mouse;       // 0..1 (y invertido já)
  uniform float u_active;      // 1 quando mouse ativo recente

  uniform vec2  u_scale;       // ajuste do fogo (X=largura, Y=altura)
  uniform vec2  u_offsetPx;    // offset do fogo em pixels (X,Y)

  // metaballs / “pingos” (x,y, raio)
  const int MAX_SPLATS = 12;
  uniform vec3 u_splats[MAX_SPLATS];
  uniform int  u_scount;

  /* --- Simplex noise / FBM --- */
  // (Implementação compacta – suficiente p/ fluid-like)
  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)),
             dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0*fract(sin(p)*43758.5453123);
  }
  float noise(in vec2 p){
    const float K1 = 0.366025404; // (sqrt(3)-1)/2;
    const float K2 = 0.211324865; // (3-sqrt(3))/6;
    vec2 i = floor(p + (p.x+p.y)*K1);
    vec2 a = p - i + (i.x+i.y)*K2;
    vec2 o = (a.x>a.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
    vec2 b = a - o + K2;
    vec2 c = a - 1.0 + 2.0*K2;
    vec3 h = max(0.5-vec3(dot(a,a), dot(b,b), dot(c,c)), 0.0);
    vec3 n = h*h*h*h*vec3( dot(a,hash2(i+0.0)), dot(b,hash2(i+o)), dot(c,hash2(i+1.0)));
    return dot(n, vec3(70.0));
  }
  float fbm(vec2 p){
    float f = 0.0;
    float amp = 0.5;
    for(int i=0;i<5;i++){
      f += amp * noise(p);
      p = p*2.02 + vec2(0.15, -0.13);
      amp *= 0.55;
    }
    return f;
  }

  void main(){
    vec2 uv = vUv;

    // --- Ajuste do sampling do FIRE p/ alinhar com a base (seu scale/offset) ---
    vec2 px = 1.0 / u_res;
    vec2 uvFire = uv;
    // desloca em pixels no X/Y
    uvFire += u_offsetPx * px;
    // re-centra, aplica escala diferente, volta
    uvFire -= 0.5;
    uvFire /= u_scale;          // escala não uniforme
    uvFire += 0.5;

    vec4 baseCol = texture2D(u_base, uv);
    vec4 fireCol = texture2D(u_fire, uvFire);

    // --- Campo “líquido” base com FBM animado ---
    float t = u_time;
    float speed = 0.08;
    float n = fbm(uv*3.0 + vec2(0.0, t*speed));
    // bordas suavizadas (vinheta sutil)
    float vign = smoothstep(0.95, 0.55, length(uv-0.5));
    n = mix(n, n+0.25*vign, 0.35);

    // --- Metaballs (pingos/gotas) interativas + idle ---
    float field = 0.0;
    for(int i=0;i<MAX_SPLATS;i++){
      if(i >= u_scount) break;
      vec2 p = u_splats[i].xy;     // 0..1
      float r = u_splats[i].z;     // raio relativo (0..0.5)
      float d = distance(uv, p);
      // influência com cauda suave (tipo “ink”)
      float s = smoothstep(r, 0.0, d) * smoothstep(1.5*r, r, d);
      field += s;
    }

    // mouse influencia como “solvente” quando ativo
    float mouseInk = 0.0;
    if(u_active > 0.5){
      float r = 0.10;
      float d = distance(uv, u_mouse);
      mouseInk = smoothstep(r, 0.0, d);
    }

    // mascara final: FBM + metaballs + mouse
    float mask = n*0.55 + field*1.1 + mouseInk*1.2;
    // efeito de tinta sem círculo rígido, usa noise orgânico
mask = smoothstep(0.35, 0.6, mask + 0.25 * fbm(uv * 4.0 + vec2(u_time * 0.15)));

    // composição: revela fogo onde há tinta
    vec3 col = mix(baseCol.rgb, fireCol.rgb, mask);

    gl_FragColor = vec4(col, 1.0);
  }
`;

/** ---------- React Component (Plane + uniforms + interação) ---------- **/
type Props = {
  baseUrl: string;
  fireUrl: string;
  fireScaleX?: number;
  fireScaleY?: number;
  fireOffsetX?: number; // px
  fireOffsetY?: number; // px
};

function FullscreenQuad({
  baseUrl,
  fireUrl,
  fireScaleX = 1.05,
  fireScaleY = 1.45,
  fireOffsetX = 15,
  fireOffsetY = 0,
}: Props) {
  const { size } = useThree();
  const base = useTexture(baseUrl);
  const fire = useTexture(fireUrl);

  // garante filtros suaves
  React.useMemo(() => {
    [base, fire].forEach((tex) => {
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.anisotropy = 4;
    });
  }, [base, fire]);

  // estado de interação/idle
  const [active, setActive] = React.useState(0); // 1 enquanto o mouse mexeu recentemente
  const activeRef = React.useRef(0);
  const mouse = React.useRef(new THREE.Vector2(0.5, 0.5));
  const lastMove = React.useRef(0);

  // gotas/metaballs
  const MAX = 12;
  const splats = React.useRef(
    Array.from({ length: MAX }, () => new THREE.Vector3(Math.random(), Math.random(), 0.05))
  );
  const scount = React.useRef(MAX);

  // material
  const matRef = React.useRef<THREE.ShaderMaterial>(null!);

  // interação do mouse (coordenadas normalizadas 0..1)
  const onPointerMove = React.useCallback(
    (e: THREE.Event) => {
      const ev = e as any;
      const x = ev.pointer.x; // -1..1 no R3F
      const y = ev.pointer.y;
      mouse.current.set((x + 1) * 0.5, 1.0 - (y + 1) * 0.5);
      lastMove.current = performance.now();
      activeRef.current = 1;
      setActive(1);
    },
    []
  );

  // animação
  useFrame((_state, dt) => {
    const m = matRef.current;
    if (!m) return;

    // idle: se o mouse parou, move um “pincel fantasma” em curva Lissajous
    const now = performance.now();
    const idle = now - lastMove.current > 1800;
    if (idle) {
      const t = now * 0.001;
      const lx = 0.5 + 0.18 * Math.sin(t * 0.8) * Math.cos(t * 0.33 + 1.7);
      const ly = 0.45 + 0.18 * Math.cos(t * 0.6) * Math.sin(t * 0.27 + 0.9);
      mouse.current.set(lx, ly);
      activeRef.current = 0;
      if (active !== 0) setActive(0);
    }

    // atualiza splats (gotas) com leve drift
    for (let i = 0; i < scount.current; i++) {
      const s = splats.current[i];
      // evapora e renasce
      s.z *= 0.995; // raio vai diminuindo
      if (s.z < 0.01) {
        s.set(Math.random(), Math.random(), 0.08 + Math.random() * 0.08);
      }
      // drift suave (sobe com ruído)
      const t = now * 0.00025 + i * 12.3;
      s.y -= 0.0006 + 0.0004 * Math.sin(t * 3.1);
      s.x += 0.0005 * Math.sin(t * 2.7);
      if (s.y < -0.1) s.y = 1.1;
    }

    // envia uniforms
    m.uniforms.u_time.value += dt;
    m.uniforms.u_res.value.set(size.width, size.height);
    m.uniforms.u_mouse.value.copy(mouse.current);
    m.uniforms.u_active.value = activeRef.current;
    m.uniforms.u_scale.value.set(fireScaleX, fireScaleY);
    m.uniforms.u_offsetPx.value.set(fireOffsetX, fireOffsetY);

    // splats → uniforms
    const arr = m.uniforms.u_splats.value as THREE.Vector3[];
    for (let i = 0; i < MAX; i++) {
      arr[i].copy(splats.current[i]);
    }
  });

  // material + mesh fullscreen
  const uniforms = React.useMemo(
    () => ({
      u_base: { value: base },
      u_fire: { value: fire },
      u_res: { value: new THREE.Vector2(size.width, size.height) },
      u_time: { value: 0 },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_active: { value: 0 },
      u_scale: { value: new THREE.Vector2(fireScaleX, fireScaleY) },
      u_offsetPx: { value: new THREE.Vector2(fireOffsetX, fireOffsetY) },
      u_splats: {
        value: Array.from({ length: MAX }, () => new THREE.Vector3()),
      },
      u_scount: { value: MAX },
    }),
    [base, fire, size, fireScaleX, fireScaleY, fireOffsetX, fireOffsetY]
  );

  return (
    <mesh onPointerMove={onPointerMove}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vert}
        fragmentShader={frag}
        uniforms={uniforms}
        transparent={false}
      />
    </mesh>
  );
}

/** ---------- Wrapper pronto para usar ---------- **/
export default function FluidMask(props: Props) {
  return (
    <Canvas
      orthographic
      camera={{ position: [0, 0, 1], zoom: 1 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
onCreated={({ gl }) => {
  gl.setClearColor("#000000", 0); // fundo preto idêntico à página, mas sem camada cinza
}}
      style={{ position: "absolute", inset: 0 }}
    >
      <FullscreenQuad {...props} />
    </Canvas>
  );
}
