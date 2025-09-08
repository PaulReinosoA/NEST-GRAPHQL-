<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

### utilizamos code first para esta aplicacion con GRAPHQL


## Query para apolo de ejemplo con fragmentos

```` 
query {
  todo1: todo(id: 1) {
    ...fields
  }
  todo2: todo(id: 2) {
    ...fields
  }
  todo3: todo(id: 3) {
    ...fields
  }
}

fragment fields on Todo {
  id
  description
  done
}
```` 

### another example


```` 
{
  Complete: todos(status: true) {
    ...fields
  }

  pending: todos(status: false) {
    ...fields
  }

  todos {
    ...fields
  }
}

fragment fields on Todo {
  description
  id
  done
}
```` 