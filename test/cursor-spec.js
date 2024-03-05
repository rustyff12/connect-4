const { expect } = require("chai");

const Cursor = require("../class/cursor.js");
const Screen = require("../class/screen.js");

describe("Cursor", function () {
    let cursor;

    beforeEach(function () {
        cursor = new Cursor(6, 7);
    });

    it("initializes for a 3x3 grid", function () {
        expect(cursor.row).to.equal(0);
        expect(cursor.col).to.equal(0);
    });

    it("correctly processes left inputs", function () {
        cursor.left();
        expect([cursor.row, cursor.col]).to.deep.equal([0, 0]);

        cursor.left();
        expect([cursor.row, cursor.col]).to.deep.equal([0, 0]);

        cursor.left();
        expect([cursor.row, cursor.col]).to.deep.equal([0, 0]);
    });

    it("correctly processes right inputs", function () {
        cursor.right();
        expect([cursor.row, cursor.col]).to.deep.equal([0, 1]);

        cursor.left();
        expect([cursor.row, cursor.col]).to.deep.equal([0, 0]);

        cursor.right();
        expect([cursor.row, cursor.col]).to.deep.equal([0, 1]);
    });

    it("processes right inputs", function () {
        cursor.right();
        expect([cursor.row, cursor.col]).to.deep.equal([0, 1]);

        cursor.right();
        expect([cursor.row, cursor.col]).to.deep.equal([0, 2]);

        cursor.right();
        expect([cursor.row, cursor.col]).to.deep.equal([0, 3]);
    });

    it("processes left inputs", function () {
        cursor.left();
        expect([cursor.row, cursor.col]).to.deep.equal([0, 0]);

        cursor.right();
        expect([cursor.row, cursor.col]).to.deep.equal([0, 1]);

        cursor.left();
        expect([cursor.row, cursor.col]).to.deep.equal([0, 0]);
    });
});
