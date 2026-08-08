POST http://localhost:8080/api/publishers

```json
{
  "name": "Türkiye İş Bankası Kültür Yayınları"
}
```

POST http://localhost:8080/api/authors

```json
{
  "name": "Grigoriy Petrov"
}
```

POST http://localhost:8080/api/books

```json
{
  "title": "Beyaz Zambaklar Ülkesinde",
  "publisher": {
    "id": 1
  },
  "authors": [
    {
      "id": 1
    }
  ]
}
```