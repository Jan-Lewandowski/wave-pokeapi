# Wave PokeAPI
Aplikacja do przeglądania i wyszukiwania pokemonów oparta o publiczne PokeAPI. Każda karta pokemona prezentuje sprite, nazwą, numer oraz typy pokemona z tłem w postaci gradientu zbudowanego z kolorów typów

## Funkcje
- lista pokemnow z przyciskiem aby zaladowac wiecej z limitem 24 na strone
- wyszukiwarka pokemonow (500ms debounce)
- lista typow( niestety nie udało mi się zaimplementować filtrowania po typach)
- każdy pokemon ma swoją kartę z info i nałożonym gradientem na tło

## Wykorzystane technologie
- Vite
- Tanstack Query
- Tailwind
- MaterialUI - tylko do zaprezentowania użyłem jeden komponent którym jest Chip użyty w pokemon-card

## Uruchomienie projektu
```bash
npm install
npm run dev
```
Serwer development włącza się na localhost:5173

