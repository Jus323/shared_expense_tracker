CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    password VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL
);

CREATE TABLE accounts (
    account_id SERIAL PRIMARY KEY,
    account_name VARCHAR(50) NOT NULL,
    owner_id INT NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES users(user_id)
);

CREATE TABLE user_account (
    user_account_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    account_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (account_id) REFERENCES accounts(account_id)
);

CREATE TABLE expense_type (
    expense_type_id SERIAL PRIMARY KEY,
    expense_type_name VARCHAR(50) NOT NULL
);

CREATE TABLE expenses (
    expense_id SERIAL PRIMARY KEY,
    expense_name VARCHAR(100) NOT NULL,
    expense_amount DECIMAL(10,2) NOT NULL,
    expense_type_id INT NOT NULL,
    expense_date DATE NOT NULL,
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
VALUES ('Shared account', 1);

INSERT INTO user_account (user_id, account_id) 
VALUES (1, 1),
       (2, 1);

INSERT INTO expense_type (expense_type_name)
VALUES ('Household'), ('Dining'), ('Entertainment');

SELECT setval('accounts_account_id_seq', (SELECT MAX(account_id) FROM accounts)+1);
SELECT setval('expense_type_expense_type_id_seq', (SELECT MAX(expense_type_id) FROM expense_type)+1);
SELECT setval('users_user_id_seq', (SELECT MAX(user_id) FROM users)+1);
SELECT setval('user_account_user_account_id_seq', (SELECT MAX(user_account_id) FROM user_account)+1);

