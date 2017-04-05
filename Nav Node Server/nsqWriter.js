var nsq = require('nsqjs');

var w = new nsq.Writer('127.0.0.1', 4150);

w.connect();

w.on('ready', function () {
  //Simple publish method call. Publishes to users topic
  
  w.publish('users', 'some-message');
  
  //Publish message will callback for message handling
  
  w.publish('test', 'Wu?', function (err) {
    if (err) { return console.error(err.message); }
    console.log('Message sent successfully');
    w.close();
  });
});

w.on('closed', function () {
  console.log('Writer closed');
});