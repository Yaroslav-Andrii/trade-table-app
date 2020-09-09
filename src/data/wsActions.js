export const classcb = {};
export const wscb = {};

classcb.__default = null;

classcb.on0 = function() {
  print('Connected.');
};

classcb.on1 = function(data, {dispatcher}) {
  dispatcher(state => {
    const result = [...state];

    let position = state.findIndex(item => item.name === data.name);
    if (~position) {
      result[position] = data;
      return result;
    }
    result.push(data);
    return result;
  })
};

classcb.on2 = function() {
  print('Ping received.');
};

classcb.on7 = function(error) {
  print('Error:' + error);
};

classcb.on8 = function(error) {
  print('Error:' + error);
};

classcb.on9 = function(error) {
  print('Error:' + error);
};

classcb.fatal = function(error) {
  print('Error:' + error);
};

wscb.onopen = function() {
  print('Connection opened.');
};

wscb.onclose = function() {
  print('Connection closed.');
};

wscb.onerror = function() {
  print('Fatal error.');
};

function print(message) {
  console.log(message);
}