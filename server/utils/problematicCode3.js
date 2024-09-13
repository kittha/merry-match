// // Bad code to trigger Codacy issues

// // Global variable (bug risk and bad practice)
// var userData = {};

// // Function without proper validation or error handling (bug risk)
// function saveUserData(name, age) {
//   userData.name = name;
//   userData.age = age;
//   console.log("User data saved without validation");
// }

// // Insecure function (security risk: SQL injection vulnerability)
// function getUserDataFromDatabase(query) {
//   var sqlQuery = "SELECT * FROM users WHERE name = '" + query + "'";
//   // Directly using the query in SQL, no parameterization
//   database.execute(sqlQuery); // Assuming 'database' is some insecure database call
//   console.log("Executed insecure SQL query");
// }

// // Incorrect comparison (bug risk)
// function isAdult(age) {
//   if ((age = 18)) {
//     // Assignment instead of comparison (should be '==')
//     return true;
//   } else {
//     return false;
//   }
// }

// // Non-optimal code (best practices)
// function calculateSum(arr) {
//   var sum = 0;
//   for (var i = 0; i < arr.length; i++) {
//     sum += arr[i];
//   }
//   return sum;
//   // Would be better with array reduce()
// }

// // Poor code style (code style)
// function badlyFormattedFunction(name, age) {
//   return "Name is " + name + " and age is " + age; // No space consistency
// }

// // Missing documentation (documentation)
// function undocumentedFunction() {
//   console.log("No comments or explanation");
// }

// // Incorrect use of variables (bug risk, best practices)
// function processData() {
//   var a = 10;
//   var b = "20";
//   return a + b; // Bug risk: Type coercion, returns "1020" instead of expected 30
// }

// // Insecure handling of user input (security risk)
// function loginUser(username, password) {
//   // Simple string comparison, no hashing or encryption (security risk)
//   if (username === "admin" && password === "password123") {
//     console.log("Logged in as admin");
//   }
// }

// // Unused variables (best practices)
// function unusedVariablesExample() {
//   var unusedVar = 42;
//   console.log("This function has an unused variable");
// }
