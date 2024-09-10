// Bad JavaScript Code Example

// Example of CVE: Prototype Pollution Vulnerability
function mergeObjects(target, source) {
  for (let key in source) {
    if (typeof source[key] === "object" && source[key] !== null) {
      if (!target[key]) target[key] = {};
      mergeObjects(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

// Unnecessary deeply nested if-else structure (high complexity)
function processUser(user) {
  if (user) {
    if (user.isActive) {
      if (user.details) {
        if (user.details.address) {
          if (user.details.address.city) {
            console.log("User city is:", user.details.address.city);
          } else {
            console.log("No city found for user");
          }
        } else {
          console.log("No address found for user");
        }
      } else {
        console.log("No details found for user");
      }
    } else {
      console.log("User is not active");
    }
  } else {
    console.log("No user provided");
  }
}

// Duplicate code block
function getUserInfo(user) {
  if (user) {
    if (user.isActive) {
      if (user.details && user.details.address) {
        console.log("User address:", user.details.address.city);
      } else {
        console.log("User details not found");
      }
    } else {
      console.log("Inactive user");
    }
  } else {
    console.log("No user info provided");
  }
}

// A method with high cyclomatic complexity
function calculate(input) {
  if (input < 0) {
    if (input % 2 === 0) {
      if (input % 5 === 0) {
        console.log("Even and divisible by 5");
      } else {
        console.log("Even but not divisible by 5");
      }
    } else if (input % 3 === 0) {
      console.log("Odd and divisible by 3");
    } else {
      console.log("Odd and not divisible by 3");
    }
  } else {
    if (input === 0) {
      console.log("Input is zero");
    } else {
      if (input > 10) {
        console.log("Input greater than 10");
      } else {
        console.log("Input between 0 and 10");
      }
    }
  }
}

// Another complex and duplicated logic
function checkConditions(a, b) {
  if (a > b) {
    if (a > 10) {
      if (b < 5) {
        console.log("Condition 1 met");
      } else {
        console.log("Condition 2 met");
      }
    } else if (a === b) {
      console.log("Condition 3 met");
    } else {
      console.log("Condition 4 met");
    }
  } else {
    if (b > 20) {
      console.log("Condition 5 met");
    } else if (a < 5) {
      console.log("Condition 6 met");
    } else {
      console.log("Condition 7 met");
    }
  }
}

// Vulnerable code: unsanitized input can cause security issues
function runCommand(command) {
  // Dangerous: Using eval() with user input is a security flaw (CWE-95: Improper Neutralization of Directives in Dynamically Evaluated Code)
  eval(command);
}

// Call the functions with some data to simulate execution
let user = {
  isActive: true,
  details: {
    address: {
      city: "Nonthaburi",
    },
  },
};

let source = { __proto__: { isAdmin: true } };
let target = {};

mergeObjects(target, source);
processUser(user);
getUserInfo(user);
calculate(25);
checkConditions(15, 8);
runCommand("alert('Hacked!')");
