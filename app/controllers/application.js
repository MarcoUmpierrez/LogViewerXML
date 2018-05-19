import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
    model: [],

    parseXML(text) {        
        let parser = new DOMParser();
        return parser.parseFromString(text,"text/xml");
    },

    convertToObject(_this, xml) {
        for (let k = 0; k < xml.childNodes[0].children.length; k++) {
            let row = xml.childNodes[0].children[k];
            if (row.localName === "row") {
                let obj = {};
                
                for (let i = 0; i < row.children.length; i++) {
                    let item = row.children[i];
                    switch (item.localName) {
                        case 'level':
                            obj.level = item.innerHTML;
                            break;
                        case 'thread':
                            obj.thread = item.innerHTML;
                            break;
                        case 'date':
                            obj.date = item.innerHTML;
                            break;
                        case 'path':
                            obj.path = item.innerHTML;
                            break;
                        case 'method':
                            obj.method = item.innerHTML;
                            break;
                        case 'message':
                            obj.message = item.innerHTML;
                            break;
                        default:
                            console.log(`error selecting item in XML: ${item.localName}`);
                            break;
                    }
                };

                _this.model.pushObject(obj); 
            }                
        }      
    },

    loadFile(file) {
        let reader = new FileReader();
        let _this = this;
        reader.onload = function (e) {
            let xml = _this.parseXML('<log>' + e.target.result + '</log>');
            _this.convertToObject(_this, xml);
        };

        reader.readAsText(file);
    },
    
    actions: {
        upload(e) {
            let files = e.target.files;
            this.loadFile(files[0]);
        }
    }
});