/* istanbul ignore file */
declare global {
  interface Window {
    sharedStyles?: Node[];
  }
}

export const createShadowStyles = (root: ShadowRoot) => {
  if (window.sharedStyles) {
    root.append(...window.sharedStyles.map((style) => style));
  }

  document.addEventListener('style-inserted', (event: Event) => {
    const customEvent = event as CustomEvent;
    const style = customEvent.detail as Node;

    root.appendChild(style);
  });
};

const insertStyle = (style: Node) => {
  console.log('inserting style into sharedStyles', style);
  if (!window.sharedStyles) {
    window.sharedStyles = [];
  }

  window.sharedStyles.push(style);

  document.dispatchEvent(new CustomEvent('style-inserted', { detail: style }));
};

export default insertStyle;
