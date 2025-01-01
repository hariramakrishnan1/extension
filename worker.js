chrome.storage.local.set({"injected_tabs": {} });
function getStorageData() {
    chrome.storage.local.get(null, (data) => {
        console.log(data);
    });
}

function del_injected_tab(tab_id){
    console.log("works");
    chrome.storage.local.get("injected_tabs", (data) => {
        let injected_tabs = data.injected_tabs;
        delete injected_tabs[tab_id];
        chrome.storage.local.set({"injected_tabs": injected_tabs });
    });
}

chrome.tabs.onRemoved.addListener(del_injected_tab);
chrome.tabs.onUpdated.addListener(del_injected_tab);


setInterval(getStorageData, 1000);

