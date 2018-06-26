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