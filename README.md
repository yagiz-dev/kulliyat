# Külliyat

Spring ve Angular öğrenmek için yazdığım kütüphane projesi.

## Docker ile çalıştırma

Docker Compose kullanarak hızlıca Spring Boot backendini, Angular uygulamasını ve MySQL 8.4 veritabanını kaldırabilirsiniz.

Docker kullandığınızda veritabanı boşsa test verisiyle doldurulacaktır.

1. .env dosyasını oluşturun ve düzenleyin
3. `docker compose up --build`
4. `http://localhost:8080`

Frontend nginx proxy kullanarak `/api`'ı backend'e yönlendiriyor. Backend ve veritabanına erişim sadece Compose'dan oluşturduğumuz sanal networkten erişilebiliyor, yani dışarıdan sadece frontend'e erişilebiliyor.

Veritabanını test verisiyle tekrar oluşturmak için mysql-data volumw'ünü silip uygulamayı tekrar başlatabilirsiniz.

```powershell
docker compose down
docker volume rm kulliyat_mysql-data
docker compose up --build
```

### JWT secret oluşturma

Aşağıdaki kodu PowerShell'de oluşturup aldığınız secret'ı .env'deki JWT_SECRET alanında kullanabilirsniiz.

```powershell
$bytes = New-Object byte[] 32; $rng = [Security.Cryptography.RandomNumberGenerator]::Create(); $rng.GetBytes($bytes); $rng.Dispose(); [Convert]::ToBase64String($bytes)
```