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
         * The class name that's being used, to signify
         * the scroll-progress bar is hidden.
         * 
         * @static
         * @returns {string}
         */
        static hiddenClassName() {
            return 'scroll-progress-wrapper--hidden';
        }

        /**
         * Attach an open shadow dom to the element.
         */
        constructor() {
            super();

            /**
             * Flag, whether or not to update the scroll-progress.
             *
             * @prop {Boolean}
             */
            this.paused = false;

            /**
             * Flag, whether or not the scroll-progress is hidden.
             *
             * @type {Boolean}
             */
            this.hidden = false;

            /**
             * The current scroll-progress percentage.
             *
             * @prop {Number}
             */
            this.percentage = 0;

            /**
             * The scroll-progress' shadow dom.
             *
             * @prop {Element}
             */
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
                    .scroll-progress-wrapper--hidden {
                        display: none;
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
         * Pause the scroll-progress updates.
         *
         * @public
         * @returns void
         */
        pause() {
            this.paused = true;
        }

        /**
         * Resume the scroll-progress updates.
         *
         * @public
         * @returns void
         */
        resume() {
            this.paused = false;
        }

        /**
         * Toggle the scroll-progress updates (on/off).
         *
         * @public
         * @returns void
         */
        togglePause() {
            this.paused = !this.paused;
        }

        /**
         * Hide the scroll-progress.
         *
         * @public
         * @returns void
         */
        hide() {
            this.hidden = true;

            this._update(this.percentage);
        }

        /**
         * Show the scroll-progress.
         *
         * @public
         * @returns void
         */
        show() {
            this.hidden = false;

            this._update(this.percentage);
        }

        /**
         * Toggle the scroll-progress.
         *
         * @public
         * @returns void
         */
        toggleHidden() {
            this.hidden = !this.hidden;

            this._update(this.percentage);
        }

        /**
         * What happens when the window is scrolled.
         *
         * @private
         * @param {Event} e The scroll event.
         * @returns {void}
         */
        _handleWindowScroll(e) {
            this.percentage = this._calculateProgressPercentage();

            if (!this.paused) {
                this._update(this.percentage);

                this._dispatch('update', { percentage: this.percentage, hidden: this.hidden });
            }

            this._dispatch('scroll-detected', { percentage: this.percentage, paused: this.paused, hidden: this.hidden });
        }

        /**
         * Calculate the scroll percentage.
         *
         * @private
         * @returns {Number}
         */
        _calculateProgressPercentage() {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const currentPosition = document.documentElement.scrollTop;

            return (currentPosition / windowHeight) * 100;
        }

        /**
         * Update the scroll-progress.
         *
         * @param {Number} percentage The scroll percentage to be rendered.
         * @returns void
         */
        _update(percentage) {
            const hasHiddenClass = this.$wrapper.classList.contains(ScrollProgress.hiddenClassName());

            if (this.hidden && !hasHiddenClass) {
                this.$wrapper.classList.add(ScrollProgress.hiddenClassName());
            } else if (!this.hidden && hasHiddenClass) {
                this.$wrapper.classList.remove(ScrollProgress.hiddenClassName());
            }

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

        /**
         * Dispatch a CustomEvent.
         *
         * @param {string} evtName The event's name.
         * @param {object} detail Event details.
         * @returns void
         */
        _dispatch(evtName, detail) {
            this.dispatchEvent(
                new CustomEvent(
                    evtName,
                    {
                        bubbles: true,
                        detail: {
                            ...detail
                        },
                    }
                )
            );
        }
    }

    // Define the scroll-progress custom element.
    customElements.define('scroll-progress', ScrollProgress);
}

// Defer the scroll-progress element definition,
// until the DOM is loaded.
document.addEventListener("DOMContentLoaded", _handleDOMContentLoaded);