import { Divider } from '@mui/material';
import { GetLabelsQuery, useGetLabelsQuery } from 'graphql/generated/graphql-types';
import graphqlRequestClient from 'lib/clients/GraphqlRequestClient';
import { LabelItem } from './LabelItem';

export const LabelList = () => {
  const { data, error, isLoading } = useGetLabelsQuery<GetLabelsQuery, Error>(
    graphqlRequestClient,
    {}
  );

  if (isLoading) return <p>loading labels</p>;
  if (error) return <p>error loading labels</p>;

  console.log('labels', data);

  return (
    <div className='bg-white rounded-2xl py-4 shadow w-60 px-2 h-min'>
      <LabelItem key='notes' title='Notes' icon='label_outlined' />
      <LabelItem key='reminders' title='Reminders' icon='notifications_active' />
      <Divider style={{ margin: '0.75rem 0' }} />

      <div className='flex mx-4 items-center'>
        <p className='flex-2 p-2 text-gray-600'>Labels</p>
      </div>

      {data?.labels?.data.map(({ id, attributes }) => (
        <LabelItem
          key={id}
          title={attributes?.title}
          icon={attributes?.icon!}
          color={attributes?.color}
        />
      ))}

      <LabelItem key='edit' title='Edit Labels' icon='edit_border' />
      <Divider style={{ margin: '0.75rem 0' }} />
      <LabelItem key='archive' title='Archive' icon='archive' />
    </div>
  );
};
