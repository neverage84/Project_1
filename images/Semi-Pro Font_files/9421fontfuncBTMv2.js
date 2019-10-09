function encode_url(url) 
			{
			    url = escape(url);
				url = url.replace(/\+/g, '%2B').replace(/\"/g,'%22').replace(/\'/g, '%27').replace(/\//g,'%2F');
				return url;
			}
			
function rgb2hex(rgb) {
				 rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
				 function hex(x) {
				  return ("0" + parseInt(x).toString(16)).slice(-2).toUpperCase();
				 } 
				 return hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
			}
			
function recommends()

			{  var name = $("#recom").val();
				
                         $.ajax({                  
                        type:"POST",
                         url: "/fonts/recommends.php",
                         data: {"name":name},
		          success: function(data){ $("#relatedfonts").html(data);}
		          })
			
		         }

function recommendstyle()

			{  var name = $("#recom").val();
				
                         $.ajax({                  
                        type:"POST",
                         url: "/fonts/recommendstyle.php",
                         data: {"name":name},
		          success: function(data){ $("#relatedfonts").html(data);}
		          })
			
		         }

function recommendtema()

			{  var name = $("#recom").val();
				
                         $.ajax({                  
                        type:"POST",
                         url: "/fonts/recommendtema.php",
                         data: {"name":name},
		          success: function(data){ $("#relatedfonts").html(data);}
		          })
			
		         }
			

function update_image()

			{       
			    var name=$('#font').val();  if ( name == '') { $('#labell').css('border', '2px dashed #e73420'); return;}
			    
			    var sstring = $('#polystring').val(); if( typeof sstring == 'undefined' ) { var sstring = 'GENERATE=LOADING';}
			
                                var stringArray = sstring.split("=");
                                
				var replace_l = '<button class="gradientgray2" onclick="reset()">' + stringArray[1] + '</button>';
				
				var replace_g = '<button class="gradientred" onclick="update_image()">' + stringArray[0] + '</button>';

				$("#updator").html(replace_l); 

                var text=$('#string').val(); if( text == '' ) { var text = 'Your Text Here';}
                                                              			
				
				
				var size=$("#size").val();

				var style_color='';
				
				var style_effect='';
				
				
					style_color = $("#jscolorr").val();
				
					//style_color=rgb2hex(style_color);
				
				    style_effect = $('#effect').val();

				    
				    ga('send', 'event', 'Effects', 'EffectsChange', style_effect);
					
				
                                  $.ajax({
                 
                 type:"POST",
                 url: "/loadme_21.php",
                 data: {"name":name, "text":text,"size":size, "style_color":style_color,"style_effect":style_effect},


				 success: function(data){$("#text_image").attr('src',data); 
				 
				 var preurlz = 'https://fontmeme.com/customizable.php?name='+ name + '&text=' + text + '&style_color=' + style_color + '&style_effect=' + style_effect + '&imgurl=' + data.split('/').pop();

                 $("#gifts_link").attr('href', preurlz);
				 
				 },
					 
			     error: function() {$("#updator").html(replace_g);}

                        });
				               
                //setTimeout(function(){  }, 1500);
                $("#text_image").on('load', function(){ $("#updator").html(replace_g); });


				$("#misc_embed").hide();
				$("#misc_gifts").hide();
				
				$("#gifts_image").attr('src', 'https://fontmeme.com/loadingproduct.gif');

				//var geneurl = $("#text_image").attr('src'); 

				

			}
			

function reset()
	
	        {    
	            var sstring = $('#polystring').val(); if( typeof sstring == 'undefined' ) { var sstring = 'GENERATE=LOADINGG';}
			
                var stringArray = sstring.split("=");
				
				var replace_g = '<button class="gradientred" onclick="update_image()">' + stringArray[0] + '</button>';
				
				setTimeout(function(){ $("#updator").html(replace_g); }, 1500);				

			}
			
			

function image_code()
				
			{
                
                var imgurl = $("#text_image").attr("src");

				var pageurl = $("link[rel='canonical']").attr("href")

                $.ajax({

                 type:"POST", 
                 url: "/updateurl.php",
			     dataType: 'json',
                 data: {"imgN":imgurl, "urlP":pageurl},

                 success: function(data){
					 
					 $("#embed_xhtml").val(data.d1);
					 $("#embed_xxhtml").val(data.d2);
					 $("#embed_xxxhtml").val(data.d3);
					 }
                        });

				
			         $("#misc_embed").toggle();
			         
				     $("#misc_gifts").hide();
				     
				     $("#gifts_image").attr('src', 'https://fontmeme.com/loadingproduct.gif');

			}

			
function reset2()
	
	        {    
	            var sstring = $('#polystring2').val(); if( typeof sstring == 'undefined' ) { var sstring = 'See Your Design on Zazzle Products=Preparing Products...';}
			
                var stringArray = sstring.split("=");
				
				var replace_g2 = '<button class="gradientgray giftbtn" onclick="make_gifts()">' + stringArray[0] + '</button>';
				
				setTimeout(function(){ $("#updator2").html(replace_g2); }, 1500);				

			}			
			
function make_gifts()

            {
				
				var sstring = $('#polystring2').val(); if( typeof sstring == 'undefined' ) { var sstring = 'See Your Design on Zazzle Products=Preparing Products...=Preparing Products Failed...';}
			
                var stringArray = sstring.split("=");
                                
				var replace_l2 = '<button class="gradientgray giftbtn" onclick="reset2()">' + stringArray[1] + '</button>';
				
				var replace_g2 = '<button class="gradientgray giftbtn" onclick="make_gifts()">' + stringArray[0] + '</button>';

				var replace_fail = '<button class="gradientgray giftbtn" onclick="reset2()">' + stringArray[2] + '</button>';


				$("#updator2").html(replace_l2); 

                
                var text=$('#string').val(); if( text == '' ) { var text = 'Your Text Here';}
                                                              			
				var name=$('#font').val(); 
				
				var size=$("#size").val();

				var style_color= $("#jscolorr").val();
				
				var style_effect= $('#effect').val();
				
				var imgurl = $("#text_image").attr("src");
				
		
        $.ajax({
                 
                 type:"POST",
                 url: "/customizable2.php",
                 dataType: 'text',
                 data: {"name":name, "text":text,"size":size, "style_color":style_color,"style_effect":style_effect, "imgurl":imgurl},


                 success: function(data){
                     
                 if (data.indexOf("api") >= 0) 

			     {var made = '<a target="_blank" href="'+ data +'"><button class="gradientred giftbtn" onclick="reset2()">Products Prepared, Click to View...</button></a>'; $("#updator2").html(made);}

				 else {$("#updator2").html(replace_fail);}
                     
                 },
				
				 error: function() {$("#updator2").html(replace_fail);}

                        });   
                
                 
                 //$("#misc_gifts").toggle();
                 
                 //$("#misc_embed").hide();
                
            }


    // starting onloadfirst
function setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value + "; path=/";  
}

function getCookie(c_name) {
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1) {
        c_start = c_value.indexOf(c_name + "=");
    }
    if (c_start == -1) {
        c_value = null;
    } else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start, c_end));
    }
    return c_value;
}


$(document).ready(function () {
   $( "#size" ).blur(function() {
   
      var max = parseInt($(this).attr('max'));
      var min = parseInt($(this).attr('min'));
      if ($(this).val()  > max)
      {
          $(this).val(max);
      }
      else if ($(this).val()  < min)
      {
          $(this).val(min);
      } 
      else if (isNaN($(this).val())) {$(this).val('70');} 
    }); 
});

$(document).ready(function(){
           
    $('#string').each(function(){
    var value = getCookie('txxt');

    if(value != null && value != "" ) {
        $(this).val(value);
    }
    else {$(this).val('');}
    
}).on('blur', function(){
    if($(this).val() != '' ) {
		setCookie("txxt",$(this).val());
    }
});



    $('#size').each(function(){
    var value = getCookie('szzs');

	if(value != null && value != "" ) {
        $(this).val(value);
    }
    else {$(this).val('65');}
    

}).on('blur', function(){
    if($(this).val() > 200 ) {
		setCookie("szzs",'200');
    }
	else {setCookie("szzs",parseInt($(this).val()));}
});



       $('#jscolorr').each(function(){
           
    
        
    var value = getCookie('clrr');
    
    if ( $("#firstcolor" ).length ) {value = $("#firstcolor").val(); setCookie("clrr", value); } //102017
    
	var hex = '#' + value;
	
	

    if (value !== null && value !== "") {
        
		$(this).val(value);
		
		$(this).css({"background-color":hex});
		
    }
    
    else {$(this).val('2A2A57');}

}).on('blur', function(){
    if($(this).val() !== '' ) {
		setCookie("clrr",$(this).val());
    }
});


    $('#effect').each(function(){
        
    var value = getCookie('ffct');
        
   if ( $("#firsteffect" ).length ) {value = $("#firsteffect").val(); setCookie("ffct", value); }
    
    
    if( value !== null && value !== "" ) {
        
        $(this).val(value);
    }
    else {$(this).val('None');}

}).on('blur', function(){
    if($(this).val() !== '' ) {
		setCookie("ffct",$(this).val());
    }
});

    });
    
    



    // starting onloadsecond

$(document).ready(function(){ if( $('#header-social').css('display')=='none') { $('#jscolorr').attr('readonly', 'true');}}); 

$(document).ready(function(){imagePreview();});

xOffset = 10;
yOffset = 30;

this.imagePreview = function(){	

	var sstring = $('#polystring2').val(); if( typeof sstring == 'undefined' ) { var sstring = 'Tip: Always use the "EMBED" button to get permanent image links, otherwise your image will be lost in a few hours.';}

	$(".gimg").hover(function(e){
		$("body").append("<p id='epreview'><img src='" + this.src +"'/></br><span class='embedtip' style='font-size:11px; padding:10px;'>" + sstring + "</span></p>");								 
		$("#epreview")
			.css("top",(e.pageY - xOffset) + "px")
			.css("left",(e.pageX + yOffset) + "px")
			.fadeIn("fast");						
    },
	function(){	
		$("#epreview").remove();
    });	
	$(".gimg").mousemove(function(e){
		$("#epreview")
			.css("top",(e.pageY - xOffset) + "px")
			.css("left",(e.pageX + yOffset) + "px");
	});			
};



$(document).ready(function(){ $("#close_misc_embed").bind('click',function(){$("#misc_embed").hide();}); });

$(document).ready(function(){ $("#close_misc_gifts").bind('click',function(){$("#misc_gifts").hide();}); });

$(document).ready(function(e) { try {
$("#font").msDropdown();
$("#effect").msDropdown();
} catch(e) {
//alert(e.message);
}
});


//start lazyload js-verlok
function _extends(){return(_extends=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t}).apply(this,arguments)}function _typeof(t){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}!function(t,e){"object"===("undefined"==typeof exports?"undefined":_typeof(exports))&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.LazyLoad=e()}(this,function(){"use strict";var t="undefined"!=typeof window,e=t&&!("onscroll"in window)||"undefined"!=typeof navigator&&/(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent),n=t&&"IntersectionObserver"in window,o=t&&"classList"in document.createElement("p"),r={elements_selector:"img",container:e||t?document:null,threshold:300,thresholds:null,data_src:"src",data_srcset:"srcset",data_sizes:"sizes",data_bg:"bg",class_loading:"loading",class_loaded:"loaded",class_error:"error",load_delay:0,auto_unobserve:!0,callback_enter:null,callback_exit:null,callback_reveal:null,callback_loaded:null,callback_error:null,callback_finish:null},a=function(t,e){return t.getAttribute("data-"+e)},s=function(t,e,n){var o="data-"+e;null!==n?t.setAttribute(o,n):t.removeAttribute(o)},i=function(t){return"true"===a(t,"was-processed")},c=function(t,e){return s(t,"ll-timeout",e)},l=function(t){return a(t,"ll-timeout")},u=function(t,e){var n,o=new t(e);try{n=new CustomEvent("LazyLoad::Initialized",{detail:{instance:o}})}catch(t){(n=document.createEvent("CustomEvent")).initCustomEvent("LazyLoad::Initialized",!1,!1,{instance:o})}window.dispatchEvent(n)};var d=function(t,e){t&&t(e)},f=function(t,e){t._loadingCount+=e,0===t._elements.length&&0===t._loadingCount&&d(t._settings.callback_finish)},_=function(t){for(var e,n=[],o=0;e=t.children[o];o+=1)"SOURCE"===e.tagName&&n.push(e);return n},v=function(t,e,n){n&&t.setAttribute(e,n)},g=function(t,e){v(t,"sizes",a(t,e.data_sizes)),v(t,"srcset",a(t,e.data_srcset)),v(t,"src",a(t,e.data_src))},b={IMG:function(t,e){var n=t.parentNode;n&&"PICTURE"===n.tagName&&_(n).forEach(function(t){g(t,e)});g(t,e)},IFRAME:function(t,e){v(t,"src",a(t,e.data_src))},VIDEO:function(t,e){_(t).forEach(function(t){v(t,"src",a(t,e.data_src))}),v(t,"src",a(t,e.data_src)),t.load()}},m=function(t,e){var n,o,r=e._settings,s=t.tagName,i=b[s];if(i)return i(t,r),f(e,1),void(e._elements=(n=e._elements,o=t,n.filter(function(t){return t!==o})));!function(t,e){var n=a(t,e.data_src),o=a(t,e.data_bg);n&&(t.style.backgroundImage='url("'.concat(n,'")')),o&&(t.style.backgroundImage=o)}(t,r)},h=function(t,e){o?t.classList.add(e):t.className+=(t.className?" ":"")+e},p=function(t,e,n){t.addEventListener(e,n)},y=function(t,e,n){t.removeEventListener(e,n)},E=function(t,e,n){y(t,"load",e),y(t,"loadeddata",e),y(t,"error",n)},w=function(t,e,n){var r=n._settings,a=e?r.class_loaded:r.class_error,s=e?r.callback_loaded:r.callback_error,i=t.target;!function(t,e){o?t.classList.remove(e):t.className=t.className.replace(new RegExp("(^|\\s+)"+e+"(\\s+|$)")," ").replace(/^\s+/,"").replace(/\s+$/,"")}(i,r.class_loading),h(i,a),d(s,i),f(n,-1)},k=function(t,e){var n=function n(r){w(r,!0,e),E(t,n,o)},o=function o(r){w(r,!1,e),E(t,n,o)};!function(t,e,n){p(t,"load",e),p(t,"loadeddata",e),p(t,"error",n)}(t,n,o)},I=["IMG","IFRAME","VIDEO"],L=function(t,e){var n=e._observer;z(t,e),n&&e._settings.auto_unobserve&&n.unobserve(t)},x=function(t){var e=l(t);e&&(clearTimeout(e),c(t,null))},A=function(t,e){var n=e._settings.load_delay,o=l(t);o||(o=setTimeout(function(){L(t,e),x(t)},n),c(t,o))},z=function(t,e,n){var o=e._settings;!n&&i(t)||(I.indexOf(t.tagName)>-1&&(k(t,e),h(t,o.class_loading)),m(t,e),function(t){s(t,"was-processed","true")}(t),d(o.callback_reveal,t))},O=function(t){return!!n&&(t._observer=new IntersectionObserver(function(e){e.forEach(function(e){return function(t){return t.isIntersecting||t.intersectionRatio>0}(e)?function(t,e){var n=e._settings;d(n.callback_enter,t),n.load_delay?A(t,e):L(t,e)}(e.target,t):function(t,e){var n=e._settings;d(n.callback_exit,t),n.load_delay&&x(t)}(e.target,t)})},{root:(e=t._settings).container===document?null:e.container,rootMargin:e.thresholds||e.threshold+"px"}),!0);var e},N=function(t,e){this._settings=function(t){return _extends({},r,t)}(t),this._loadingCount=0,O(this),this.update(e)};return N.prototype={update:function(t){var n=this,o=this._settings,r=t||o.container.querySelectorAll(o.elements_selector);this._elements=function(t){return t.filter(function(t){return!i(t)})}(Array.prototype.slice.call(r)),!e&&this._observer?this._elements.forEach(function(t){n._observer.observe(t)}):this.loadAll()},destroy:function(){var t=this;this._observer&&(this._elements.forEach(function(e){t._observer.unobserve(e)}),this._observer=null),this._elements=null,this._settings=null},load:function(t,e){z(t,this,e)},loadAll:function(){var t=this;this._elements.forEach(function(e){L(e,t)})}},t&&function(t,e){if(e)if(e.length)for(var n,o=0;n=e[o];o+=1)u(t,n);else u(t,e)}(N,window.lazyLoadOptions),N});

//start lazyload
document.addEventListener("DOMContentLoaded", function() {
var lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazytest"
    // ... more
});
});