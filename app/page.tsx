import CommunityClient from '../components/CommunityClient';
import { activities, nationalRoles, regions } from '../data/community';

export default function Home() {
  return <CommunityClient regions={regions} nationalRoles={nationalRoles} activities={activities} />;
}
