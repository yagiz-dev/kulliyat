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
  "isbn": "978-6254053702",
  "publicationYear": 2021,
  "summary": "Beyaz Zambaklar Ülkesinde, Rus yazar Grigory Petrov tarafından 1923 yılında kaleme alınmış; Finlandiya halkının cehaletten, yoksulluktan ve bataklıklardan kurtulup eğitimle, iradeyle modern bir medeniyet kurma mücadelesini anlatan ilham verici bir eserdir.",
  "genre": "TARIH",
  "cover_image_url": "https://img.iskultur.com.tr/webp/2021/04/beya-zambaklar-ulkesinde-256x420.jpg",
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