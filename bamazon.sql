DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id int(11) NOT NULL AUTO_INCREMENT,
  product_name varchar(50) ,
  department_name varchar(50),
  price decimal(6,2) ,
  stock_quantity  int(6) ,
  PRIMARY KEY (item_id)
) ;