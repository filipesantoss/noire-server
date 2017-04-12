var Code = require('code'); // the assertions library
var Lab = require('lab'); // the test framework
var Sinon = require('sinon');
var ModelList = require('../../../../lib/controllers/web/admin/model-list');

var lab = exports.lab = Lab.script(); // export the test script

// make lab feel like jasmine
var describe = lab.experiment;
var it = lab.test;
var expect = Code.expect;

var internals = {};

internals.sortOptions = [
    {
        name: 'Name'
    },
    {
        name: 'Description'
    }
];

describe('Web Controller: admin - model list', function() {

    it('goes to next page', function(done) {
        var count = 5;
        var query = {
            limit: 1,
            page: 3,
        };

        var nextSpy = Sinon.spy(ModelList, 'getNextPageHelper');
        ModelList.getNextPageHelper(query, count);

        var querySpyCall = ModelList.getNextPageHelper.getCall(0);

        expect(querySpyCall.returnValue()).to.equals('?limit=1&page=4');
        expect(query.page).to.equals(4);
        expect(query.limit).to.exist();
        expect(query.search).to.not.exist();
        expect(query.sort).to.not.exist();
        expect(query.descending).to.not.exist();
        nextSpy.restore();
        done();
    });

    it('stays in the same page if in its last', function(done) {
        var count = 5;
        var query = {
            limit: 1,
            page: 5
        };

        var nextSpy= Sinon.spy(ModelList, 'getNextPageHelper');
        ModelList.getNextPageHelper(query, count);

        var querySpyCall = ModelList.getNextPageHelper.getCall(0);
        expect(querySpyCall.returnValue()).to.equals('?limit=1&page=5');
        expect(query.page).to.equals(5);
        expect(query.limit).to.exist();
        expect(query.search).to.not.exist();
        expect(query.sort).to.not.exist();
        expect(query.descending).to.not.exist();
        nextSpy.restore();
        done();
    });

    it('goes to previous page', function(done) {
        var query = {
            page: 4
        };

        var previousSpy = Sinon.spy(ModelList, 'getPreviousPageHelper');
        ModelList.getPreviousPageHelper(query);

        var querySpyCall = ModelList.getPreviousPageHelper.getCall(0);
        expect(querySpyCall.returnValue()).to.equals('?page=3');
        expect(query.page).to.equals(3);
        expect(query.limit).to.not.exist();
        expect(query.search).to.not.exist();
        expect(query.sort).to.not.exist();
        expect(query.descending).to.not.exist();
        previousSpy.restore();
        done();
    });

    it('stays in the same page if on its first', function(done) {
        var query = {
            page: 1
        };
        var previousSpy =Sinon.spy(ModelList, 'getPreviousPageHelper');
        ModelList.getPreviousPageHelper(query);

        var querySpyCall = ModelList.getPreviousPageHelper.getCall(0);
        expect(querySpyCall.returnValue()).to.equals('?page=1');
        expect(query.page).to.equals(1);
        expect(query.limit).to.not.exist();
        expect(query.search).to.not.exist();
        expect(query.sort).to.not.exist();
        expect(query.descending).to.not.exist();
        previousSpy.restore();
        done();
    });

    it('goes to the last page', function(done) {
        var count = 201;
        var query = {
            limit: 5
        };

        var lastSpy = Sinon.spy(ModelList, 'getLastPageHelper');
        ModelList.getLastPageHelper(query, count);

        var querySpyCall = ModelList.getLastPageHelper.getCall(0);
        expect(querySpyCall.returnValue()).to.equals('?limit=5&page=41');
        expect(query.page).to.equals(41);
        expect(query.limit).to.equals(5);
        expect(query.search).to.not.exist();
        expect(query.sort).to.not.exist();
        expect(query.descending).to.not.exist();
        lastSpy.restore();
        done();
    });

    it('goes to the first page', function(done) {
        var query = {
            page: 20
        };
        var firstSpy = Sinon.spy(ModelList, 'getFirstPageHelper');
        ModelList.getFirstPageHelper(query);

        var querySpyCall = ModelList.getFirstPageHelper.getCall(0);
        expect(querySpyCall.returnValue()).to.equals('?page=1');
        expect(query.page).to.equals(1);
        expect(query.limit).to.not.exist();
        expect(query.search).to.not.exist();
        expect(query.sort).to.not.exist();
        expect(query.descending).to.not.exist();
        firstSpy.restore();
        done();
    });

    it('creates query for each sort option', function(done) {

        var sortOptions = internals.sortOptions;
        var query = {};

        sortOptions = ModelList.getSortAttributes(sortOptions, query);
        expect(sortOptions).to.be.an.array();
        sortOptions.forEach(function(option) {
            expect(option.name).to.exist();
            expect(option.value).to.exist();
            expect(option.value).to.equals('?sort=' + option.name.toLowerCase());
            expect(option.selected).to.exist();
        });
        done();
    });

    it('creates query for each sort option ignoring other params except limit', function(done) {
        var sortOptions = internals.sortOptions;
        var query = {
            limit: 10,
            sort: 'email',
            page: 5,
            descending: true
        };

        sortOptions = ModelList.getSortAttributes(sortOptions, query);
        expect(sortOptions).to.be.an.array();
        sortOptions.forEach(function(option) {
            expect(option.name).to.exist();
            expect(option.value).to.exist();
            expect(option.value).to.equals('?limit=10&sort=' + option.name.toLowerCase());
            expect(option.selected).to.exist();
        });

        done();
    });

    it('creates query for each limit option', function(done) {
        var query = {};
        var limitOptions = ModelList.getLimitAttributes(query);

        expect(limitOptions).to.be.an.array();
        limitOptions.forEach(function(option) {
            expect(option.name).to.exist();
            expect(option.value).to.exist();
            if (option.name === 'Limit') {
                expect(option.value).to.equals('');
                expect(option.selected).to.not.exist();
            } else {
                expect(option.value).to.equals('?limit=' + option.name);
                expect(option.selected).to.exist();
            }
        });
        done();
    });

    it('creates query for each limit option ignoring other params except sort', function(done) {
        var query = {
            limit: 10,
            sort: 'email',
            page: 5,
            descending: true
        };

        var limitOptions = ModelList.getLimitAttributes(query);

        expect(limitOptions).to.be.an.array();
        limitOptions.forEach(function(option) {
            expect(option.name).to.exist();
            expect(option.value).to.exist();
            if (option.name === 'Limit') {
                expect(option.value).to.equals('');
                expect(option.selected).to.not.exist();
            } else {
                expect(option.value).to.equals('?sort=email&limit=' + option.name);
                expect(option.selected).to.exist();
            }
        });
        done();
    });
});
