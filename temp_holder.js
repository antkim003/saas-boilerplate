import {tester} from 'graphql-tester';

const test = tester({
    url: 'http://graphql-swapi.parseapp.com'
});

// This tests a successful request for the name of person 1
test('{person(personID: 1) { name } }')
    .then((response) => {
        assert(response.success == true);
        assert(response.status == 200);
        assert(response.data.person.name == 'Luke Skywalker');
    });

// This tests a request for the name of non-existant person 1234
test('{person(personID: 1234) { name } }')
    .then((response) => {
        assert(response.success == false);
        assert(response.status == 200);
    });

// This tests a malformed query
test('{person(personId: 1) { name } }')
    .then((response) => {
        assert(response.success == false);
        assert(response.status == 400);
    });
