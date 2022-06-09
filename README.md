# Library of books

##

## Start server

`node index.js`

### Test API

#### Get all books

make a `GET` call against `/books`

#### Get a book

make a `GET` call against `/books/[id]`

#### Add a book

make a `POST` call against `/books` with json data

```
{
    "title": "Cuphead Volume 1: Comic Capers &; Curios",
    "author":"Zack Keller",
    "category":"KIDS",
    "released": "2020-08-11"
}

```

#### Update a book

make a `PUT` call against `/books/[id]` with json data

```
{
        "title": "Historien om Sverige : från istid till framtid - så blev de första 14000 åren",
        "category": "HISTORY",
        "author": "Herman Lindqvist",
        "added": "2022-06-08T12:50:16.000Z",
        "released": "2020-09-04T22:00:00.000Z"
    }
```

#### Update a book information

make a `PATCH` call against `/books/[id]` with json data

```
{
  "title": "My book of loves"
}

```

#### Remove a book

make a `DELETE` call against `/books/[id]`
