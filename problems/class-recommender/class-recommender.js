/**
  * Write a function to recommend to a user what classes to take based on the classes
  *   taken by the user's friends up to two degrees of separation
  * Given:
  * - getFriendsofUser()
  * - getAttendedClassesForUser()
  */

/**
  * Find friends of given user
  * Given:
  * - user
  * Returns:
  * - array of users
  */
function getFriendsOfUser(user) {
  var friends = {
    'Jay': ['Bob', 'Sue'],
    'Bob': ['Jay', 'Sue', 'Chris'],
    'Sue': ['Jay', 'Bob', 'David'],
    'Chris': ['Bob', 'AnonA', 'AnonB'],
    'David': ['Sue', 'AnonC', 'AnonD'],
    'Jackson':['Dude', 'Dudette'],
  }
  return friends[user] || [];
}

/**
  * Find classes attended by given user
  * Given:
  * - user
  * Returns:
  * - array of classes
  */
function getAttendedClassesForUser(user) {
  var attended = {
    'Jay': ['classC'],
    'Bob': ['classA', 'classB'],
    'Sue': ['classB'],
    'Chris': ['classC', 'classC'],
    'David': ['classD'],
    'Jackson':['classA', 'classB'],
  }
  return attended[user] || [];
}

/**
  * Recommend classes to take based on given user's social network
  * Given:
  * - user
  * Return:
  * - array of classes
  */
function getRecommendedClasses(user) {
  // initialize network
  // note: hash represents users detected as belonging to original user's network
  //       hash entry initially set to true meaning hash entry's friends still
  //         need to be added to network (ie. entry has not be processed)
  var network = {};
  network[user] = false;

  // build out network
  // note: iterate over hash of users and adds friends of unprocessed entries to hash
  //       first pass adds friends of original user to network
  //       second pass adds friends of friends of original user to network
  var depth = 2;
  for (var i = 0; i < depth; i++) {
    console.log("> building network: pass", i + 1);
    Object.keys(network).forEach(function (user) {
      // process newly added users
      if (!network[user]) {
        console.log("> adding friends of:", user);
        // add friends to network
        var friends = getFriendsOfUser(user);
        friends.forEach(function (friend) {
          if (!network[friend]) {
            console.log("friend:", friend);
            network[friend] = false;
          }
        });

        // flag user as processed
        network[user] = true;
      }
    });
  }

  // retrieve classes attended by network and record attendance
  console.log("> fetching classes attended by network");
  var networkClasses = {};
  Object.keys(network).forEach(function (user) {
    var attended = getAttendedClassesForUser(user);
    attended.forEach(function (attended) {
      console.log(user, "attended", attended);
      networkClasses[attended] = (networkClasses[attended] || 0) + 1;
    });
  });

  // remove previously attended classes
  console.log("> removing classes already taken");
  getAttendedClassesForUser(user).forEach(function (taken) {
    console.log("class:", taken);
    delete networkClasses[taken];
  });

  // return classes sorted by attendance
  console.log("> sorting recommended classes by attendance");
  return Object.keys(networkClasses).sort(function (a, b) {
    return networkClasses[b] - networkClasses[a];
  });
}

console.log("===== Running: classRecommender =====");
['Jay','Sue'].forEach(function (user) {
  console.log(">>> recommending classes for:", user);
  console.log(getRecommendedClasses(user).join(' < '));
});
