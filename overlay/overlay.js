function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
      return div.firstChild; 
  }
  var self = null
function overlay(options) {
    self = this
    this.close = function (event) {
        var targetClass = event.target.className
        if (targetClass.indexOf("overlay-download-event") > -1 ) {
            return;
        } 
        var overlay = document.getElementById(options.id)
        overlay.className = overlay.className.replace(' overlay-active','')
    }
    this.open = function(event){
        console.log('asd')
        var overlay = document.getElementById(options.id)
        overlay.className = overlay.className+=' overlay-active'
    }
    this.downloadFile = function(){
        var link = document.createElement("a")
        link.download = options.filename
        link.href = options.src
        link.click()
    }
    var container = createElementFromHTML('<div id="'+options.id+'" class="overlay"></div>')
    container.addEventListener('click',this.close)
    var overlayContent = createElementFromHTML('<div class="overlay-content"></div>')
    var overlayImgContent = createElementFromHTML('<div class="overlay-img-content"></div>')
    var img = createElementFromHTML('<img src="'+options.src+'" alt="'+options.filename+'" title="'+options.filename+'"/>')
    img.addEventListener('click',this.closeOverlay)
    overlayImgContent.appendChild(img)

    if(options.download){
        /*
        var overlayImgFooter = createElementFromHTML('<div class="overlay-img-footer">' +
            '<a href="'+(options.filepath ? options.filepath : options.src)+
            '" download="'+options.filename+'" title="İndir" class="overlay-download-btn overlay-download-event">' +
            '<span class="overlay-download-event">'+options.filename+'</span>' +
                '<i class="icon-download overlay-download-event"></i>' +
            '</a>' +
        '</div>') 
        */
        var overlayImgFooter = createElementFromHTML('<div class="overlay-img-footer overlay-download-event" title="İndir">'
                                                    +'<div class="overlay-download-btn overlay-download-event">'
                                                    +'<span class="overlay-download-event">'+options.filename+'</span>'
                                                    +'<i class="icon-download overlay-download-event"></i>'
                                                    +'</div>'
                                                    +'</div>')
        overlayImgFooter.onclick = function(event){
            self.downloadFile()
        }                                            
        overlayImgContent.appendChild(overlayImgFooter)
    }

    overlayContent.appendChild(overlayImgContent)
    container.appendChild(overlayContent)
    options.el.appendChild(container)
    return this;
}

    /*
    ( '<div onclick="closeOverlay" v-bind:id="overlayid" class="overlay\'overlay-active\' : isActive===true}">' +
        '<div class="overlay-content">' +
        '<div class="overlay-img-content">' +
        '<img v-on:click="closeOverlay" src="'+options.src+'" alt="'+options.filename+'" title="'+options.filename+'">' +
        '<div class="overlay-img-footer">' +
            '<a v-if="download" v-bind:href="'+(filepath !== null ? filepath : src)+'" download="'+options.filename+'" title="İndir" class="overlay-download-btn overlay-download-event">' +
            '<span class="overlay-download-event">'+options.filename+'</span>' +
                '<i class="icon-download overlay-download-event"></i>' +
            '</a>' +
        '</div>' +
        '</div>' +
        '</div>'+
        '</div>')
    */