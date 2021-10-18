const sales_template = document.createElement('template');
sales_template.innerHTML = `
    <style>
        .filter-container {
            display: flex;
            flex-direction: column;
            background: #fff;
            padding: 30px;
            border-radius: 20px;
            margin-bottom: 20px;
        }
        .company-name {
            height: 20px;
            border-radius: 10px;
            background: #e2f1f2;
            padding: 10px 5px;
            margin-bottom: 20px;
        }
        #company-name {
            height: 20px;
            margin-bottom: 20px;
        }
        div label {
            display: block;
        }
        #sales-number {
            float: right;
            width: 100px;
            border: 1px solid black;
        }
        #search-button {
            width: 100%;
            height: 40px;
            border-radius: 10px;
            background: #e2f1f2;
            padding: 10px 5px;
            color: white;
            background: black;
        }
        label {
            margin-bottom: 20px
        }
        #range-input {
            display: flex;
            justify-content: space-between;
        }
    </style>
        
        <div class="filter-container">
            <input class="company-name" type="text" placeholder="company">
            <div id="range-input">
                <div >
                    <label for="sales-range">Minimum sales($)</label>
                    <input id="sales-range" type="range" name="" min="0" max="2000" step="100">
                </div>
                <p id="sales-number" class="company-name"></p>   
                
            </div>
            <button id="search-button">FILTER RESULTS</button>
        </div>
`

class SalesFilter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(sales_template.content.cloneNode(true));
    }

    connectedCallback() {
        let company_input = this.shadowRoot.querySelector('.company-name'),
            sales_number_box = this.shadowRoot.getElementById('sales-number'),
            sales_range_input = this.shadowRoot.getElementById('sales-range');
        //updating range box with range value defaut initially
        sales_number_box.innerText = sales_range_input.value;
        //updating range box with range value when changes
        sales_range_input.addEventListener('change', (e) => {
            sales_number_box.innerText = e.target.value;
          }  
        )
        this.shadowRoot.querySelector('#search-button')
        .addEventListener('click', () => {
            let v = this.shadowRoot.getElementById('sales-range').value;
            console.log('value', v)
        })
    }
    disconnectedCallback() {
        let company_input = this.shadowRoot.querySelector('.company-name'),
            sales_number_box = this.shadowRoot.getElementById('sales-number'),
            sales_range_input = this.shadowRoot.getElementById('sales-range');
        sales_range_input.removeEventListener('change', (e) => {
                sales_number_box.innerText = e.target.value;
              }  
            )
        this.shadowRoot.querySelector('#search-button')
        .removeEventListener('click', () => {
                let v = this.shadowRoot.getElementById('sales-range').value;
                console.log('value', v)
            })
    }
}
window.customElements.define('sales-filter', SalesFilter)