import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
    model: [],
    showDebug: true,
    showInfo: true,
    showWarning: true,
    showError: true,
    searchText: null,
    parseXML(text) {        
        let parser = new DOMParser();
        return parser.parseFromString(text,"text/xml");
    },

    filteredModel: computed('model.[]', 'showInfo', 'showWarning', 'showError', 'showDebug', 'searchText', function() {
        return this.model.filter(row => {
            if (!this.showInfo && row.level.toLowerCase() === 'info') {
                return false;
            }
            if (!this.showWarning && row.level.toLowerCase() === 'warning') {
                return false;
            }
            if (!this.showError && row.level.toLowerCase() === 'error') {
                return false;
            }
            if (!this.showDebug && row.level.toLowerCase() === 'debug') {
                return false;
            }
            if (this.searchText !== null && this.searchText !== undefined && this.searchText !== '') {
                if(!row.message.includes(this.searchText)) {
                    return false;
                }
            }

            return true;
        });
    }),

    convertToObject(_this, xml) {
        this.set('model', []);
        for (let i = 0; i < xml.childNodes[0].children.length; i++) {
            let row = xml.childNodes[0].children[i];
            if (row.localName.toLowerCase() === "logentry") {
                let obj = {};
                
                for (let j = 0; j < row.children.length; j++) {
                    let item = row.children[j];
                    switch (item.localName.toLowerCase()) {
                        case 'level':
                            obj.level = item.innerHTML;
                            break;
                        case 'thread':
                            obj.thread = item.innerHTML;
                            break;
                        case 'date':
                            obj.date = item.innerHTML;
                            break;
                        case 'class':
                            obj.class = item.innerHTML;
                            break;
                        case 'method':
                            obj.method = item.innerHTML;
                            break;
                        case 'message':
                            obj.message = item.innerHTML;
                            break;
                        case 'exception':
                            obj.exception = item.innerHTML;
                            break;
                        default:
                            console.log(`error selecting item in XML: ${item.localName}`);
                            break;
                    }
                }

                _this.model.pushObject(obj); 
            }                
        }      
    },

    loadFile(file) {
        let reader = this.get('reader');
        if (!reader) {
            reader = new FileReader();
            let _this = this;
            reader.onload = function(e) {
                let xml = _this.parseXML('<log>' + e.target.result + '</log>');
                _this.convertToObject(_this, xml);
            };

            this.set('reader', reader);
        }

        reader.readAsText(file);
    },
    
    actions: {
        upload(e) {
            let files = e.target.files;          
            this.set('filePath', files[0]);
            this.loadFile(files[0]);
        },
        disableLevel(e) {
            let checkbox = e.target;

            switch (checkbox.value) {
                case 'info':
                    this.set('showInfo', checkbox.checked);
                    break;
                case 'warning':
                    this.set('showWarning', checkbox.checked);
                    break;
                case 'error':
                    this.set('showError', checkbox.checked);
                    break;
                case 'debug':
                    this.set('showDebug', checkbox.checked);
                    break;
                default:
                    console.log(`Invalid checkbox option:${checkbox.value}`);
                    break;
            }
        },
        
        search(e) {
            let value = e.target.value;
            this.set('searchText', value);
        },

        reload() {
            let filePath = this.get('filePath');
            if (filePath) {
                this.loadFile(filePath);
            }
        }
    }
});

