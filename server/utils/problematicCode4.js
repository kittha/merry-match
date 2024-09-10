// Example of a complex JavaScript file
function processOrder(order) {
  let total = 0;

  // High cyclomatic complexity due to nested conditionals
  if (order.isExpress) {
    if (order.isPriority) {
      total += 50;
    } else {
      total += 30;
    }
  } else {
    if (order.isPriority) {
      total += 20;
    } else {
      total += 10;
    }
  }

  // Deeply nested loops and conditionals
  for (let item of order.items) {
    if (item.inStock) {
      for (let discount of item.discounts) {
        if (discount.isValid) {
          total -= discount.amount;
        }
      }
    }
  }

  // Redundant code, makes the function more difficult to maintain
  if (order.customer.isVIP) {
    total -= 10;
  } else {
    total += 5;
  }

  // Large function with multiple branches, adding cognitive complexity
  if (order.isGift) {
    total += 10;
  }

  return total;
}

// Another complex function due to size and logic
function validateOrder(order) {
  // Logic with nested structures and multiple conditions
  // Makes the function harder to understand
  if (!order.isPaid) {
    if (order.customer.isVIP) {
      console.log("VIP customer - allow order even if not paid");
    } else {
      console.log("Order is not valid");
      return false;
    }
  }
  return true;
}
