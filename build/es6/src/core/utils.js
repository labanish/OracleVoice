/**
 * This class contains widget helper methods
 */
class Utils {
    constructor(settings) {
        this.settings = settings;
    }
    /**
     * Creates a deep clone of the provided object
     */
    clone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
    /**
     * Converts urls in text to the HTML links
     */
    linkify(inputText, embeddedVideo) {
        let replacedText, replacePattern1, replacePattern2, replacePattern3;
        //URLs starting with http://, https://, or ftp://
        replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
        replacedText = inputText.replace(replacePattern1, (match, $1, $2) => {
            let id = embeddedVideo ? this.getYouTubeVideoId($1) : null;
            if (id) {
                return '<iframe width="100%" src="https://www.youtube.com/embed/' + id + '" frameborder="0" allowfullscreen></iframe>';
            }
            else {
                return '<a href="' + $1 + '" target="_blank">' + $1 + '</a>';
            }
        });
        //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
        replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
        replacedText = replacedText.replace(replacePattern2, (match, $1, $2) => {
            let id = embeddedVideo ? this.getYouTubeVideoId('http://' + $2) : null;
            if (id) {
                return '<iframe width="100%" src="https://www.youtube.com/embed/' + id + '" frameborder="0" allowfullscreen></iframe>';
            }
            else {
                return $1 + '<a href="http://' + $2 + '" target="_blank">' + $2 + '</a>';
            }
        });
        return replacedText;
    }
    /**
     * extracts the youtube id from the link
     */
    getYouTubeVideoId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        if (match && match[2].length == 11) {
            return match[2];
        }
        else {
            return null;
        }
    }
    /**
     * adds the widget project name as the prefix to the css class
     */
    getCssClassWithPrefix(cssClass) {
        return this.settings.name + '-' + cssClass;
    }
    /**
     * creates HTML button element
     */
    createButton(classNames) {
        let element = document.createElement('button');
        if (classNames) {
            for (let className of classNames) {
                element.classList.add(this.getCssClassWithPrefix(className));
            }
        }
        return element;
    }
    /**
     * creates HTML anchor element
     */
    createAnchor(url, text, classNames) {
        let element = document.createElement('a');
        if (url) {
            element.href = url;
        }
        if (text) {
            element.innerText = text;
        }
        else if (url) {
            element.innerText = url;
        }
        if (classNames) {
            for (let className of classNames) {
                element.classList.add(this.getCssClassWithPrefix(className));
            }
        }
        return element;
    }
    /**
     * creates HTML div element
     */
    createDiv(classNames) {
        let element = document.createElement('div');
        if (classNames) {
            for (let className of classNames) {
                element.classList.add(this.getCssClassWithPrefix(className));
            }
        }
        return element;
    }
    /**
     * creates HTML paragraph element
     */
    createParagraph(classNames) {
        let element = document.createElement('p');
        if (classNames) {
            for (let className of classNames) {
                element.classList.add(this.getCssClassWithPrefix(className));
            }
        }
        return element;
    }
    /**
     * creates HTML span element
     */
    createSpan(classNames) {
        let element = document.createElement('span');
        if (classNames) {
            for (let className of classNames) {
                element.classList.add(this.getCssClassWithPrefix(className));
            }
        }
        return element;
    }
    /**
     * creates HTML input element
     */
    createInput(classNames) {
        let element = document.createElement('input');
        if (classNames) {
            for (let className of classNames) {
                element.classList.add(this.getCssClassWithPrefix(className));
            }
        }
        return element;
    }
    /**
     * creates HTML image element
     */
    createImage(url, classNames) {
        let element = document.createElement('img');
        if (url) {
            element.src = url;
        }
        if (classNames) {
            for (let className of classNames) {
                element.classList.add(this.getCssClassWithPrefix(className));
            }
        }
        return element;
    }
    /**
     * creates HTML audio element
     */
    createAudio(url, className, autoplay) {
        let element = document.createElement('audio');
        if (url) {
            element.src = url;
        }
        element.autoplay = typeof autoplay === 'undefined' ? false : autoplay;
        if (className) {
            element.classList.add(this.getCssClassWithPrefix(className));
        }
        return element;
    }
    /**
     * creates HTML video element
     */
    createVideo(url, className, autoplay) {
        let element = document.createElement('video');
        if (url) {
            element.src = url;
        }
        element.autoplay = typeof autoplay === 'undefined' ? false : autoplay;
        if (className) {
            element.classList.add(this.getCssClassWithPrefix(className));
        }
        return element;
    }
    /**
     * creates HTML div element with the HTML as child elements
     */
    createHTML(html) {
        let div = this.createDiv();
        div.innerHTML = html;
        return div;
    }
    /**
     * creates HTML style element
     */
    createStyle(style) {
        let element = document.createElement('style');
        element.type = 'text/css';
        element.appendChild(document.createTextNode(style));
        return element;
    }
}
export { Utils };
//# sourceMappingURL=utils.js.map