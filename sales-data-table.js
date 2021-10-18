const sales_data_table_template = document.createElement('template');
sales_data_table_template.innerHTML = `
    <style>
        #table-container {
            display: flex;
            flex-direction: column;
            background: #fff;
            padding: 30px;
            border-radius: 20px;
        }
        .heading {
            width: 100%;
            display: flex;
            justify-content: space-around;
            border-bottom: 1px solid #e2f1f2;
        }
        .table-data {
            width: 100%;
            display: flex;
            justify-content: space-around;
            border-bottom: 1px solid #e2f1f2;
        }
        
        .heading div {
            width: 33%;
            text-align: left;
            font-family: 'Roboto', sans-serif;
            font-size: 1.2rem;
            font-weight: 700;
        }
        .table-data div {
            width: 33%;
            text-align: left;
            font-family: 'Roboto', sans-serif;
            font-size: 1.2rem;
            font-weight: 500;
        }
    </style>
        <h1>Sales Data</h1>
        <div id="table-container">
        <div>
`

class SalesDataTable extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(sales_data_table_template.content.cloneNode(true));
    }

    static get observedAttributes() {
        return ["sales"];
    } 

    attributeChangedCallback(name, oldValue, newValue) {
        // do something when an attribute has changed
        console.log(name, oldValue, newValue);
        let sales_table_body='';
        let sales_table_header=`
            <div class="heading">
                <div>NAME</div>
                <div>COMPANY</div>
                <div>MONTHLY SALES</div>
            </div>`;
            JSON.parse(newValue).map(({name, company, sales}) => {
                sales_table_body += `
                <div class="table-data">
                    <div>${name}</div>
                    <div>${company}</div>
                    <div>${sales}</div>
                </div>
                `
            })
            this.shadowRoot.getElementById('table-container').innerHTML 
                = `${sales_table_header} ${sales_table_body}`;
        
    }

    connectedCallback() {
       
    }
    disconnectedCallback() {
       
    }
}
window.customElements.define('sales-data-table', SalesDataTable)