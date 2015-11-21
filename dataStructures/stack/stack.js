var stack = function () {
  var stackProto = {
    // stack = {
    //   data: [],
    // }
    size: function () {
      return this.data.length;
    },
    push: function (val) {
      this.data.push(val);
    },
    pop: function () {
      return this.data.pop();
    },
    display: function () {
      if (this.data.length === 0) {
        console.log("< empty stack >");
      } else {
        console.log("< stack contents >");
        console.log("bottom <", this.data.join(' < '), "< top");
      }
    },
  };

  return Object.assign(Object.create(stackProto), {
    data: [],
  });
}

module.exports = stack;
