# WebProject
Gestionare profile candidati integrat cu LinkedIn (sau aplicare la un job)

Componente identificate:
- Lista candidati
- Lista job-uri
- Profil candidat
- Cautare candidat
- Bara de actiuni (Action bar)

Identificare apeluri API:
 - BASE URL: https://api.linkedin.com/
 - READ GET /v1/companies/{id}?format=json
 -> sample response
{
  "id": 1337,
  "name": "LinkedIn"
}
 - READ GET /v1/people/~?format=json
 - READ GET /v1/people/~:(id,num-connections,picture-url)?format=json
 - READ GET /voyager/api/identity/profiles/cristian-serban-416484110/profileView
 - READ GET /voyager/api/search/facets?_bustCache=ember3748&guides=List()&keywords=andrew
 
Definire actiuni utilizator:
- Vizualizarea candidatilor dintr-o categorie (acceptati/respinsi)
- Cautare candidat dupa nume
- Adaugare candidat
- Mutare candidat dintr-o categorie in alta

Tehnologii folosite:
- Front-end: HTML, CSS, Bootstrap
- Back-end: PHP, MySQL
- General: JavaScript, RESTful

REQUIREMENTS:
Vagrant: https://www.vagrantup.com/downloads.html
VirtualBox: https://www.virtualbox.org/wiki/Downloads
Composer: https://github.com/composer/windows-setup/releases/tag/v4.8.0

