/**
 * Register the scroll-progress custom element,
 * when the DOM is loaded.
 * 
 * @returns void
 */
function _handleDOMContentLoaded() {
    class ScrollProgress extends HTMLElement {
        /**
         * Available positions (css props)to place the scroll-progress.
         * 
         * @static
         * @returns {string[]}
         */
        static availablePositions() {
            return [ 'top', 'bottom' ];
        }

        /**
         * The default scroll-progress position.
         * 
         * @static
         * @returns {string}
         */
        static defaultPosition() {
            return 'top';
        }

        /**
         * The default scroll-progress color.
         * 
         * @static
         * @returns {string}
         */
        static defaultColor() {
            return '#7FDBFF';
        }

        /**
         * The default scroll-progress' height.
         * 
         * @static
         * @returns {string}
         */
        static defaultHeight() {
            return '7px';
        }

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
            this.$template = document.createElement('template');
            this.$template.innerHTML = `
                <style>
                    .scroll-progress-wrapper {
                        position: fixed;
                        ${this.position()}: 0;
                        left: 0;
                        height: ${this.height()};
                        width: 0;
                        background: ${this.color()};
                    }
                </style>
                <div class="scroll-progress-wrapper" wrapper></div>
            `;

            this.$shadowDom.appendChild(this.$template.content.cloneNode(true));
            this.$wrapper = this.$shadowDom.querySelector('[wrapper]');

            window.addEventListener('scroll', this._handleWindowScroll.bind(this));
        }

        /**
         * Get the scroll-progress' color.
         * 
         * @public
         * @returns {string}
         */
        color() {
            return this._attr('color') || ScrollProgress.defaultColor();
        }

        /**
         * Get the scroll-progress' height.
         * 
         * @public
         * @returns {string}
         */
        height() {
            return this._attr('height') || ScrollProgress.defaultHeight();
        }

        /**
         * Get the scroll-progress' position.
         * 
         * @public
         * @returns {string}
         */
        position() {
            const position = this._attr('position');

            return ScrollProgress.availablePositions().includes(position)
                ? position
                : ScrollProgress.defaultPosition();
        }

        /**
         * Calculate the percentage for the progress
         * and set it as width to the $wrapper element.
         * 
         * @private
         * @param {Event} e The scroll event.
         * @returns {void}
         */
        _handleWindowScroll(e) {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const currentPosition = document.documentElement.scrollTop;
            const percentage = (currentPosition / windowHeight) * 100;

            this.$wrapper.style.width = `${percentage}%`;
        }

        /**
         * Get an attribute's value.
         * 
         * @private
         * @param {string} name The name of the attribute.
         * @returns {string | null}
         */
        _attr(name) {
            return this.getAttribute(name);
        }
    }

    // Define the scroll-progress custom element.
    customElements.define('scroll-progress', ScrollProgress);
}

// Defer the scroll-progress element definition,
// until the DOM is loaded.
document.addEventListener("DOMContentLoaded", _handleDOMContentLoaded);