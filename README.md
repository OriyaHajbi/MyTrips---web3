# Students

- Oriya Hajbi - 313220469
- Nadav Levi - 312594484

# How it is works

- Install all the modules using `npm install`

- Create a file named ".env" and put there your DB location:

  ```json5
      DATABASE_URL=mongodb://localhost/subscribers
  ```

- Open the terminal and run `npm run devStart`.

- To initialize the DB please do a POST HTTP request to this URL (in route.rest - line 30) :
  `http://localhost:5500/init`

- Open this URL (`http://localhost:5500/main_page`) in your favorite web service.
