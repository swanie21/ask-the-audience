const expect = require('chai').expect;
const request = require('supertest');
const app = require('../server');
const should = require('should');
const io = require('socket.io-client');
const socketURL = 'http://0.0.0.0:3000';

const options = {
  transports: ['websocket'],
  'force new connection': true
};

const chatUser1 = {'name':'Kirsten'};
const chatUser2 = {'name':'Bob'};


describe('Chat Server', () => {
  it('Should broadcast new user to all users', (done) => {
    let client1 = io.connect(socketURL, options);
    let client2 = io.connect(socketURL, options);

    client1.on('connect', () => {
      client1.emit('connection name', chatUser1);
      console.log(chatUser1);

    client2.on('connect', () => {
      client2.emit('connection name', chatUser2);
      console.log(chatUser2);
        done();
      });
    });
  });
});

describe('Chat Server functionality', () => {
  it('Should be able to broadcast votes', (done) => {
    let client1, client2, client3;
    let vote = 1;

    const checkVote = (client) => {
      client.on('message', (clientVote) => {
        vote.should.equal(clientVote);
        client.disconnect();
        vote++;
      });
    };

    client1 = io.connect(socketURL, options);
    checkVote(client1);

    client1.on('connect', () => {
      client2 = io.connect(socketURL, options);
      checkVote(client2);
      console.log(vote);
      done();
    });
  });
});
