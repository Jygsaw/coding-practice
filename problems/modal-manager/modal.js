// Add your javascript here
(function () {
    'use strict';

    /***** ModalMgr.js *****/
    // define factory
    var ModalMgr = function () {
        // initialize private variables
        var options = {};
        var modal = null;

        // define prototype
        // note: maybe move proto outside factory to save memory
        var ModalMgr_Proto = {
            open: function (type, options) {
                // initialize variables
                this.options = options;

                // build overlay
                this.modal = $('<div class="modal-overlay"></div>');

                // build dialog
                var modalDialog = $('<div id="modal_dialog" class="modal-dialog"></div>');
                modalDialog.html(this.options.message);
                this.modal.append(modalDialog);

                // build modal controls
                var modalCtrls = $('<div id="modal_ctrls" class="modal-ctrls"></div>');
                var yesBtn = $('<button id="modal_yes" class="btn modal-yes"></button>');
                yesBtn.text(this.options.yesLabel);
                var noBtn = $('<button id="modal_no" class="btn modal-no"></button>');
                noBtn.text(this.options.noLabel);
                modalCtrls.append(yesBtn, noBtn);
                modalDialog.append(modalCtrls);

                // open modal and attach listeners
                var $window = $(window);
                $('body').append(this.modal);
                $('#modal_yes').on('click', function (event) {
                    $window.trigger('modal.clicked.yes', event);
                });
                $('#modal_no').on('click', function (event) {
                    $window.trigger('modal.clicked.no', event);
                });
                $window.on('keydown.modal', function (event) {
                    // handle enter key
                    if (event.which === 13) {
                        $window.trigger('modal.clicked.yes', event);
                    }

                    // handle esc key
                    if (event.which === 27) {
                        $window.trigger('modal.clicked.no', event);
                    }
                });
                $window.trigger('modal.rendered');
                yesBtn.focus();
            },
            clickYes: function (event) {
                if (this.options.hasOwnProperty('yesCallback')) {
                    this.options.yesCallback();
                }
                this.close();
            },
            clickNo: function (event) {
                if (this.options.hasOwnProperty('noCallback')) {
                    this.options.noCallback();
                }
                this.close();
            },
            close: function () {
                if (this.options.hasOwnProperty('closeCallback')) {
                    this.options.closeCallback();
                }

                // close modal and disable listeners
                $('#modal_btn_yes').off();
                $('#modal_btn_no').off();
                $(window).off('keydown.modal');
                this.modal.remove();
            },
        };

        return Object.assign(Object.create(ModalMgr_Proto), {});
    }

    // set global variables
    window.ModalManager = ModalMgr();
    window.YesNoModal = 'YesNoModal';
    window.FormModal = 'FormModal';

    // attach global listeners
    var $window = $(window);
    $window.off('open.modal');
    $window.on('open.modal', function (event, options, type) {
        ModalManager.open(type, options);
    });
    // note: alternate vertical centering using JS if flexbox is not supported
    // $window.off('modal.rendered');
    // $window.on('modal.rendered', function (event) {
    //     // initialie variables
    //     var overlay = $('.modal-overlay');
    //     var dialog = $('.modal-dialog');
    //     var coords = {
    //         top: (overlay.height() / 2) - (dialog.outerHeight() / 2),
    //         left: (overlay.width() / 2) - (dialog.outerWidth() / 2),
    //     };

    //     // center modal dialog
    //     dialog.css('position', 'absolute');
    //     dialog.offset(coords);
    // });
    $window.off('modal.clicked.yes');
    $window.on('modal.clicked.yes', function (event, clickEvent) {
        ModalManager.clickYes(clickEvent);
    });
    $window.off('modal.clicked.no');
    $window.on('modal.clicked.no', function (event, clickEvent) {
        ModalManager.clickNo(clickEvent);
    });

    /***** page-specific.js *****/
    $(function () {
        // attach message modal trigger listeners
        var messageModalOptions = {
            message: 'Would you like to save your changes?',
            yesLabel: 'Save',
            noLabel: 'Cancel',
            yesCallback: function () {
                console.log('YES');
            },
            closeCallback: function () {
                console.log('closing msg modal');
            },
        };
        $('#trigger_msg_modal_direct').on('click', function (event) {
            ModalManager.open(YesNoModal, messageModalOptions);
        });
        $('#trigger_msg_modal_pubsub').on('click', function (event) {
            $(window).trigger('open.modal', messageModalOptions, YesNoModal);
        });

        // attach form modal trigger listeners
        var formModalOptions = {
            message: '<input id="modal_input" type="textbox">',
            yesLabel: 'Submit',
            noLabel: 'Cancel',
            yesCallback: function () {
                console.log('YES');
                var userText = $('#modal_input').val();
                console.log('user submitted:', userText);
            },
            closeCallback: function () {
                console.log('closing form modal');
            },
        };
        $('#trigger_form_modal_direct').on('click', function (event) {
            ModalManager.open(FormModal, formModalOptions);
        });
        $('#trigger_form_modal_pubsub').on('click', function (event) {
            $(window).trigger('open.modal', formModalOptions, FormModal);
        });
    });
}());
