(window.onload = function(){
    var divs = [];
    var request = {};
    
    buttonMake("twitter",selectService("twitter"),document.getElementById( "twitter" ));
    
    function buttonMake(buttonName,eventFunc,parentElement){
        var button = document.createElement( "BUTTON" );
        button.textContent = buttonName;
        button.addEventListener("click",eventFunc,false); 
        parentElement.appendChild( button );  
        return button;
    }
    
    function divMake(divId,parentElement){
        var div = document.createElement( "DIV" );
        div.id = divId;
        parentElement.appendChild(div);
        return div;
    }

    function selectService(serviceName){
        return function(){
        switch(serviceName){
            case "twitter":
                divMake("twitter-catch",document.getElementById( "twitter" ));
                buttonMake("Catch timeline",selectPipeService("Catch timeline"),document.getElementById( "twitter-catch" ));
                buttonMake("Catch DM",selectPipeService("Catch DM"),document.getElementById( "twitter-catch" ));
                buttonMake("Catch reply",selectPipeService("Catch reply"),document.getElementById( "twitter-catch" ));
                console.log("ヒャッハー");           
            break;
            case "github":
            break;
        }
        }
    }

    function selectPipeService(buttonPropty){
        return function(){
        request['catchData'] = buttonPropty;
        divMake("twitter-send",document.getElementById( "twitter" ));
        buttonMake("twitter Send timeline",postRequest("twitter send timeline"),document.getElementById( "twitter-send" ));
        buttonMake("twitter Send DM",postRequest("twitter send DM"),document.getElementById( "twitter-send" ));
        buttonMake("github Send Issue",postRequest("github send Issue"),document.getElementById( "twitter-send" ));

        console.log(request);   
        }
    }

    function postRequest(buttonPropty){
        return function(){
        request['sendData'] = buttonPropty;

        console.log(request);
        }
    }
})
