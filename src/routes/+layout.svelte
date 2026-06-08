<script lang="ts">
  import '../app.css';
  import { onNavigate } from '$app/navigation';
  import { page } from '$app/stores';
  import Navbar from '$lib/components/layout/Navbar.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();

  const isAdmin = $derived($page.url.pathname.startsWith('/admin'));

  onNavigate((navigation) => {
    if (!document.startViewTransition) return;
    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <meta name="description" content="ESPOIR JEUNES BÉNIN — ONG éducative active depuis 2021 à Aplahoué, Bénin. TD gratuits, fournitures scolaires et formations pour plus de 600 élèves.">
  <meta property="og:site_name" content="ESPOIR JEUNES BÉNIN">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary_large_image">
</svelte:head>

{#if !isAdmin}
  <Navbar />
{/if}

{#if isAdmin}
  {@render children()}
{:else}
  <main id="main-content">
    {@render children()}
  </main>

  <Footer />

  <a
    href="https://wa.me/229XXXXXXXX"
    class="whatsapp-fab"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Écrire sur WhatsApp"
  >
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.096.537 4.068 1.478 5.787L0 24l6.364-1.456A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.826 0-3.536-.494-5.006-1.352l-.36-.214-3.726.853.882-3.617-.234-.372A9.935 9.935 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
    </svg>
    <span>WhatsApp</span>
  </a>
{/if}

<style>
#main-content {
  min-height: 100vh;
}
</style>
