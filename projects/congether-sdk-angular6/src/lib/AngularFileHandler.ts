import * as core from '../core/index';

export class AngularFileHandler implements core.ICongetherFileHandler
{
    constructor(private appIdentifier : string)
    {

    }

    private static CONGETHERFILE_COMMON = "__congether_common";
    private static CONGETHERFILE_APP = "__congether_app_";


    async getCommonCongetherFile(): Promise<core.CongetherFile> {
        var content = localStorage.getItem(AngularFileHandler.CONGETHERFILE_COMMON);
        var storedItem : core.CongetherFile = null;
        if(content != null)
        {
           storedItem = JSON.parse(content) as core.CongetherFile;
        }
        if(storedItem != null)
        {
            return storedItem;
        }
        else
        {
            var newCongetherFile = new core.CongetherFile();
            await this.setCommonCongetherFile(newCongetherFile);
            return newCongetherFile;
        }
    }    
    
    async getAppCongetherFile(): Promise<core.CongetherFile> {
        var content = localStorage.getItem(AngularFileHandler.CONGETHERFILE_APP + this.appIdentifier);
        var storedItem : core.CongetherFile = null;
        if(content != null){
            storedItem = JSON.parse(content) as core.CongetherFile;
        }
        if(storedItem != null)
        {
            return storedItem;
        }
        else
        {
            var newCongetherFile = new core.CongetherFile();
            await this.setAppCongetherFile(newCongetherFile);
            return newCongetherFile;
        }
    }
    
    async setCommonCongetherFile(file: core.CongetherFile): Promise<void> {
        if(file == null)
        {
            localStorage.removeItem(AngularFileHandler.CONGETHERFILE_COMMON);
        }
        else
        {
            localStorage.setItem(AngularFileHandler.CONGETHERFILE_COMMON, JSON.stringify(file));
        }
    }
    
    async setAppCongetherFile(file: core.CongetherFile): Promise<void> {
        if(file == null)
        {
            localStorage.removeItem(AngularFileHandler.CONGETHERFILE_APP+ this.appIdentifier);
        }
        else
        {
            localStorage.setItem(AngularFileHandler.CONGETHERFILE_APP+ this.appIdentifier, JSON.stringify(file));
        }
    }
    
    async setCachedEndpointManifest(endpointManifest: core.EndpointManifest): Promise<void> {
        if(endpointManifest == null)
        {
            localStorage.removeItem(AngularFileHandler.CONGETHERFILE_APP+ this.appIdentifier + "_cachedManifest");
        }
        else
        {
            localStorage.setItem(AngularFileHandler.CONGETHERFILE_APP+ this.appIdentifier + "_cachedManifest", JSON.stringify(endpointManifest));
        }
    }

    async getCachedEndpointManifest(): Promise<core.EndpointManifest> {
        var storedItem = JSON.parse(localStorage.getItem(AngularFileHandler.CONGETHERFILE_APP+ this.appIdentifier + "_cachedManifest")) as core.EndpointManifest;
        if(storedItem != null)
        {
            return storedItem;
        }
        else return null;
    }

    createGuid() : string
    {  
       return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {  
          var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);  
          return v.toString(16);  
       });  
    }  
    
}