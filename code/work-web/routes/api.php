<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
    // Generate routes for the Auth (authentication) controller
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

