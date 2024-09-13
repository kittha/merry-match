// // Worst JavaScript Code Example

// // Example of Anti-Pattern: Singleton Misuse (Global State)
// let instance = null;
// function Singleton() {
//   if (!instance) {
//     instance = this;
//     this.config = {};
//   }
//   return instance;
// }
// let globalInstance = new Singleton(); // Bad global state manipulation

// // Bad Practice: Global Variables
// let globalCounter = 0;

// // Bad Practice: Long Function with Multiple Responsibilities
// function longFunction(userInput) {
//   // Unnecessary Loop with O(n^2) Complexity
//   for (let i = 0; i < userInput.length; i++) {
//     for (let j = 0; j < userInput.length; j++) {
//       console.log(`Checking input: ${userInput[i]} and ${userInput[j]}`);
//     }
//   }
//   // Using eval - Security Vulnerability
//   eval(userInput);

//   // Memory Leak: Unreferenced Closure Holding Large Object in Memory
//   let largeArray = new Array(1000000).fill("Memory Leak Example");
//   return function () {
//     console.log("Memory leak due to closure with largeArray.");
//   };
// }

// // Bad Big O Notation: Inefficient Recursive Algorithm (O(2^n) Fibonacci)
// function fibonacci(n) {
//   if (n <= 1) {
//     return n;
//   }
//   return fibonacci(n - 1) + fibonacci(n - 2); // Inefficient, can cause stack overflow
// }

// // Example of Bad Code Smell: Large Class with Mixed Responsibilities (God Object Anti-Pattern)
// class GodObject {
//   constructor(name) {
//     this.name = name;
//     this.data = {};
//   }

//   // Unused Method - Dead Code
//   unusedMethod() {
//     console.log("This method is never called.");
//   }

//   // Too Many Responsibilities in One Class
//   storeData(key, value) {
//     this.data[key] = value;
//   }

//   processUserInput(input) {
//     if (input === "exit") {
//       this.terminateProcess();
//     } else if (input === "reset") {
//       this.resetData();
//     } else {
//       this.handleUnknownInput();
//     }
//   }

//   terminateProcess() {
//     console.log("Terminating...");
//     process.exit(); // Bad Practice: Directly terminating the process
//   }

//   resetData() {
//     this.data = {}; // Clearing data but not handling references
//     console.log("Data reset.");
//   }

//   handleUnknownInput() {
//     console.log("Unknown input, doing nothing.");
//   }
// }

// // Memory Leak: Forgotten Timeout
// function memoryLeakTimeout() {
//   setTimeout(function () {
//     console.log("This timeout is never cleared.");
//     // No clearTimeout is called, causing potential memory leak
//   }, 1000000);
// }

// // Example of Copy-Pasta (Code Duplication) and Repeated Bad Practices
// function duplicateLogic(a, b) {
//   if (a > b) {
//     console.log("A is greater than B");
//   } else if (a < b) {
//     console.log("B is greater than A");
//   } else {
//     console.log("A is equal to B");
//   }
// }

// // Another inefficient loop
// function inefficientLoop(arr) {
//   for (let i = 0; i < arr.length; i++) {
//     for (let j = 0; j < arr.length; j++) {
//       if (arr[i] === arr[j]) {
//         console.log(`Found duplicate: ${arr[i]}`);
//       }
//     }
//   }
// }

// // Call to Unnecessary Deeply Nested Conditionals
// function nestedConditionals(input) {
//   if (input > 0) {
//     if (input > 5) {
//       if (input > 10) {
//         if (input > 20) {
//           if (input > 50) {
//             console.log("Input is greater than 50");
//           }
//         }
//       }
//     }
//   }
// }

// // Misusing Promises (Creating Promises without Handling Errors)
// function badPromise() {
//   new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log("This is a bad promise pattern");
//       resolve();
//     }, 1000);
//   }).then(() => {
//     console.log("Promise resolved");
//   });
// }

// // Calling the problematic functions
// globalInstance.config["setting"] = "value";
// let closureWithLeak = longFunction("console.log('Hacked!')");
// closureWithLeak(); // Memory leak in closure
// console.log(fibonacci(10)); // Inefficient Fibonacci call
// let god = new GodObject("Bad Class");
// god.processUserInput("exit"); // Unnecessary process termination
// memoryLeakTimeout(); // Memory leak due to timeout
// duplicateLogic(10, 20); // Code duplication
// inefficientLoop([1, 2, 3, 4, 5, 1]); // Inefficient nested loop
// nestedConditionals(100); // Deeply nested conditions
// badPromise(); // Bad promise usage
