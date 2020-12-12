import { api, LightningElement,wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';

import pubsub from 'c/pubsub';
export default class ObjectDataComponent extends LightningElement {
    @api objectName = 'Customer Details';
    @wire(CurrentPageReference) pageRef;

    connectedCallback(){
        this.register();
    }

    register(){
        // console.log("Event Registered...");
        pubsub.register('objectName', this.handleSub.bind(this));
    }

    handleSub(pubResponse){
        // console.log(pubResponse);
        this.objectName = pubResponse?pubResponse + ' Details':'Object Details';
    }

    
}