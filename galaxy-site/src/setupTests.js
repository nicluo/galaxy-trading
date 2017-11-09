/**
 * Configure localStorage mock
 */
import 'jest-localstorage-mock';

/**
 * Configure fetch mock
 */
import fetch from 'jest-fetch-mock';
global.fetch = fetch;

/**
 * Configure enzyme adapter
 */
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
