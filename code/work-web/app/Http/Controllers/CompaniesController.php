<?php

namespace App\Http\Controllers;

use App\Company;
use App\Http\Controllers\Controller;
use GuzzleHttp;
use Happyr\LinkedIn\LinkedIn;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
class CompaniesController extends Controller
{
    public function saveCompany(){
        $client = new GuzzleHttp\Client();

        $profileRequest = $client->request('GET', 'https://api.linkedin.com/v1/companies/2414183:(id,name,universal-name,description,website-url,square-logo-url,employee-count-range,locations,founded-year,num-followers)',
            [
                'headers' => [
                    'Authorization' => 'Bearer ' . Auth::user()->access_token
                ],
                'query' => [
                    'format' => 'json'
                ]
            ])->getBody()->getContents();
        $companyProfile = GuzzleHttp\json_decode($profileRequest, true);

        if(array_has($companyProfile, 'id')){
            $company = Company::where('linkedin_id', $companyProfile['id'])->get();

            if(sizeof($company) == 0){
                $company = new Company([
                    'user_id'           => Auth::user()->id,
                    'linkedin_id'       => $companyProfile['id'],
                    'name'              => $companyProfile['name'],
                    'universal_name'    => $companyProfile['universalName'],
                    'description'       => $companyProfile['description'],
                    'website'           => $companyProfile['websiteUrl'],
                    'logo'              => $companyProfile['squareLogoUrl'],
                    'employee_count'    => $this->convertEmployees($companyProfile['employeeCountRange']),
                    'locations'         => $companyProfile['locations']['values'],
                    'founded_year'      => $companyProfile['foundedYear'],
                    'num_followers'     => $companyProfile['numFollowers'],

                ]);
                $company->save();
            }

        }else{
            return response()->json(['success' => false, 'message' => 'Accesul nu a fost permis']);
        }

        return response()->json(['success' => true, 'company' => $company]);
    }

    public function getCompanies(Request $request){

        $companies = Company::where('user_id', Auth::user()->id)->with('jobs')->get();

        if(sizeof($companies) == 0){
            $this->saveCompany();

            $companies = Company::where('user_id', Auth::user()->id)->with('jobs')->get();
        }

        $companies = $this->addJobsToCompanies($companies);

        return response()->json(['success' => true, 'companies' => $companies]);

    }

    public function deleteCompany(Request $request){
        if($request->get('id')){
            $company = Company::where('user_id', Auth::user()->id)->where('id', $request->get('id'))->first();

            $company->delete();

            return response()->json(['success' => true, 'message' => 'Compania a fost stearsa']);
        }
        return response()->json(['false' => true, 'message' => 'Request-ul necesita un ID ca parametru']);
    }

    private function convertEmployees($employeesRange){
        switch ($employeesRange){
            case 'A':
                $employees = '1';
                break;
            case 'B':
                $employees = '2-10';
                break;
            case 'C':
                $employees = '11-50';
                break;
            case 'D':
                $employees = '51-200';
                break;
            case 'E':
                $employees = '201-500';
                break;
            case 'F':
                $employees = '501-1000';
                break;
            case 'G':
                $employees = '1001-5000';
                break;
            case 'H':
                $employees = '5001-10,000';
                break;
            default:
                $employees = '10,000+';
                break;
        }

        return $employees;
    }

    private function addJobsToCompanies($companies){
        $client = new GuzzleHttp\Client();
        $companies = $companies->toArray();
        foreach ($companies as $key=>$company){
            $client->request('POST', 'http://work-web.test/api/jobs/add',
                [
                    'headers' => [
                        'Authorization' => 'Basic' . Auth::user()->access_token
                    ],
                    'query' => [
                        'company_id' => $company['id'],
                        'company_linkedin_id' => $company['linkedin_id']
                    ]
                ])->getBody()->getContents();
        }

        $companies = Company::where('user_id', Auth::user()->id)->with('jobs')->get();

        return $companies;
    }
}
