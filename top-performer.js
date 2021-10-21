const top_performer = document.createElement('template');
top_performer.innerHTML = `
    <style>
        #table-container {
            display: flex;
            flex-direction: column;
            background: #fff;
            padding: 30px;
            border-radius: 20px;
            font-family: 'Roboto', sans-serif;
            font-size: 1.2rem;
            font-weight: 700;
        }
        .heading {
            width: 100%;
            display: flex;
            justify-content: space-around;
            border-bottom: 1px solid #e2f1f2;
        }
        .inner-div {
            display: flex;
            justify-content:space-between;
        }
        .inner-div:first-child {
            border-bottom: 1px solid black;
        }
    </style>
        <h1>Top performers($800+ /month)</h1>
        <div id="table-container">
            <div class="inner-div">
                <p>Number of Clients</p>
                <p id="no-of-clients"></p>
            </div>
            <hr/>
            <div class="inner-div">
                <p>Average MonthlySales</p>
                <p id="avg-sales"></p>
            </div>
        </div>
      
`

class TopPerformer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(top_performer.content.cloneNode(true));
    }

    static get observedAttributes() {
        return ["sales"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // do something when an attribute has changed
        if (name= "sales") {
            let count = 0;
            let totalSales = 0;
            let list = JSON.parse(this.getAttribute('sales'))
            list.forEach(sale => {
                if (sale.sales >= 800) {
                    count++;
                    totalSales+= sale.sales;
                }
            })
            this.shadowRoot.getElementById('no-of-clients').innerText = count; 
            this.shadowRoot.getElementById('avg-sales').innerText = `${(totalSales/count).toFixed(2)}`
        }
    }
   
    connectedCallback() {

    }
    disconnectedCallback() {
       
    }
}
window.customElements.define('top-performer', TopPerformer)