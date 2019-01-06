/**
 * Register the scroll-progress custom element,
 * when the DOM is loaded.
 * 
 * @returns void
 */
function _handleDOMContentLoaded() {
    class ScrollProgress extends HTMLElement {
        /**
         * Attach an open shadow dom to the element.
         */
        constructor() {
            super();

            this.$shadowDom = this.attachShadow({ mode: 'open' });
        }

        /**
         * A DOM lifecycle, executed
         * when the element has been mounted.
         * 
         * @returns void
         */
        connectedCallback() {
            const color = this.getAttribute('progress-color') || '#7FDBFF';
            const height = this.getAttribute('progress-height') || '7px';

            this.$template = document.createElement('template');
            this.$template.innerHTML = `
                <style>
                    .scroll-progress-wrapper {
                        position: fixed;
                        top: 0;
                        left: 0;
                        height: ${height};
                        width: 0;
                        background: ${color};
                    }
                </style>
                <div class="scroll-progress-wrapper" wrapper></div>
            `;

            this.$shadowDom.appendChild(this.$template.content.cloneNode(true));
            this.$wrapper = this.$shadowDom.querySelector('[wrapper]');

            window.addEventListener('scroll', this._handleWindowScroll.bind(this));
        }

        /**
         * Calculate the percentage for the progress
         * and set it as width to the $wrapper element.
         * 
         * @param {Event} e The scroll event.
         */
        _handleWindowScroll(e) {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const currentPosition = document.documentElement.scrollTop;
            const percentage = (currentPosition / windowHeight) * 100;

            this.$wrapper.style.width = `${percentage}%`;
        }
    }

    // Define the scroll-progress custom element.
    customElements.define('scroll-progress', ScrollProgress);
}

// Defer the scroll-progress element definition,
// until the DOM is loaded.
document.addEventListener("DOMContentLoaded", _handleDOMContentLoaded);