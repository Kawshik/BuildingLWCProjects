import { LightningElement, track, wire, } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import getAllObjects from '@salesforce/apex/ResortAppClass.getAllObjects';
import User_Id from '@salesforce/user/Id';
import pubsub from 'c/pubsub';
export default class SideBarComponent extends LightningElement {
    @track objects;
    @track error;
    
    @wire(CurrentPageReference) pageRef;

    @wire(getAllObjects,{userId: User_Id}) 
    wireObjects({error,data}){
        if(data){
            this.objects = data;
            console.log(data);
            this.error = undefined;
        } else if(error){
            this.objects = undefined;
            this.error = error;
        }
    }

    handleClick(event){
        var objectName = event.target.label;
        console.log(objectName);
        var payload = {
            "Name":{},
            
        };
        pubsub.fire('objectName', objectName);
        console.log("Event Fired...");
    }
}