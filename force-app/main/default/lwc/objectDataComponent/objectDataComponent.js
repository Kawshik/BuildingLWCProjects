import { api, LightningElement,track,wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import getRecords from '@salesforce/apex/ResortAppClass.getRecords';
import pubsub from 'c/pubsub';
export default class ObjectDataComponent extends LightningElement {
    @api objectName = 'Objects Details';
    @wire(CurrentPageReference) pageRef;
    @api objectAPI = '';
    records;
    columns = [
        { label: 'Name', fieldName: 'Name' },
        { label: 'Id', fieldName: 'Id' }
    ];

    connectedCallback(){
        this.register();
    }

    register(){
        // console.log("Event Registered...");
        pubsub.register('objectName', this.handleSub.bind(this));
    }
    
    @wire(getRecords,{objectAPIName: '$objectAPI'}) 
    wireRecords({data,error}){
        if(data){
            this.records = data;
        } else if(error){

        }
    }
    

    handleSub(pubResponse){
        // console.log(pubResponse);
        if(pubResponse){
            this.objectName = pubResponse.objectName + ' Details';
            this.objectAPI = pubResponse.objectAPI;
            
        } else {
            this.objectName = 'Objects Details';
            this.objectAPI = '';
        }
    }

    
}