const _ = require("lodash");
const R = require("ramda");
const moment = require("moment");

const odd = [1, 3];
const even = [2, 4];
const input = [odd, even];

const oddToEven = (x) => x * 2;
const evenToOdd = (x) => x * 2 + 1;
const transforms = [oddToEven, evenToOdd];

console.log(_.map(odd, oddToEven));
console.log(_.map(even, evenToOdd));

let ans = _.zipWith(input, transforms, (x, y) => _.map(x, y));
console.log(_.flatten(ans));

const duration = moment.duration(1800, "seconds");
console.log(duration.minutes());
