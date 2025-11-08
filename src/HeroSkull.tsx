import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function HeroSkull() {
  const containerRef = useRef<HTMLDivElement>(null);
  const skullRef = useRef<HTMLImageElement>(null);
  const fireRef = useRef<HTMLImageElement>(null);

  const idleTL = useRef<gsap.core.Timeline | null>(null);
  const idleTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [loaded, setLoaded] = useState(false);

  // === Ajuste das proporções das duas imagens (teu ajuste) ===
  useEffect(() => {
    const skull = skullRef.current;
    const fire = fireRef.current;
    if (!skull || !fire) return;

    const checkSizes = () => {
      if (skull.naturalWidth && fire.naturalWidth) {
        const ratioW = skull.naturalWidth / fire.naturalWidth;
        const ratioH = skull.naturalHeight / fire.naturalHeight;

        // 🔥 Ajuste fino — proporção e leve deslocamento
        const scaleX = 1.05;
        const scaleY = 1.45;
        const offsetX = 15; // move ligeiro à esquerda

        fire.style.transform = `translate(calc(-50% + ${offsetX}px), -50%) scale(${
          ratioW * scaleX
        }, ${ratioH * scaleY})`;
        skull.style.transform = "translate(-50%, -50%)";

        setLoaded(true);
      } else {
        setTimeout(checkSizes, 100);
      }
    };

    checkSizes();
  }, []);

  // === Máscara por CSS (segue o mouse) + idle automático ===
  useEffect(() => {
    if (!loaded) return;
    const el = containerRef.current;
    if (!el) return;

    // target = onde o mouse está; pos = ponto atual suavizado
    const pos = { x: el.clientWidth / 2, y: el.clientHeight / 2 };
    const target = { x: pos.x, y: pos.y };

    const setVars = () => {
      // aplica posição da máscara em coordenadas relativas ao container
      el.style.setProperty("--x", `${pos.x}px`);
      el.style.setProperty("--y", `${pos.y}px`);
    };

    // animação contínua para suavização (lerp)
    let raf = 0;
    const loop = () => {
      // suaviza a aproximação (quanto maior, mais rápido)
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      setVars();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // idle: balança suavemente quando não há mouse
    const startIdle = () => {
      stopIdle();
      const w = el.clientWidth;
      const h = el.clientHeight;
      idleTL.current = gsap.timeline({ repeat: -1, yoyo: true });
      idleTL.current
        .to(target, {
          duration: 3,
          x: w / 2 + 120,
          y: h / 2 - 70,
          ease: "sine.inOut",
          onUpdate: setVars,
        })
        .to(target, {
          duration: 3,
          x: w / 2 - 120,
          y: h / 2 + 70,
          ease: "sine.inOut",
          onUpdate: setVars,
        });
    };
    const stopIdle = () => {
      if (idleTL.current) {
        idleTL.current.kill();
        idleTL.current = null;
      }
    };

    // mouse move relativo ao container (corrige desalinhamento)
    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      target.x = e.clientX - rect.left;
      target.y = e.clientY - rect.top;

      // pausar idle e retomar depois de um tempo sem interação
      stopIdle();
      if (idleTimeout.current) clearTimeout(idleTimeout.current);
      idleTimeout.current = setTimeout(startIdle, 1800);
    };

    // inicializa
    setVars();
    startIdle();
    window.addEventListener("mousemove", onMouseMove);

    // cleanup
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      stopIdle();
      if (idleTimeout.current) clearTimeout(idleTimeout.current);
      cancelAnimationFrame(raf);
    };
  }, [loaded]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center bg-black overflow-hidden"
      // valores iniciais da máscara no centro
      style={{ ["--x" as any]: "50vw", ["--y" as any]: "50vh" }}
    >
      {/* Caveira base */}
      <img
        ref={skullRef}
        src="/skull.png"
        alt="Skull normal"
        className="skull-auto z-[1]"
      />

      {/* Caveira com fogo (revelada pela máscara CSS) */}
      <img
        ref={fireRef}
        src="/skull-bluefire.png"
        alt="Skull fire"
        className="skull-auto skull-fire z-[2]"
      />
    </section>
  );
}
