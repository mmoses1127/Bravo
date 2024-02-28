import TimelineUnit from './TimelineUnit';
import { useDispatch, useSelector } from 'react-redux';
import { getContactInteractions } from '../store/interactions';

const Timeline = ({contact}) => {

  const dispatch = useDispatch();
  const interactions = useSelector(getContactInteractions(contact.id));

  const firstConnectionEventInfo = {
    title: `First connected with ${contact.name}`,
    date: contact.dateConnected? contact.dateConnected : contact.createdAt
  }

  console.log('date connected', contact.dateConnected)

  return (
    <div className='bg-pale-green p-2 rounded'>
      <div className='bg-white rounded dropshadow p-2'>
        <div className="border-solid border-green-900 border-b-2 mb-6">
          <p className='text-lg'>Timeline</p>
        </div>
        <div className='overflow-auto'>
          <TimelineUnit eventInfo={firstConnectionEventInfo}/>
          {interactions.map(interaction => <TimelineUnit key={interaction.id} eventInfo={interaction}/>)}
        </div>
      </div>
    </div>
    
  )

}

export default Timeline;