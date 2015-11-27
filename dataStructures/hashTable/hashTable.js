

var hashTable = function (size) {
  var hashTableProto = {
    // hashTable = {
    //   size: 0,
    //   tableSize: 1,
    //   data: [],
    //   upperLoad: 0.75,
    //   lowerLoad: 0.25,
    //   resizeFactor: 2,
    // }
    size: function () {
      return this.size;
    },
    isEmpty: function () {
      return this.size === 0;
    },
    find: function (key) {
      console.log("> searching for:", key);

      // search for existing key
      var index = this.findIndex(key);
      if (index !== null) {
        return this.data[index[0]][index[1]][1];
      }
    },
    insert: function (key, val) {
      // search for existing key
      var index = this.findIndex(key);

      if (index === null) {
        // create new entry
        console.log("> inserting key:", key);
        var bucket = this.getBucket(key);
        this.data[bucket] = this.data[bucket] || [];
        this.data[bucket].push([key, val]);
        this.size++;
      } else {
        // update existing entry
        this.data[index[0]][index[1]][1] = val;
      }

      // check resizing threshold
      this.testThreshold('insert');
    },
    remove: function (key, val) {
      // search for existing key
      var index = this.findIndex(key);

      if (index !== null) {
        // removing target key
        this.data[index[0]].splice(index[1], 1);
        this.size--;
      }

      // check resizing threshold
      this.testThreshold('remove');
    },
    genHash: function (key) {
      return key.length;
    },
    getBucket: function (key) {
      console.log("> hashing key to bucket");
      var hash = this.genHash(key);
      console.log("hash:", hash);
      console.log("table size:", this.tableSize);
      var bucket = hash % this.tableSize;
      console.log("bucket:", bucket);
      return bucket;
    },
    findIndex: function (key) {
      // hash key to index
      var index = this.getBucket(key);

      if (this.data[index]) {
        // search bucket for key
        for (var i = 0; i < this.data[index].length; i++) {
          var pair = this.data[index][i];
          if (pair[0] === key) {
            return [index, i];
          }
        }
      }

      return null;
    },
    testThreshold: function (type) {
      console.log("> checking threshold");
      console.log("size:", this.size);
      console.log("table size:", this.tableSize);
      if (type === 'insert' &&
          this.size > this.tableSize * this.upperLoad) {
        console.log("resize triggered");
        this.resize(this.tableSize * this.resizeFactor);
      } else if (type === 'remove' &&
          this.size < this.tableSize * this.lowerLoad) {
        console.log("resize triggered");
        this.resize(this.tableSize / this.resizeFactor);
      } else {
        console.log("no resize needed");
      }
    },
    resize: function (newSize) {
      console.log("> resizing table");
      console.log("old size:", this.tableSize);
      console.log("new size:", newSize);

      // initialize new table
      var newHash = hashTable(newSize);

      // insert old data into new table
      console.log("> populating new table");
      this.traverse(function (pair) {
        newHash.insert(pair[0], pair[1]);
      });

      // replace old hash table with new hash table
      this.size = newHash.size;
      this.tableSize = newHash.tableSize;
      this.data = newHash.data;
    },
    traverse: function (callback) {
      for (var i = 0; i < this.data.length; i++) {
        console.log("= bucket:", i, "=");
        if (this.data[i]) {
          this.data[i].forEach(function (pair) {
            callback(pair);
          }.bind(this));
        }
      }
    },
    display: function () {
      if (this.isEmpty()) {
        console.log("empty hashTable");
      } else {
        console.log("< hashTable >");
        this.traverse(function (pair) {
          console.log(pair[0], "=>", pair[1]);
        });
      }
    },
  };

  return Object.assign(Object.create(hashTableProto), {
    size: 0,
    tableSize: size || 1,
    data: [],
    upperLoad: 0.75,
    lowerLoad: 0.25,
    resizeFactor: 2,
  });
};


module.exports = hashTable;
