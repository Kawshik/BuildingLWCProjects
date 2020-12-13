public with sharing class ObjectDetailsClass {
    public String objectTabName {get;set;}
    public String objectAPIName {get;set;}
    public String objectURL {get;set;}

    public ObjectDetailsClass() {

    }

    public ObjectDetailsClass(String objectTabName, String objectAPIName, String objectURL) {
        this.objectTabName = objectTabName;
        this.objectAPIName = objectAPIName;
        this.objectURL = objectURL;
    }
}
