class HeaderComponent extends HTMLElement{
    constructor(){
        super()
        this.innerHTML = `
            <nav>
                <ul>
                    <li>
                        <a href='index.html'>Home</a>
                    </li>
                    <li>
                        <a href='about.html'>About</a>
                    </li>
                    <li>
                        <a href='contact.html'>Contact</a>
                    </li>
                </ul>
            </nav>
        `
    }
}

window.customElements.define('header-component', HeaderComponent)