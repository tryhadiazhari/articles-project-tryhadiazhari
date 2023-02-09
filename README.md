# BE-and-FE-articles

Cara penggunaan program setelah clone repo git ini:

1.  Ketikkan perintah "composer update" untuk mendownload package dari backend Laravel 9
2.  Ketikkan perintah "php artisan migrate" untuk melakukan create Database dan create tabel
3.  Ketikkan perintah "php artisan db:seed --class=DatabaseSeeder" untuk menambahkan akun user dengan keterangan sbb:
    email: demo@gmail.com
    password: 123456
4.  Ketikkan perintah "cd/react" untuk masuk ke dalam folder frontend react
5.  Ketikkan perintah "npm install" untuk menginstall package nodejs yang dibutuhkan.
6.  Setelah semua perintah diatas dilakukan, tahap selanjutnya ketikkan "cd ../" untuk kembali ke folder dari backend Laravel 9 dan lakukan perintah "php artisan serve" untuk menjalankan web server dari Laravel
7.  Kemudian masuk ke folder "react" dengan cara ketikkan "cd react", lalu jalankan perinah "npm run dev" agar web server nodejs nya berjalan dengan port 3000
8.  Setelah semua nya berjalan backend Laravel dan frontend reactjs buka browser untuk membuka tampilan web frontend dengan link "http://localhost:3000" atau "http://127.0.0.1:3000".
