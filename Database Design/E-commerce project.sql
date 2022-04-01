CREATE TABLE `customers` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255) NOT NULL,
  `addresss` varchar(255),
  `phone` integer UNIQUE NOT NULL,
  `email` varchar(255) UNIQUE NOT NULL,
  `profile_image` varchar(255),
  `is_active` boolean DEFAULT false,
  `token` varchar(255),
  `token_expiry_date` datetime,
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `favorites` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `customer_id` int,
  `product_id` int
);

CREATE TABLE `products` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `category_id` int,
  `brand_id` int,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) UNIQUE NOT NULL,
  `description` text,
  `price` double,
  `discount_price` double,
  `delivery` boolean DEFAULT false,
  `image` varchar(255),
  `status` boolean,
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `categories` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) UNIQUE NOT NULL,
  `slug` varchar(255) UNIQUE NOT NULL,
  `status` boolean,
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `brands` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) UNIQUE NOT NULL,
  `slug` varchar(255) UNIQUE NOT NULL,
  `products_count` int
);

CREATE TABLE `orders` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `payment_id` int,
  `quantity` int,
  `order_number` int,
  `order_status` ENUM ('PLACED', 'VERIFIED', 'SHIPPED', 'DELIVERED', 'CANCELED') DEFAULT "PLACED",
  `totalPrice` double,
  `created_at` timestamp
);

CREATE TABLE `order_items` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `order_id` int,
  `product_name` varchar(255) NOT NULL,
  `product_price` double NOT NULL,
  `product_id` int,
  `quantity` int
);

CREATE TABLE `carts` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `customer_id` int,
  `total_price` double,
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `cart_products` (
  `cart_id` int,
  `product_name` varchar(255),
  `product_price` double,
  `quantity` int NOT NULL DEFAULT 1
);

CREATE TABLE `payments` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `customer_id` int,
  `transaction_id` int UNIQUE,
  `payment_type` enum,
  `payment_gateway` enum,
  `product_name` varchar(255),
  `product_price` double,
  `total` double,
  `payment_status` ENUM ('INITIATED', 'PENDING', 'COMPLETED', 'CANCELED') DEFAULT "INITIATED",
  `created_at` timestamp
);

CREATE TABLE `roles` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) UNIQUE NOT NULL,
  `description` text
);

CREATE TABLE `permissions` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) UNIQUE NOT NULL,
  `slug` varchar(255) UNIQUE NOT NULL,
  `description` text
);

CREATE TABLE `role_permission` (
  `role_id` int,
  `permission_id` int
);

CREATE TABLE `admins` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `role_id` int,
  `username` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` boolean,
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `cms_users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `role_id` int,
  `username` varchar(255) UNIQUE NOT NULL,
  `email` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255) NOT NULL,
  `address` varchar(255),
  `status` boolean,
  `token` varchar(255),
  `token_expiry_date` datetime,
  `created_at` timestamp,
  `updated_at` timestamp
);

ALTER TABLE `favorites` ADD FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`);

ALTER TABLE `favorites` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

ALTER TABLE `products` ADD FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

ALTER TABLE `products` ADD FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`);

ALTER TABLE `orders` ADD FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`);

ALTER TABLE `orders` ADD FOREIGN KEY (`payment_id`) REFERENCES `payments` (`id`);

ALTER TABLE `order_items` ADD FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

ALTER TABLE `order_items` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

ALTER TABLE `carts` ADD FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`);

ALTER TABLE `cart_products` ADD FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`);

ALTER TABLE `payments` ADD FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`);

ALTER TABLE `role_permission` ADD FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);

ALTER TABLE `role_permission` ADD FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`);

ALTER TABLE `admins` ADD FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);

ALTER TABLE `cms_users` ADD FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
