<?php

namespace App\Http\Controllers;

use App\Job;
use App\Http\Controllers\Controller;
use GuzzleHttp;
use Happyr\LinkedIn\LinkedIn;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class JobsController extends Controller
{
    public function addJobs(Request $request){
        $companyId = '';
        $companyLinkedInId = '';
        $jobs = [];
        if($request->get('company_linkedin_id') && $request->get('company_id')){
            $companyId = $request->get('company_id');
            $companyLinkedInId = $request->get('company_linkedin_id');
        }else{
            return response()->json(['success' => false, 'message' => 'Parametrul company_id nu a fost atasat request-ului']);
        }
        $client = new GuzzleHttp\Client();

        $jobsRequest = $client->request('GET', 'https://api.linkedin.com/v1/companies/2414183/updates',
            [
                'headers' => [
                    'Authorization' => 'Bearer ' . Auth::user()->access_token
                ],
                'query' => [
                    'event-type' => 'job-posting',
                    'start' => '0',
                    'count' => '100',
                    'format' => 'json'
                ]
            ])->getBody()->getContents();

        $jobsReturned = GuzzleHttp\json_decode($jobsRequest, true);

        if(sizeof($jobsReturned['values']) != 0){
            foreach($jobsReturned['values'] as $key => $jobReturned)
            {

                $job = Job::where('linkedin_id', $jobReturned['updateContent']['companyJobUpdate']['job']['id'])->first();

                if(!$job){
                    print_r( $jobReturned['updateContent']['companyJobUpdate']['job']);
                    $job = new Job([
                        'user_id'        => Auth::user()->id,
                        'linkedin_id'    => $jobReturned['updateContent']['companyJobUpdate']['job']['id'],
                        'company_id'     => $companyId,
                        'description'    => $jobReturned['updateContent']['companyJobUpdate']['job']['description'],
                        'position_title' => $jobReturned['updateContent']['companyJobUpdate']['job']['position']['title'],
                        'location'       => $jobReturned['updateContent']['companyJobUpdate']['job']['locationDescription'],
                        'url'            => $jobReturned['updateContent']['companyJobUpdate']['job']['siteJobRequest']['url']
                    ]);
                    $job->save();
                }
                array_push($jobs, $job);
            }


        }else{
            return response()->json(['success' => false, 'message' => 'Accesul nu a fost permis']);
        }

        return response()->json(['success' => true, 'jobs' => $jobs]);
    }

    public function deleteJob(Request $request){
        if($request->get('id')){
            $job = Job::where('user_id', Auth::user()->id)->where('id', $request->get('id'))->first();

            $job->delete();

            return response()->json(['success' => true, 'message' => 'Job-ul a fost sters']);
        }
        return response()->json(['false' => true, 'message' => 'Request-ul necesita un ID ca parametru']);
    }
}
