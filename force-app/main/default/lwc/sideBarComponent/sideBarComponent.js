import { LightningElement, track, wire, } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import getAllObjects from '@salesforce/apex/ResortAppClass.getAllObjects';
import User_Id from '@salesforce/user/Id';
import pubsub from 'c/pubsub';
export default class SideBarComponent extends LightningElement {
    @track objects = new Array();
    @track error;
    
    @wire(CurrentPageReference) pageRef;

    @wire(getAllObjects,{userId: User_Id}) 
    wireObjects({error,data}){
        if(data){
            // console.log(data);
            // console.log(JSON.parse(JSON.stringify(data)));
            // this.createArrayOfObjectsFromJSON(JSON.parse(data));
            this.objects = JSON.parse(data);
            // console.log(this.objects[0].objectTabName);
            this.error = undefined;
        } else if(error){
            this.objects = undefined;
            this.error = error;
            console.log(error);
        }
    }

    handleClick(event){
        var objectName = event.target.label;
        // console.log(objectName);
        // console.log(event.target.name);
        var payload = {
            "objectName":objectName,
            "objectAPI":event.target.name
        };
        pubsub.fire('objectName', payload);
        // console.log("Event Fired...");
    }

    createArrayOfObjectsFromJSON(json){
        for(let i=0;i<json.length;i++){
            // console.log(json[i]);
            this.objects.push(json[i]);
        }
    }
}