import { BrotliDecode } from './decode.min.js';
var i = 0;
var allResourcesBeingLoaded = [];
Blazor.start({ // start manually with loadBootResource
    loadBootResource: function (type, name, defaultUri, integrity) {
        if (type == "dotnetjs")
            return defaultUri;
		
		if(type == "dotnetwasm"){
			return (async function(){
				const response = await fetch('https://bamby084.github.io/dotnet.wasm.br',{cache: 'no-cache'});
				if(!response.ok){
					throw new Error(response.statusText);
				}
				
				const buffer = await response.arrayBuffer();
				const array = new Int8Array(buffer);
				const decompressedArray = BrotliDecode(array);
				
				return new Response(decompressedArray, {headers: {'content-type': 'application/wasm'}});
			})();
		}
		
        var fetchResources = fetch(defaultUri, {
            cache: 'no-cache',
            integrity: integrity,
            headers: { 'MyCustomHeader': 'My custom value' }
        });


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