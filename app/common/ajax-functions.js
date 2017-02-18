/*
 * Clementine.js Copyright (c) 2015 Blake Johnston. All rights reserved.
 * Permission is hereby granted, free of charge, to any person obtaining a 
 * copy of this software and associated documentation files (the "Software"), 
 * to deal in the Software without restriction, including without limitation 
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the 
 * Software is furnished to do so, subject to the following conditions:

 * The above copyright notice and this permission notice shall be included 
 * in all copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR 
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER 
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION 
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var appUrl = window.location.origin;

var ajaxFunctions = {
  ready: function ready(fn){
    if(typeof fn !== 'function'){
      return;
    }

    if(document.readyState==='complete'){
      return fn();
    }

    document.addEventListener('DOMContentLoaded', fn, false);
  },

  ajaxRequest: function ajaxRequest(method, url, callback, data){
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function(){
      if(xmlhttp.readyState === 4 && xmlhttp.status === 200){
        callback(xmlhttp.response);
      }
    };

    xmlhttp.open(method, url, true);
    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    xmlhttp.send(JSON.stringify(data));
  }
};

module.exports = ajaxFunctions;