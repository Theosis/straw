var Node = require('../examples/nodes/count.js');

var node;

module.exports = {
  'create': function(test) {
    node = new Node(function(){
      test.done();
    });
  },
  'process': function(test) {
    test.expect(1);
    var msg = {foo:'bar'};
    node.process(
      msg,
      function(err){
        test.equal( err, false, 'Error should be false.' );
        test.done();
      });
  },
  'output': function(test) {
    test.expect(2);
    node.on('message', function(data){
      test.equal( data.outlet, false, 'Pipe should be default (false) pipe.' );
      test.deepEqual( data.message, {count: 2}, 'Count should be 2' );
      test.done();
    });
    node.process({foo:'bar'}, function(){});
  }
};

