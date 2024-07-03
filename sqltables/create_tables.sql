CREATE TABLE users (
    user_id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    password VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL
);

CREATE TABLE accounts (
    account_id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    account_name VARCHAR(50) NOT NULL,
    owner_id INT NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES users(user_id)
);

CREATE TABLE user_account (
    user_account_id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    user_id INT NOT NULL,
    account_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (account_id) REFERENCES accounts(account_id)
);

CREATE TABLE expense_type (
    expense_type_id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    expense_type_name VARCHAR(50) NOT NULL
);

CREATE TABLE expenses (
    expense_id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    expense_name VARCHAR(100) NOT NULL,
    expense_amount DECIMAL(10,2) NOT NULL,
    expense_type_id INT NOT NULL,
    expense_date DATE NOT NULL,
    date_sequence INT NOT NULL,
    description VARCHAR(200),
    user_id INT NOT NULL,
    account_id INT NOT NULL,
    FOREIGN KEY (expense_type_id) REFERENCES expense_type(expense_type_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (account_id) REFERENCES accounts(account_id)
);

INSERT INTO users (password, email, first_name, last_name)
VALUES ('password', 'justinlee97@hotmail.com', 'Justin', 'Lee'), 
       ('password', 'cindypzh@gmail.com', 'Cindy', 'Phyu');

INSERT INTO accounts (account_name, owner_id)
VALUES ('Shared account', 1),
('Individual Food Tracker', 1),
('Family account', 1);

INSERT INTO user_account (user_id, account_id) 
VALUES (1, 1),
       (2, 1),
       (1, 2),
       (1, 3);

INSERT INTO expense_type (expense_type_name)
VALUES ('Household'), ('Dining'), ('Entertainment');

INSERT INTO expenses (expense_name, expense_amount, expense_type_id, expense_date, date_sequence, description, user_id, account_id)
VALUES ('Dyson Vacuum cleaner', 546.9, 1, '2024-06-26', 1, NULL, 1, 1),
('Groceries', 125.99, 1, '2024-06-26', 2, NULL, 2, 1);

SELECT setval('accounts_account_id_seq', (SELECT MAX(account_id) FROM accounts)+1);
SELECT setval('expense_type_expense_type_id_seq', (SELECT MAX(expense_type_id) FROM expense_type)+1);
SELECT setval('users_user_id_seq', (SELECT MAX(user_id) FROM users)+1);
SELECT setval('user_account_user_account_id_seq', (SELECT MAX(user_account_id) FROM user_account)+1);
SELECT setval('expenses_expense_id_seq', (SELECT MAX(expense_id) FROM expenses)+1);

