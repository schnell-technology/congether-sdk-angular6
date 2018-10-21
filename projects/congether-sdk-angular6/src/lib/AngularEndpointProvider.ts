import * as core from '../core/index';
declare var require: any;
export class AngularEndpointProvider implements core.IEndpointInfoProvider
{
    constructor(private appIdentifier : string, private fileHandler : core.ICongetherFileHandler, private version : string = null)
    {
        
    }

    public async getEndpointInfo(client : core.CongetherClient): Promise<core.EndpointInfo> {
        var endpointInfo = new core.EndpointInfo();
        var commonFile = await this.fileHandler.getCommonCongetherFile();
        var appFile = await this.fileHandler.getAppCongetherFile();

        endpointInfo.appIdentifier = this.appIdentifier;
        if(this.version != null)
            endpointInfo.appVersion = this.version;
        else
            endpointInfo.appVersion = require('../package.json').version;
            
        endpointInfo.deviceKey = client.deviceKey;
        endpointInfo.privacyPolicy = commonFile.privacy_mode;
        endpointInfo.deviceId = commonFile.instanceId;
        endpointInfo.installationId = appFile.instanceId;
        
        endpointInfo.environment = new core.Environment();
        endpointInfo.environment.platform = "Web"
        endpointInfo.environment.runtimeIdentifier = "Angular";
        
        return endpointInfo;
    }
}