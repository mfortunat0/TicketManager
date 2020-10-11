create table register
(
    id serial primary key,
    name varchar not NULL,
    email varchar unique not NULL,
    password varchar not NULL
);

create table ticket
(
    id serial primary key,
    client varchar not NULL,
    title varchar not NULL,
    data varchar not NULL,
    status varchar not NULL
)
