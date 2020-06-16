const ws = new require('ws');

const wss = new ws.Server({port: 8333});

const SAMUEL_JACKSON_RESPONSES = [
  'You Are On This Council, But We Do Not Grant You The Rank Of Master.',
  'We\'re All Gonna Be Like Three Little Fonzies Here.',
  'The Idea Was To Bring Together A Group Of Remarkable People, See If They Could Become Something More.',
  'Yes, They Deserved To Die, And I Hope They Burn In Hell!',
  'They Called Me Mr. Glass.',
  'Where Is My Super Suit?',
  'Given That It\'s A Stupid-Ass Decision, I\'ve Elected To Ignore It.',
  'I Never Did One Thing Right In My Life, You Know That? Not One. That Takes Skill.',
  'Hold On To Your Butts.',
  'English, Motherf*Cker, Do You Speak It?',
  'Everyone Knows That When You Make An Assumption, You Make An Ass Out Of \'U\' And \'Umption.\'',
  'You Know Me. It\'s My Duty To Please That Booty.',
  'Mankind Is The Virus And I\'m The Cure.',
  'I Have Had It With These Motherf*Cking Snakes On This Motherf*Cking Plane!',
  'And You Will Know My Name Is The Lord When I Lay My Vengeance Upon You!'
];

wss.on('connection', ws => {
  ws.on('message', processMessage);

  ws.on('close', () => {
    ws.off('message', processMessage);
  });

  function processMessage(id, message) {
    const responseMessage = SAMUEL_JACKSON_RESPONSES[Math.round(Math.random() * 14)];

    ws.send(responseMessage);
  }
});