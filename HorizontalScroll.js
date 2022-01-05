//Custom (HTML to be added to the settings panel in ceros)

<script> 
    var horizontalContent = document.getElementsByClassName("horizontal-group"), 
        horizontalObj = document.getElementsByClassName("horizontal-object"), 
        verticalContent = document.getElementsByClassName("vertical-group"), 
        verticalObj = document.getElementsByClassName("vertical-object"); 
    var horizontal = [horizontalContent, horizontalObj], 
        vertical = [verticalContent, verticalObj]; 
    var pageContainer = document.getElementsByClassName("page-container"); 
    var addEventTrigger = true; 
    var scrollPosition = 0, 
        pageWidth = 1280, 
        slideHeight = 720; 
    
    var minScroll, maxScroll, scrollRange;
    
    (function(){ 
        'use strict'; 
        require.config({ 
            paths: { 
                CerosSDK: '//sdk.ceros.com/standalone-player-sdk-v5.min' 
            } 
        }); 
        require(['CerosSDK'], function (CerosSDK) { 
            CerosSDK.findExperience() 
                .fail(function (error) { 
                    console.error(error); 
                }) 
                .done(function (experience) { 
                    window.myExperience = experience; 
    
                    experience.on(CerosSDK.EVENTS.PAGE_CHANGED, pageChangedCallback); 
                        function pageChangedCallback(){ 
                            var horizontalGroupName  = "horizontal-group", 
                                verticalGroupName = "vertical-group", 
                                horizontalObjectName = "horizontal-object", 
                                verticalObjectName = "vertical-object";
                            var horizontalGroup = experience.findLayersByTag(horizontalGroupName), 
                                verticalGroup =  experience.findLayersByTag(verticalGroupName);
                            var horizontalObject = experience.findComponentsByTag(horizontalObjectName), 
                                verticalObject = experience.findComponentsByTag(verticalObjectName); 
    
                            var objectsNames = [horizontalGroupName, verticalGroupName, horizontalObjectName, verticalObjectName], 
                                objects = [horizontalGroup, verticalGroup, horizontalObject, verticalObject]; 
    
                            for(var i = 0; i<objects.length; i++){ 
                                objects[i].layers.forEach(function(component){ 
                                    var id = '#' + component.id; 
                                    $(id).addClass(objectsNames[i]); 
                                });  
                            } 
                            loadingScroll(); 
                        } 
                }) 
        }); 
    })(); 
    
    function loadingScroll(){ 
        for(i=0;i<pageContainer.length;i++){ 
            if(addEventTrigger == true){ 
                pageContainer[i].addEventListener("scroll", scrollEffect); 
            } 
    //-------------------------IMPORTANT!!!-------------------------// 
    //      i == page number (counting from bottom and starting from zero) 
    //      Ceros anchor number in brackets: 
    //          minScroll: anchor starting a scrolling 
    //          maxScroll: anchor ending a scrolling 
            if($(pageContainer[i]).parent().hasClass("page-viewport top") && i == 0){ 
                let pageScroll = $(pageContainer[i]).children().first(); 
                let anchor = $(pageScroll).children(`.scranchor`).toArray(); 
                minScroll = parseInt(anchor[1].style.top, 10); 
                maxScroll = parseInt(anchor[2].style.top, 10);
                scrollRange = maxScroll-minScroll;
                $('.hover-area').remove();
            } 
        } 
        addEventTrigger = false; 
    } 
    
    function scrollEffect(){ 
        scrollPosition = this.scrollTop; 
        var differencePos = scrollPosition-minScroll; 
    
        //scroll position is between both Ceros anchors 
        if(this.scrollTop >= minScroll && this.scrollTop <= maxScroll){ 
            for(let scrollObj of horizontal){ 
                for(i=0; i< scrollObj.length; i++){ 
                    scrollObj[i].style.transform = 'translate(' + (-(differencePos*(pageWidth/slideHeight))) + 'px, ' + differencePos + 'px)'; 
                } 
            } 
            for(let scrollObj of vertical){ 
                for(i=0; i<scrollObj.length; i++){ 
                    scrollObj[i].style.transform = 'translate(0px, ' + differencePos + 'px)'; 
                    // scrollObj[i].style.top = '0px';
                    // scrollObj[i].style.position = 'fixed';
                } 
            } 
        } 
        //scroll position is above first Ceros anchor 
        else if(this.scrollTop < minScroll){ 
            for(let scrollObject of horizontal){ 
                startingPosition(scrollObject); 
            } 
            for(let scrollObject of vertical){ 
                startingPosition(scrollObject); 
            } 
        } 
        //scroll position is below second Ceros anchor 
        else{ 
            for(let scrollObject of horizontal){ 
                for(i=0; i<scrollObject.length; i++){ 
                    scrollObject[i].style.transform = 'translate(' + (-(scrollRange*(pageWidth/slideHeight))) + 'px,' + scrollRange + 'px)';
                    console.log(scrollRange);
                } 
            } 
            for(let scrollObject of vertical){ 
                for(i=0; i<scrollObject.length; i++){ 
                    scrollObject[i].style.transform = 'translate(0px,' + scrollRange + 'px)'; 
                } 
            } 
        } 
    } 
    
    function startingPosition(scrollObj){ 
        for(i=0; i<scrollObj.length; i++){
            // scrollObj[i].style.top = 'initial';
            // scrollObj[i].style.position = 'absolute';
            scrollObj[i].style.transform = 'translate(0px, 0px)';
        } 
    } 
</script>