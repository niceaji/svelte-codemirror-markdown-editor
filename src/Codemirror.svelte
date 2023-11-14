<script>
  import { codemirror, withCodemirrorInstance } from '@neocodemirror/svelte';
  import { keymap } from '@codemirror/view';
  import { indentWithTab } from '@codemirror/commands';
  import { basicSetup, EditorView } from 'codemirror';
  import { oneDark } from '@codemirror/theme-one-dark';
  // import { writable } from 'svelte/store';
  import { createEventDispatcher, tick } from 'svelte';

  const cmInstance = withCodemirrorInstance();

  const theme = EditorView.theme({
    '&': { height: '100%', fontSize: '1rem' },
    // '.cm-scroller': { overflow: 'auto' },
  });

  // $: console.log($cmInstance.view, $cmInstance.value, $cmInstance.extensions);

  export let lang = 'markdown';
  export let value = '';

  const dispatch = createEventDispatcher();
</script>

<div
  class="codemirror-container"
  use:codemirror={{
    value,
    lang,
    langMap: {
      markdown: () =>
        import('@codemirror/lang-markdown').then((m) => m.markdown()),
    },
    instanceStore: cmInstance,
    theme: [oneDark, theme],
    tabSize: 2,
    extensions: [basicSetup, keymap.of([indentWithTab])],
  }}
  on:codemirror:textChange={({ detail: value }) => {
    // code = value;
    // console.log(value);
    dispatch('change', { value });
  }}
/>

<style>
  .codemirror-container {
    height: 100%;
  }
  .codemirror-container :global(.cm-focused) {
    outline: none;
  }
</style>
