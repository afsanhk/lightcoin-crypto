// let balance = 500.00;


class Account {
  constructor(username) {
    this.username = username;
    this.transactions=[];
  }

  get balance () {
    let balance = 0;
    this.transactions.forEach(transaction => balance+= transaction.value)
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {

  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }

  commit(){
    if(this.isAllowed()) {
      this.time = new Date();
      this.account.addTransaction(this);
      return true;
    } else {
      return false
    }
  }

}

class Deposit extends Transaction{

  get value () {
    return this.amount;
  }

  isAllowed () {
    return true;
  }

}

class Withdrawal extends Transaction {

  get value() { // The value of a deposit is negative of the amount. This can be referred to with this.value.
    return -this.amount;
  }

  isAllowed() {
    return this.amount <= this.account.balance
  }

}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected


// NOTES:
// Passing an object the information it needs when we create it is a great design pattern.
// This is called Dependency Interjection!
// In this case, withdrawal and deposits can be associated to any account and not dependent on any surrounding data, only on the object passed in.
const myAccount = new Account("snow-patrol");

console.log('Starting Account Balance: ', myAccount.balance);

console.log('Attempting to withdraw even $1 should fail...');
const t1 = new Withdrawal(1.00, myAccount);
console.log('Commit result:', t1.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Depositing should succeed...');
const t2 = new Deposit(9.99, myAccount);
console.log('Commit result:', t2.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Withdrawal for 9.99 should be allowed...');
const t3 = new Withdrawal(9.99, myAccount);
console.log('Commit result:', t3.commit());

console.log('Ending Account Balance: ', myAccount.balance);
console.log("Lookings like I'm broke again");

console.log('Account Transaction History: ', myAccount.transactions);
