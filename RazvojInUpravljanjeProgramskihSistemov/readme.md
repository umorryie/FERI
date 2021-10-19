# App: Zdravnik - Pacient

## Bistvo?

- Aplikacija namenjena komunikaciji doktorja in njegovih pacientov o napredku zdravljenja in stanju bolezni.

## Funkcionalnost

- Doktor ima lahko več pacientov
- Doktor lahko nalaga izvide, rentgenske slike na portal in te slike so vidne le določenemu pacientu
- Vsak pacient se mora registrirati in potem validno prijaviti (email, facebook, google)
- Pacient ima za vsako bolezen odprto novo sekcijo: Bolezen, kamor doktor in pacient pišeta komentarje o bolezni, simptomih, napotkih. Vsaka bolezen ima tudi svoja zdravila, ki jih določi le doktor. Ko je bolezen ozdravljena, jo potrdita oba (doktor in pacient) in ta bolezen se arhivira
- Bolnik lahko odpre novo sekcijo Bolezen in o tem je obveščen njehov zdravnik preko notificationa, kjer mu poda prve nasvete in napotke pred posvetom v živo

## Stack

- Frontend: Flutter
- Backend: Nodejs, Postgres, Express

## Nadgradnja

- Dodajanje AI za določanje, ali je rentgenska slika rakotvorna ali ni