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

Structura aplicatiei:
- I. code (partea de cod a aplicatiei)
    - a. RESTful API: code/work-web/routes/api.php
    - b. PHP: code/work-web/app/Http/Controllers
    - c. ReactJS: code/work-web/resources/assets
- II. Homestead (serverul local care se ocupa de hosting)

REQUIREMENTS:
- Vagrant: https://www.vagrantup.com/downloads.html
- VirtualBox: https://www.virtualbox.org/wiki/Downloads
- Composer: https://github.com/composer/windows-setup/releases/tag/v4.8.0

INSTRUCTIUNI:
- Instalati REQUIREMENTS
- git clone https://github.com/AndreeaFisca/web-project.git (serverul este incarcat pe git folosind git large files,
astfel pentru folosirea serverul este nevoie de clone, nu este suficienta descarcarea fisierelor manual de pe github)
- Accesati : web-project/Homestead/Homestead.yaml
- Modificati:

- folders:
    - map: ~/web-project/code
(acest "map" este un guide pentru calea catre aplicatia ce trebuie rulata pe server,
astfel momentan face point catre fila root al userului curent logat: ~ si restul este structura
filelor din proiect, astfel daca faceti clone la repository pe desktop map va arata asa:
- map: ~/Desktop/web-project/code)

- Editati etc/hosts si adaugati o noua linie: "192.168.10.10  work-web.test"
- Daca nu aveti ssh keys setate pe calculator, folositi comanda: " ssh-keygen rsa -C "youremail@yahoo.com" " (daca lucrati pe windows
comanda functioneaza doar dupa ce instalati git bash: https://git-scm.com/downloads)
- Porniti VirtualBox
- Adaugati server.box la VirtualBox folosind in terminal, din interiorul directorului web-project/Homestead:
"vagrant box add metadata.json"
- Din interiorul aceluiasi director Homestead rulati: "vagrant up —-provision"
