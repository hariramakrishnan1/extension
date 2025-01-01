const slider = document.getElementById("speed_slider");
const slider_value = document.getElementById("speed_slider_value");
let injected_tabs = [];

slider.addEventListener('input',() => {
    document.getElementById('speed_value').value = (slider.value/100).toString();
})

document.getElementById("speed_value").addEventListener('input',() => {
    let value = isNaN(parseFloat(document.getElementById("speed_value").value)) ? 
    0 : parseFloat(document.getElementById("speed_value").value);
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        tab = tabs[0].id;
        if(!injected_tabs.includes(tab)){
            chrome.scripting.executeScript({
                target: { tabId: tab },
                func: change_speed_script
            });
            injected_tabs.push(tab);
        }
        chrome.tabs.sendMessage(
            tab,
            { action: "change speed", data: value}
            );
      
    });
})

function change_speed_script(){
    let videos = document.querySelectorAll('video');

    chrome.runtime.onMessage.addListener((message) => {
        if (message.action === "change speed") {
            videos[0].playbackRate = message.data;
        }
        });
}

slider.addEventListener("change",() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        tab = tabs[0].id;
        if(!injected_tabs.includes(tab)){
            chrome.scripting.executeScript({
                target: { tabId: tab },
                func: change_speed_script
            });
            injected_tabs.push(tab);
        }
        chrome.tabs.sendMessage(
            tab,
            { action: "change speed", data: (slider.value)/100 }
            );
      
    });
  });


