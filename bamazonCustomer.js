//npm packages

var express = require("express");
var mysql = require("mysql");
var inquirer = require("inquirer");
var path = require("path");
var datatable = require("cli-table"); //for formating output




var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "", //removed password
  database: "bamazon"
});


var productPurchased = [];


connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
});

function afterConnection() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
   console.log(res);


//push the customer selection to this array

  var table = new datatable({
    head: ['Item Id', 'Product Name', 'Department Name', 'Price'],
    style: {
      head: ['red'],
      compact: false,
      colAligns: ['center'],
    }
  });

  
  for(var i = 0; i < result.length; i++){
    table.push(
      [result[i].item_id, result[i].productname, result[i].department_name, result[i].price]
    );
  };
  console.log(table.toString());

  purchaseItems();
});

var purchaseItems = function(){

  
  var productInfo = {
    properties: {
      item_id:{description: colors.blue('Please enter the ID # of the item you wish to purchase!')},
      stock_quantity:{description: colors.green('How many items would you like to purchase?')}
    },
  };

  prompt.start();

  
  prompt.get(productInfo, function(err, res){

  
    var custPurchase = {
      item_id: res.item_id,
      stock_quantity: res.stock_quantity

    };
    console.log(res.stock_quantity);
   productPurchased.push(custPurchase);
    
    connection.query('SELECT * FROM products WHERE item_id=?', productPurchased[0].item_id, function(err, res){
        if(err) console.log(err, 'Item does not exist');

        if(res[0].stock_quantity < productPurchased[0].stock_quantity){
          console.log('Please choose a lower quantity  or a different item' + '. We  only have ' + res[0].stock_quantity + ' in stock');
          connection.end();

        } else if(res[0].stock_quantity >= productPurchased[0].stock_quantity){
          console.log(productPurchased[0].stock_quantity + ' items purchased');
          console.log(res[0].product_name + ' ' + res[0].Price);
          
          var saleTotal = res[0].price * productPurchased[0].stock_quantity;

          console.log('Total: ' + saleTotal);

//subtract the quantity chosen from the database quantity, then update database with new quantity          
    newQuantity = res[0].stock_quantity - productPurchased[0].stock_quantity;
    connection.query("UPDATE Products SET stock_quantity = " + newQuantity +" WHERE item_id = " + productPurchased[0].item_id, function(err, res){
           
            console.log('');
            console.log(colors.cyan('Your order has been processed.  Thank you for shopping with us!'));
            console.log('');

            connection.end();
          })

        };

    });
  });
};



};

