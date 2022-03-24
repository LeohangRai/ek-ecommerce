CREATE TABLE `customers` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(255),
  `password` varchar(255),
  `addresss` varchar(255),
  `phone` integer,
  `email` varchar(255),
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `product_variants` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `prodcut_id` int,
  `stock_id` int,
  `name` varchar(255),
  `img` varchar(255)
);

CREATE TABLE `products` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `category_id` int,
  `vendor_id` int,
  `brand_id` int,
  `name` varchar(255),
  `slug` varchar(255),
  `description` text,
  `price` double,
  `delivery` boolean,
  `created_at` timestamp
);

CREATE TABLE `categories` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `created_at` timestamp,
  `updated_at` timestamp,
  `admin_id` int
);

CREATE TABLE `vendors` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(255),
  `password` varchar(255),
  `addresss` varchar(255),
  `phone` int(10),
  `products_count` int,
  `status` boolean
);

CREATE TABLE `brands` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `products_count` int,
  `admin_id` int
);

CREATE TABLE `stocks` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `total_stock` int,
  `unit_price` double,
  `total_price` double,
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `orders` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `product_variant_id` int,
  `customer_id` int NOT NULL,
  `payment_id` int,
  `quantity` int,
  `totalPrice` double,
  `created_at` timestamp
);

CREATE TABLE `payments` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `payment_type` enum,
  `payment_gateway` enum,
  `total` double,
  `status` boolean,
  `created_at` timestamp
);

CREATE TABLE `admins` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(255),
  `password` varchar(255),
  `status` boolean,
  `created_at` timestamp,
  `updated_at` timestamp
);

ALTER TABLE `product_variants` ADD FOREIGN KEY (`prodcut_id`) REFERENCES `products` (`id`);

ALTER TABLE `product_variants` ADD FOREIGN KEY (`stock_id`) REFERENCES `stocks` (`id`);

ALTER TABLE `products` ADD FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

ALTER TABLE `products` ADD FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`id`);

ALTER TABLE `products` ADD FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`);

ALTER TABLE `categories` ADD FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`);

ALTER TABLE `brands` ADD FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`);

ALTER TABLE `orders` ADD FOREIGN KEY (`product_variant_id`) REFERENCES `product_variants` (`id`);

ALTER TABLE `orders` ADD FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`);

ALTER TABLE `orders` ADD FOREIGN KEY (`payment_id`) REFERENCES `payments` (`id`);
