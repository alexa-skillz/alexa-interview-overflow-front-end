// 'use strict';
//
// module.exports = function() {
//   return function(questions, searchTerm) {
//     let fuzzyRegex = generateFuzzyRegex(searchTerm);
//
//     return questions.filter( question => {
//       return fuzzyRegex.test(question.name.toUpperCase());
//     });
//   };
// };
//
// function generateFuzzyRegex(input) {
//   if (!input) return /.*/;
//   let fuzzyString = '.*' + input.toUpperCase().split('').join('.*') + '.*';
//   return new RegExp(fuzzyString);
// }
