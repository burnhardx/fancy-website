const should = require("chai").should();
const AnimatedContainer = require("./../../../src/components/animated-container/animated-container");

describe("animated-container", () => {

    const appendToBody = node => {
        document.body.appendChild(node);
        node.connectedCallback();
    }

    it("stores the animation-classes separated by commas or whitespaces", () => {

        const underTest = new AnimatedContainer();
        underTest.setAttribute('with-classes', 'ernie,bert');
        underTest.classes().length.should.equal(2);
        underTest.classes()[1].should.equal('bert');
        underTest.setAttribute('with-classes', 'ernie bert elmo');
        underTest.classes().length.should.equal(3);
        underTest.classes()[2].should.equal('elmo');
    })

    it("can be created by DOM", () => {
        const underTest = document.createElement('animated-container');
        appendToBody(underTest);
        underTest.setAttribute('with-classes', 'herbert harald');
        underTest.classes().length.should.equal(2);
    })

})