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
    public static List<String> getAllObjects(String userId){
        
        String mutilatedAppName = getMutilatedAppName(getCurrentAppName(userId));

        List<String> objects = new List<String>();
        
        //Gets all the apps
        List<Schema.DescribeTabSetResult> allApps = Schema.describeTabs();
        //Iterate through each App and get all the Obkects
        for (Schema.DescribeTabSetResult oneApp : allApps) {
            //system.debug(oneApp.getLabel());
            // System.debug('Namespace ' + oneApp.getNamespace());555
            if(oneApp.getLabel().equals(mutilatedAppName)){
                List<Schema.DescribeTabResult> appTabs = oneApp.getTabs();
                for (Integer i = 0; i < appTabs.size(); i++) {
                    objects.add(appTabs[i].getLabel());
                    //System.debug((i + 1) + '. Tab Name: ' + appTabs[i].getLabel());
                }
            }
        }

        // System.debug('App Name: ' + mutilatedAppName);
        //System.debug('Objects' + objects);

        return objects;
    }
}
