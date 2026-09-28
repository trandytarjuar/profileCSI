import CommunityClient from '../components/CommunityClient';
import { activities, nationalRoles, chapters } from '../data/community';

export default function Home() {
  return <CommunityClient chapters={chapters} nationalRoles={nationalRoles} activities={activities} />;
}
