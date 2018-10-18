import * as core from '../core/index';
import { AngularClientService } from './AngularClientService';
import { AngularEndpointProvider } from './AngularEndpointProvider';
import { AngularFileHandler } from './AngularFileHandler';
import { Injectable, Inject } from '@angular/core';

@Injectable()
export class CongetherAngularClient extends core.CongetherClient {    

    constructor(@Inject(AngularClientService)private ngClient : AngularClientService)
    {        
        super();
    }


    protected onInitialized() {
        this.ngClient.baseUrl = this._baseUrl;
        this.ngClient.secret = this._secret;
        this._client = new CongetherAngularClientWrapper(this.ngClient);        
        this._fileHandler = new AngularFileHandler(this.appIdentifier);
        this._endpointProvider = new AngularEndpointProvider(this._appIdentifier, this._fileHandler, this._version);
    }
    
}

class CongetherAngularClientWrapper implements core.IClientService
{
    constructor(@Inject(AngularClientService)private ngclient : AngularClientService){}

    postEvent(endpoint: string, eventQueue: core.EndpointMessageQueue): Promise<void> {
        return new Promise<void>((resolve, reject)=>{
            this.ngclient.apiByVersionEndpointByEndpointEventPost(endpoint, null, eventQueue).subscribe((result)=>{ resolve(); }, (err)=>{ reject(err); });
        });
    }    

    postManifestRequest(endpoint: string, endpointInfo: core.EndpointInfo): Promise<core.EndpointManifest> {
        return new Promise<core.EndpointManifest>((resolve, reject)=>{
            this.ngclient.apiByVersionEndpointByEndpointManifestPost(endpoint, null, endpointInfo).subscribe((result)=>{ resolve(result); }, (err)=>{ reject(err); });
        });
    }

    
}