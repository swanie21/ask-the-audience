'use strict';
const socket = io();
const connectionCount = document.getElementById('connection-count');
const statusMessage = document.getElementById('status-message');
const buttons = document.querySelectorAll('#choices button');
const aTotal = document.querySelector('.a-total');
const bTotal = document.querySelector('.b-total');
const cTotal = document.querySelector('.c-total');
const dTotal = document.querySelector('.d-total');
const personalVote = document.querySelector('.vote');
const voteContainer = document.getElementById('personal-vote');

socket.on('usersConnected', function (count) {
  connectionCount.innerText = 'Connected Users: ' + count;
});

socket.on('statusMessage', function (message) {
  statusMessage.innerText = message;
});

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    socket.send('voteCast', this.innerText);
  });
}

socket.on('voteCount', function (votes) {
  aTotal.innerText = 'Total A Votes:' + ' ' + votes.A;
  bTotal.innerText = 'Total B Votes:' + ' ' + votes.B;
  cTotal.innerText = 'Total C Votes:' + ' ' + votes.C;
  dTotal.innerText = 'Total D Votes:' + ' ' + votes.D;
});

socket.on('peronalVote', function (ownVote) {
  personalVote.innerText = ownVote;
});

function showVote() {
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function () {
      voteContainer.style.display = 'block';
    });
  }
}

showVote();
