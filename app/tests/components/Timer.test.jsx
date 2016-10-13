var expect = require('expect');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jQuery');

var Timer = require('Timer');

describe('Timer', () => {
  it('should exist', () => {
    expect(Timer).toExist();
  });

  describe('handleStatusChange', () => {
    it('should update state to started and time up', (done) => {
      var timer = TestUtils.renderIntoDocument(<Timer/>);
      timer.handleStatusChange('started');

      expect(timer.state.count).toBe(0);

      setTimeout(() => {
        expect(timer.state.count).toBe(2);
        expect(timer.state.timerStatus).toBe('started');
        done();
      }, 2001);
    });

    it('should pause timer when status is paused', (done) => {
      var timer = TestUtils.renderIntoDocument(<Timer/>);
      timer.handleStatusChange('started');

      setTimeout(() => {
        timer.handleStatusChange('paused');

        setTimeout(() => {
          expect(timer.state.count).toBe(2);
          expect(timer.state.timerStatus).toBe('paused');
          done();
        }, 1001);
      }, 2001); 
    });

    it('should reset timer when status is stopped', (done) => {
      var timer = TestUtils.renderIntoDocument(<Timer/>);
      timer.handleStatusChange('started');

      setTimeout(() => {
        timer.handleStatusChange('stopped');

        setTimeout(() => {
          expect(timer.state.count).toBe(0);
          expect(timer.state.timerStatus).toBe('stopped');
          done();
        }, 1001);
      }, 1001);
    });
  });
});