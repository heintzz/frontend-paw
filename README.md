# Frontend PAW - Kelompok 2

## Financial Tracker
Fintrack merupakan sebuah web app pengelola keuangan personal yang bertujuan untuk mengelola dan memantau penghasilan, pengeluaran dan goal yang ingin dicapai dalam tujuan finansial.

Anggota Kelompok
<table>
  <tr>
    <th>Nama</th>
    <th>NIM</th>
  </tr>
  <tr>
    <td>Dhiyaa Amalia Putri</td>
    <td>21/479811/TK/52942</td>
  </tr>
  <tr>
    <td>Muhammad Hasnan Regard</td>
    <td>21/481381/TK/53135</td>
  </tr>
  <tr>
    <td>Bagus Rakadyanto Oktavianto Putra</td>
    <td>21/474401/TK/52343</td>
  </tr>
  <tr>
    <td>Valentinus Wastu Rosari</td>
    <td>21/478174/TK/52692</td>
  </tr>
</table>



## Link & Deployment
Pengunggahan website, video presentasi dan materi presentasi dapat dilihat pada laman berikut    
1. [Financial Tracker Web](https://fintrack-web.vercel.app)
2. [Slide PPT](https://s.id/1Y5DI)    
3. [Presentasi Demo](https://youtu.be/0IbzR-SGerw)   
![image](https://github.com/heintzz/frontend-paw/assets/91127753/7b7e9318-b768-442d-b4af-89873c8bdb4a)
Terdapat bug pada menit [9.59](https://www.youtube.com/watch?v=0IbzR-SGerw&t=599s) saat presentasi direkam. Bug tersebut berupa kesalahan dalam pengonversian nilai negatif ke dalam format rupiah. Bug tersebut sudah diperbaiki pasca demo dan penampilan _balance_ sudah sesuai dengan data yang ada.


## How to Run Locally
1. Make a local copy of this project on your computer
    ```shell
   git clone https://github.com/heintzz/frontend-paw
    ```
2. Move to the project directory and open in VS Code
   ```shell
   cd frontend-paw
   code .
   ```
3. On the VS Code terminal, make your own local environment variable
   ```shell
   touch .env.local
   ```
4. Copy this variable to .env.local
   ```shell
   API_BASE_URL=https://spring-bud-centipede-garb.cyclic.app
   ```    
5. Set up the required software packages
    ```shell
     npm install
    ```
6. Start the application  
   ```shell
   npm run dev
   ```
