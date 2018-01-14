<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use App\Job;
class Company extends Model
{
    protected $table = 'companies';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'linkedin_id', 'name','universal_name','description','website','logo','employee_count','locations','founded_year','num_followers'
    ];

    protected $casts = [
        'locations' => 'object'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
    ];

    public function jobs(){
        return $this->hasMany(Job::class, 'company_id', 'id');
    }
}
