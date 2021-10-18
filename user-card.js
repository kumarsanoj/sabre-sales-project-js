let user_template = document.createElement('template');
user_template.innerHTML = `
    <style>
        h3 {
            color: red;
        }
    </style>
    <div class="user-card">
        <h3><h3>
        <sales-filter name="Disha"></sales-filter>
    </div>
`
class UserCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(user_template.content.cloneNode(true));
        this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name');
    }
}
window.customElements.define('user-card', UserCard)