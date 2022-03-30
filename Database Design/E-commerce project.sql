CREATE TABLE `customers` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(255),
  `password` varchar(255),
  `addresss` varchar(255),
  `phone` integer,
  `email` varchar(255),
  `profile_image` varchar(255),
  `is_active` boolean,
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `tokens` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `customer_id` user_id,
  `expiry_date` datetime,
  `created_at` timestamp
);

CREATE TABLE `favorites` (
  `customer_id` int,
  `product_id` int
);

CREATE TABLE `products` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `category_id` int,
  `brand_id` int,
  `name` varchar(255),
  `slug` varchar(255),
  `description` text,
  `price` double,
  `discount_price` double,
  `delivery` boolean,
  `image` varchar(255),
  `status` boolean,
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `categories` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `slug` varchar(255),
  `status` boolean,
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `brands` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `products_count` int
);

CREATE TABLE `orders` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `payment_id` int,
  `quantity` int,
  `order_number` int,
  `status` boolean,
  `totalPrice` double,
  `created_at` timestamp
);

CREATE TABLE `order_items` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `order_id` int,
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
  `product_id` int,
  `product_name` varchar(255),
  `price` double
);

CREATE TABLE `payments` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `transaction_id` int,
  `payment_type` enum,
  `payment_gateway` enum,
  `total` double,
  `status` boolean,
  `created_at` timestamp
);

CREATE TABLE `roles` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `slug` varchar(255),
  `description` text
);

CREATE TABLE `permissions` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `slug` varchar(255),
  `description` text
);

CREATE TABLE `role_permission` (
  `role_id` int,
  `permission_id` int
);

CREATE TABLE `admins` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `role_id` int,
  `username` varchar(255),
  `password` varchar(255),
  `status` boolean,
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `cms_users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `role_id` int,
  `username` varchar(255),
  `password` varchar(255),
  `status` boolean,
  `created_at` timestamp,
  `updated_at` timestamp
);

ALTER TABLE `tokens` ADD FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`);

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

ALTER TABLE `cart_products` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

ALTER TABLE `role_permission` ADD FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);

ALTER TABLE `role_permission` ADD FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`);

ALTER TABLE `admins` ADD FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);

ALTER TABLE `cms_users` ADD FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
