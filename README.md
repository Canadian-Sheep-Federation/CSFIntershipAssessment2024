merhaba bu proje dava durumunu gosteren dis apiden iceriye bilgi cekmek icin olusuturmustur
--oncelikle npm install diyerek butun eklentileri yukleyin ve ardindan .env olusturup icerisine "api_key" adi adinda api keyi ekleyin diger turlu calismaz hata verir
--'npm run start' veya node ./server komutlariyla projeyi ayaga kaldirabilirsiniz
--proje portu 1994 dur veri tabani olarak sqllite kullandim 
--ornek olarak bir front end sayfasi bulunmakta apiyi kullanmak icin proje restart olana kadar butun verileri tutar
--projede eslint ve prettier kullanarak duzen saglanmistir
--mvc yapisi kullanilmistir sql lite kullanmadigim icin biraz arastirma yapmak zorunda kaldim


----end pointler----
-/api -get requesti ile butun kayitli verileri cekebilirsiniz json formatinda butun veriler gelir
-/api/:id -get requesti ile id si belirlenen veriyi cekebilirsiniz sonuc olarak json formatinda doner
-/api -post requesti ile yeni veri ekleyebilirsiniz city, temperature ve weather verileri zorunludur olmadan calismaz sonuc olarak inserted id yi geri dondurur
-/api/:id -delete requesti ile id si belirtilen veriyi silebilirsiniz

---bir surum daha yapmak durumunda kalirsam eger planlanan guncellemeler
-veriyi guncellemek icin patch/put olusturup sehir isimlerini uniqie olarak saklamak
-veriyi eklerken verinin timestemp ini de ekleyek unique yapilmasi istenmiyorsa data olarak tutmak
-timestemp i olan verileri cart ile dusus yukselis seklinde gostermek



# Project: Case Status API

This project was created to fetch information from an external API that shows case statuses.

## Installation

1. Install all dependencies by running:
   ```bash
   npm install
   ```
2. Create a `.env` file in the project root directory and add your API key with the name `API_KEY`:
   ```
   API_KEY=your_api_key
   ```
   Without this step, the project will not work and will give an error.

## Running the Project

To start the project, use the following commands:
```bash
npm run start
```
or
```bash
node ./server
```

The project uses port 1994 and SQLite as the database. It also includes a frontend page and stores all data until the project is restarted to use the API.

The project uses ESLint and Prettier for code formatting. An MVC structure is used, and research was done on SQLite.

## Endpoints

- **GET /api**: Fetches all registered data in JSON format.
- **GET /api/:id**: Fetches the data with the specified ID in JSON format.
- **POST /api**: Adds new data. `city`, `temperature`, and `weather` are required fields. It returns the inserted ID upon success.
- **DELETE /api/:id**: Deletes the data with the specified ID.

## Future Updates

If another version is released, the planned updates are:
- Add PATCH/PUT endpoints for updating data and store city names as unique.
- When adding data, include a timestamp for each entry. If uniqueness is not required, store the data with the timestamp.
- Display data with timestamps in charts to show trends of increases and decreases.
