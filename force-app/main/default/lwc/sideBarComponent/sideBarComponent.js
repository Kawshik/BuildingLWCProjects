import { LightningElement, track, wire } from 'lwc';
import getAllObjects from '@salesforce/apex/ResortAppClass.getAllObjects';
import User_Id from '@salesforce/user/Id';
export default class SideBarComponent extends LightningElement {
    
    objectsList = ['Customer Details','Reservations','Facilities','Parkings','Pick Up Vehicles']

    @track objects;
    @track error;
    
    @wire(getAllObjects,{userId: User_Id}) 
    wireObjects({error,data}){
        if(data){
            this.objects = data;
            this.error = undefined;
        } else if(error){
            this.objects = undefined;
            this.error = error;
        }
    }
}