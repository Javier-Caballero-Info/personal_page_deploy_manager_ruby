//= require jquery
//= require jquery_ujs
//= require materialize.min
//= require init_js

//= require react
//= require react_ujs
//= require ./components


let notification = {

    success: function (text) {
        const toastHTML = '<span class="green center">' + text + '</span>';
        M.toast({html: toastHTML});
    },

    info: function (text) {
        const toastHTML = '<span class="blue center">' + text + '</span>';
        M.toast({html: toastHTML});
    },

    warning: function (text) {
        const toastHTML = '<span class="amber center">' + text + '</span>';
        M.toast({html: toastHTML});
    },

    danger: function (text) {
        const toastHTML = '<span class="red center">' + text + '</span>';
        M.toast({html: toastHTML});
    }

};

function readCookie(name) {
    let nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        const c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
        if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
        return index == 0 ? match.toLowerCase() : match.toUpperCase();
    });
}
function toTitleCase(str) {
    return str.split(' ')
            .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
            .join(' ');
}