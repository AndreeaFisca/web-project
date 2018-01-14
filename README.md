# WebProject
Gestionare profile candidati integrat cu LinkedIn (sau aplicare la un job)

Componente identificate:
- Login
- Lista job-uri
- Profil utilizator
- Lista aplicari la job-uri pentru utilizatorul curent
- Meniu

Identificare apeluri API:
 - BASE URL: http://work-web.test
 - READ GET /v1/people/~:(id,num-connections,picture-url)?format=json
    Route::get('auth/login', 'AuthController@login');
    Route::post('user/save', 'UserController@saveUser');
    Route::group(['middleware' => ['auth_check']], function () {
        Route::get('companies/get', 'CompaniesController@getCompanies');
        Route::post('companies/add', 'CompaniesController@saveCompany');
        Route::delete('companies/delete-company', 'CompaniesController@deleteCompany');
        Route::post('jobs/add', 'JobsController@addJobs');
        Route::delete('jobs/delete-job', 'JobsController@deleteJob');
        Route::get('jobs-applications/get', 'JobsApplicationsController@getJobsApplications');
        Route::post('jobs-applications/add-job-application', 'JobsApplicationsController@addJobApplication');
        Route::put('jobs-applications/status', 'JobsApplicationsController@updateJobApplicationStatus');
        Route::delete('user/delete', 'UserController@deleteUser');
    });
Definire actiuni utilizator:
- Login
- Aplicare job
- Deconectare
- Afisare list aplicari la job-uri

Tehnologii folosite:
- Front-end: HTML, CSS, Bootstrap
- Back-end: PHP, MySQL
- General: JavaScript, RESTful, ReactJs, Laravel

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
