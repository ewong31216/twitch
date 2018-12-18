import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import App from './App';

describe('<App />', () => {
    it('renders a header, a content, a footer', () => {
        const wrapper = shallow(<App />);

        expect(wrapper.find('div.header')).to.have.lengthOf(1);
        expect(wrapper.find('div.content')).to.have.lengthOf(1);
        expect(wrapper.find('div.footer')).to.have.lengthOf(1);
    });

    it('should have a default mode "new"', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.state().mode).to.equal('new');
    });

    it('should change mode for changeMode', () => {
        const wrapper = shallow(<App />);
        wrapper.instance().changeMode('test-mode');
        wrapper.update();
        expect(wrapper.state().mode).to.equal('test-mode');
    });
});