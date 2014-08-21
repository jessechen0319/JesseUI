/**
  *  Author: Jesse.Chen
  *  Create Time: 2014-08-21
  *  Email: xiang19890319@gmail.com
  *  Statement: All version of JesseUI is free, if you have advice please feel free to contact me with Email.
*/

JesseUI = (function(_){
	var widget = {};
	var util = {};
	var _plugin = function(object, name, value){
	object[name] = value;
	};
	
	/*
		Part: Util
		Name: OrderProcess
		Author: Jesse.Chen
	*/

	var orderProcess = function(array, processor, args){
		if(!array instanceof Array){
			return false;
		}
		array = Array.prototype.slice.call(array);
		setTimeout(function(){
			var item = array.shift();
			var fullArgs = [item];
			fullArgs = fullArgs.concat(args);
			processor.apply(this, fullArgs);
			if(array.length>0){
				setTimeout(arguments.callee, 1);
			}
		},1);
	};
	_plugin(util,'orderProcess',orderProcess);
	/*
		Part: Widget
		Name: Rotate Fade In
		Author: Jesse.Chen
	*/
	var _rotateFadeIn = function(angle, opacity){
		var elementToRotate = this,
				deg = angle,
				deg2radians = Math.PI * 2 / 360,
				rad = deg * deg2radians ,
				costheta = Math.cos(rad),
				sintheta = Math.sin(rad),
			
				m11 = costheta,
				m12 = -sintheta,
				m21 = sintheta,
				m22 = costheta,
				matrixValues = 'M11=' + m11 + ', M12='+ m12 +', M21='+ m21 +', M22='+ m22;
		var jesseStyle = document.getElementById("j_rotate_fadeIn");
		if(!jesseStyle){
			jesseStyle = document.createElement("style");
			jesseStyle.id="j_rotate_fadeIn";
			document.head.appendChild(jesseStyle);
		}
		jesseStyle.textContent = '.j_rotate_fadeIn{'+'-webkit-transform:'+'rotate('+deg+'deg);'
								+'-moz-transform:'+'rotate('+deg+'deg)'
								+'-ms-transform:'+'rotate('+deg+'deg)'
								+'transform:'+'rotate('+deg+'deg)'
								+'filter:'+'progid:DXImageTransform.Microsoft.Matrix(sizingMethod=\'auto expand\','+matrixValues+')'
								+'-ms-filter:'+'progid:DXImageTransform.Microsoft.Matrix(SizingMethod=\'auto expand\','+matrixValues+')';
		if(opacity){
			jesseStyle.textContent = jesseStyle.textContent + ' filter:alpha(opacity='+opacity+');'
														+ '-moz-opacity:'+opacity/100+';'
														+ '-khtml-opacity: '+opacity/100+';'
														+ 'opacity: '+opacity/100+'; ';
		}
		jesseStyle.textContent = jesseStyle.textContent + '}';
	};

	var _clearStyle = function(className, dom){
		dom?dom.classList.remove(className):null;
		var jesseStyle = document.getElementById(className);
		var parentDom = jesseStyle.parentElement;
		parentDom.removeChild(jesseStyle);
	};


	var rotateFadeInDisplay = function(dom, v_angle, v_height, v_width){
		dom.style.height=0;
		dom.style.width=0;
		dom.style.visibility = "visible";
		dom.classList.add("j_rotate_fadeIn");
		var rotateValue = 0;
		var opacity = 0;
		setTimeout(function(){
			if(parseInt(dom.style.height)<v_height&&rotateValue%parseInt(v_angle/v_height)==0){
				var height = parseInt(dom.style.height) + 1;
				dom.style.height = height+"px";
			}
			if(parseInt(dom.style.width)<v_width&&rotateValue%parseInt(v_angle/v_width)==0){
				var width = parseInt(dom.style.width) + 1;
				dom.style.width = width+"px";
			}
			if(rotateValue<v_angle){
				rotateValue++;
				if(opacity<100&&rotateValue%parseInt(v_angle/100)==0){
					opacity++;
				}
				_rotateFadeIn(rotateValue, opacity);
			}
			if(rotateValue<v_angle){
				setTimeout(arguments.callee, 1);
			} else {
				_clearStyle("j_rotate_fadeIn", dom);
			}
		},1);
	};
	_plugin(widget,'rotateFadeInDisplay',rotateFadeInDisplay);
	//return*******************************
	return{"widget":widget, "util":util};
})();
