"use client";

import { useRef } from "react";
import { flushSync } from "react-dom";
import { motion } from "motion/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { IceCream, Cake, Couch, MapPin, NavigationArrow, Phone } from "@phosphor-icons/react";
import { BorderBeam } from "@/components/ui/border-beam";
import { MagicCard } from "@/components/ui/magic-card";
import { Marquee } from "@/components/ui/marquee";
import { Reveal, Wrap, flipTheme } from "@/components/kit";
import { Faq, MapFrame, useDark } from "@/components/blocks";
import { T, useLang, useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

const TEL = "tel:+14697776077", PHONE = "(469) 777-6077";
const DIR = "https://www.google.com/maps/dir/?api=1&destination=3000+Northside+Blvd+Ste+700+Richardson+TX+75080";
const SCOOPS = [["s1", IceCream, "#ffb3d1"], ["s2", Cake, "#99e6c7"], ["s3", Couch, "#ffd166"]] as const;

const btn = "inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-[15px] font-bold transition-[transform,background-color] duration-300 ease-spring hover:-translate-y-0.5 active:scale-[.96]";
const primary = cn(btn, "bg-btn text-btnfg shadow-[0_14px_30px_-14px_var(--shadow)]");
const ghost = cn(btn, "bg-card text-ink shadow-[inset_0_0_0_1px_var(--line)]");
const eyebrow = "mb-3 block text-[13px] font-bold tracking-[.16em] text-berrytext uppercase";

/** Language: a vinyl record. Side A plays English, flip it to side B for Spanish. */
function Vinyl() {
  const { lang, setLang } = useLang();
  const es = lang === "es";
  const side = "absolute inset-0 grid place-items-center rounded-full bg-[repeating-radial-gradient(circle,#1b1530_0_1.5px,#2a2148_1.5px_3px)] shadow-[0_4px_10px_-3px_var(--shadow)] [backface-visibility:hidden]";
  return (
    <motion.button type="button" onClick={() => setLang(es ? "en" : "es")} aria-label={es ? "Switch to English" : "Cambiar a español"} whileHover={{ rotate: 30 }}
      className="size-12 flex-none cursor-pointer [perspective:300px]">
      <motion.span animate={{ rotateY: es ? 180 : 0 }} transition={{ type: "spring", stiffness: 120, damping: 14 }} className="relative block size-full [transform-style:preserve-3d]">
        <span className={side}><span className="grid size-[22px] place-items-center rounded-full bg-berry font-display text-[8.5px] text-[#24183f]">A·EN</span></span>
        <span className={cn(side, "[transform:rotateY(180deg)]")}><span className="grid size-[22px] place-items-center rounded-full bg-mint font-display text-[8.5px] text-[#24183f]">B·ES</span></span>
      </motion.span>
    </motion.button>
  );
}

/** Theme: a lava lamp that switches on at night, blobs drifting up and down. */
function LavaLamp() {
  const { dark, setTheme } = useDark();
  const { lang } = useLang();
  return (
    <button type="button" aria-label={lang === "es" ? "Cambiar modo oscuro" : "Toggle dark mode"} aria-pressed={dark}
      onClick={e => flipTheme(e.currentTarget, () => flushSync(() => setTheme(dark ? "light" : "dark")))} className="h-[54px] w-[30px] flex-none cursor-pointer">
      <svg viewBox="0 0 30 54" className="size-full overflow-visible" aria-hidden="true">
        <path d="M9 4h12l-2 4H11z" fill="#8a7fb0" />
        <path d="M11 8h8l6 30H5z" className="transition-[fill] duration-500" fill={dark ? "#ff5f9e" : "#ddd3f5"} style={{ filter: dark ? "drop-shadow(0 0 8px rgba(255,95,158,.7))" : "none" }} />
        <circle cx="15" cy="30" r="4" className={cn("transition-[fill] duration-500", dark && "blob-float")} fill={dark ? "#ffd166" : "#b9a8e8"} />
        <circle cx="12" cy="20" r="2.6" className={cn("transition-[fill] duration-500", dark && "blob-float")} style={{ animationDelay: "-1.5s" }} fill={dark ? "#ffd166" : "#b9a8e8"} />
        <path d="M4 38h22l-3 12H7z" fill="#8a7fb0" />
      </svg>
    </button>
  );
}

/** Hero: the cone lands, two scoops drop on top and the cherry bounces into place. */
function Cone() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
      gsap.timeline({ delay: 0.3 })
        .from(".cone-body", { y: 80, opacity: 0, duration: 0.8, ease: "power3.out" })
        .from(".scoop-1", { y: -220, duration: 0.8, ease: "bounce.out" }, "-=0.2")
        .from(".scoop-2", { y: -260, duration: 0.8, ease: "bounce.out" }, "-=0.35")
        .from(".cherry", { y: -200, rotate: -60, svgOrigin: "150 36", duration: 0.9, ease: "bounce.out" }, "-=0.35")
        .from(".spr", { scale: 0, transformOrigin: "50% 50%", stagger: 0.05, duration: 0.3, ease: "back.out(3)" }, "-=0.4");
      gsap.to(".cone-all", { rotate: 3, svgOrigin: "150 370", duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1 });
    });
  }, { scope: ref });
  return (
    <div ref={ref} className="relative w-full max-w-[400px]" aria-hidden="true">
      <div className="groovy absolute inset-[6%_4%_18%] rounded-full" />
      <svg viewBox="0 0 300 380" className="relative h-auto w-full overflow-visible drop-shadow-[0_30px_40px_var(--shadow)]">
        <g className="cone-all">
          <g className="cone-body"><path d="M92 170l58 200 58-200z" fill="#f2c27a" /><path d="M100 196l100-10M108 226l86-8M118 258l66-6M128 290l46-4M110 180l40 160M190 180l-40 160" stroke="#d29a4e" strokeWidth="3" /></g>
          <g className="scoop-1"><circle cx="150" cy="150" r="64" fill="#ffb3d1" /><path d="M86 160c10 22 20 6 30 24s20-4 28 14 18-6 26 10 20-8 26-22c4 22-4 30-14 34" fill="#ffb3d1" /></g>
          <g className="scoop-2"><circle cx="150" cy="86" r="52" fill="#99e6c7" /><path d="M104 98c10 16 18 2 26 16s16-2 24 10 18-4 24-12" stroke="#7bd3b1" strokeWidth="6" fill="none" strokeLinecap="round" /><circle cx="132" cy="76" r="7" fill="#fff" opacity=".5" /></g>
          <g className="cherry"><circle cx="150" cy="36" r="13" fill="#e8384f" /><path d="M150 24c4-12 14-16 20-14" stroke="#4a7a3a" strokeWidth="3" fill="none" /></g>
          <g strokeWidth="5" strokeLinecap="round">
            {[["M126 70l6 3", "#fff"], ["M168 80l4-5", "#ffd166"], ["M140 104l6 1", "#b98cf0"], ["M120 150l5 3", "#fff"], ["M176 140l4-4", "#ffd166"]].map(([d, c]) => <path key={d} className="spr" d={d} stroke={c} />)}
          </g>
        </g>
      </svg>
    </div>
  );
}

export default function Home() {
  const t = useT();

  return (
    <>
      <header className="pointer-events-none sticky top-3 z-40 px-4">
        <nav className="glass pointer-events-auto mx-auto flex h-[74px] max-w-[1160px] items-center justify-between gap-3 rounded-full border border-line ps-3 pe-3 shadow-[inset_0_1px_0_var(--hi),0_20px_50px_-28px_var(--shadow)]">
          <a href="#top" className="flex flex-none items-center gap-2.5" aria-label="Chillax Hub">
            <span className="grid size-10 place-items-center rounded-[14px] bg-[#3b2a6b] text-mint"><IceCream size={22} weight="fill" /></span>
            <span><b className="block font-display text-[22px] leading-none font-normal">Chill<span className="text-berrytext">ax</span> Hub</b><T k="logoSub" className="block text-xs text-soft max-sm:hidden" /></span>
          </a>
          <div className="flex items-center gap-1 text-[15px] font-semibold max-[860px]:hidden">
            {[["treats", "navTreats"], ["find", "navFind"]].map(([id, k]) => <a key={id} href={`#${id}`} className="rounded-full px-4 py-2 text-soft transition-colors hover:bg-bg2 hover:text-ink" dangerouslySetInnerHTML={{ __html: t(k) }} />)}
          </div>
          <div className="flex items-center gap-3">
            <Vinyl /><LavaLamp />
            <a href={TEL} className={cn(primary, "px-5 py-2.5 max-sm:hidden")}><Phone size={17} weight="bold" />{PHONE}</a>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="relative overflow-hidden pt-16 max-sm:pt-10">
          <Wrap className="grid grid-cols-[1.1fr_.9fr] items-center gap-12 pb-10 max-[900px]:grid-cols-1">
            <div>
              <Reveal className="mb-6 inline-flex items-center gap-2 rounded-full bg-card px-4 py-1.5 text-sm font-semibold shadow-[inset_0_0_0_1px_var(--line)]"><i className="size-2 rounded-full bg-[#4fcfa0]" /><T k="near" /></Reveal>
              <Reveal delay={0.08}><T k="heroTitle" as="h1" className="mb-6 text-[clamp(56px,8vw,112px)]" /></Reveal>
              <Reveal delay={0.16}><T k="heroLead" as="p" className="mb-9 max-w-[44ch] text-lg text-soft" /></Reveal>
              <Reveal delay={0.24} className="mb-7 flex flex-wrap gap-3">
                <a href={DIR} target="_blank" rel="noopener" className={primary}><NavigationArrow size={18} weight="bold" /><T k="ctaDir" /></a>
                <a href={TEL} className={ghost}><Phone size={18} weight="bold" /><T k="ctaCall" /></a>
              </Reveal>
              <Reveal delay={0.3} className="flex items-center gap-2.5 text-sm text-soft"><span className="tracking-[2px] text-butter">★★★★☆</span><T k="rating" className="[&_b]:text-base [&_b]:text-ink" /></Reveal>
            </div>
            <Reveal delay={0.1} className="w-full max-w-[400px] justify-self-end max-[900px]:justify-self-center"><Cone /></Reveal>
          </Wrap>
          <div className="relative h-[70px] overflow-hidden" aria-hidden="true">
            <svg viewBox="0 0 1440 70" preserveAspectRatio="none" className="wave absolute bottom-0 left-0 h-full w-[calc(100%+240px)] fill-[#3b2a6b] dark:fill-[#0d0919]">
              <path d="M0 70V30c60 0 60 30 120 30s60-30 120-30 60 30 120 30 60-30 120-30 60 30 120 30 60-30 120-30 60 30 120 30 60-30 120-30 60 30 120 30 60-30 120-30 60 30 120 30 60-30 120-30 60 30 120 30V70z" />
            </svg>
          </div>
        </section>

        <section id="treats" className="scroll-mt-24 bg-grape pt-16 pb-32 text-[#f2edff] max-sm:pb-20">
          <div className="mb-16 border-y border-white/10 py-4" aria-hidden="true">
            <Marquee className="[--duration:30s] [--gap:3rem]">
              {["s1t", "s2t", "s3t", "near"].map(k => <span key={k} className="flex items-center gap-12 font-display text-[26px]"><T k={k} /><i className="size-3 rounded-full bg-berry" /></span>)}
            </Marquee>
          </div>
          <Wrap className="grid grid-cols-3 gap-5 max-[900px]:grid-cols-1">
            {SCOOPS.map(([k, Icon, c], i) => (
              <Reveal key={k} delay={i * 0.08}>
                <motion.div whileHover={{ y: -8, rotate: i === 1 ? 0 : i ? 1.5 : -1.5 }} transition={{ type: "spring", stiffness: 260, damping: 16 }} className="h-full rounded-[32px] bg-white/6 p-1.5 shadow-[inset_0_0_0_1px_rgba(255,255,255,.1)]">
                  <MagicCard gradientSize={220} gradientColor="rgba(153,230,199,.12)" gradientFrom="#ffb3d1" gradientTo="#99e6c7" className="h-full rounded-[27px] [--bg:#2a1f4f] [--line:rgba(255,255,255,.1)] [&>div:last-child]:h-full">
                    <div className="h-full p-8">
                      <span className="mb-10 grid size-16 place-items-center rounded-full text-[#24183f] shadow-[inset_0_-6px_0_rgba(0,0,0,.12)]" style={{ background: c }}><Icon size={30} weight="fill" /></span>
                      <T k={`${k}t`} as="h3" className="mb-2 text-[32px]" /><T k={`${k}p`} as="p" className="text-[15.5px] text-[#c9bfe6]" />
                    </div>
                  </MagicCard>
                </motion.div>
              </Reveal>
            ))}
          </Wrap>
        </section>

        <section id="find" className="scroll-mt-24 py-32 max-sm:py-20">
          <Wrap>
            <Reveal className="mb-12 max-w-[720px]"><T k="findEyebrow" className={eyebrow} /><T k="findTitle" as="h2" className="mb-4 text-[clamp(44px,5.8vw,78px)]" /><T k="findLead" as="p" className="text-[17px] text-soft" /></Reveal>
            <div className="grid grid-cols-[.9fr_1.1fr] gap-5 max-[900px]:grid-cols-1">
              <Reveal className="relative grid content-start gap-5 overflow-hidden rounded-[32px] bg-card p-9 shadow-[inset_0_0_0_1px_var(--line)]">
                <BorderBeam size={200} duration={10} colorFrom="#ffb3d1" colorTo="#99e6c7" borderWidth={2} />
                <T k="visitTitle" as="h3" className="text-[38px]" />
                {([[DIR, MapPin, "3000 Northside Blvd, Ste 700", "Richardson, TX 75080", false], [TEL, Phone, PHONE, "callSub", true]] as const).map(([href, I, a, b, isKey]) => (
                  <a key={a} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener" className="group flex items-center gap-3.5">
                    <span className="grid size-12 flex-none place-items-center rounded-full bg-tint text-berrytext transition-transform duration-300 ease-spring group-hover:scale-110 group-hover:-rotate-12"><I size={22} weight="bold" /></span>
                    <span><strong className="block">{a}</strong>{isKey ? <T k={b} className="text-sm text-soft" /> : <span className="text-sm text-soft">{b}</span>}</span>
                  </a>
                ))}
                <T k="hoursNote" as="p" className="rounded-2xl bg-tint px-4 py-3 text-[14px] text-soft" />
              </Reveal>
              <Reveal delay={0.08} className="min-h-[420px] overflow-hidden rounded-[32px] shadow-[inset_0_0_0_1px_var(--line)]"><MapFrame q="3000+Northside+Blvd+Ste+700,+Richardson,+TX+75080" className="min-h-[420px]" /></Reveal>
            </div>
          </Wrap>
        </section>

        <section className="pb-32 max-sm:pb-20">
          <Wrap className="grid grid-cols-[.8fr_1.2fr] gap-14 max-[900px]:grid-cols-1">
            <Reveal><T k="faqEyebrow" className={eyebrow} /><T k="faqTitle" as="h2" className="text-[clamp(44px,5.8vw,78px)]" /></Reveal>
            <Faq ids={[1, 2]} accent="text-berrytext" item="rounded-[24px] bg-card shadow-[inset_0_0_0_1px_var(--line)]" />
          </Wrap>
        </section>

        <section className="pb-32 max-sm:pb-20">
          <Wrap>
            <Reveal className="relative flex items-center justify-between gap-8 overflow-hidden rounded-[40px] bg-[#3b2a6b] px-14 py-20 text-[#f2edff] max-[900px]:flex-col max-[900px]:items-start max-sm:px-7 max-sm:py-14 dark:bg-[#211a3b]">
              <div className="groovy pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
              <div className="relative"><T k="ctaTitle" as="h2" className="mb-3 text-[clamp(48px,6.4vw,92px)]" /><T k="ctaLead" as="p" className="text-lg text-[#c9bfe6]" /></div>
              <a href={DIR} target="_blank" rel="noopener" className={cn(btn, "relative flex-none bg-mint px-8 py-4 text-lg text-[#0d2a20]")}><NavigationArrow size={20} weight="bold" /><T k="ctaDir" /></a>
            </Reveal>
          </Wrap>
        </section>
      </main>

      <footer className="pb-28 text-sm text-soft">
        <Wrap><div className="flex flex-wrap justify-between gap-3.5 border-t border-line pt-6"><span>© {new Date().getFullYear()} Chillax Hub · 3000 Northside Blvd, Ste 700, Richardson, TX 75080</span><a href={TEL}>{PHONE}</a></div></Wrap>
      </footer>
      <div className="glass fixed inset-x-3 bottom-3 z-30 hidden gap-2 rounded-full p-1.5 shadow-[inset_0_0_0_1px_var(--line)] max-sm:flex">
        <a href={DIR} target="_blank" rel="noopener" className={cn(primary, "flex-1 py-3")}><T k="barDir" /></a>
        <a href={TEL} className={cn(ghost, "flex-1 py-3")}><T k="barCall" /></a>
      </div>
    </>
  );
}
