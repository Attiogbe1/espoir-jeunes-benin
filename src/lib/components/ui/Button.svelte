<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    variant = 'primary',
    size = 'md',
    href,
    type = 'button',
    disabled = false,
    onclick,
    children,
  }: {
    variant?: 'primary' | 'outline' | 'ghost' | 'white' | 'accent';
    size?: 'sm' | 'md' | 'lg';
    href?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    onclick?: () => void;
    children: Snippet;
  } = $props();
</script>

{#if href}
  <a {href} class="btn btn-{variant} btn-{size}">
    {@render children()}
  </a>
{:else}
  <button
    {type}
    {disabled}
    {onclick}
    class="btn btn-{variant} btn-{size}"
  >
    {@render children()}
  </button>
{/if}

<style>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: var(--font-body);
  font-weight: 600;
  border-radius: var(--radius-md);
  border: 2px solid transparent;
  cursor: pointer;
  transition: all var(--duration-normal) var(--ease-out);
  position: relative;
  overflow: hidden;
  text-decoration: none;
  white-space: nowrap;
  letter-spacing: 0.01em;
}

/* Sweep effect on hover */
.btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255,255,255,0.12);
  transform: translateX(-101%);
  transition: transform var(--duration-normal) var(--ease-out);
}
.btn:hover::before { transform: translateX(0); }

/* Sizes */
.btn-sm { padding: 0.5rem 1.125rem; font-size: var(--text-sm); }
.btn-md { padding: 0.75rem 1.75rem; font-size: var(--text-base); }
.btn-lg { padding: 0.9375rem 2.25rem; font-size: var(--text-lg); }

/* Variants */
.btn-primary {
  background: var(--clr-primary);
  color: var(--clr-white);
  border-color: var(--clr-primary);
}
.btn-primary:hover {
  background: var(--clr-primary-dim);
  border-color: var(--clr-primary-dim);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-accent {
  background: var(--clr-accent);
  color: var(--clr-dark);
  border-color: var(--clr-accent);
}
.btn-accent:hover {
  background: var(--clr-accent-dim);
  border-color: var(--clr-accent-dim);
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(232,164,74,0.35);
}

.btn-outline {
  background: transparent;
  color: var(--clr-primary);
  border-color: var(--clr-primary);
}
.btn-outline:hover {
  background: var(--clr-primary);
  color: var(--clr-white);
  transform: translateY(-2px);
}

.btn-white {
  background: var(--clr-white);
  color: var(--clr-primary);
  border-color: var(--clr-white);
}
.btn-white:hover {
  background: var(--clr-surface);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn-ghost {
  background: transparent;
  color: var(--clr-body);
  border-color: var(--clr-border);
}
.btn-ghost:hover {
  background: var(--clr-surface);
  border-color: var(--clr-primary);
  color: var(--clr-primary);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
</style>
