//= require jquery
//= require materialize.min
//= require init_js

//= require react
//= require react_ujs
//= require ./components


let Alert = {

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