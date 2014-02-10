chrome.webRequest.onCompleted.addListener(
    function (details) {
        if (details.statusCode == 503 && details.type == 'main_frame') {
            details.responseHeaders.forEach(function(v) {
                if (v.value === 'cloudflare-nginx') 
                    chrome.tabs.executeScript(details.tabId, {"code": "items=document.getElementsByTagName('script');for(i=0;i<items.length;++i)try{eval(/setTimeout\\(function\\(\\)\\{([^]*?)\\}/m.exec(items[i].text)[1]);}catch(err){}"}, function () { chrome.tabs.reload(details.tabId); });
            });
        }
    }, {urls: ["<all_urls>"]}, ['responseHeaders']);
