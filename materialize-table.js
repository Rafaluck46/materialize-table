//Author: 👻 Rafael Lucas de Campos 👻
//Date: 2018-10-08
//Description: Generate a table from JSON content
export function Table() {

    this.id;
    this.header = [];
    this.body = [];
    this.key;
    this.selectedRow;

    this.createTable = function (tableId, tableParam) {
        this.header = tableParam.header;
        this.body = tableParam.body;
        this.key = tableParam.key;

        //define a header
        var table = document.createElement(`table`);
        table.id = tableId;
        this.id = table.id;

        table.classList.add(`highlight`);

        var thead = document.createElement(`thead`);
        var tr = document.createElement(`tr`);
        var tbody = document.createElement(`tbody`);

        tableParam.header.forEach(element => {
            var th = document.createElement(`th`);
            th.textContent = element.toUpperCase();
            tr.appendChild(th);
        });

        thead.appendChild(tr);
        table.appendChild(thead);

        //define a body
        tableParam.body.forEach(element => {
            var tr = document.createElement(`tr`);
            tableParam.header.forEach(head => {
                var td = document.createElement(`td`);
                td.textContent = element[head];
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });

        table.appendChild(tbody);

        //materialize table append elements
        document.querySelector(`.materialize-table`).appendChild(table);
    }
    this.callEvent = (eventName, callback) => {

        if (eventName == `selectedRow`) {
            document.addEventListener(`click`, (e) => {
                if (e.path[3]
                    && e.path[3].tagName
                    && e.path[3].tagName == "table".toUpperCase()) {
                    //remove selected value extract on method
                    e.path[3].querySelectorAll(`#${this.id}>.selected-value`).forEach(tr => {
                        tr.classList.remove(`selected-value`);
                    });

                    let obj = {};
                    for (let i = 0; i < this.header.length; i++) {
                        obj[this.header[i]] = e.path[1].querySelectorAll(`td`)[i].textContent;
                    }
                    e.path[1].classList.add(`selected-value`);
                    this.selectedRow = obj;
                    callback(obj);
                }
            });
        }
    }
    this.add = function (obj) {
        let finded = this.body.find(x => x[this.key] == obj[this.key])
        if (finded) {
            console.error(`You cannot insert data with same key on this table`);
            return;
        }

        this.body.push(obj);
        this.refreshTable({ header: this.header, body: this.body, key: this.key });
    }
    this.addAll = function (arr) {
        arr.forEach(element => {
            this.add(element);
        });
    }
    this.remove = function () {
        let selectedRowKey = (this.selectedRow && this.selectedRow[this.key] || 0);
        let index = this.body.findIndex(x => x[this.key] == selectedRowKey);
        if (index === -1) return;
        this.body.splice(index, 1);
        this.refreshTable({ header: this.header, body: this.body, key: this.key });
    }
    this.refreshTable = function (tableParam) {
        document.body.querySelector(`#${this.id}`).remove();
        this.createTable(this.id, tableParam);
    }

}
