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
            height: 3rem;
        }
        button {
            width: 100px;
            height: 40px;
            border-radius: 10px;
            background: #e2f1f2;
            padding: 10px 5px;
            color: white;
            background: black;
            margin-bottom: 1.5rem;
        }
        #button-container {
            display: flex;
            justify-content: space-between;
            margin: 10px 0;
        }
        
    </style>
        <h1>Sales Data</h1>
        <div id="table-container">
        </div>
        <div id="button-container">
                <button id="back">prev</button>
                <button id="next">next</button>
        </div>
`

class SalesDataTable extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(sales_data_table_template.content.cloneNode(true));
    }

    static get observedAttributes() {
        return ["sales", "saleToDisplay"];
    }
    
    set page(newValue) {
        this.setAttribute('page', newValue);
    }
    renderSalesList(list) {
        let sales_table_body='';
        let sales_table_header=`
            <div class="heading">
                <div>NAME</div>
                <div>COMPANY</div>
                <div>MONTHLY SALES</div>
            </div>`;
            list.map(({name, company, sales}) => {
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
    getStartIndex() {
        let pageNumber = Number(this.getAttribute('page'))
            let offset = Number(this.getAttribute('offset'))
            let startIndex = pageNumber === 1 ? (pageNumber - 1) * offset : ((pageNumber - 1) * offset) + 1;
            return startIndex;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // do something when an attribute has changed
        if (name= "saleToDisplay") {
            let full_list = JSON.parse(newValue);
            let startIndex = this.getStartIndex();
            let offset = Number(this.getAttribute('offset'))
            let partialList = full_list.slice(startIndex, startIndex+ offset)
            this.renderSalesList(partialList)
        }
    }
    updateList(action) {
        let newPage;
        if (action==="back") {
            newPage = Number(this.getAttribute('page')) - 1;
            if(newPage < 1) return;
        } else if (action === 'next') {
            newPage = Number(this.getAttribute('page')) + 1;
            let totalPage = Math.ceil(JSON.parse(this.getAttribute('sales')).length / Number(this.getAttribute('offset')))
            if (newPage > totalPage) return;
        }
        this.setAttribute('page', newPage)
        let startIndex = this.getStartIndex();
        let offset = Number(this.getAttribute('offset'))
        let partialList = JSON.parse(this.getAttribute('saleToDisplay')).slice(startIndex, startIndex+ offset)
        this.renderSalesList(partialList)
    }
    connectedCallback() {
        let back = this.shadowRoot.getElementById('back')
        let next = this.shadowRoot.getElementById('next')
       back.addEventListener('click', () => {
        this.updateList('back')
       })
       next.addEventListener('click', () => {
        this.updateList('next')
       })
       document.addEventListener('searchResultEvent', (e)=>{
        console.log(
          `start event triggered on platform :
          ${e.detail.companyName} ${e.detail.rangeValue}`
          );
        let updatedList = JSON.parse(this.getAttribute('saleToDisplay')).filter((sale) => {
            if (sale.sales >= e.detail.rangeValue && sale.company.toLowerCase().indexOf(e.detail.companyName.toLowerCase()) > -1) {
                return sale;
            }
        })
        this.setAttribute('saleToDisplay', JSON.stringify(updatedList));
        this.renderSalesList(updatedList.slice(0, 11))
  });
    }
    disconnectedCallback() {
        let back = this.shadowRoot.getElementById('back')
        let next = this.shadowRoot.getElementById('next')
       back.removeEventListener('click', () => {
        this.updateList('back')
       })
       next.removeEventListener('click', () => {
        this.updateList('next')
       })
       document.removeEventListener('searchResultEvent', (e)=>{
        console.log(
          `start event triggered on platform :
          ${e.detail.companyName} ${e.detail.rangeValue}`
          );
        let updatedList = JSON.parse(this.getAttribute('saleToDisplay')).filter((sale) => {
            if (sale.sales >= e.detail.rangeValue && sale.company.toLowerCase().indexOf(e.detail.companyName.toLowerCase()) > -1) {
                return sale;
            }
        })
        this.setAttribute('saleToDisplay', JSON.stringify(updatedList));
        this.renderSalesList(updatedList.slice(0, 11))
  });
    }
}
window.customElements.define('sales-data-table', SalesDataTable)