import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
    classNames: ['row'],
    classNameBindings: ['level'],
    showMessage: false,
    level: computed('model.level', function () {
        return this.model.level.toLowerCase();
    }),
    click(){
        this.set('showMessage', !this.showMessage);
        if (this.showMessage)
            this.set('model.height', 50);
        else
        this.set('model.height', 20);
    }
});
