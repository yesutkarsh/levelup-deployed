import React from 'react'


const Challenges = () => {
    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200 min-w-[400px] m-5">
        <div className="flex items-center">
          <div className="flex-shrink-0 p-3 bg-indigo-50 rounded-lg">
            <i className="fas fa-users text-custom text-xl"></i>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Active Sessions</p>
            <p className="text-2xl font-semibold text-gray-900">245</p>
          </div>
        </div>
      </div>
    );
  };
  
  const Event = () => {
    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200 min-w-[400px] m-5">
        <div className="flex items-center">
          <div className="flex-shrink-0 p-3 bg-indigo-50 rounded-lg">
            <i className="fas fa-calendar text-custom text-xl"></i>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Upcoming Events</p>
            <p className="text-2xl font-semibold text-gray-900">12</p>
          </div>
        </div>
      </div>
    );
  };
  
  const Recent = () => {
    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200 min-w-[400px] m-5">
        <div className="flex items-center">
          <div className="flex-shrink-0 p-3 bg-indigo-50 rounded-lg">
            <i className="fas fa-clock text-custom text-xl"></i>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
            <p className="text-2xl font-semibold text-gray-900">18</p>
          </div>
        </div>
      </div>
    );
  };
  
  const Form = () => {
    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200 min-w-[400px] m-5">
        <div className="flex items-center">
          <div className="flex-shrink-0 p-3 bg-indigo-50 rounded-lg">
            <i className="fas fa-envelope text-custom text-xl"></i>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Newsletter Subscribers</p>
            <p className="text-2xl font-semibold text-gray-900">2.4k</p>
          </div>
        </div>
      </div>
    );
  };
  
  

export default function Notif() {


  return (
    <>
    <div style={{marginRight: '10px'}}>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <Challenges />
  <Event />
  <Recent />
  <Form />
</div>



    </div>
    

    </>
  )
}
