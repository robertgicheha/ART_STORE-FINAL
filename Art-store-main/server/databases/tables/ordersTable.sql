CREATE TABLE Orders
(
    orderId VARCHAR PRIMARY KEY IDENTITY,
    productId VARCHAR(100) NOT NULL,
    userId VARCHAR(100)NOT NULL,
    orderStatus VARCHAR(50) NOT NULL CHECK(orderStatus IN('ordered', 'in-transit', 'delivered')) DEFAULT 1,
    FOREIGN KEY (productId) REFERENCES Products(productId),
    FOREIGN KEY (userId) REFERENCES Users(userId),
    createdAt DATETIME NOT NULL DEFAULT GETDATE()
);
