CREATE TABLE `branches` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(50),
	`shopId` int NOT NULL,
	CONSTRAINT `branches_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `employees` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`firstName` text NOT NULL,
	`lastName` text NOT NULL,
	`nickName` text NOT NULL,
	`email` text NOT NULL,
	`position` varchar(20),
	`gender` enum('male','female','other') DEFAULT 'female',
	`phoneNumber` varchar(11),
	`dateEmploy` date,
	`address1` varchar(255),
	`address2` varchar(255),
	`address3` varchar(255),
	`avatar` varchar(255),
	`salary` int NOT NULL,
	`bankName` text,
	`bankAccount` text,
	`bankAccountNumber` text,
	`shopId` int,
	`branchId` int,
	CONSTRAINT `employees_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `owners` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`firstName` text NOT NULL,
	`lastName` text NOT NULL,
	`email` varchar(255) NOT NULL,
	`avatar` varchar(255),
	CONSTRAINT `owners_id` PRIMARY KEY(`id`),
	CONSTRAINT `owners_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `shop_owner` (
	`shopId` int NOT NULL,
	`ownerId` int NOT NULL,
	CONSTRAINT `shop_owner_shopId_ownerId_pk` PRIMARY KEY(`shopId`,`ownerId`)
);
--> statement-breakpoint
CREATE TABLE `shops` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(50),
	`avatar` varchar(255),
	CONSTRAINT `shops_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `branches` ADD CONSTRAINT `branches_shopId_shops_id_fk` FOREIGN KEY (`shopId`) REFERENCES `shops`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `employees` ADD CONSTRAINT `employees_shopId_shops_id_fk` FOREIGN KEY (`shopId`) REFERENCES `shops`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `employees` ADD CONSTRAINT `employees_branchId_branches_id_fk` FOREIGN KEY (`branchId`) REFERENCES `branches`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `shop_owner` ADD CONSTRAINT `shop_owner_shopId_shops_id_fk` FOREIGN KEY (`shopId`) REFERENCES `shops`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `shop_owner` ADD CONSTRAINT `shop_owner_ownerId_owners_id_fk` FOREIGN KEY (`ownerId`) REFERENCES `owners`(`id`) ON DELETE no action ON UPDATE no action;