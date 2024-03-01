const TimelineUnit = ({eventInfo}) => {

  const prettyDate = (date) => {
    const dateObj = new Date(date);
    return dateObj.toDateString();
  }

  return (
    <div className="relative border-solid border-brand-primary border-l-2 ml-1 pb-3 m-1">
      <div className="absolute top-[-4px] left-[-4px] rounded-3xl w-[8px] h-[8px] bg-brand-primary z-50"/>
      <div className="pl-2">
        <p>Contacted via {eventInfo.contactMethod}</p>
        <p>{prettyDate(eventInfo.dateContacted)}</p>
      </div>
    </div>
  )

}

export default TimelineUnit;