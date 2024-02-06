import TimelineUnit from './TimelineUnit';
import { useDispatch, useSelector } from 'react-redux';
import { getContactInteractions } from '../store/interactions';

const Timeline = ({contact}) => {

  const dispatch = useDispatch();
  const interactions = useSelector(getContactInteractions(contact.id));

  const connectionEventInfo = {
    title: `First connected with ${contact.firstName}`,
    date: contact.dateConnected
  }

return (
  <div>
    <div className="border-solid border-green-900 border-b-2 mb-6">
      <p className='text-lg'>Timeline</p>
    </div>
    <div className='overflow-auto'>
      <TimelineUnit eventInfo={connectionEventInfo}/>
      {interactions.map(interaction => <TimelineUnit eventInfo={interaction}/>)}
    </div>
  </div>
  
)

}

export default Timeline;