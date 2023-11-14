<script>
  import { onMount } from 'svelte';
  import Codemirror from './Codemirror.svelte';
  import { Pane, Splitpanes } from 'svelte-splitpanes';
  import Header from './Header.svelte';
  import { marked } from 'marked';
  import srcdoc from './srcdoc.html?raw';

  let code = `# Markdown Editor\n> A simple markdown editor`;

  let iframeEl = null;
  let timer = null;

  function changeCode(event) {
    const { value } = event.detail;
    code = value || '';
    updatePreview();
  }

  function updatePreview() {
    if (!iframeEl) return;

    // debounce
    clearTimeout(timer);
    timer = setTimeout(() => {
      const html = marked.parse(code);
      iframeEl.srcdoc = srcdoc.replace('{html}', html);
    }, 300);
  }

  onMount(() => {
    updatePreview();
  });
</script>

<div class="app-container">
  <Header>
    <div class="i-mdi-language-markdown text-2xl bg-red-400 mr-1" />
    Markdown Editor
  </Header>

  <Splitpanes class="pt-12">
    <Pane minSize={20}>
      <Codemirror value={code} lang="markdown" on:change={changeCode} />
    </Pane>
    <Pane>
      <div class="h-full">
        <iframe frameborder="0" title="preview" bind:this={iframeEl} />
      </div>
    </Pane>
  </Splitpanes>
</div>

<style>
  :global(html, body, #app) {
    height: 100vh;
  }
  :global(.splitpanes__pane) {
    background-color: transparent !important;
  }
  :global(.splitpanes__splitter) {
    background-color: #eee !important;
  }
  .app-container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
</style>
