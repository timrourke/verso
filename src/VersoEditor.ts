export default class Verso extends HTMLElement {
    private readonly css = `
:host,
:host *,
:host *::before,
:host *::after {
    box-sizing: border-box;
}

.text-input {
    border: 0.0375em solid #666;
    min-height: 1em;
    padding: 0.25em;
    width: 100%;
}
    `;

    private readonly root: ShadowRoot;

    static get observedAttributes(): string[] {
        return [
            'content',
        ];
    }

    constructor() {
        super();
        this.root = this.attachShadow({mode: 'open'});
        this.renderTemplate();
        this.handleKeyup = this.handleKeyup.bind(this);
    }

    public disconnectedCallback(): void {
        this.unbindEvents();
    }

    private getContent(): string {
        const content = this.getAttribute('content');

        if (content === null) {
            return '';
        }

        return content;
    }

    private template(style: string) {
        return `
            <style>${style.trim()}</style>
            <div class="text-input" contenteditable="true">${this.getContent()}</div>
        `;
    }

    private renderTemplate(): void {
        this.root.innerHTML = this.template(this.css);

        this.bindEvents();
    }

    private handleKeyup(event: KeyboardEvent): void {
        // no-op for now
    }

    private handleKeydown(event: KeyboardEvent): void {
        event.preventDefault();
        event.stopPropagation();
    }

    private bindEvents(): void {
        this.root.querySelector('.text-input')
            .addEventListener('keydown', this.handleKeydown);
        this.root.querySelector('.text-input')
            .addEventListener('keyup', this.handleKeyup);
    }

    private unbindEvents(): void {
        this.root.querySelector('.text-input')
            .removeEventListener('keydown', this.handleKeydown);
        this.root.querySelector('.text-input')
            .removeEventListener('keyup', this.handleKeyup);
    }
}
