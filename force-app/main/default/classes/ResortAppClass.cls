public with sharing class ResortAppClass {
    public ResortAppClass() {
    }

    /**
     * BUG: If we open two app simultaneously
     * It show the data of the first app only
     * 
     * REASON: 
     * AppDefinition appDefinition = [SELECT DurableId, MasterLabel FROM AppDefinition Where DurableId = :userAppInfo.AppDefinitionId LIMIT 1];
     * LIMIT is 1 in the above query 
     */

    /**
     * Returns the current app Name as String
     */
    @AuraEnabled(Cacheable = true)
    public static string getCurrentAppName(String userId){            
            UserAppInfo userAppInfo = [SELECT Id, AppDefinitionId FROM UserAppInfo WHERE UserId = :userId LIMIT 1];
            AppDefinition appDefinition = [SELECT DurableId, MasterLabel FROM AppDefinition Where DurableId = :userAppInfo.AppDefinitionId LIMIT 1];

            String appName =  appDefinition.MasterLabel;
            //System.debug('App Name: ' + appName);
            return appName;
    }


    /**
     * Returns the app name without the word Lightning
     * 
     * REASON: 
     * the name of the app in classic must be same in lightning
     * else the component won't work
     */
    private static string getMutilatedAppName(String appName){
        return appName.contains('Lightning')?appName.remove('Lightning').trim():appName;
    }


    /**
     * Returns all the objects in the current app as a list of Strings
     */
    @AuraEnabled(Cacheable = true)
    public static String getAllObjects(String userId){
        
        String mutilatedAppName = getMutilatedAppName(getCurrentAppName(userId));

        // List<String> objects = new List<String>();
        List<ObjectDetailsClass> objectDetails = new List<ObjectDetailsClass>();
        
        //Gets all the apps
        List<Schema.DescribeTabSetResult> allApps = Schema.describeTabs();
        //Iterate through each App and get all the Objects
        for (Schema.DescribeTabSetResult oneApp : allApps) {
            // system.debug(oneApp.getLabel() + ' is Selected= ' + oneApp.isSelected());
            // System.debug('Namespace ' + oneApp.getNamespace());
            if(oneApp.getLabel().equals(mutilatedAppName)){
                List<Schema.DescribeTabResult> appTabs = oneApp.getTabs();
                for (Integer i = 0; i < appTabs.size(); i++) {
                    //Checks is the last character in the URL is 'o'
                    if(appTabs[i].getUrl().substring(appTabs[i].getUrl().length()-1, appTabs[i].getUrl().length()) == 'o'){
                        // objects.add(appTabs[i].getLabel());
                        objectDetails.add(new ObjectDetailsClass(appTabs[i].getLabel(),appTabs[i].getSobjectName(),appTabs[i].getUrl()));
                        // System.debug((i + 1) + '. Tab Name: ' + appTabs[i].getLabel() + ' Info: ' + appTabs[i].getSobjectName() + ' URL: ' + appTabs[i].getUrl());
                    }  
                }
            }
        }

        // System.debug('App Name: ' + mutilatedAppName);
        //System.debug('Objects' + objects);
        // System.debug(JSON.serialize(objectDetails));
        return JSON.serialize(objectDetails);
    }

    /**
     * Returns the list of records present in the given sObject
     * @param {String} objectAPIName - the API name of the SObject
     */
    @AuraEnabled(Cacheable = true)
    public static List<SObject> getRecords(String objectAPIName){
        String query = 'SELECT Id, Name FROM ' + objectAPIName;
        return Database.query(query);
    }
}
