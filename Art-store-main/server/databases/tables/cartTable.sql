CREATE TABLE Cart
(
    productId VARCHAR(100) NOT NULL,
    userId VARCHAR(100)NOT NULL,
    quantity INT DEFAULT 1,
    FOREIGN KEY (productId) REFERENCES Products(productId),
    FOREIGN KEY (userId) REFERENCES Users(userId)
);
