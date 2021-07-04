
// function CreateCookie(name, value, days) {
//     if (days) {
//         var date = new Date();
//         date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
//         var expires = "; expires=" + date.toGMTString();
//     }
//     else var expires = "";

//     document.cookie = name + "=" + value + expires + "; path=/";
// }

// function ReadCookie(nomeCookie) {
//     if (document.cookie.length > 0) {
//         var inizio = document.cookie.indexOf(nomeCookie + "=");
//         if (inizio != -1) {
//             inizio = inizio + nomeCookie.length + 1;
//             var fine = document.cookie.indexOf(";", inizio);
//             if (fine == -1) fine = document.cookie.length;
//             return unescape(document.cookie.substring(inizio, fine));
//         } else {
//             return "";
//         }
//     }
//     return '';
// }

function showLucky(root) {

    var feed = root.feed;
    var entries = feed.entry || [];
    var entry = feed.entry[0];
    for (var j = 0; j < entry.link.length; ++j) {
        if (entry.link[j].rel == "alternate") {
            window.location = entry.link[j].href;
        }
    }
}

function fetchLuck(luck) {

    script = document.createElement('script');
    script.src = '/feeds/posts/summary?start-index=' + luck + '&max-results=1&alt=json-in-script&callback=showLucky';
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);
}

function readLucky(root) {

    var feed = root.feed;
    var total = parseInt(feed.openSearch$totalResults.$t, 10);
    var luckyNumber = Math.floor(Math.random() * total);
    luckyNumber++;
    fetchLuck(luckyNumber);
}

function feelingLucky() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '/feeds/posts/summary?max-results=0&alt=json-in-script&callback=readLucky';
    document.getElementsByTagName('head')[0].appendChild(script);
}

function SearchMobile() {

    var name = $("#searchValueMobile").val();
    if(!name || name == "")
    {
        HideSearchMobile();
        return;
    }

    var found = 0;    

    var content = document.getElementById('contentSearchMobile');

    content.innerHTML = '<img src="https://dottorpagliaccius.github.io/refresh-nera.gif" style="border: 0px; margin-left: 5px; margin-top: 10px;" />&nbsp;Sto scavando...';

    var feedUri = '/feeds/6675218908136689140/posts/default/-/Tutto+il+morto+minuto+per+minuto?q='+name+'&max-results=20&start-index=1&alt=json';

    var handleBlogPostFeed = function (postsFeedRoot) {

        var posts = postsFeedRoot.feed.entry;

        if(!posts)
        {
            HideSearchMobile();
            return;
        }

        var html = '<table style="width:100%">';

        for (var i = 0, post; post = posts[i]; i++) {

            var postTitle = post.title.$t;

            if (postTitle.toLowerCase().indexOf(name.toLowerCase()) < 0) 
                continue;

            found++;

            var postURL = '';
            var imageURL = '';

            for (var k = 0; k< post.link.length; k++) {
                if (post.link[k].rel == 'alternate') {
                    postURL = post.link[k].href;
                  break;
                }
              }

            if (post.media$thumbnail != null) {
                imageURL = post.media$thumbnail.url;
            }

            var deadName = postTitle.split('(')[0];

            html += '<tr><td><img width="60" height="60" src="' + imageURL + '" style="border:0px; float:left; margin-right:6px;" /><a style="font-size:18px" href="' + postURL + '" target="_blank">' + deadName + '</a></td></tr>';
        }
        
        if(found == 0)
            HideSearchMobile();

        html += '</table>';

        content.innerHTML = html;
    };

    $.get(feedUri, handleBlogPostFeed);
}

function GoSearchMobile() {

    var name = $("#searchValueMobile").val();
    if(!name || name == "")
    {
        return;
    }

    var searchValueContainer = $('#searchValueContainerMobile');
    var contentSearch = $('#contentSearchMobile');

    searchValueContainer.css('border-width', '1px 1px 0px 1px');
    searchValueContainer.css('border-radius', '5px 5px 0px 0px');

    contentSearch.width(searchValueContainer.width() + 12);
    contentSearch.slideDown('fast', function () {
        SearchMobile();
    });
}

function HideSearchMobile() {

    var searchValueContainer = $('#searchValueContainerMobile');
    var contentSearch = $('#contentSearchMobile');

    searchValueContainer.css('border-width', '1px');
    searchValueContainer.css('border-radius', '5px');

    contentSearch.slideUp('fast');
    contentSearch.width(searchValueContainer.width() - 12);    
}

function GoSearch() {

    var name = $("#searchValueMenu").val();
    if(!name || name == "")
        return;

    var searchValueContainer = $('#searchValueContainer');
    var contentSearch = $('#contentSearch');

    searchValueContainer.css('border-width', '1px 1px 0px 1px');
    searchValueContainer.css('border-radius', '5px 5px 0px 0px');

    contentSearch.width(searchValueContainer.width() + 12);
    contentSearch.slideDown('fast', function () {
        SearchMenu();
    });
}

function HideSearch() {

    var searchValueContainer = $('#searchValueContainer');
    var contentSearch = $('#contentSearch');

    searchValueContainer.css('border-width', '1px');
    searchValueContainer.css('border-radius', '5px');
   
    contentSearch.slideUp('fast');
    contentSearch.width(searchValueContainer.width() - 12);
}

function SearchMenu() {

    var name = $("#searchValueMenu").val();
    if(!name || name == "")
    {
        HideSearch();
        return;
    }

    var found = 0;    
    var content = document.getElementById('contentSearch');

    content.innerHTML = '<img src="https://dottorpagliaccius.github.io/refresh-nera.gif" style="border: 0px; margin-left: 5px; margin-top: 10px;" />&nbsp;Sto scavando...';

    var feedUri = '/feeds/6675218908136689140/posts/default/-/Tutto+il+morto+minuto+per+minuto?q='+name+'&max-results=20&start-index=1&alt=json';

    var handleBlogPostFeed = function (postsFeedRoot) {

        var posts = postsFeedRoot.feed.entry;

        if(!posts)
        {
            HideSearch();
            return;
        }

        var html = '<table style="width:100%">';

        for (var i = 0, post; post = posts[i]; i++) {

            var postTitle = post.title.$t;

            if (postTitle.toLowerCase().indexOf(name.toLowerCase()) < 0) 
                continue;

            found++;

            var postURL = '';
            var imageURL = '';

            for (var k = 0; k< post.link.length; k++) {
                if (post.link[k].rel == 'alternate') {
                    postURL = post.link[k].href;
                  break;
                }
              }

            if (post.media$thumbnail != null) {
                imageURL = post.media$thumbnail.url;
            }

            var deadName = postTitle.split('(')[0];

            html += '<tr><td><img width="60" height="60" src="' + imageURL + '" style="border:0px; float:left; margin-right:6px;" /><a style="font-size:18px;margin-left: 0px;" href="' + postURL + '" target="_blank">' + deadName + '</a></td></tr>';
        }

        if(found == 0)
            HideSearch();

            html += '</table>';

            content.innerHTML = html;
    };

    $.get(feedUri, handleBlogPostFeed);
}

var videosArray = new Array();
var videosIndexArray = new Array();
var videosIsOpenArray = new Array();
var indexYouTube = 0;

function Close(index, fast) {

    if (fast)
        $('#tooltipMain_' + index).remove();
    else
        $('#tooltipMain_' + index).slideUp(300, function () {
            $('#tooltipMain_' + index).remove();
        });
}

// function ShowVideo(videoID, index, title, videoType) {

//     if( $('#header-wrapper').css('display')=='none') {
//         return;
//      }

//     videosIsOpenArray['' + index] = true;

//     var tooltipMain = $("#tooltipMain_" + index);
//     var previewDiv = $("#previewDiv_" + index);

//     tooltipMain.attr("open", "true");

//     var top = parseInt(tooltipMain.css('top')) - 200;
//     tooltipMain.animate({ 'top': top }, 1000, 'linear', function () {

//         tooltipMain.css({position: 'fixed', top: top - $("body").scrollTop()});
//     });

//     $("#bar_" + index).animate({ 'width': '450px', 'height': '20px' }, 1000, 'linear');

//     previewDiv.animate({ 'width': '430px', 'height': '20px' }, 1000, 'linear')
//         .css("background", "");

//     $("#anchor_" + index).remove();

//     switch (videoType) {

//         case 'youtube':
//             $("#anchor_" + index).attr('href', 'https://www.youtube.com/?v=' + videoID);
//             break;

//         case 'vimeo':
//             $("#anchor_" + index).attr('href', 'https://www.vimeo.com/' + videoID);
//             break;

//         case 'dailymotion':
//             $("#anchor_" + index).attr('href', 'https://dailymotion.virgilio.it/video/' + videoID);
//             break;

//         case 'metacafe':
//             $("#anchor_" + index).attr('href', 'https://www.metacafe.com/watch/' + videoID);
//             break;
//     }

//     $("#closeDiv_" + index).fadeIn(1000);

//     previewDiv.css("cursor", "all-scroll");

//     tooltipMain.draggable({ containment: '#dragContainer', handle: "#previewDiv_" + index });

//     $("#video-embed-" + index).slideDown("slow", function () {

//         var params = { allowScriptAccess: 'always', allowfullScreen: 'true', wmode: 'transparent', bgcolor: "#FFFFFF" };

//         switch (videoType) {

//             case 'youtube':

//                 var attrs = { id: 'video-embed-' + index };

//                 swfobject.embedSWF('https://www.youtube.com/v/' + videoID + '&enablejsapi=1&playerapiid=youtube-api-' + videoID, 'video-embed-' + index, '450', '264', '8', null, null, params, attrs);
//                 break;

//             case 'dailymotion':

//                 var attrs = { id: 'video-embed-' + index };

//                 swfobject.embedSWF('https://www.dailymotion.com/swf/' + videoID + '&enableApi=1&playerapiid=dmplayer', 'video-embed-' + index, '450', '264', '8', null, null, params, attrs);
//                 break;

//             case 'metacafe':

//                 var attrs = { id: 'video-embed-' + index };

//                 swfobject.embedSWF('https://www.metacafe.com/fplayer/' + videoID.slice(0, -1) + '.swf', 'video-embed-' + index, '450', '264', '8', null, null, params, attrs);
//                 break;

//             case 'vimeo':

//                 var flashvars = {
//                     clip_id: videoID,
//                     server: 'vimeo.com',
//                     show_title: 1,
//                     show_byline: 1,
//                     show_portrait: 0,
//                     fullscreen: 1,
//                     js_api: 1
//                 };

//                 swfobject.embedSWF('https://vimeo.com/moogaloop.swf', 'video-embed-' + index, '450', '264', "9.0.0", null, flashvars, params);
//                 break;
//         }
//     });

//     for (j = 1; j <= videosIndexArray.length; j++) {

//         var currentVideo = videosIndexArray['' + j];

//         if (videosArray[currentVideo] == index)
//             continue;

//         Close(j);
//     }
// }

var _index = 0;

function BindPostPerview(selector) {

    if($("#topMenu").is(":visible"))
            return;

    $(selector).each(function () {

        var postUrl = $(this).attr('href');

        if (postUrl.indexOf('www1') == -1) {

            $(this).attr('href', 'https://www1.ilmortodelmese.com/' + postUrl.substring(postUrl.indexOf('20')));

        }
    });

    $(selector).bind('mouseover mouseout', function (e) {

        if (e.type == 'mouseover') {

            _index++;

            var screenY = e.screenY;

            $(this).attr("scolo", _index);

            $("body").append('<div class="loaderPost" id="loader' + _index + '"><img src="https://dottorpagliaccius.github.io/refresh-bianca.gif" /></div>');

            var loader = $("#loader" + _index);

            loader.css({ "top": (e.pageY + 10) + "px", "left": (e.pageX + 10) + "px" })
                .fadeIn("fast");

            var postUrl = $(this).attr('href');

            var urlPart = postUrl.substring(postUrl.indexOf('/20'));

            if (window.location.href.indexOf('www1') > 0) {
                postUrl = "https://www1.ilmortodelmese.com" + urlPart;
            }
            else if (window.location.href.indexOf('www') > 0) {
                postUrl = "https://www.ilmortodelmese.blogspot.com" + urlPart;
            }
            else {
                postUrl = "https://ilmortodelmese.blogspot.com" + urlPart;
            }

            loader.load(postUrl + " .post .post-title, .post-body", function (response, status, xhr) {

                if (status == "error") {

                    $("#loader" + _index).html("<img src='https://dottorpagliaccius.github.io/close.png' />");
                    return true;
                }

                $(this).css("background-color", "#fff");
                $(this).find("#postTable > tbody > tr > td > span > div.separator > a > img").first().css({'width': '400px', 'height': 'auto'});  

                var top = e.pageY;
                var height = parseInt($(this).css("height"));

                top = ((top - $(window).scrollTop() < height) ? $(window).scrollTop() : top - height);

                $(this).css({ 'width': '500px', 'border': '1px solid black', 'border-radius': '0px' , 'font-size':'18px'})
                    .animate({ 'top': top + 'px' }, 500);
            });
        }
        else {
            var index = $(this).attr("scolo");

            $("#loader" + index).fadeOut(300, function () {
                $("#loader" + index).remove();
            });
        }
    });

    $(selector).bind('mousemove', function (e) {

        var index = $(this).attr("scolo");

        $("#loader" + index).css({ "left": (e.pageX + 10) + "px" });
    });
}

$(document).ready(function () {

    // if ($.browser.mozilla || ($.browser.msie && $.browser.version == '7.0')) {

    //     $("#Scava").height($("#Scava").innerHeight() + 3);
    // }

    $.expr[':'].linkNoImg = function (obj) {

        var $this = $(obj);
        var href = $this.attr('href');

        return href != null && !($this.children('img').length) && $this.attr('preview') == null && href.match(/\.(gif|GIF|jpe?g|JPE?G|png|PNG|bmp|BMP)$/i) != null && !(($this.attr('imageanchor') != null && $this.attr('onblur') == null) || ($this.attr('imageanchor') == null && $this.attr('onblur') != null));
    };

    $.expr[':'].linkImg = function (obj) {

        var $this = $(obj);

        return (($this.attr('imageanchor') != null && $this.attr('onblur') == null) || ($this.attr('imageanchor') == null && $this.attr('onblur') != null));
    };

    $.expr[':'].isVideo = function (obj) {

        var $this = $(obj);
        var href = $this.attr('href');

        return href != null && (href.indexOf('youtube.') > -1 || href.indexOf('vimeo.') > -1 || href.indexOf('dailymotion.') > -1 || href.indexOf('metacafe.') > -1);
    };

    var _fixedWidth = 250;
    var _mobileFixedWidth = 250;
    var _index = 0;

    $.expr[':'].isMorto = function (obj) {

        var $this = $(obj);
        var href = $this.attr('href');

        return $this.css('color') != "rgb(255, 255, 255)" && $this.attr('title') == null && $this.html().indexOf('img') == -1 && href != null
            && (href.indexOf('www.ilmortodelmese.com/20') > 0 || href.indexOf('www1.ilmortodelmese.com/20') > 0 || href.indexOf('https://ilmortodelmese.blogspot.com/20') == 0 || href.indexOf('https://www.ilmortodelmese.blogspot.com/20') == 0) && href.indexOf('showComment') == -1
            && href.indexOf('archive') == -1;
    };

    BindPostPerview(".post-body a:isMorto, #pollContainer a:isMorto, #comments a:isMorto");

    $('a:linkNoImg').hover(function (e) {

            if($("#topMenu").is(":visible"))
                return;

            _index++;

            var screenY = e.screenY;

            $(this).attr("scolo", _index);

            $("body").append('<div class="loader" id="loader' + _index + '"><img src="https://dottorpagliaccius.github.io//refresh-bianca.gif" /></div>');

            $("#loader" + _index).css("top", (e.pageY + 10) + "px").css("left", (e.pageX + 5) + "px").fadeIn("fast");

            var imageUrl = $(this).attr('href');

            var currentImage = new Image()

            $(currentImage).load(function () {

                var thisImage = $(this);
                var loader = $("#loader" + _index);

                if (thisImage.prop('width') == 0) {

                    loader.html("<img src='https://dottorpagliaccius.github.io/close.png' />");
                    return true;
                }

                var finalHeight = Math.round(thisImage.prop('height') / thisImage.prop('width') * _fixedWidth);

                var topPosition = parseInt(loader.css("top"));

                if (screenY + finalHeight > screen.height) {
                    topPosition = topPosition - finalHeight - 35;
                }

                loader.css("background-color", "#fff")
                    .html(" ")
                    .animate({ 'width': _fixedWidth, 'height': finalHeight, 'top': topPosition }, 100, function () {

                        thisImage.css('display', 'none');   //$(this).hide();

                        loader.html('<img src="' + imageUrl + '" style="width:' + _fixedWidth + 'px; height:' + finalHeight + 'px;"/>');

                        thisImage.fadeIn();
                    });

            }).error(function () { // notify the user that the image could not be loaded

                    $("#loader" + _index).html("<img src='https://dottorpagliaccius.github.io/close.png' />");

                }).attr('src', imageUrl);
        },
        function () {

            var index = $(this).attr("scolo");

            $("#loader" + index).fadeOut(300, function () {
                $("#loader" + index).remove();
            });
        });

    $('a:linkNoImg').mousemove(function (e) {

        if($("#topMenu").is(":visible"))
            return;

        var index = $(this).attr("scolo");

        $("#loader" + index).css("left", (e.pageX + 5) + "px");
    });

    $('a:linkNoImg').click(function (e) {

        if(!$("#topMenu").is(":visible"))
            return;

        e.preventDefault();

        _index++;

        var screenY = e.screenY;

        $(this).attr("scolo", _index);

        $("body").append('<div class="loader" id="loader' + _index + '"><img src="https://dottorpagliaccius.github.io/refresh-bianca.gif" /></div>');

        var leftPosition = (e.pageX + 5);

        $("#loader" + _index).css("top", (e.pageY + 10) + "px").css("left", leftPosition + "px").fadeIn("fast");

        var imageUrl = $(this).attr('href');

        var currentImage = new Image()

        $(currentImage).load(function () {

            var thisImage = $(this);
            var loader = $("#loader" + _index);

            if (thisImage.prop('width') == 0) {

                loader.html("<img src='https://dottorpagliaccius.github.io/close.png' />");
                return true;
            }

            var finalHeight = Math.round(thisImage.prop('height') / thisImage.prop('width') * _mobileFixedWidth);

            var topPosition = parseInt(loader.css("top"));

            if (screenY + finalHeight > screen.height) {
                topPosition = topPosition - finalHeight - 35;
            }

            loader.css("background-color", "#fff")
                .html(" ")
                .animate({ 'width': _mobileFixedWidth, 'height': finalHeight, 'top': topPosition, 'left' : $(window).width()/2 - _mobileFixedWidth/2 }, 100, function () {

                    thisImage.css('display', 'none');  

                    loader.html('<img src="' + imageUrl + '" style="width:' + _mobileFixedWidth + 'px; height:' + finalHeight + 'px;"/>');

                    thisImage.fadeIn();
                });

        }).error(function () { // notify the user that the image could not be loaded

                $("#loader" + _index).html("<img src='hhttps://dottorpagliaccius.github.io/close.png' />");

            }).attr('src', imageUrl);

            setTimeout(function () {
            
                    var index = $(this).attr("scolo");
            
                    $("#loader" + index).fadeOut(300, function () {
                        $("#loader" + index).remove();
                    });
                }, 3000);
    });

    $('a:isVideo').hover(function (e) {

            var linkUrl = $(this).attr('href');

            $(this).attr('target','_blank');

            var videoType = '';
            var videoID = linkUrl.match("[\\?&]v=([^&#]*)");

            var thumb = '';

            if (videoID == null || videoID.length < 2) {

                if (linkUrl.indexOf('vimeo.') > -1) {

                    videoType = 'vimeo';
                    videoID = linkUrl.substring(linkUrl.lastIndexOf('/') + 1);

                    thumb = "https://dottorpagliaccius.github.io/vimeo.png";
                }
                else if (linkUrl.indexOf('dailymotion.') > -1) {

                    videoType = 'dailymotion';
                    videoID = linkUrl.substring(linkUrl.lastIndexOf('/') + 1);

                    thumb = "https://www.dailymotion.com/thumbnail/160x120/video/" + videoID + ".jpg";
                }
                else if (linkUrl.indexOf('metacafe.') > -1) {

                    videoType = 'metacafe';
                    videoID = linkUrl.substring(linkUrl.lastIndexOf('watch/') + 6);

                    var id = videoID.substring(0, videoID.indexOf('/'));

                    thumb = "https://www.metacafe.com/thumb/" + id + ".jpg";
                }
                else {
                    return false;
                }
            }
            else {
                videoType = 'youtube';
                videoID = videoID[1];

                thumb = "https://img.youtube.com/vi/" + videoID + "/2.jpg";
            }

            var index = 0;

            if (videosArray[videoID] == null) {

                videosArray[videoID] = ++indexYouTube;

                videosIndexArray['' + indexYouTube] = videoID;

                index = indexYouTube;
            }
            else {
                index = videosArray[videoID];
            }

            var tooltipMain = $("#tooltipMain_" + index);

            if (tooltipMain.length > 0) {
                return true;
            }

            $(this).attr('index', '' + index);
            videosIsOpenArray['' + index] = false;

            for (j = 1; j <= videosIndexArray.length; j++) {

                if (videosIsOpenArray['' + j]) continue;

                Close(j);
            }

            //var aText = $(this).text().replace(/'/g, " ");

            //$("body").append('<div class="tooltipMain" id="tooltipMain_' + index + '"><div class="videoBar" id="bar_' + index + '"><div class="videoBarLik" id="previewDiv_' + index + '" style="float:left; width:120px; background:url(' + thumb + ') no-repeat center center;"><a id="anchor_' + index + '" href="javascript:ShowVideo(\'' + videoID + '\',' + index + ',\'' + aText + '\',\'' + videoType + '\');"><img src="https://dottorpagliaccius.github.io/play-icon.png" /></a></div><div id="closeDiv_' + index + '" style="float:left; display:none;"><a id="closeImage" href="javascript: Close(' + index + ')" style="border:0 !important;"><img src="https://dottorpagliaccius.github.io/close.png" alt="Chiudi" title="Chiudi" style="margin-top: 3px; width: 16px; height: 16px; border:0 !important;" /></a></div></div><div style="clear: both;"></div><div class="videoContainer" id="video-embed-' + index + '"></div></div>');
            $("body").append('<div class="tooltipMain" id="tooltipMain_' + index + '"><div class="videoBar" id="bar_' + index + '"><div class="videoBarLik" id="previewDiv_' + index + '" style="float:left; width:120px; background:url(' + thumb + ') no-repeat center center;"><a id="anchor_' + index + '" href="' + linkUrl + '" target="_blank"><img src="https://dottorpagliaccius.github.io/play-icon.png" /></a></div><div id="closeDiv_' + index + '" style="float:left; display:none;"><a id="closeImage" href="javascript: Close(' + index + ')" style="border:0 !important;"><img src="https://dottorpagliaccius.github.io/close.png" alt="Chiudi" title="Chiudi" style="margin-top: 3px; width: 16px; height: 16px; border:0 !important;" /></a></div></div><div style="clear: both;"></div><div class="videoContainer" id="video-embed-' + index + '"></div></div>');

            var tooltipMain = $("#tooltipMain_" + index);

            tooltipMain.css({ "top": ($(this).position().top - 100) + "px", "left": ($(this).position().left - 40) + "px" })
                .fadeIn("fast");

//            console.log("$(this).position().top                                -> " + $(this).position().top);
//            console.log("$(this).scrollTop()                                   -> " + $("body").scrollTop());
//            console.log("$(this).position().top - 100 - $(this).scrollTop()    -> " + $(this).position().top - 100 - $("body").scrollTop());

        },
        function () {

            var label = $(this);

            setTimeout(function () {

                var index = label.attr('index');

                if (!videosIsOpenArray['' + index]) {
                    Close(index);
                }
            }, 3000);
        });

  /*   $("#Morti").hover(function () {

            $("#Morti_Menu").slideDown(200);
        }
        , function () {

            $("#Morti_Menu").slideUp(100);
        }); */

  /*   $("#Hof").hover(function () {

            $("#Hof_Menu").slideDown(200);
        }
        , function () {

            $("#Hof_Menu").slideUp(100);
        }); */

    $("#Categorie").hover(function () {

            $("#Categorie_Menu").slideDown(200);
        }
        , function () {

            $("#Categorie_Menu").slideUp(100);
        });

  /*   $("#Contatti").hover(function () {

            $("#Contatti_Menu").slideDown(200);
        }
        , function () {

            $("#Contatti_Menu").slideUp(100);
        });
 */
    $("#toggle").click(function () {
        $("#resto").slideDown("normal");
        $(this).fadeOut();

        setTimeout(function () {
            $("#resto").slideUp("normal");
            $("#toggle").fadeIn();
        }, 25000);
    });

    $('#tastoMenu').click(function (e) {

        $(menuNavigazione).slideToggle(function() {

            if( $(menuNavigazione).is(":visible"))
        {
            $(document.body).css("overflow","hidden");         
        }
        else
        {
            $(document.body).css("overflow","auto");         
        }
          });
    });

    $('#box').click(function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 'slow');
    });

    $('#box').hover(

        function () {
            $(this).animate({ bottom: '0px' }, 'slow');
        },
        function () {
            $(this).animate({ bottom: '-60px' }, 'slow');
        });

    setTimeout(function () {
        $('#box').animate({ bottom: '-60px' }, 'slow');

    }, 7000);

    $("#searchValueMobile").focus(function(){
        $('#menuMobile').hide();
    });
    
    $("#searchValueMobile").blur(function(){
        $('#ScavaMobile').click();
        $('#menuMobile').show();
    });

    $(".shareButton").click(function(){
     
        var title=$(this).attr("title");
        var description=$(this).attr("description");
        var url=$(this).attr("url");

        if (navigator.share) {
            navigator.share({
              title: title,
              text: description,
              url: url
            })
              .then(() => console.log('Successful share'))
              .catch((error) => console.log('Error sharing', error));
          }
    });

});
