(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');


ga('create', 'UA-96433730-1', 'auto');

ga('set', 'checkProtocolTask', function(){}); // Removes failing protocol check.

ga('require', 'displayfeatures');

ga('send', 'pageview', '/popup.html');




var bgPage = chrome.extension.getBackgroundPage();
var maxRecentlyClosedTabLength = 8;

var windowTabInfo = [];
var winID = [];
var activeWindowId;
var disableHistory = false;
var changeTabsOrder = false;

window.onload = function() {
    ///get setting options
    chrome.storage.sync.get({
        disableHistory: false,
        closed_tabs_number: 8,
        changeTabsOrder: false
    }, function(items) {
        if(typeof items.disableHistory !== 'undefined') disableHistory = items.disableHistory;
        if(typeof items.closed_tabs_number !== 'undefined') maxRecentlyClosedTabLength = items.closed_tabs_number;
        if(typeof items.changeTabsOrder !== 'undefined') changeTabsOrder = items.changeTabsOrder;
        console.log("changeTabsOrder : " + changeTabsOrder);
    });
    initialPage();
    setTimeout(
      addKeyBoardOperator,
      80
    );
}

function addKeyBoardOperator(){
  !function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).hotkeys=e()}}(function(){function n(){return h||"all"}function t(e,n,t){e.addEventListener?e.addEventListener(n,t,!1):e.attachEvent&&e.attachEvent("on"+n,function(){t(window.event)})}function o(e){var t,o=e.keyCode||e.which||e.charCode,i=m["*"];if(-1===g.indexOf(o)&&g.push(o),93!==o&&224!==o||(o=91),o in y){y[o]=!0;for(var f in p)p[f]===o&&(c[f]=!0);if(!i)return}for(var l in y)y[l]=e[v[l]];if(c.filter.call(this,e)){if(t=n(),i)for(a=0;a<i.length;a++)i[a].scope===t&&r(e,i[a],t);if(o in m)for(var a=0;a<m[o].length;a++)r(e,m[o][a],t)}}function r(e,n,t){var o;if(n.scope===t||"all"===n.scope){o=n.mods.length>0;for(var r in y)(!y[r]&&n.mods.indexOf(+r)>-1||y[r]&&-1===n.mods.indexOf(+r))&&(o=!1);(0!==n.mods.length||y[16]||y[18]||y[17]||y[91])&&!o&&"*"!==n.shortcut||!1===n.method(e,n)&&(e.preventDefault?e.preventDefault():e.returnValue=!1,e.stopPropagation&&e.stopPropagation(),e.cancelBubble&&(e.cancelBubble=!0))}}function i(e,n){if(e.length!==n.length)return!1;for(var t=0;t<e.length;t++)if(e[t]!==n[t])return!1;return!0}function f(e){for(var n=e.slice(0,e.length-1),t=0;t<n.length;t++)n[t]=p[n[t]];return n}function l(e){var n;return e=e.replace(/\s/g,""),""===(n=e.split(","))[n.length-1]&&(n[n.length-2]+=","),n}function a(n){var t=n.keyCode||e.which||e.charCode,o=g.indexOf(t);if(o>=0&&g.splice(o,1),93!==t&&224!==t||(t=91),t in y){y[t]=!1;for(var r in p)p[r]===t&&(c[r]=!1)}}function c(e,n,t){var o=l(e),r=[],i=0;for(void 0===t&&(t=n,n="all");i<o.length;i++)r=[],(e=o[i].split("+")).length>1&&(r=f(e),e=[e[e.length-1]]),(e="*"===(e=e[0])?"*":w(e))in m||(m[e]=[]),m[e].push({shortcut:o[i],scope:n,method:t,key:o[i],mods:r})}Array.prototype.indexOf||(Array.prototype.indexOf=function(e){for(var n=0;n<this.length;n++)if(this[n]===e)return n;return-1});for(var u,d=navigator.userAgent.toLowerCase().indexOf("firefox")>0,s={backspace:8,tab:9,clear:12,enter:13,return:13,esc:27,escape:27,space:32,left:37,up:38,right:39,down:40,del:46,delete:46,home:36,end:35,pageup:33,pagedown:34,"â‡ª":20,CapsLock:20,",":188,".":190,"/":191,"`":192,"-":d?173:189,"=":d?61:187,";":d?59:186,"'":222,"[":219,"]":221,"\\":220},h="all",p={"â‡§":16,shift:16,"âŒ¥":18,alt:18,option:18,"âŒƒ":17,ctrl:17,control:17,"âŒ˜":d?224:91,command:d?224:91},g=[],v={16:"shiftKey",18:"altKey",17:"ctrlKey"},y={16:!1,18:!1,17:!1},w=function(e){return s[e]||e.toUpperCase().charCodeAt(0)},m={},k=1;k<20;k++)s["f"+k]=111+k;v[d?224:91]="metaKey",y[d?224:91]=!1,t(document,"keydown",function(e){o(e)}),t(document,"keyup",function(e){a(e)}),u={setScope:function(e){h=e||"all"},getScope:n,deleteScope:function(e){var n,t,o;for(n in m)for(t=m[n],o=0;o<t.length;)t[o].scope===e?t.splice(o,1):o++},getPressedKeyCodes:function(e){return g.slice(0)},isPressed:function(e){return"string"==typeof e&&(e=w(e)),-1!==g.indexOf(e)},filter:function(e){var n=(e.target||e.srcElement).tagName;return!("INPUT"===n||"SELECT"===n||"TEXTAREA"===n)},unbind:function(e,t){for(var o,r,a=l(e),c=[],u=0;u<a.length;u++){if((o=a[u].split("+")).length>1&&(c=f(o)),e=o[o.length-1],e=w(e),void 0===t&&(t=n()),!m[e])return;for(var d=0;d<m[e].length;d++)(r=m[e][d]).scope===t&&i(r.mods,c)&&(m[e][d]={})}}};for(var x in u)c[x]=u[x];var C=window.hotkeys;return c.noConflict=function(e){return e&&window.hotkeys===c&&(window.hotkeys=C),c},window.hotkeys=c,c});

  var config = {
    enter : 'enter' ,
    preTab : 'up',
    nextTab : 'down',
    close : 'delete'
  };

  var tabNodes = document.getElementById( "win1" ).children;
  var focusOn = 0;
  var foreJump= new Array();
  var backJump = new Array();
  var maxIndex = tabNodes.length - 1;
  var holdHiden = new Array();
  var hidenUp , hidenDown;
  tabNodes[focusOn].style['border-bottom'] = '1px rgb(0, 119, 204) solid';
  tabNodes[focusOn].focus();
  for( var i = 0; i < tabNodes.length; i++ ){
    backJump[i] = 1;
    holdHiden[i] = false;
  }
  var i = 0;
  for( var node of tabNodes ){
    if( !node.draggable && !node.className.includes( "hide" ) ){
      var countText = node.children[1].innerText;
      var jump = parseInt( countText.slice( 0 , countText.indexOf( ' ' ) ) ) + 1;
      foreJump.push( jump ) ;
      backJump[ i + jump ] =  jump ;
      node.hotkeyType = true;
    }
    else{
      foreJump.push( 1 );
      node.hotkeyType = false;
    }
    i++;
  }


  var bindKeys = () => {
      hotkeys(
          config.enter, () => {
            tabNodes[focusOn].children[1].click();
            if( tabNodes[focusOn].hotkeyType ){
              holdHiden[focusOn] = !holdHiden[focusOn];
            }
            return false;
      });
      hotkeys(
        config.preTab, () => {
          tabNodes[focusOn].style['border-bottom-width'] = '0px ';
          if( focusOn > 0 ){
            focusOn -= holdHiden[focusOn - backJump[focusOn]] ? 1 : backJump[focusOn];
          }
          else{
            focusOn = maxIndex;
          }
          tabNodes[focusOn].style['border-bottom'] = '1px rgb(0, 119, 204) solid';
          return false;
      });
      hotkeys(
        config.nextTab, () => {
          tabNodes[focusOn].style['border-bottom-width'] = '0px ';
          if( focusOn < maxIndex ){
            focusOn += holdHiden[focusOn] ? 1 : foreJump[focusOn];
          }
          else{
            focusOn = 0;
          }
          tabNodes[focusOn].style['border-bottom'] = '1px rgb(0, 119, 204) solid';
          return false;
      });
      hotkeys(
        config.close , () => {
            tabNodes[focusOn].style['border-bottom-width'] = '0px ';
            tabNodes[focusOn].children[2].click(); // update view
            for( var i = 0 ; i < foreJump[focusOn]  - 1; i++ ){
              delete tabNodes[ i + focusOn ];
            }
            // update node list
            maxIndex -= foreJump[focusOn];
            //update limit
            var oldBack = backJump[focusOn];
            foreJump.splice( focusOn , foreJump[focusOn] );
            backJump.splice( focusOn , backJump[focusOn] );
            //update jump list
            if( focusOn > maxIndex ){
              focusOn = maxIndex;
            }
            // move cursor to next
            backJump[focusOn] = oldBack;
            //update nexttab's jumpback info
            tabNodes[focusOn].style['border-bottom'] = '1px rgb(0, 119, 204) solid';
            return false;
      });
  }
  bindKeys();
}

var startIndex, endIndex, startWindowID, endWindowID;

function initialPage(){

    chrome.windows.getCurrent(null, function(window){
        activeWindowId = window.id;
    });

    var tabNumCount = [];

    chrome.windows.getAll({populate:true},function(windows){
            // let w = window;
        if (!windows[0].focused){
            for (let i in windows){
                if (windows[i].focused){
                    let windowclone = windows[i];
                    windows.splice(i,1);
                    windows.splice(0,0,windowclone);
                    break;
                }
            }
        }

        for(let i in windows){
            windowTabInfo[i] = classifyTabs(windows[i].tabs);
            winID[i] = windows[i].id;
            populateList(windowTabInfo[i], i);

        }

        if (!disableHistory){
            if (bgPage.allClosedTab !== null)
                populateRecentlyClosed(bgPage.allClosedTab);
        }

        setTimeout(function(){
            SetPopupHeight(); //prevent popup window display in a wrong size.
        },30); //300

    });

    // console.log(windowTabInfo);
    // console.log(windowTabInfo.length);


    function updatePopup(){
        $('body').children().remove();

        chrome.windows.getAll({populate:true},function(windows){
            for(let i in windows){
                windowTabInfo[i] = classifyTabs(windows[i].tabs);
                let k = Number(i)+1;
                $('#win' + k).remove();
                populateList(windowTabInfo[i], i);
            }
            if (!disableHistory){
                updateClosedTab();
            }

            // if (bgPage.allClosedTab !== null)
            //     populateRecentlyClosed(bgPage.allClosedTab);
        });
    }

    function updateClosedTab(){
        bgPage = chrome.extension.getBackgroundPage();
        if (bgPage.allClosedTab !== null)
                populateRecentlyClosed(bgPage.allClosedTab);
    }

    function pageTitleFilter(c){
        let n = c.indexOf('<');

        if ( n > -1 ){
            c = c.replace( /<[^>]+>/g, '');
        }
        while ( c.slice(0,1) == ' ' || c.slice(0,1) == '-'){
            c = c.slice(1);
        }
        // console.log(c);
        return c;


    }

    function classifyTabs(tabs){
        let tab_data = [];

        ///classify tabs
        for (let i = 0; i < tabs.length; i++) {
                // console.log(tabs[i].title);
                let already_exist = false;
                let info;

                //clssify tabs by url
                info = urlFiter(tabs[i].url.split('/')[2]);

                for (var j=0; j<tab_data.length; j++){
                    if (info == tab_data[j].info){
                        already_exist = true;
                        tab_data[j].id.push(tabs[i].id);
                        tab_data[j].title.push(pageTitleFilter(tabs[i].title));
                        tab_data[j].index.push(tabs[i].index);
                        if (tab_data[j].active == false && tabs[i].active == true){
                            tab_data[j].active = true;
                        }

                        break;
                    }
                }

                if (!already_exist){
                    let this_tab_favIconUrl = checkUrlValidation(tabs[i]); //assign a default icon if this favIconUrl is null
                    let this_tab_title = pageTitleFilter(tabs[i].title);
                    tab_data.push({  "favIconUrl" : this_tab_favIconUrl,
                                     "info": info,
                                     "id": [tabs[i].id],
                                     "title": [this_tab_title],
                                     "index": [tabs[i].index],
                                     "active": tabs[i].active
                                 });
                    tabNumCount.push(0);
                }

                tab_data.sort(function(a,b){
                    if(b.id.length == a.id.length){
                        return a.index[0] - b.index[0]
                    }
                    else{
                        return b.id.length - a.id.length;
                    }

                });
        }
        return tab_data;
    }

    function populateList(tab_data, windowID){

        windowID = Number(windowID) + 1;
        if (windowID == 1)
            $('body').append('<div id="win' + windowID + '"></div>');
        else{
            $('body').append('<div id="win' + windowID + '"><div id="windowID' + windowID+ '" class="windowID grabbable" draggable="true">Window'+ windowID +'</div></div>');
        }


        let thisWindowWrapoer = $('#win'+ windowID);

        for (let i in tab_data){
            let text;
            let dragInfo = '';

            if(tab_data[i].id.length > 1){
                text = tab_data[i].id.length +' <span>tabs at</span> '+ tab_data[i].info;
                dragInfo = ' draggable="false"';
            }
            else{
                text = tab_data[i].title[0];
                dragInfo = ' draggable="true"'; //enable drag
            }

            let thisElementID = windowID + '_' + i;
            var newIcon = '<div class="icon_wrap win'+ windowID +'" id="line' + thisElementID + '"'+ dragInfo +'><img class="favicon" src=" ' + tab_data[i].favIconUrl +
                '"/><div class="count" id="c' + thisElementID + '">'+ text +'</div><div class="close_icon" id="close' + thisElementID + '"><img class="close_img" src="images/xs.gif"/></div></div>';
            thisWindowWrapoer.append(newIcon);

            ///add an left green border to show current tab
            if (tab_data[i].active && windowID == 1){
                $('#line' + thisElementID).addClass('current_tab');
                $('#line' + thisElementID + ' img').css('padding-left','6px');
            }


            if(tab_data[i].id.length > 1){
                for (let j in tab_data[i].id){

                    let thisID = tab_data[i].id[j];

                    newIcon = '<div class="icon_wrap hide icon_wrap_hide_' + thisElementID + '" id="line' + thisID
                    + '"><img class="favicon" src="images/right_arrow.png"/><div class="count" id="c' + thisID +'">'
                    + tab_data[i].title[j] +'</div><div class="close_icon" id="close' + thisID + '"><img class="close_img" src="images/xs.gif"/></div></div>';

                    thisWindowWrapoer.append(newIcon);

                    chrome.tabs.get(thisID, function(t){
                        if(t.active == true){
                            $('#line' + thisID).addClass('current_tab'); ///add an left green border to show current tab
                            $('#line' + thisID + ' img').css('padding-left','6px');
                        }
                    });


                    $('#c'+ thisID).on("click",function(){
                        chrome.tabs.update(thisID, {active: true});

                        ///if this tab is not in the current window ==> jump to that window
                        chrome.tabs.get(thisID, function(t){
                            if (t.windowId !== activeWindowId){
                                chrome.windows.update(t.windowId, {focused: true});
                            }
                        });
                    });

                    ///Add CLICK EVENT for CLOSE button in 2nd hierarchy
                    $('#close'+ thisID).on("click", function(){
                        ga('send', 'event', 'Button', 'Click', '#close one tab in 2nd hierarchy');//GA

                        $(this).css('animation','quit 0.3s');
                        $('#line' + thisID).css('animation','lineShrink 0.3s');

                        //if this is the last tab in this class
                        tabNumCount[i]++;

                        if(tab_data[i].id.length == tabNumCount[i]){
                            setTimeout(function(){
                                $('#line'+ thisElementID).remove();
                                updatePopup();
                            },50); //350
                        }

                        chrome.tabs.remove(tab_data[i].id[j]);

                        setTimeout(function(){
                            $('#line'+ thisID).remove();
                            bgPage = chrome.extension.getBackgroundPage();
                            populateRecentlyClosed(bgPage.allClosedTab);
                        },20);//320

                    });

                }
            }

            ///Functions for 1st hierarchy

            //CLICK AND JUMP TO PAGE
            $('#c'+ thisElementID).on("click",function(){

                if(tab_data[i].id.length > 1){
                    $( ".icon_wrap_hide_" + thisElementID ).toggle(); //expand tabs
                    ga('send', 'event', 'Button', 'Click', 'toggle');
                    if (changeTabsOrder){
                        ///reorder tabs
                        let orderStart = tab_data[i].index[0];
                        for (let j of tab_data[i].id){
                            chrome.tabs.move(j, { "index": orderStart });
                            orderStart ++;
                        }
                    }
                }
                else{
                    ga('send', 'event', 'Button', 'Click', 'jump to page in multi-tabs');
                    chrome.tabs.update(tab_data[i].id[0], {active: true});
                    chrome.tabs.get(tab_data[i].id[0], function(t){
                            if (t.windowId !== activeWindowId){
                                chrome.windows.update(t.windowId, {focused: true});
                            }
                        });
                }
            });


            //DRAG evnets
            var newPosition;

            $('#line'+ thisElementID).on("dragstart", function(event){
                $(this).css({"opacity":"0.1"});
                startIndex = tab_data[i].index[0];
                startWindowID = windowID - 1;
                // console.log(startWindowID);

            });
            $('#line'+ thisElementID).on("dragend", function(event){
                $(this).css({"opacity":"1"});
                $('.icon_wrap').css({"padding-top":"0"});
                console.log(startWindowID);
                console.log(endWindowID);

                if ((startIndex !== endIndex || startWindowID !== endWindowID) && endIndex !== -1){
                    if (startWindowID !== endWindowID){
                        ga('send', 'event', 'Button', 'Click', 'Drag a tab from another window'); //GA
                    }
                    else{
                        ga('send', 'event', 'Button', 'Click', 'Drag a tab in same window'); //GA
                    }

                    chrome.tabs.move(tab_data[i].id[0], { "windowId": winID[endWindowID], "index": endIndex });
                    $(this).insertBefore(newPosition);
                    setTimeout(function(){
                        updatePopup();
                    },10);//200
                }

            });

            $('#line'+ thisElementID).on("dragover", function(event){
                event.preventDefault();
                if($(this).attr('draggable') == 'true'){
                    $(this).css({"padding-top":"25px"});
                    endIndex = tab_data[i].index[0];
                    endWindowID = windowID - 1;
                    newPosition = $(this);
                }
            });

            $('#line'+ thisElementID).on("dragleave", function(event){
                event.preventDefault();
                $(this).css({"padding-top":"0"});
                endIndex = -1;
            });


            //CLOSE button events
            $('#close'+ thisElementID).on("click", function(){

                if (tab_data[i].id.length > 1){
                    ga('send', 'event', 'Button', 'Click', '#close multi tabs in line'+ i);
                }
                else{
                    ga('send', 'event', 'Button', 'Click', '#close one tab in line'+ i);
                }

                $(this).css('animation','quit 0.3s');
                $('#line'+ thisElementID).css('animation','lineShrink 0.3s');

                $('#c'+ thisElementID).html('');//prevent text float on the animation
                $( ".icon_wrap_hide_" + thisElementID ).remove();

                updatePopupAfterTabsRomoved(tab_data[i].id.length); //update popup after all tabs removed



                setTimeout(function(){
                    for (let j of tab_data[i].id){
                        chrome.tabs.remove(j);
                        $('#line'+ thisElementID).remove();

                        if (windowID > 1){
                            if ($('#win'+ windowID).children().length == 1){
                                // console.log('');
                                $('#win'+ windowID).remove();
                            }
                        }
                    }
                },50);//350

            });

            ///Drag and merge whole WINDOW
            if (windowID !== 1){
                $('#windowID' + windowID).on('dragstart',function(){
                    $(this).css({"background-color":"#8BC34A",
                                 "opacity":"0.5"});
                    startWindowID = windowID - 1;
                    $('.win' + windowID ).css('display', 'none');//hide all tabs in this window
                });


                $('#windowID' + windowID).on('dragend',function(){
                    $(this).css({"background-color":"#F5F5F5",
                                 "opacity":"1"});
                    $( '.win' + windowID ).css('display', 'block');//show all tabs in this window

                    $('.icon_wrap').css({"padding-top":"0"});
                    console.log(startWindowID);
                    console.log(endWindowID);

                    if ((startIndex !== endIndex || startWindowID !== endWindowID) && endIndex !== -1){
                        ga('send', 'event', 'Button', 'Click', 'Drag a window'); //GA
                        for (let k in tab_data){
                            for (let q of tab_data[k].id){
                                chrome.tabs.move(q, { "windowId": winID[endWindowID], "index": endIndex });
                            }
                        }
                        setTimeout(function(){
                            updatePopup();
                        },10);//300


                    }

                });

            }

        }//end for i

    }//end function populateList

    function populateRecentlyClosed(tabs){
        $('#closedTabs').remove();
        var t = [];
        for (let i in tabs){
            t.push(tabs[i]);
        }
        //sort all closed tab by time
        t.sort(function(a,b){
            return b.time - a.time;
        });
        // console.log(t);

        if (t.length > 0){
            $('body').append('<div id="closedTabs"><div class="windowID">Recently Closed Tabs</div></div>');

            var counter = 0;
            for (let j in t){
                counter++;
                let newLines;
                let favUrl = checkUrlValidation(t[j]);

                if (j == 0){
                    newLines = '<div class="icon_wrap closedTabs" id="line' + t[j].tabId + '"><img class="favicon" src=" ' + favUrl +
                    '"/><div class="count" id="c' + t[j].id + '">'+ t[j].title +'</div><img class="restore_img" src="images/restore.png"/></div>';
                }
                else{
                    newLines = '<div class="icon_wrap closedTabs closedTabs_hide" id="line' + t[j].tabId + '"><img class="favicon" src=" ' + favUrl +
                    '"/><div class="count" id="c' + t[j].id + '">'+ t[j].title +'</div><img class="restore_img" src="images/restore.png"/></div>';
                }
                $('#closedTabs').append(newLines);
                $('#line'+ t[j].tabId).on('click',function(){
                    chrome.tabs.create({url : t[j].url});
                    bgPage.removeClosedTab(t[j].tabId);
                    //update
                    setTimeout(function(){updatePopup(); },300);
                });

                if (counter == maxRecentlyClosedTabLength) break;
            }

            if(t.length !== 1){
                $('#closedTabs').append('<div id="rencentlyClosed"><img class="downArrow_img" src="images/down_arrow.png" /></div>');
                $('#rencentlyClosed').on('click', function(){
                    $('.closedTabs_hide').toggle();
                    //display restore icon
                    $(this).remove();

                 });
            }

        }


    }

    function checkUrlValidation(thisTab){
        let thisTab_favIconUrl;

        if( (typeof thisTab.favIconUrl) == 'undefined' || thisTab.favIconUrl == "" || thisTab.favIconUrl == null){
                thisTab_favIconUrl = 'images/default.png';
        }
        else{
            if(thisTab.url.indexOf('chrome://') > -1){
                if(thisTab.url == 'chrome://extensions/'){
                    thisTab_favIconUrl = 'images/e.png';
                }
                else if(thisTab.url == 'chrome://settings/'){
                    thisTab_favIconUrl = 'images/sc.png';
                }
                else if(thisTab.url == 'chrome://history/'){
                    thisTab_favIconUrl = 'images/h.png';
                }
                else{
                    thisTab_favIconUrl = 'images/c.png';
                }
            }
            else if(thisTab.url.indexOf("klbibkeccnjlkjkiokjodocebajanakg") > -1){
                thisTab_favIconUrl = 'images/suspenderIcon.png';
            }
            else{
                thisTab_favIconUrl = thisTab.favIconUrl;
            }

        }


        return thisTab_favIconUrl;
    }

    function urlFiter(url){

        let websites_CN = ['taobao.com','tmall.com','youku.com','iqiyi.com','hupu.com','qq.com','163.com','zuche.com','58.com','jd','zhihu.com',
        'fanli.com','suning.com','vip.com','ctrip.com','jumei.com','baidu.com','cn.dealmoon.com','zh.wikipedia.org','douban.com'];

        let websites_CN_Displayname = ['taobao','tmall','youku','iqiyi','hupu','qq','163','zuche','58','jd','zhihu',
        'fanli','suning','vip','ctrip','jumei','baidu','dealmoon','wikipedia','douban'];

        let websites_EN = ['jquery.com','yahoo.com','softpedia.com'];


        for (j in websites_CN){
            if (url.indexOf(websites_CN[j]) > -1 && url.indexOf('mail') == -1 ){
                url = chrome.i18n.getMessage(websites_CN_Displayname[j]);
            }
        }

        for (j of websites_EN){
            if (url.indexOf(j) > -1 && url.indexOf('mail') == -1 ){
                url = j;
            }
        }


        if (url.indexOf('www.') > -1 ){
            url = url.replace('www.','');
        }

        if (url.indexOf('klbibkeccnjlkjkiokjodocebajanakg') > -1 ){
            url = "your Tab Suspender";
        }

        return url;

    }

    function updatePopupAfterTabsRomoved(n){
        var tabs_remove_counter = 0;
        tabs_remove_target = n;

        chrome.tabs.onRemoved.addListener(function tabs_onRemovedListener(){
            tabs_remove_counter++;

            if (n == tabs_remove_counter){
                updateClosedTab();
                chrome.tabs.onRemoved.removeListener(tabs_onRemovedListener);
            }
        });

    }

    function SetPopupHeight(){
        //Due to unknown reason, sometimes popup window display in a wrong size.
        //To fix this bug,
        //this function add an empty object and delete it.
        var emptyBlock = $('body').append('<div id="emptyBlock" style="height:1px; display:block;"></div>');
        setTimeout(function(){$('#emptyBlock').remove();},20);//500
        console.log('resize');
    }


}//end function intial page
