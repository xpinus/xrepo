import { ref, watch } from 'vue';
import hljs from 'highlight.js/lib/core'; // https://highlightjs.readthedocs.io/en/latest/
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('xml', xml);

export function useHighlight(code: string, language?: string) {
    const html = ref('');

    html.value = !!language ? hljs.highlight(code, { language }).value : hljs.highlightAuto(code).value;

    return {
        html,
    };
}
