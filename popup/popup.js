const slider = document.getElementById("speed_slider");
const slider_value = document.getElementById("speed_slider_value");

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    tab_id = tabs[0].id;
    chrome.storage.local.get("injected_tabs", (data) =>
    {
        let injected_tabs = data.injected_tabs;
        if(tab_id in injected_tabs){

            slider.value = injected_tabs[tab_id]["speed_value"] * 100;
            document.getElementById("speed_value").value = injected_tabs[tab_id]["speed_value"];
        }
    });
  
});

function change_speed(value){
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        tab_id = tabs[0].id;
        console.log(tab_id);
        chrome.storage.local.get("injected_tabs", (data) => 
        {
            let injected_tabs = data.injected_tabs;
            if(!(tab_id in injected_tabs)){

                chrome.scripting.executeScript({

                    target: { tabId: tab_id },
                    func: manipulator

                }, () => {
                    injected_tabs[tab_id] = {"speed_value" : value};
                    chrome.storage.local.set({"injected_tabs": injected_tabs});
                    chrome.tabs.sendMessage(tab_id, { action: "change speed", data: value});
                });

            }
            else{
                chrome.tabs.sendMessage(
                    tab_id,
                    { action: "change speed", data: value}
                    );
            }
        });
      
    });
}

function manipulator(){
    let videos = document.querySelectorAll('video');
    chrome.runtime.onMessage.addListener((message) => {
        if (message.action === "change speed") {
            videos[0].playbackRate = message.data;
        }
        });
}

slider.addEventListener('input',() => {
    document.getElementById('speed_value').value = (slider.value/100).toString();
})

document.getElementById("speed_value").addEventListener('input',() => {
    let value = isNaN(parseFloat(document.getElementById("speed_value").value)) ? 
    0 : parseFloat(document.getElementById("speed_value").value);
    slider.value = value * 100;
})

document.getElementById("speed_value").addEventListener('input',() => {
    let value = isNaN(parseFloat(document.getElementById("speed_value").value)) ? 
    0 : parseFloat(document.getElementById("speed_value").value);
    change_speed(value);
})

slider.addEventListener("change",() => {
    value = (slider.value)/100;
    change_speed(value);
  });


