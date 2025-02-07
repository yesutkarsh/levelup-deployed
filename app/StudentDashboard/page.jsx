import Navbar from '@/components/Navbar';
import WelcomeCard from '@/components/WelcomeCard';
import UpcomingSessions from '@/components/UpcomingSessions';
import RecentActivity from '@/components/RecentActivity';
import ProgressOverview from '@/components/ProgressOverview';
import QuickLinks from '@/components/QuickLinks';
import Notifications from '@/components/Notifications';

export default function page(){
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12">
            <WelcomeCard />
          </div>
          <div className="col-span-12 lg:col-span-8">
            <UpcomingSessions />
            <RecentActivity />
          </div>
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <ProgressOverview />
            <QuickLinks />
            <Notifications />
          </div>
        </div>
      </div>
    </div>
  );
}