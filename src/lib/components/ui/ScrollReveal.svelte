<script lang="ts">
  import { onMount, type Snippet } from 'svelte';

  let {
    children,
    delay = 0,
    direction = 'up',
    threshold = 0.15,
  }: {
    children: Snippet;
    delay?: number;
    direction?: 'up' | 'left' | 'right' | 'fade';
    threshold?: number;
  } = $props();

  let el: HTMLDivElement | undefined = $state();
  let visible = $state(false);

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          visible = true;
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (el) observer.observe(el);
    return () => observer.disconnect();
  });
</script>

<div
  bind:this={el}
  class="reveal"
  class:visible
  style:--delay="{delay}ms"
  data-dir={direction}
>
  {@render children()}
</div>
