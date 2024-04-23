import { faker } from '@faker-js/faker';
import crypto from 'crypto';

const homeAddress = `${faker.location.secondaryAddress()} ${faker.location.country()}`;

console.log(homeAddress);
console.log(crypto.randomUUID());
