# PLANNING

- Frontend: Flutter, android studio, graphql
- Backend: Postman, nodejs, postgres, postgraphile, graphql

# ANALYSIS

- Delo bo razdeljeno na 2 člana. Eden bo delal BE, drugi pa FE.

# DESIGN

# IMPLEMENTATION

## Front end:

- Kreiranje login screena
- Kreiranje screena za zdravnike, bolnike
- Dodajanje opcij za odpiranje bolezni in zapisovanje v bazo
- Dodajanje komentarjev in diskusij pod bolezni
- Dodajenje rentgenskih slik, slik / kod izvidov

## Back end:

- login auth route (zdravnik, pacient)
- Kreiranje baze in vseh povezav
- Vzpostavitev graphqla
- vzpostavitev image uploaderja in kreiranje možnost serviranja slik
- Prejemanje slik in shranjevanje slik na server in poti v bazo
- Narediti ML/AI microservice za določanje rakavosti rentgenske slike
- Narediti rating sistem za zdravnike
- Možnost pošiljanja zahtev za bolezen vseh zdravnikom kot notification, če mojega zdravnika trenutno ni

# TESTING & INTEGRATION

- Testiranje vseh rest api klicev preko postmana in testiranje integracijo rest API-ja v flutter aplikacijo. Živi podatki

# MAINTENANCE

- Ob velikem številu uporabnikov moramo skrbeti na skalabilnosti in customer suportu.
