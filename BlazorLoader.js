import { BrotliDecode } from './decode.min.js';
var i = 0;
var allResourcesBeingLoaded = [];
Blazor.start({ // start manually with loadBootResource
    loadBootResource: function (type, name, defaultUri, integrity) {
        if (type == "dotnetjs")
            return defaultUri;
		
		if(type == 'dotnetwasm' || name == 'ISMPayload.dll' || name == 'KendoUI.Grid.dll'){
			return (async function(){
				const response = await fetch(defaultUri + '.br',{cache: 'no-cache'});
				if(!response.ok){
					throw new Error(response.statusText);
				}
				
				const buffer = await response.arrayBuffer();
				const array = new Int8Array(buffer);
				const decompressedArray = BrotliDecode(array);
				const contentType = type === 'dotnetwasm'? 'application/wasm': 'application/octet-stream';
				return new Response(decompressedArray, {headers: {'content-type': contentType}});
			})();
		}
		
        var fetchResources = fetch(defaultUri, {cache: 'no-cache'});


        allResourcesBeingLoaded.push(fetchResources);
        fetchResources.then((r) => {
            i++;
            var total = allResourcesBeingLoaded.length;
            if (typeof onResourceLoaded === "function") {
                onResourceLoaded(i, total);
            }
        });
        return fetchResources;
    }
});