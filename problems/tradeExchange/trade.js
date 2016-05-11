// Add your javascript here
(function () {
    'use strict';

    /***** Dispatcher.js *****/
    var Dispatcher = function () {
        // initialize private variables
        var events = {};

        // define protoype
        // note: maybe move proto outside factory to save memory
        var Dispatcher_Proto = {
            publish: function (event, data) {
                if (events.hasOwnProperty(event)) {
                    events[event](data);
                }
            },
            subscribe: function (event, func) {
                events[event] = func;
            },
        };

        return Object.assign(Object.create(Dispatcher_Proto), {});
    }

    /***** Trades_Model.js *****/
    var Trades_Model = function () {
        // initialize private variables
        // note: trades represented as { ticker: volume } for simplicity
        // note: convert to { ticker: {} } for more complex data
        var trades = {};
        var dispatcher = null;

        // define prototype
        // note: maybe move proto outside factory to save memory
        var Trades_Model_Proto = {
            init: function (dispatcher) {
                // set dispatcher
                this.dispatcher = dispatcher

                // fetch remote data
                $.ajax({
                    url: '',
                    success: function (data, status, response) {
                        // hardcod sample data
                        var bulkData = [
                            { ticker: 'APPL', volume: 6 },
                            { ticker: 'MSFT', volume: 8 },
                            { ticker: 'GE', volume: 10 },
                            { ticker: 'DIS', volume: 2 },
                            { ticker: 'PEP', volume: 1 },
                            { ticker: 'T', volume: 5 },
                        ];
                        model.addTrades(bulkData);
                    },
                });
            },
            getExchangeData: function () {
                return trades;
            },
            addTrade: function (ticker, volume) {
                this.updateTicker(ticker, volume);

                // publish changes
                this.dispatcher.publish('exchange.change', model.getExchangeData());
            },
            addTrades: function (bulkTrades) {
                bulkTrades.forEach(function (trade) {
                    this.updateTicker(trade.ticker, trade.volume);
                }, this);

                // publish changes
                this.dispatcher.publish('exchange.change', model.getExchangeData());
            },
            updateTicker: function (ticker, volume) {
                trades[ticker] = (trades[ticker] || 0) + volume;
            },
        };

        return Object.assign(Object.create(Trades_Model_Proto), {});
    };

    /***** Trades_View.js *****/
    var Trades_View = function () {
        // initialize private varibles
        var dispatcher = null;

        // define prototype
        // note: maybe move proto outside factory to save memory
        var Trades_View_Proto = {
            init: function (dispatcher) {
                // set dispatcher
                this.dispatcher = dispatcher;

                // subscribe to changes
                this.dispatcher.subscribe('exchange.change', function (data) {
                    this.render(data);
                }.bind(this));
            },
            render: function (trades) {
                // initialize variables
                var tableBody = $('#trades_display tbody').empty();

                // sort trades and build rows
                Object.keys(trades).sort(function (a, b) { return trades[a] < trades[b]; }).forEach(function (key) {
                    // build ticker data
                    var row = $('<tr></tr>');
                    row.append($('<td>' + key + '</td>'));
                    row.append($('<td>' + trades[key] + '</td>'));

                    // add ticker to table
                    tableBody.append(row);
                });
            },
        };

        return Object.assign(Object.create(Trades_View_Proto), {});
    };

    /***** Trades_Controller.js *****/
    var Trades_Controller = function (model, view) {
        // define prototype
        // note: maybe move proto outside factory to save memory
        var Trades_Controller_Proto = {
            init: function (dispatcher) {
                model.init(dispatcher);
                view.init(dispatcher);
            },
            insertTrade: function (event) {
                // initialize variables
                var tickerInput = $('#trades_insert_ticker');
                var volumeInput = $('#trades_insert_volume');
                var tickerError = $('#trades_insert_ticker_error').hide();
                var volumeError = $('#trades_insert_volume_error').hide();
                var errorFound = false;

                // validate data
                var ticker = tickerInput.val().trim().toUpperCase();
                // note: typecast volume to int
                var volume = +volumeInput.val().trim();

                if (ticker === '') {
                    tickerError.show();
                    errorFound = true;
                }
                if (!Number.isInteger(volume) || volume < 0) {
                    volumeError.show();
                    errorFound = true;
                }

                if (!errorFound) {
                    // update model
                    model.addTrade(ticker, volume);

                    // reset trades_insert fields
                    tickerInput.val('');
                    volumeInput.val('');

                    // refresh view
                    view.render(model.getExchangeData());
                }
            },
        };

        return Object.assign(Object.create(Trades_Controller_Proto), {});
    }

    /***** page-specific.js *****/
    // initialize components
    var dispatcher = Dispatcher();
    var model = Trades_Model(dispatcher);
    var view = Trades_View(dispatcher);
    var controller = Trades_Controller(model, view);
    controller.init(dispatcher);

    $(function () {
        // attach listeners
        $('#trades_insert_submit').on('click', controller.insertTrade);
    });
}());
