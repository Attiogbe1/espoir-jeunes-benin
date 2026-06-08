<script lang="ts">
  import { onMount } from 'svelte';

  let {
    value,
    suffix = '',
    label,
    duration = 2200,
  }: {
    value: number;
    suffix?: string;
    label: string;
    duration?: number;
  } = $props();

  let el: HTMLDivElement | undefined = $state();
  let displayed = $state(0);
  let started = $state(false);

  function easeOutExpo(t: number): number {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  function formatNumber(n: number): string {
    return Math.round(n).toLocaleString('fr-FR');
  }

  function animateCount() {
    if (started) return;
    started = true;
    const start = performance.now();
    function step(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      displayed = easeOutExpo(progress) * value;
      if (progress < 1) requestAnimationFrame(step);
      else displayed = value;
    }
    requestAnimationFrame(step);
  }

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animateCount();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (el) observer.observe(el);
    return () => observer.disconnect();
  });
</script>

<div class="counter" bind:this={el}>
  <div class="counter-value">
    <span class="counter-number">{formatNumber(displayed)}</span><span class="counter-suffix">{suffix}</span>
  </div>
  <div class="counter-label">{label}</div>
</div>

<style>
.counter {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.counter-value {
  font-family: var(--font-display);
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 700;
  line-height: 1;
  color: var(--clr-accent);
  display: flex;
  align-items: baseline;
  gap: 0.125rem;
}

.counter-suffix {
  font-size: clamp(2rem, 4vw, 3rem);
  color: var(--clr-accent);
}

.counter-label {
  font-size: var(--text-sm);
  font-weight: 500;
  color: rgba(255,255,255,0.6);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-align: center;
}
</style>
