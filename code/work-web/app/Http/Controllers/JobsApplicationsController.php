<?php

namespace App\Http\Controllers;

use App\Job;
use App\Http\Controllers\Controller;
use App\JobApplication;
use GuzzleHttp;
use Happyr\LinkedIn\LinkedIn;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class JobsApplicationsController extends Controller
{
    public function addJobApplication(Request $request){

        if($request->get('jobApplication')){
            if($request->get('jobId')){
                $jobApplicationData = $request->get('jobApplication');
                $jobApplication = new JobApplication([
                    'user_id' => Auth::user()->id,
                    'job_id' => $request->get('jobId'),
                    'status' => $jobApplicationData['status'],
                    'objective' => $jobApplicationData['objective'],
                    'education' => $jobApplicationData['education'],
                    'experience' => $jobApplicationData['experience'],
                    'skills' => $jobApplicationData['skills'],
                ]);

                $jobApplication->save();

                return response()->json(['success' => true, 'jobApplication' => $jobApplication]);
            }
            else{
                return response()->json(['false' => true, 'message' => 'Request-ul necesita un parametru: jobId']);
            }
        }else{
            return response()->json(['false' => true, 'message' => 'Request-ul necesita un obiect de tip jobApplication']);

        }
    }

    public function getJobsApplications(Request $request){
        $jobsApplications = JobApplication::where('user_id', Auth::user()->id)->with('job.company')->get();

        return response()->json(['success' => true, 'jobsApplications' => $jobsApplications]);
    }

    public function updateJobApplicationStatus(Request $request){
        if($request->get('id') && $request->get('status')){
            $jobApplication = JobApplication::where('user_id', Auth::user()->id)->where('id', $request->get('id'))->first()->toArray();

            $jobApplication['status'] = $request->get('status');

            $jobApplication->save();

            return response()->json(['success' => true, 'message' => 'Statusul a fost actualizat']);
        }
        return response()->json(['false' => true, 'message' => 'Request-ul necesita un ID si status ca parametru']);
    }
}
