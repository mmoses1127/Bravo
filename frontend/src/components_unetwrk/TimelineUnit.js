const TimelineUnit = ({eventInfo}) => {

  const prettyDate = (date) => {
    const dateObj = new Date(date);
    return dateObj.toDateString();
  }

  return (
    <div className="relative border-solid border-green-900 border-l-2 ml-1 pb-3">
      <div className="absolute top-[-4px] left-[-5px] rounded-3xl w-[8px] h-[8px] bg-green-900"/>
      <div className="pl-2">
        <p>{eventInfo.title}</p>
        <p>{prettyDate(eventInfo.date)}</p>
      </div>
    </div>
  )

}

export default TimelineUnit;