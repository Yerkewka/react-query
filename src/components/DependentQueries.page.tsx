import axios from 'axios';
import { useQuery } from 'react-query';
import { IChannel } from '../models/channel';

import { IUser } from '../models/user';

interface IProps {
  email: string;
}

const fetchUserByEmail = (email: string) =>
  axios.get<IUser>(`http://localhost:4000/users/${email}`);

const fetchCoursesByChannelId = (channelId: string) =>
  axios.get<IChannel>(`http://localhost:4000/channels/${channelId}`);

export const DependentQueriesPage: React.FC<IProps> = ({ email }) => {
  const userQuery = useQuery(['user', email], () => fetchUserByEmail(email));

  const channelId = userQuery.data?.data.channelId;

  const coursesQuery = useQuery(
    ['courses', channelId],
    () => fetchCoursesByChannelId(channelId!),
    {
      enabled: !!channelId,
    }
  );

  return (
    <div>
      <h2>{userQuery.data?.data.id}</h2>
      <h5>{userQuery.data?.data.channelId}</h5>
      <ul>
        {coursesQuery.data?.data.courses.map((course) => (
          <li key={course}>{course}</li>
        ))}
      </ul>
    </div>
  );
};
