CREATE TABLE properties { 
id SERIAL PRIMARY KEY,
ownerName VARCHAR,
address VARCHAR,
email VARCHAR,
phone VARCHAR,
latitude INT,
longitude INT,
BLOB image,
price INT,
bedrooms INT,
bathrooms INT,
sqft INT,
carSpaces INT,
propertyType VARCHAR,
propertyStatus VARCHAR,
datePosted DATE,
petFriendly VARCHAR }